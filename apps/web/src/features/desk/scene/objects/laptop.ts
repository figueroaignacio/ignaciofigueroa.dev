import * as THREE from 'three';
import { facingDown, facingUp, slab, solid } from '../geometry';
import type { Materials } from '../materials';
import { codeTexture, stickerTexture, tagTexture } from '../textures';
import type { SceneAssets, SceneFonts, SceneStrings } from '../types';

const WIDTH = 0.32;
const DEPTH = 0.215;
const BASE = 0.011;
const LID = 0.0055;
const HINGE_Z = -DEPTH / 2 + 0.003;
const LID_DEPTH = DEPTH - 0.003;
const SCREEN_OFFSET = LID_DEPTH / 2 + 0.002;

export const LID_OPEN = THREE.MathUtils.degToRad(104);
export const SCREEN_SIZE = { width: 0.298, height: 0.186 };

const KEY_ROWS = [
  [...Array<number>(13).fill(28), 36],
  [36, ...Array<number>(13).fill(28)],
  [46, ...Array<number>(11).fill(28), 50],
  [60, ...Array<number>(10).fill(28), 68],
  [28, 28, 28, 34, 172, 34, 28, 72],
];

export interface Laptop {
  group: THREE.Group;
  screen: THREE.Mesh;
  setOpen: (amount: number) => void;
}

export function screenPose(position: THREE.Vector3) {
  const hinge = new THREE.Vector3(position.x, position.y + BASE + 0.0006, position.z + HINGE_Z);
  const along = new THREE.Vector3(0, Math.sin(LID_OPEN), Math.cos(LID_OPEN));
  const center = hinge.clone().addScaledVector(along, SCREEN_OFFSET);
  const normal = new THREE.Vector3(0, -Math.cos(LID_OPEN), Math.sin(LID_OPEN));
  return { center, normal, up: along };
}

function decal(texture: THREE.Texture, width: number, depth: number) {
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    transparent: true,
    roughness: 0.55,
    metalness: 0,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });
  const mesh = new THREE.Mesh(facingUp(width, depth), material);
  mesh.receiveShadow = true;
  return mesh;
}

function keyboard(materials: Materials) {
  const unit = 0.278 / 452;
  const count = KEY_ROWS.reduce((total, row) => total + row.length, 0);
  const keys = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), materials.key, count);
  const matrix = new THREE.Matrix4();
  const position = new THREE.Vector3();
  const scale = new THREE.Vector3();
  const rotation = new THREE.Quaternion();
  const centerZ = -0.03;
  let index = 0;
  KEY_ROWS.forEach((row, r) => {
    let cursor = -226 * unit;
    const z = centerZ + (r * 28 + 12 - 68) * unit;
    for (const width of row) {
      position.set(cursor + (width * unit) / 2, BASE + 0.0011, z);
      scale.set(width * unit, 0.0018, 24 * unit);
      matrix.compose(position, rotation, scale);
      keys.setMatrixAt(index, matrix);
      cursor += (width + 4) * unit;
      index += 1;
    }
  });
  keys.instanceMatrix.needsUpdate = true;
  keys.castShadow = false;
  keys.receiveShadow = true;
  const well = new THREE.Mesh(facingUp(468 * unit, 152 * unit), materials.matte);
  well.position.set(0, BASE + 0.0002, centerZ);
  well.receiveShadow = true;
  return { well, keys };
}

export function createLaptop(
  materials: Materials,
  fonts: SceneFonts,
  strings: SceneStrings,
  assets: SceneAssets,
  onChange: () => void,
): Laptop {
  const group = new THREE.Group();

  const base = solid(new THREE.Mesh(slab(WIDTH, DEPTH, BASE, 0.014, 0.0016), materials.aluminum));
  const { well, keys } = keyboard(materials);
  group.add(base, well, keys);

  const trackpad = new THREE.Mesh(
    facingUp(0.112, 0.072),
    new THREE.MeshStandardMaterial({ color: 0xc4c7cc, metalness: 1, roughness: 0.27 }),
  );
  trackpad.position.set(0, BASE + 0.0003, 0.058);
  trackpad.receiveShadow = true;
  group.add(trackpad);

  const hinge = solid(
    new THREE.Mesh(new THREE.CylinderGeometry(0.0042, 0.0042, 0.25, 16), materials.graphite),
  );
  hinge.rotation.z = Math.PI / 2;
  hinge.position.set(0, BASE + 0.0012, HINGE_Z + 0.001);
  group.add(hinge);

  const lid = new THREE.Group();
  lid.position.set(0, BASE + 0.0006, HINGE_Z);
  group.add(lid);

  const shellGeometry = slab(WIDTH, LID_DEPTH, LID, 0.014, 0.0012);
  shellGeometry.translate(0, 0, LID_DEPTH / 2);
  lid.add(solid(new THREE.Mesh(shellGeometry, materials.aluminum)));

  const bezel = new THREE.Mesh(
    facingDown(WIDTH - 0.008, LID_DEPTH - 0.006),
    new THREE.MeshStandardMaterial({
      color: 0x050506,
      metalness: 0.2,
      roughness: 0.4,
      envMapIntensity: 0.25,
    }),
  );
  bezel.position.set(0, -0.0004, LID_DEPTH / 2);
  lid.add(bezel);

  const display = new THREE.MeshBasicMaterial({ map: codeTexture(fonts), toneMapped: false });
  display.color.setScalar(0);
  const screen = new THREE.Mesh(facingDown(SCREEN_SIZE.width, SCREEN_SIZE.height), display);
  screen.position.set(0, -0.0008, SCREEN_OFFSET);
  lid.add(screen);

  const glow = new THREE.PointLight(0x7cc4ee, 0, 0.7, 2);
  glow.position.set(0, -0.05, SCREEN_OFFSET);
  lid.add(glow);

  const top = LID + 0.0003;
  const react = decal(
    stickerTexture(assets.react, { background: '#20232a', shape: 'disc', inset: 0.2 }, onChange),
    0.052,
    0.052,
  );
  react.position.set(-0.108, top, 0.046);
  react.rotation.y = 0.16;

  const claude = decal(
    stickerTexture(assets.claude, { background: '#1f1e1d', shape: 'tile', inset: 0.22 }, onChange),
    0.05,
    0.05,
  );
  claude.position.set(0.104, top, 0.044);
  claude.rotation.y = -0.12;

  const linux = decal(
    stickerTexture(assets.linux, { background: '#f6f6f3', shape: 'disc', inset: 0.14 }, onChange),
    0.054,
    0.054,
  );
  linux.position.set(-0.094, top, 0.152);
  linux.rotation.y = -0.1;

  const pill = decal(
    tagTexture('nachui', fonts, {
      background: '#f6f6f3',
      color: '#141414',
      radius: 48,
      width: 320,
      height: 100,
      size: 46,
    }),
    0.07,
    0.022,
  );
  pill.position.set(-0.006, top, 0.092);
  pill.rotation.y = 0.07;

  const tag = decal(
    tagTexture(strings.openTag, fonts, {
      background: '#7cc4ee',
      color: '#08222f',
      radius: 6,
      width: 512,
      height: 132,
      size: 40,
      pointer: true,
    }),
    0.118,
    0.0305,
  );
  tag.position.set(0.07, top, 0.168);
  tag.rotation.y = 0.1;

  lid.add(react, claude, linux, pill, tag);

  const setOpen = (amount: number) => {
    lid.rotation.x = -amount * LID_OPEN;
    keys.visible = amount > 0.02;
    const lit = THREE.MathUtils.smoothstep(amount, 0.45, 0.95);
    display.color.setScalar(lit);
    glow.intensity = lit * 0.22;
  };

  return { group, screen, setOpen };
}
