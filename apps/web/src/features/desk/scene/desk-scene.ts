import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  fovFor,
  LABEL_HEIGHT,
  LAYOUTS,
  placementOf,
  SCALE,
  focusPoseFor,
  poseFor,
  type Pose,
  type PropKey,
} from './layout';
import { createMaterials, type Materials } from './materials';
import { createMate, createThermos } from './objects/drinks';
import { createBoard, createBooks, createPhotos } from './objects/extras';
import { createLaptop, SCREEN_SIZE, screenPose, type Laptop } from './objects/laptop';
import {
  createAskKey,
  createBadge,
  createEarbuds,
  createMouse,
  createNotebook,
  createPhone,
  createFolder,
  type AskKey,
} from './objects/props';
import { createSurface, type Surface } from './objects/surface';
import type {
  DeskObjectKey,
  DeskVariant,
  SceneAssets,
  SceneFonts,
  SceneState,
  SceneStrings,
  ScreenPoint,
  ScreenRect,
} from './types';

export interface DeskSceneOptions {
  canvas: HTMLCanvasElement;
  fonts: SceneFonts;
  strings: SceneStrings;
  assets: SceneAssets;
  onHover: (key: DeskObjectKey | null) => void;
  onSelect: (key: DeskObjectKey) => void;
  onDismiss: () => void;
  onFrame: () => void;
}

const INTERACTIVE: DeskObjectKey[] = [
  'laptop',
  'ask',
  'mate',
  'thermos',
  'badge',
  'notebook',
  'phone',
  'sheet',
  'books',
  'photos',
  'board',
];

const LIFT: Record<DeskObjectKey, number> = {
  laptop: 0.004,
  ask: 0.006,
  mate: 0.01,
  thermos: 0.008,
  badge: 0.008,
  notebook: 0.008,
  phone: 0.008,
  sheet: 0.006,
  books: 0.006,
  photos: 0.006,
  board: 0.008,
};

const LIGHTING = {
  dark: {
    background: 0x070707,
    environment: 0.42,
    sky: 0xc9d4e6,
    ground: 0x1b1a19,
    hemisphere: 0.55,
    lamp: 0xffdcb8,
    lampPower: 5.2,
    fill: 0.35,
    wall: 0x2e2f32,
  },
  light: {
    background: 0xd8d3ca,
    environment: 0.8,
    sky: 0xffffff,
    ground: 0xb8a48e,
    hemisphere: 0.95,
    lamp: 0xfff2df,
    lampPower: 7,
    fill: 0.9,
    wall: 0xb9b8b4,
  },
} as const;

export class DeskScene {
  private readonly options: DeskSceneOptions;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(32, 1.6, 0.05, 12);
  private readonly raycaster = new THREE.Raycaster();
  private readonly pointer = new THREE.Vector2();
  private readonly sway = new THREE.Vector2();
  private readonly position = new THREE.Vector3();
  private readonly target = new THREE.Vector3();
  private readonly scratch = new THREE.Vector3();
  private readonly materials: Materials;
  private readonly surface: Surface;
  private readonly laptop: Laptop;
  private readonly askKey: AskKey;
  private readonly props = new Map<PropKey, THREE.Group>();
  private readonly baseY = new Map<PropKey, number>();
  private readonly lifts = new Map<DeskObjectKey, number>();
  private readonly pickables: THREE.Object3D[] = [];
  private readonly hemisphere = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
  private readonly lamp = new THREE.SpotLight(0xffffff, 10, 0, 0.9, 0.9, 2);
  private readonly fill = new THREE.DirectionalLight(0xbfd4ff, 0.3);
  private readonly environment: THREE.WebGLRenderTarget;

  private state: SceneState = {
    lid: false,
    view: 'top',
    covered: false,
    focus: null,
    absent: [],
    hover: null,
    theme: 'dark',
    still: false,
  };
  private variant: DeskVariant = 'wide';
  private goal: Pose;
  private width = 1;
  private height = 1;
  private lidAngle = 0;
  private lidVelocity = 0;
  private press = 0;
  private cover = 0;
  private pointerHover: DeskObjectKey | null = null;
  private pointerInside = false;
  private pointerDirty = false;
  private running = false;
  private disposed = false;
  private last = 0;
  private awakeUntil = 0;
  private snapped = false;

  constructor(options: DeskSceneOptions) {
    this.options = options;
    const { canvas, fonts, strings, assets } = options;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.environment = pmrem.fromScene(new RoomEnvironment(), 0.04);
    this.scene.environment = this.environment.texture;
    pmrem.dispose();

    this.materials = createMaterials();
    this.surface = createSurface(this.materials);
    this.scene.add(this.surface.group);

    this.laptop = createLaptop(this.materials, fonts, strings, assets, this.wake);
    this.askKey = createAskKey(this.materials, fonts);

    this.register('laptop', this.laptop.group);
    this.register('ask', this.askKey.group);
    this.register('mate', createMate(this.materials));
    this.register('thermos', createThermos(this.materials));
    this.register('badge', createBadge(this.materials, fonts, strings, assets, this.wake));
    this.register('notebook', createNotebook(this.materials, fonts));
    this.register('phone', createPhone(this.materials, fonts, strings));
    this.register('sheet', createFolder(fonts, assets, this.wake));
    this.register('mouse', createMouse(this.materials));
    this.register('earbuds', createEarbuds(this.materials));
    this.register('books', createBooks(this.materials, fonts));
    this.register('photos', createPhotos(this.materials, assets.people, this.wake));
    this.register('board', createBoard(this.materials));

    this.lamp.position.set(-0.75, 1.25, -0.35);
    this.lamp.target.position.set(0.05, 0, 0.05);
    this.lamp.castShadow = true;
    this.lamp.shadow.mapSize.set(2048, 2048);
    this.lamp.shadow.bias = -0.0003;
    this.lamp.shadow.normalBias = 0.004;
    this.lamp.shadow.radius = 5;
    this.lamp.shadow.camera.near = 0.4;
    this.lamp.shadow.camera.far = 3.5;
    this.fill.position.set(0.8, 1.1, 1.2);
    this.scene.add(this.hemisphere, this.lamp, this.lamp.target, this.fill);

    this.goal = poseFor('top', this.variant, 1.6);
    this.applyLayout();
    this.applyTheme();

    canvas.addEventListener('pointermove', this.onPointerMove);
    canvas.addEventListener('pointerleave', this.onPointerLeave);
    canvas.addEventListener('click', this.onClick);
  }

  private register(key: PropKey, group: THREE.Group) {
    this.props.set(key, group);
    this.scene.add(group);
    if ((INTERACTIVE as PropKey[]).includes(key)) {
      group.userData.deskKey = key;
      this.lifts.set(key as DeskObjectKey, 0);
    }
  }

  private applyLayout() {
    const { pad } = LAYOUTS[this.variant];
    this.surface.setPad(pad.width, pad.depth, pad.x, pad.z);
    for (const [key, group] of this.props) {
      const { position, turn } = placementOf(this.variant, key);
      group.position.copy(position);
      group.rotation.y = turn;
      group.scale.setScalar(SCALE[key]);
      this.baseY.set(key, position.y);
    }
    this.applyPresence();
  }

  private applyPresence() {
    const { hidden } = LAYOUTS[this.variant];
    this.pickables.length = 0;
    for (const [key, group] of this.props) {
      const absent = (this.state.absent as PropKey[]).includes(key);
      group.visible = !absent && !hidden.includes(key);
      if (group.visible && group.userData.deskKey) this.pickables.push(group);
    }
  }

  private applyTheme() {
    const look = LIGHTING[this.state.theme];
    this.scene.background = new THREE.Color(look.background);
    this.scene.environmentIntensity = look.environment;
    this.hemisphere.color.setHex(look.sky);
    this.hemisphere.groundColor.setHex(look.ground);
    this.hemisphere.intensity = look.hemisphere;
    this.lamp.color.setHex(look.lamp);
    this.lamp.intensity = look.lampPower;
    this.fill.intensity = look.fill;
    this.materials.wall.color.setHex(look.wall);
  }

  private retarget() {
    const aspect = this.width / this.height;
    const focused = this.state.focus ? this.props.get(this.state.focus) : undefined;
    this.goal = focused
      ? focusPoseFor(focused.position, this.variant, aspect)
      : poseFor(this.state.view, this.variant, aspect);
    if (!this.snapped) {
      this.position.copy(this.goal.position);
      this.target.copy(this.goal.target);
      this.snapped = true;
    }
  }

  resize(width: number, height: number) {
    if (this.disposed || width === 0 || height === 0) return;
    this.width = width;
    this.height = height;
    const aspect = width / height;
    const variant: DeskVariant = aspect < 0.9 ? 'tall' : 'wide';
    if (variant !== this.variant) {
      this.variant = variant;
      this.applyLayout();
      this.snapped = false;
    }
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.renderer.setSize(width, height, false);
    this.camera.aspect = aspect;
    this.camera.fov = fovFor(this.variant);
    this.camera.updateProjectionMatrix();
    this.retarget();
    this.wake();
  }

  update(next: SceneState) {
    if (this.disposed) return;
    const themeChanged = next.theme !== this.state.theme;
    this.state = next;
    if (themeChanged) this.applyTheme();
    this.applyPresence();
    this.retarget();
    this.wake();
  }

  pressAsk() {
    this.press = 1;
    this.wake();
  }

  project(key: DeskObjectKey): ScreenPoint {
    const group = this.props.get(key);
    if (!group) return { x: 0, y: 0, visible: false };
    this.scratch.copy(group.position);
    this.scratch.y += LABEL_HEIGHT[key];
    if (key === 'laptop') this.scratch.z += 0.12;
    this.scratch.project(this.camera);
    return {
      x: (this.scratch.x * 0.5 + 0.5) * this.width,
      y: (-this.scratch.y * 0.5 + 0.5) * this.height,
      visible: this.scratch.z < 1 && Math.abs(this.scratch.x) < 1 && Math.abs(this.scratch.y) < 1,
    };
  }

  isWide() {
    return this.variant === 'wide';
  }

  screenQuad(): number[] | null {
    const halfWidth = SCREEN_SIZE.width / 2;
    const halfHeight = SCREEN_SIZE.height / 2;
    const corners = [
      [-halfWidth, halfHeight],
      [halfWidth, halfHeight],
      [halfWidth, -halfHeight],
      [-halfWidth, -halfHeight],
    ];
    const quad: number[] = [];
    for (const [x, z] of corners) {
      this.scratch.set(x ?? 0, 0, z ?? 0);
      this.laptop.screen.localToWorld(this.scratch);
      this.scratch.project(this.camera);
      if (this.scratch.z > 1) return null;
      quad.push(
        (this.scratch.x * 0.5 + 0.5) * this.width,
        (-this.scratch.y * 0.5 + 0.5) * this.height,
      );
    }
    return quad;
  }

  screenRest(): ScreenRect {
    const pose = poseFor('screen', this.variant, this.width / this.height);
    const probe = this.camera.clone();
    probe.position.copy(pose.position);
    probe.lookAt(pose.target);
    probe.updateMatrixWorld();
    const { center, up } = screenPose(placementOf(this.variant, 'laptop').position);
    const corner = (x: number, y: number) => {
      const point = center.clone().addScaledVector(up, y);
      point.x += x;
      point.project(probe);
      return [(point.x * 0.5 + 0.5) * this.width, (-point.y * 0.5 + 0.5) * this.height] as const;
    };
    const [left, top] = corner(-SCREEN_SIZE.width / 2, SCREEN_SIZE.height / 2);
    const [right, bottom] = corner(SCREEN_SIZE.width / 2, -SCREEN_SIZE.height / 2);
    return { left, top, width: right - left, height: bottom - top };
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    const { canvas } = this.options;
    canvas.removeEventListener('pointermove', this.onPointerMove);
    canvas.removeEventListener('pointerleave', this.onPointerLeave);
    canvas.removeEventListener('click', this.onClick);
    canvas.style.cursor = '';
    this.renderer.setAnimationLoop(null);
    this.scene.traverse((node) => {
      const mesh = node as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.geometry.dispose();
      const list = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const material of list) {
        for (const value of Object.values(material)) {
          if (value instanceof THREE.Texture) value.dispose();
        }
        material.dispose();
      }
    });
    this.environment.dispose();
    this.renderer.dispose();
  }

  private readonly wake = () => {
    if (this.disposed) return;
    this.awakeUntil = performance.now() + 4000;
    if (this.running) return;
    this.running = true;
    this.last = 0;
    this.renderer.setAnimationLoop(this.tick);
  };

  private setPointer(event: PointerEvent | MouseEvent) {
    const box = this.options.canvas.getBoundingClientRect();
    this.pointer.set(
      ((event.clientX - box.left) / box.width) * 2 - 1,
      -((event.clientY - box.top) / box.height) * 2 + 1,
    );
  }

  private readonly onPointerMove = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return;
    this.setPointer(event);
    this.pointerInside = true;
    this.pointerDirty = true;
    this.wake();
  };

  private readonly onPointerLeave = () => {
    this.pointerInside = false;
    this.pointerDirty = true;
    this.wake();
  };

  private readonly onClick = (event: MouseEvent) => {
    this.setPointer(event);
    if (this.state.view === 'screen' || this.state.focus) {
      this.options.onDismiss();
      return;
    }
    const key = this.pick();
    if (key) this.options.onSelect(key);
  };

  private pick(): DeskObjectKey | null {
    if (this.state.view === 'screen' || this.state.focus) return null;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObjects(this.pickables, true);
    for (const hit of hits) {
      let node: THREE.Object3D | null = hit.object;
      while (node) {
        const key = node.userData.deskKey as DeskObjectKey | undefined;
        if (key) return key;
        node = node.parent;
      }
    }
    return null;
  }

  private readonly tick = (time: number) => {
    const dt = this.last ? Math.min((time - this.last) / 1000, 0.25) : 1 / 60;
    this.last = time;
    const { view, still, focus } = this.state;
    const browsing = !focus && (view === 'top' || view === 'desk');

    const lidGoal = this.state.lid ? 1 : 0;
    if (still) {
      this.lidAngle = lidGoal;
      this.lidVelocity = 0;
    } else {
      const stiffness = lidGoal ? 62 : 90;
      const damping = lidGoal ? 9.5 : 19;
      const steps = Math.max(1, Math.ceil(dt * 120));
      const step = dt / steps;
      for (let i = 0; i < steps; i++) {
        const force = stiffness * (lidGoal - this.lidAngle) - damping * this.lidVelocity;
        this.lidVelocity += force * step;
        this.lidAngle += this.lidVelocity * step;
        if (this.lidAngle < 0) {
          this.lidAngle = 0;
          this.lidVelocity = 0;
        }
      }
    }
    const coverGoal = this.state.covered ? 1 : 0;
    this.cover = still
      ? coverGoal
      : this.cover + (coverGoal - this.cover) * (1 - Math.exp(-dt * 9));
    this.laptop.setOpen(this.lidAngle, 1 - this.cover);

    const ease = still ? 1 : 1 - Math.exp(-dt * (view === 'screen' ? 2.7 : 3.4));
    this.position.lerp(this.goal.position, ease);
    this.target.lerp(this.goal.target, ease);

    const swayX = browsing && this.pointerInside && !still ? this.pointer.x * 0.02 : 0;
    const swayY = browsing && this.pointerInside && !still ? this.pointer.y * 0.012 : 0;
    const drift = 1 - Math.exp(-dt * 4);
    this.sway.x += (swayX - this.sway.x) * drift;
    this.sway.y += (swayY - this.sway.y) * drift;

    this.camera.position.copy(this.position);
    this.camera.lookAt(this.target);
    this.camera.translateX(this.sway.x);
    this.camera.translateY(this.sway.y);
    this.camera.lookAt(this.target);

    if (this.pointerDirty) {
      this.pointerDirty = false;
      const key = this.pointerInside && browsing ? this.pick() : null;
      if (key !== this.pointerHover) {
        this.pointerHover = key;
        this.options.canvas.style.cursor = key ? 'pointer' : '';
        this.options.onHover(key);
      }
    }

    const hovered = browsing ? (this.state.hover ?? this.pointerHover) : null;
    let moving = false;
    for (const [key, value] of this.lifts) {
      const goal = hovered === key ? 1 : 0;
      const next = still ? goal : value + (goal - value) * (1 - Math.exp(-dt * 9));
      if (Math.abs(next - goal) > 0.002) moving = true;
      this.lifts.set(key, next);
      const group = this.props.get(key);
      if (group) group.position.y = (this.baseY.get(key) ?? 0) + next * LIFT[key];
    }

    this.press = still ? 0 : this.press * Math.exp(-dt * 7);
    this.askKey.cap.position.y = 0.0105 - this.press * 0.0045;
    this.askKey.light.intensity = still ? 0.06 : 0.055 + Math.sin(time / 620) * 0.03;

    this.renderer.render(this.scene, this.camera);
    this.options.onFrame();

    const settled =
      this.position.distanceToSquared(this.goal.position) < 1e-8 &&
      Math.abs(this.lidAngle - lidGoal) < 1e-4 &&
      Math.abs(this.lidVelocity) < 1e-4 &&
      this.press < 0.002 &&
      Math.abs(this.cover - coverGoal) < 0.002 &&
      !moving;
    if (settled && time > this.awakeUntil) {
      this.running = false;
      this.renderer.setAnimationLoop(null);
    }
  };
}
