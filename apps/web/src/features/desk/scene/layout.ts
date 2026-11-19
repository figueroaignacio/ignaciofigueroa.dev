import * as THREE from 'three';
import { SCREEN_SIZE, screenPose } from './objects/laptop';
import type { DeskObjectKey, DeskVariant, DeskView } from './types';

const SCREEN_RAISE = 0.04;

export type PropKey = DeskObjectKey | 'mouse' | 'earbuds';

type Placement = [x: number, z: number, turn: number];

interface Layout {
  pad: { width: number; depth: number; x: number; z: number };
  frame: { width: number; depth: number; x: number; z: number };
  objects: Record<PropKey, Placement>;
  hidden: PropKey[];
}

export const PAD_HEIGHT = 0.0035;

export const LAYOUTS: Record<DeskVariant, Layout> = {
  wide: {
    pad: { width: 0.7, depth: 0.43, x: 0, z: 0 },
    frame: { width: 0.93, depth: 0.58, x: 0, z: 0.022 },
    objects: {
      laptop: [0.074, 0, 0],
      ask: [-0.125, 0.06, 0.07],
      mate: [0.289, -0.117, 0],
      thermos: [0.352, -0.196, 0.5],
      badge: [-0.368, 0.173, -0.087],
      notebook: [-0.244, -0.002, 0.122],
      phone: [0.286, 0.134, -0.17],
      sheet: [0.185, 0.208, 0.1],
      mouse: [0.2835, 0.015, -0.1],
      earbuds: [0.385, 0.03, 0.3],
      books: [0.393, 0.145, -0.14],
      photos: [-0.218, 0.157, 0],
      board: [0.028, 0.154, 0.035],
    },
    hidden: [],
  },
  tall: {
    pad: { width: 0.54, depth: 0.92, x: 0, z: 0.03 },
    frame: { width: 0.6, depth: 1.04, x: 0, z: -0.005 },
    objects: {
      laptop: [0, 0, 0],
      ask: [-0.19, 0.2, 0.07],
      mate: [0.16, -0.27, 0],
      thermos: [0.21, -0.39, 0.5],
      badge: [-0.18, 0.38, -0.09],
      notebook: [-0.185, -0.3, 0.12],
      phone: [0.19, 0.22, -0.17],
      sheet: [0.13, 0.42, 0.07],
      mouse: [0.17, 0.17, -0.1],
      earbuds: [-0.02, -0.235, 0.3],
      books: [0, -0.37, 0.12],
      photos: [-0.04, 0.3, 0],
      board: [0, 0.165, 0.04],
    },
    hidden: ['mouse', 'earbuds'],
  },
};

export const SCALE: Record<PropKey, number> = {
  laptop: 1,
  ask: 0.82,
  mate: 0.87,
  thermos: 0.78,
  badge: 1.22,
  notebook: 0.88,
  phone: 0.9,
  sheet: 0.6,
  mouse: 0.62,
  earbuds: 0.8,
  books: 0.7,
  photos: 0.62,
  board: 0.62,
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
  books: 0.12,
  photos: 0.02,
  board: 0.03,
};

export interface Pose {
  position: THREE.Vector3;
  target: THREE.Vector3;
}

const FOV = { wide: 26, tall: 44 } as const;

export function fovFor(variant: DeskVariant) {
  return FOV[variant];
}

function fit(width: number, height: number, fov: number, aspect: number) {
  const half = Math.tan(THREE.MathUtils.degToRad(fov) / 2);
  return Math.max(height / (2 * half), width / (2 * half * aspect));
}

export function placementOf(variant: DeskVariant, key: PropKey) {
  const [x, z, turn] = LAYOUTS[variant].objects[key];
  return { position: new THREE.Vector3(x, PAD_HEIGHT, z), turn };
}

export function focusPoseFor(point: THREE.Vector3, variant: DeskVariant, aspect: number): Pose {
  const fov = FOV[variant];
  const target = new THREE.Vector3(point.x, PAD_HEIGHT + 0.01, point.z);
  const direction = new THREE.Vector3(0, 1, 0.22).normalize();
  const distance = fit(0.3, 0.22, fov, aspect);
  return { target, position: target.clone().addScaledVector(direction, distance) };
}

export function poseFor(view: DeskView, variant: DeskVariant, aspect: number): Pose {
  const layout = LAYOUTS[variant];
  const fov = FOV[variant];
  const laptop = placementOf(variant, 'laptop').position;

  if (view === 'top') {
    const target = new THREE.Vector3(layout.frame.x, 0.01, layout.frame.z);
    const distance = fit(layout.frame.width, layout.frame.depth, fov, aspect);
    const direction = new THREE.Vector3(0, 1, 0.05).normalize();
    return { target, position: target.clone().addScaledVector(direction, distance) };
  }

  if (view === 'screen') {
    const { center, normal, up } = screenPose(laptop);
    const distance = fit(SCREEN_SIZE.width / 0.86, SCREEN_SIZE.height / 0.8, fov, aspect);
    const visible = 2 * distance * Math.tan(THREE.MathUtils.degToRad(fov) / 2);
    const target = center.clone().addScaledVector(up, -SCREEN_RAISE * visible);
    return { target, position: target.clone().addScaledVector(normal, distance) };
  }

  const target = new THREE.Vector3(layout.frame.x, 0.02, layout.frame.z);
  const direction = new THREE.Vector3(0, 1, 0.29).normalize();
  const distance = fit(layout.frame.width, layout.frame.depth * 0.97, fov, aspect);
  return { target, position: target.clone().addScaledVector(direction, distance) };
}
