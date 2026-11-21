import * as THREE from 'three';

export function createMaterials() {
  return {
    aluminum: new THREE.MeshStandardMaterial({ color: 0xd2d5d9, metalness: 1, roughness: 0.42 }),
    graphite: new THREE.MeshStandardMaterial({ color: 0x232426, metalness: 0.35, roughness: 0.55 }),
    steel: new THREE.MeshStandardMaterial({ color: 0xe9ebed, metalness: 1, roughness: 0.16 }),
    black: new THREE.MeshStandardMaterial({ color: 0x0b0b0c, metalness: 0.15, roughness: 0.5 }),
    matte: new THREE.MeshStandardMaterial({ color: 0x0f0f10, metalness: 0, roughness: 0.92 }),
    key: new THREE.MeshStandardMaterial({ color: 0x1c1d1f, metalness: 0.1, roughness: 0.62 }),
    glass: new THREE.MeshStandardMaterial({ color: 0x050506, metalness: 0.6, roughness: 0.12 }),
    leather: new THREE.MeshStandardMaterial({ color: 0x5c3b27, metalness: 0, roughness: 0.74 }),
    paper: new THREE.MeshStandardMaterial({ color: 0xe6e2d8, metalness: 0, roughness: 0.92 }),
    brand: new THREE.MeshStandardMaterial({ color: 0xf8894b, metalness: 0, roughness: 0.42 }),
    wall: new THREE.MeshStandardMaterial({ color: 0x6f7074, metalness: 0, roughness: 0.95 }),
  };
}

export type Materials = ReturnType<typeof createMaterials>;
