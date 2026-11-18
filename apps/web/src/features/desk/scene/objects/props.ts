import * as THREE from 'three';
import { facingUp, slab, solid } from '../geometry';
import type { Materials } from '../materials';
import {
  badgeTexture,
  keycapTexture,
  notebookLabelTexture,
  paperTexture,
  phoneTexture,
} from '../textures';
import type { SceneAssets, SceneFonts, SceneStrings } from '../types';

function printed(texture: THREE.Texture, width: number, depth: number, roughness = 0.8) {
  const mesh = new THREE.Mesh(
    facingUp(width, depth),
    new THREE.MeshStandardMaterial({
      map: texture,
      roughness,
      metalness: 0,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    }),
  );
  mesh.receiveShadow = true;
  return mesh;
}

export interface AskKey {
  group: THREE.Group;
  cap: THREE.Group;
  light: THREE.PointLight;
}

export function createAskKey(materials: Materials, fonts: SceneFonts): AskKey {
  const group = new THREE.Group();

  const plate = solid(new THREE.Mesh(slab(0.064, 0.064, 0.008, 0.011, 0.0012), materials.graphite));
  const well = new THREE.Mesh(facingUp(0.046, 0.046), materials.matte);
  well.position.y = 0.0083;

  const cap = new THREE.Group();
  cap.position.y = 0.0105;

  const frustum = new THREE.CylinderGeometry(0.0262, 0.0318, 0.015, 4, 1).toNonIndexed();
  frustum.rotateY(Math.PI / 4);
  frustum.computeVertexNormals();
  const shell = solid(new THREE.Mesh(frustum, materials.celeste));
  shell.position.y = 0.0075;

  const legend = printed(keycapTexture(fonts), 0.0366, 0.0366, 0.4);
  legend.position.y = 0.0152;
  cap.add(shell, legend);

  const light = new THREE.PointLight(0x7cc4ee, 0.05, 0.22, 2);
  light.position.set(0, 0.02, 0.03);

  group.add(plate, well, cap, light);
  return { group, cap, light };
}

export function createNotebook(materials: Materials, fonts: SceneFonts) {
  const group = new THREE.Group();
  const cover = new THREE.MeshStandardMaterial({ color: 0x17191d, roughness: 0.78 });

  const back = solid(new THREE.Mesh(slab(0.15, 0.21, 0.002, 0.006), cover));
  const pages = solid(new THREE.Mesh(slab(0.146, 0.206, 0.011, 0.004), materials.paper));
  pages.position.y = 0.002;
  const front = solid(new THREE.Mesh(slab(0.15, 0.21, 0.002, 0.006, 0.0006), cover));
  front.position.y = 0.013;

  const band = solid(new THREE.Mesh(new THREE.BoxGeometry(0.007, 0.0006, 0.211), materials.matte));
  band.position.set(0.052, 0.0153, 0);

  const label = printed(notebookLabelTexture(fonts), 0.084, 0.0385);
  label.position.set(-0.012, 0.0153, -0.058);

  const ribbon = new THREE.Mesh(facingUp(0.006, 0.03), materials.celeste);
  ribbon.position.set(-0.01, 0.0006, 0.118);
  ribbon.receiveShadow = true;

  const pen = new THREE.Group();
  const barrel = solid(
    new THREE.Mesh(new THREE.CylinderGeometry(0.0046, 0.0046, 0.118, 16), materials.black),
  );
  const tip = solid(
    new THREE.Mesh(new THREE.CylinderGeometry(0.0046, 0.0012, 0.018, 16), materials.steel),
  );
  tip.position.y = -0.068;
  const collar = solid(
    new THREE.Mesh(new THREE.CylinderGeometry(0.0048, 0.0048, 0.004, 16), materials.steel),
  );
  collar.position.y = -0.04;
  const clip = solid(new THREE.Mesh(new THREE.BoxGeometry(0.002, 0.045, 0.0012), materials.steel));
  clip.position.set(0, 0.034, 0.0052);
  pen.add(barrel, tip, collar, clip);
  pen.rotation.set(Math.PI / 2, 0, -0.62);
  pen.position.set(0.018, 0.0198, 0.03);

  group.add(back, pages, front, band, label, ribbon, pen);
  return group;
}

export function createBadge(
  materials: Materials,
  fonts: SceneFonts,
  strings: SceneStrings,
  assets: SceneAssets,
  onChange: () => void,
) {
  const group = new THREE.Group();

  const card = solid(new THREE.Mesh(slab(0.074, 0.104, 0.0014, 0.005), materials.paper));
  const face = printed(badgeTexture(fonts, strings, assets.photo, onChange), 0.074, 0.104, 0.35);
  face.position.y = 0.0016;

  const clip = solid(new THREE.Mesh(slab(0.016, 0.02, 0.003, 0.003, 0.0006), materials.steel));
  clip.position.set(0, 0.001, -0.059);

  const strap = new THREE.MeshStandardMaterial({ color: 0x7cc4ee, roughness: 0.85 });
  const loop = (points: Array<[number, number]>) => {
    const curve = new THREE.CatmullRomCurve3(
      points.map(([x, z]) => new THREE.Vector3(x, 0.0012, z)),
    );
    const ribbon = solid(new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.0052, 8), strap));
    ribbon.scale.y = 0.16;
    return ribbon;
  };

  group.add(
    card,
    face,
    clip,
    loop([
      [0.002, -0.066],
      [-0.03, -0.12],
      [-0.12, -0.15],
      [-0.26, -0.12],
      [-0.4, -0.16],
    ]),
    loop([
      [-0.002, -0.066],
      [-0.05, -0.09],
      [-0.14, -0.08],
      [-0.27, -0.03],
      [-0.4, -0.06],
    ]),
  );
  return group;
}

export function createPhone(materials: Materials, fonts: SceneFonts, strings: SceneStrings) {
  const group = new THREE.Group();
  const body = solid(new THREE.Mesh(slab(0.072, 0.152, 0.008, 0.011, 0.0016), materials.black));
  const frame = new THREE.Mesh(facingUp(0.07, 0.15), materials.glass);
  frame.position.y = 0.0081;
  const display = phoneTexture(fonts, strings);
  const screen = new THREE.Mesh(
    facingUp(0.065, 0.1375),
    new THREE.MeshStandardMaterial({
      map: display,
      emissiveMap: display,
      emissive: 0xffffff,
      emissiveIntensity: 0.35,
      roughness: 0.12,
      metalness: 0.2,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    }),
  );
  screen.position.y = 0.0083;
  group.add(body, frame, screen);
  return group;
}

export function createSheet(fonts: SceneFonts, strings: SceneStrings) {
  const group = new THREE.Group();
  const blank = new THREE.Mesh(
    facingUp(0.168, 0.2376),
    new THREE.MeshStandardMaterial({ color: 0xe2dfd6, roughness: 0.95 }),
  );
  blank.position.y = 0.0004;
  blank.rotation.y = -0.06;
  blank.castShadow = true;
  blank.receiveShadow = true;
  const sheet = printed(paperTexture(fonts, strings), 0.168, 0.2376, 0.92);
  sheet.position.y = 0.001;
  sheet.castShadow = true;
  group.add(blank, sheet);
  return group;
}

export function createMouse(materials: Materials) {
  const group = new THREE.Group();
  const body = solid(new THREE.Mesh(new THREE.SphereGeometry(1, 40, 24), materials.black));
  body.scale.set(0.031, 0.02, 0.054);
  body.position.y = 0.006;
  const wheel = solid(
    new THREE.Mesh(new THREE.CylinderGeometry(0.0045, 0.0045, 0.006, 20), materials.graphite),
  );
  wheel.rotation.z = Math.PI / 2;
  wheel.position.set(0, 0.0228, -0.024);
  group.add(body, wheel);
  return group;
}

export function createEarbuds(materials: Materials) {
  const group = new THREE.Group();
  const shell = new THREE.MeshStandardMaterial({
    color: 0x0a0a0b,
    metalness: 0,
    roughness: 0.5,
    envMapIntensity: 0.55,
  });

  const base = solid(new THREE.Mesh(slab(0.062, 0.05, 0.016, 0.022, 0.0065), shell));
  const lid = solid(new THREE.Mesh(slab(0.062, 0.05, 0.011, 0.022, 0.005), shell));
  lid.position.y = 0.0166;
  const seam = new THREE.Mesh(slab(0.0605, 0.0485, 0.0008, 0.021), materials.matte);
  seam.position.y = 0.0159;
  const led = new THREE.Mesh(
    new THREE.CircleGeometry(0.0011, 12),
    new THREE.MeshBasicMaterial({ color: 0xf5f5f4, toneMapped: false }),
  );
  led.position.set(0, 0.0095, 0.02505);

  const bud = new THREE.Group();
  const head = solid(new THREE.Mesh(new THREE.SphereGeometry(0.0086, 24, 16), shell));
  head.scale.set(1, 0.8, 1.1);
  const stem = solid(new THREE.Mesh(new THREE.CapsuleGeometry(0.0033, 0.02, 6, 12), shell));
  stem.rotation.x = Math.PI / 2;
  stem.position.set(0, -0.0018, 0.015);
  const mesh = new THREE.Mesh(new THREE.CircleGeometry(0.0036, 16), materials.matte);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 0.0071;
  bud.add(head, stem, mesh);
  bud.position.set(0.056, 0.0069, 0.012);
  bud.rotation.y = -0.7;

  group.add(base, lid, seam, led, bud);
  return group;
}
