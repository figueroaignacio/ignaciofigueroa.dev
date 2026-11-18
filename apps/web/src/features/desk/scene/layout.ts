import * as THREE from 'three';
import { SCREEN_SIZE, screenPose } from './objects/laptop';
import type { DeskObjectKey, DeskVariant, DeskView } from './types';

export type PropKey = DeskObjectKey | 'mouse' | 'earbuds';

type Placement = [x: number, z: number, turn: number];

interface Layout {
  pad: { width: number; depth: number; x: number; z: number };
  frame: { width: number; depth: number; x: number; z: number };
  objects: Record<PropKey, Placement>;
}

export const PAD_HEIGHT = 0.0035;

export const LAYOUTS: Record<DeskVariant, Layout> = {
  wide: {
    pad: { width: 1.02, depth: 0.56, x: 0, z: 0.02 },
    frame: { width: 1.16, depth: 0.78, x: 0, z: -0.01 },
    objects: {
      laptop: [0.02, -0.02, 0],
      ask: [-0.185, 0.13, 0.07],
      mate: [0.3, -0.14, 0],
      thermos: [0.425, -0.165, 0.5],
      badge: [-0.41, 0.175, -0.09],
      notebook: [-0.33, -0.035, 0.12],
      phone: [0.31, 0.145, -0.17],
      sheet: [0.165, 0.3, 0.07],
      mouse: [0.245, 0.02, -0.1],
      earbuds: [0.43, 0.035, 0.3],
    },
  },
  tall: {
    pad: { width: 0.54, depth: 0.92, x: 0, z: 0.03 },
    frame: { width: 0.6, depth: 1.04, x: 0, z: 0.04 },
    objects: {
      laptop: [0, 0, 0],
      ask: [-0.165, 0.2, 0.07],
      mate: [0.14, -0.3, 0],
      thermos: [0.2, -0.4, 0.5],
      badge: [-0.14, 0.37, -0.09],
      notebook: [-0.145, -0.31, 0.12],
      phone: [0.175, 0.3, -0.17],
      sheet: [0.03, 0.41, 0.07],
      mouse: [0.17, 0.17, -0.1],
      earbuds: [-0.02, -0.235, 0.3],
    },
  },
};

export const LABEL_HEIGHT: Record<DeskObjectKey, number> = {
  laptop: 0.03,
  ask: 0.045,
  mate: 0.14,
  thermos: 0.31,
  badge: 0.03,
  notebook: 0.04,
  phone: 0.03,
  sheet: 0.02,
};

export interface Pose {
  position: THREE.Vector3;
  target: THREE.Vector3;
}

const FOV = { wide: 32, tall: 44 } as const;

export function fovFor(variant: DeskVariant) {
  return FOV[variant];
}

function fit(width: number, height: number, fov: number, aspect: number) {
  const half = Math.tan(THREE.MathUtils.degToRad(fov) / 2);
  return Math.max(height / (2 * half), width / (2 * half * aspect));
}

export function placementOf(variant: DeskVariant, key: PropKey) {
  const [x, z, turn] = LAYOUTS[variant].objects[key];
  const { pad } = LAYOUTS[variant];
  const onPad = Math.abs(x - pad.x) < pad.width / 2 && Math.abs(z - pad.z) < pad.depth / 2;
  return { position: new THREE.Vector3(x, onPad ? PAD_HEIGHT : 0, z), turn };
}

export function poseFor(
  view: DeskView,
  variant: DeskVariant,
  aspect: number,
  focus: DeskObjectKey | null,
): Pose {
  const layout = LAYOUTS[variant];
  const fov = FOV[variant];
  const laptop = placementOf(variant, 'laptop').position;

  if (view === 'top') {
    const target = new THREE.Vector3(laptop.x, 0.01, laptop.z);
    const distance = fit(0.6, 0.42, fov, aspect);
    const direction = new THREE.Vector3(0, 1, 0.07).normalize();
    return { target, position: target.clone().addScaledVector(direction, distance) };
  }

  if (view === 'screen') {
    const { center, normal } = screenPose(laptop);
    const distance = fit(SCREEN_SIZE.width / 0.86, SCREEN_SIZE.height / 0.8, fov, aspect);
    return { target: center, position: center.clone().addScaledVector(normal, distance) };
  }

  if (view === 'focus' && focus) {
    const target = placementOf(variant, focus).position.clone();
    target.y = 0.03;
    const direction = new THREE.Vector3(0, 1, 0.6).normalize();
    const distance = variant === 'tall' ? 0.78 : 0.58;
    return { target, position: target.clone().addScaledVector(direction, distance) };
  }

  const target = new THREE.Vector3(layout.frame.x, 0.02, layout.frame.z);
  const direction = new THREE.Vector3(0, 1, 0.46).normalize();
  const distance = fit(layout.frame.width, layout.frame.depth * 0.93, fov, aspect);
  return { target, position: target.clone().addScaledVector(direction, distance) };
}
