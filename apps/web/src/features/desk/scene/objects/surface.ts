import * as THREE from 'three';
import { facingUp, slab } from '../geometry';
import type { Materials } from '../materials';
import { debossTexture, fabricTexture, woodTexture } from '../textures';

export interface Surface {
  group: THREE.Group;
  setPad: (width: number, depth: number, x: number, z: number) => void;
}

export function createSurface(materials: Materials): Surface {
  const group = new THREE.Group();

  const wood = new THREE.Mesh(
    new THREE.PlaneGeometry(3.2, 2.2),
    new THREE.MeshStandardMaterial({ map: woodTexture(), roughness: 0.62, metalness: 0 }),
  );
  wood.rotation.x = -Math.PI / 2;
  wood.position.set(0, 0, 0.3);
  wood.receiveShadow = true;

  const wall = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.8), materials.wall);
  wall.position.set(0, 0.9, -0.8);
  wall.receiveShadow = true;

  const fabric = fabricTexture();
  const padMaterial = new THREE.MeshStandardMaterial({
    map: fabric,
    bumpMap: fabric,
    bumpScale: 0.6,
    roughness: 0.94,
    metalness: 0,
  });
  const pad = new THREE.Mesh(slab(1, 1, 0.0035, 0.02, 0.0008), padMaterial);
  pad.receiveShadow = true;
  pad.castShadow = true;

  fabric.repeat.set(15, 15);

  const higo = new THREE.Mesh(
    facingUp(0.03, 0.03),
    new THREE.MeshStandardMaterial({
      map: debossTexture(),
      transparent: true,
      depthWrite: false,
      roughness: 0.96,
      metalness: 0,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    }),
  );
  higo.receiveShadow = true;

  const setPad = (width: number, depth: number, x: number, z: number) => {
    pad.geometry.dispose();
    pad.geometry = slab(width, depth, 0.0035, 0.02, 0.0008);
    pad.position.set(x, 0, z);
    higo.position.set(x - width / 2 + width * 0.35, 0.0036, z + depth / 2 - 0.028);
  };

  group.add(wood, wall, pad, higo);
  return { group, setPad };
}
