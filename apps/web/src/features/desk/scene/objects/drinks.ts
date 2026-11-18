import * as THREE from 'three';
import { lathe, solid } from '../geometry';
import type { Materials } from '../materials';
import { yerbaTexture } from '../textures';

export function createMate(materials: Materials) {
  const group = new THREE.Group();

  const body = solid(
    new THREE.Mesh(
      lathe([
        [0, 0],
        [0.024, 0],
        [0.033, 0.006],
        [0.039, 0.022],
        [0.0425, 0.045],
        [0.0415, 0.066],
        [0.0392, 0.08],
      ]),
      materials.leather,
    ),
  );

  const rim = solid(
    new THREE.Mesh(
      lathe([
        [0.0394, 0.072],
        [0.0416, 0.074],
        [0.0422, 0.09],
        [0.0408, 0.0928],
        [0.0372, 0.0928],
        [0.0366, 0.088],
        [0.0366, 0.07],
      ]),
      materials.steel,
    ),
  );

  const wet = new THREE.Mesh(
    new THREE.CircleGeometry(0.0366, 48),
    new THREE.MeshStandardMaterial({ map: yerbaTexture(false), roughness: 0.55 }),
  );
  wet.rotation.x = -Math.PI / 2;
  wet.position.y = 0.0868;
  wet.receiveShadow = true;

  const mound = solid(
    new THREE.Mesh(
      new THREE.SphereGeometry(0.0245, 40, 24),
      new THREE.MeshStandardMaterial({ map: yerbaTexture(true), roughness: 0.95 }),
    ),
  );
  mound.scale.set(1, 0.62, 1);
  mound.position.set(-0.0105, 0.0868, 0.0052);

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.013, 0.07, -0.011),
    new THREE.Vector3(0.019, 0.1, -0.016),
    new THREE.Vector3(0.036, 0.132, -0.03),
    new THREE.Vector3(0.062, 0.154, -0.05),
  ]);
  const straw = solid(
    new THREE.Mesh(new THREE.TubeGeometry(curve, 28, 0.0027, 12), materials.steel),
  );

  const tip = solid(new THREE.Mesh(new THREE.SphereGeometry(0.0052, 20, 14), materials.steel));
  tip.scale.set(1.5, 0.5, 1);
  tip.position.set(0.066, 0.1565, -0.0532);
  tip.rotation.set(0, 0.66, 0.42);

  const ring = solid(
    new THREE.Mesh(new THREE.TorusGeometry(0.0034, 0.0011, 8, 20), materials.steel),
  );
  ring.position.copy(curve.getPoint(0.55));
  ring.lookAt(curve.getPoint(0.62));

  group.add(body, rim, wet, mound, straw, tip, ring);
  return group;
}

export function createThermos(materials: Materials) {
  const group = new THREE.Group();

  const shell = new THREE.MeshStandardMaterial({
    color: 0x0f0f10,
    metalness: 0.35,
    roughness: 0.46,
  });
  const body = solid(
    new THREE.Mesh(
      lathe([
        [0, 0],
        [0.04, 0],
        [0.0425, 0.004],
        [0.0425, 0.214],
        [0.0405, 0.23],
        [0.0345, 0.242],
        [0, 0.242],
      ]),
      shell,
    ),
  );

  const cap = solid(
    new THREE.Mesh(
      lathe([
        [0.0345, 0.242],
        [0.0352, 0.246],
        [0.0352, 0.276],
        [0.033, 0.282],
        [0, 0.282],
      ]),
      materials.steel,
    ),
  );

  const button = solid(
    new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.015, 0.004, 32), materials.aluminum),
  );
  button.position.y = 0.284;

  const handle = solid(
    new THREE.Mesh(new THREE.TorusGeometry(0.036, 0.0062, 12, 28, Math.PI), materials.matte),
  );
  handle.rotation.z = Math.PI / 2;
  handle.position.set(-0.0405, 0.135, 0);

  group.add(body, cap, button, handle);
  return group;
}
