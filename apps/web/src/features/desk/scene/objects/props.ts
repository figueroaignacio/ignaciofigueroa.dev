import * as THREE from 'three';
import { facingUp, slab, solid } from '../geometry';
import type { Materials } from '../materials';
import {
  badgeTexture,
  folderLabelTexture,
  kraftTexture,
  keycapTexture,
  notebookLabelTexture,
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

  const plate = solid(new THREE.Mesh(slab(0.064, 0.064, 0.008, 0.013, 0.0012), materials.matte));
  const well = new THREE.Mesh(facingUp(0.05, 0.05), materials.black);
  well.position.y = 0.0083;

  const cap = new THREE.Group();
  cap.position.y = 0.0105;

  const shell = solid(
    new THREE.Mesh(
      slab(0.047, 0.047, 0.0145, 0.0095, 0.0042),
      new THREE.MeshStandardMaterial({
        color: 0xf8894b,
        emissive: 0xf8894b,
        emissiveIntensity: 0.16,
        roughness: 0.38,
      }),
    ),
  );

  const legend = new THREE.Mesh(
    facingUp(0.036, 0.036),
    new THREE.MeshStandardMaterial({
      map: keycapTexture(fonts),
      transparent: true,
      roughness: 0.4,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    }),
  );
  legend.position.y = 0.0147;
  cap.add(shell, legend);

  const light = new THREE.PointLight(0xf8894b, 0.09, 0.26, 2);
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

  const ribbon = new THREE.Mesh(facingUp(0.006, 0.03), materials.brand);
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

  const strap = new THREE.MeshStandardMaterial({ color: 0xf8894b, roughness: 0.85 });
  const ribbon = (turn: number, tone: number) => {
    const geometry = new THREE.BoxGeometry(0.26, 0.0009, 0.0125);
    geometry.translate(-0.13, 0, 0);
    const material = strap.clone();
    material.color.multiplyScalar(tone);
    const mesh = solid(new THREE.Mesh(geometry, material));
    mesh.position.set(0, 0.0014, -0.062);
    mesh.rotation.y = turn;
    return mesh;
  };

  group.add(card, face, clip, ribbon(-0.3, 1), ribbon(-0.1, 0.82));
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
      emissiveIntensity: 0.8,
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

export function createFolder(fonts: SceneFonts, strings: SceneStrings) {
  const group = new THREE.Group();
  const kraft = new THREE.MeshStandardMaterial({ map: kraftTexture(11), roughness: 0.92 });
  const cover = new THREE.MeshStandardMaterial({
    map: kraftTexture(23),
    color: 0xfff4e2,
    roughness: 0.9,
  });
  const back = solid(new THREE.Mesh(slab(0.19, 0.25, 0.0012, 0.006), kraft));
  const tab = solid(new THREE.Mesh(slab(0.07, 0.03, 0.0012, 0.006), kraft));
  tab.position.set(0.045, 0, -0.128);
  const paper = solid(
    new THREE.Mesh(
      slab(0.176, 0.236, 0.0008, 0.002),
      new THREE.MeshStandardMaterial({ color: 0xf4f2ec, roughness: 0.95 }),
    ),
  );
  paper.position.set(0.004, 0.0012, -0.006);
  paper.rotation.y = -0.025;
  const front = solid(new THREE.Mesh(slab(0.19, 0.236, 0.0012, 0.006), cover));
  front.position.set(0, 0.0021, 0.007);
  const label = printed(folderLabelTexture(fonts, strings), 0.104, 0.035, 0.85);
  label.position.set(-0.034, 0.0034, -0.068);
  group.add(back, tab, paper, front, label);
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
