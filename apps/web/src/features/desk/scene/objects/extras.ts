import * as THREE from 'three';
import { facingUp, slab, solid } from '../geometry';
import type { Materials } from '../materials';
import { photoTexture, titleTexture } from '../textures';
import type { SceneFonts } from '../types';

interface BookSpec {
  title: string;
  cover: number;
  ink: string;
  width: number;
  depth: number;
  height: number;
  turn: number;
  shift: [number, number];
}

const BOOKS: BookSpec[] = [
  {
    title: 'TypeScript',
    cover: 0x26303c,
    ink: '#f5f5f4',
    width: 0.162,
    depth: 0.116,
    height: 0.026,
    turn: 0.04,
    shift: [0, 0],
  },
  {
    title: 'Next.js',
    cover: 0x111113,
    ink: '#f5f5f4',
    width: 0.154,
    depth: 0.11,
    height: 0.022,
    turn: -0.07,
    shift: [0.004, -0.002],
  },
  {
    title: 'React',
    cover: 0x7cc4ee,
    ink: '#08222f',
    width: 0.148,
    depth: 0.108,
    height: 0.024,
    turn: 0.05,
    shift: [-0.003, 0.002],
  },
  {
    title: 'Tailwind CSS',
    cover: 0xe6e2d8,
    ink: '#141414',
    width: 0.14,
    depth: 0.102,
    height: 0.019,
    turn: -0.04,
    shift: [0.002, -0.001],
  },
];

function book(spec: BookSpec, materials: Materials, fonts: SceneFonts, top: boolean) {
  const group = new THREE.Group();
  const cover = new THREE.MeshStandardMaterial({ color: spec.cover, roughness: 0.72 });
  const { width, depth, height } = spec;

  const back = solid(new THREE.Mesh(slab(width, depth, 0.002, 0.003), cover));
  const front = solid(new THREE.Mesh(slab(width, depth, 0.002, 0.003, 0.0005), cover));
  front.position.y = height - 0.002;
  const spine = solid(new THREE.Mesh(new THREE.BoxGeometry(width, height, 0.003), cover));
  spine.position.set(0, height / 2, depth / 2 - 0.0015);
  const pages = solid(
    new THREE.Mesh(
      new THREE.BoxGeometry(width - 0.008, height - 0.004, depth - 0.006),
      materials.paper,
    ),
  );
  pages.position.set(0, height / 2, -0.0015);

  const label = new THREE.Mesh(
    new THREE.PlaneGeometry(width * 0.88, height * 0.72),
    new THREE.MeshStandardMaterial({
      map: titleTexture(spec.title, fonts, spec.ink, 640, 96, 54),
      transparent: true,
      roughness: 0.7,
    }),
  );
  label.position.set(0, height / 2, depth / 2 + 0.0003);
  group.add(back, front, spine, pages, label);

  if (top) {
    const face = new THREE.Mesh(
      facingUp(width * 0.8, depth * 0.36),
      new THREE.MeshStandardMaterial({
        map: titleTexture(spec.title, fonts, spec.ink, 640, 200, 96),
        transparent: true,
        roughness: 0.7,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2,
      }),
    );
    face.position.set(0, height + 0.0003, -depth * 0.12);
    group.add(face);
  }

  return group;
}

export function createBooks(materials: Materials, fonts: SceneFonts) {
  const group = new THREE.Group();
  let y = 0;
  BOOKS.forEach((spec, index) => {
    const item = book(spec, materials, fonts, index === BOOKS.length - 1);
    item.position.set(spec.shift[0], y, spec.shift[1]);
    item.rotation.y = spec.turn;
    group.add(item);
    y += spec.height;
  });
  group.scale.setScalar(0.82);
  return group;
}

const FAN: Array<[x: number, z: number, turn: number]> = [
  [-0.034, 0.006, 0.34],
  [0.002, -0.012, -0.12],
  [0.036, 0.008, 0.2],
  [0.01, 0.042, -0.3],
];

export function createPhotos(materials: Materials, people: string[], onChange: () => void) {
  const group = new THREE.Group();
  people.slice(0, FAN.length).forEach((url, index) => {
    const [x, z, turn] = FAN[index] ?? [0, 0, 0];
    const card = new THREE.Group();
    const paper = solid(new THREE.Mesh(slab(0.062, 0.075, 0.0006, 0.002), materials.paper));
    const print = new THREE.Mesh(
      facingUp(0.062, 0.075),
      new THREE.MeshStandardMaterial({
        map: photoTexture(url, onChange),
        roughness: 0.45,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2,
      }),
    );
    print.position.y = 0.0007;
    print.receiveShadow = true;
    card.add(paper, print);
    card.position.set(x, index * 0.0009, z);
    card.rotation.y = turn;
    group.add(card);
  });
  return group;
}

const LEVELS = [0x1b2a33, 0x27556f, 0x3d86ad, 0x5eaad3, 0x7cc4ee];
const RISE = [0.0012, 0.002, 0.003, 0.0042, 0.0056];

export function createBoard(materials: Materials) {
  const group = new THREE.Group();
  const columns = 17;
  const rows = 5;
  const pitch = 0.0079;
  const size = 0.0062;

  const base = solid(new THREE.Mesh(slab(0.15, 0.056, 0.006, 0.006, 0.001), materials.graphite));
  const tiles = new THREE.InstancedMesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 }),
    columns * rows,
  );
  const matrix = new THREE.Matrix4();
  const position = new THREE.Vector3();
  const scale = new THREE.Vector3();
  const rotation = new THREE.Quaternion();
  const color = new THREE.Color();
  let seed = 29;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  let index = 0;
  for (let column = 0; column < columns; column++) {
    for (let row = 0; row < rows; row++) {
      const level = Math.min(LEVELS.length - 1, Math.floor(rand() ** 1.7 * LEVELS.length));
      const rise = RISE[level] ?? RISE[0]!;
      position.set(
        (column - (columns - 1) / 2) * pitch,
        0.006 + rise / 2,
        (row - (rows - 1) / 2) * pitch,
      );
      scale.set(size, rise, size);
      matrix.compose(position, rotation, scale);
      tiles.setMatrixAt(index, matrix);
      tiles.setColorAt(index, color.setHex(LEVELS[level] ?? LEVELS[0]!));
      index += 1;
    }
  }
  tiles.instanceMatrix.needsUpdate = true;
  if (tiles.instanceColor) tiles.instanceColor.needsUpdate = true;
  tiles.castShadow = true;
  tiles.receiveShadow = true;

  group.add(base, tiles);
  return group;
}
