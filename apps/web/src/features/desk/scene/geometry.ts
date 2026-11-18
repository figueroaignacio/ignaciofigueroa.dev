import * as THREE from 'three';

export function roundedRectShape(width: number, depth: number, radius: number) {
  const w = width / 2;
  const d = depth / 2;
  const r = Math.max(Math.min(radius, w, d), 0.00001);
  const shape = new THREE.Shape();
  shape.moveTo(-w + r, -d);
  shape.lineTo(w - r, -d);
  shape.absarc(w - r, -d + r, r, -Math.PI / 2, 0, false);
  shape.lineTo(w, d - r);
  shape.absarc(w - r, d - r, r, 0, Math.PI / 2, false);
  shape.lineTo(-w + r, d);
  shape.absarc(-w + r, d - r, r, Math.PI / 2, Math.PI, false);
  shape.lineTo(-w, -d + r);
  shape.absarc(-w + r, -d + r, r, Math.PI, Math.PI * 1.5, false);
  return shape;
}

export function slab(width: number, depth: number, height: number, radius: number, bevel = 0) {
  const b = Math.max(Math.min(bevel, height / 2 - 0.00001, radius - 0.00001), 0);
  const shape = roundedRectShape(width - b * 2, depth - b * 2, radius - b);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: height - b * 2,
    bevelEnabled: b > 0,
    bevelThickness: b,
    bevelSize: b,
    bevelSegments: 3,
    curveSegments: 12,
  });
  geometry.rotateX(-Math.PI / 2);
  geometry.translate(0, b, 0);
  return geometry;
}

export function facingUp(width: number, depth: number) {
  const geometry = new THREE.PlaneGeometry(width, depth);
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}

export function facingDown(width: number, depth: number) {
  const geometry = new THREE.PlaneGeometry(width, depth);
  geometry.rotateX(Math.PI / 2);
  return geometry;
}

export function solid<T extends THREE.Mesh>(mesh: T, cast = true, receive = true) {
  mesh.castShadow = cast;
  mesh.receiveShadow = receive;
  return mesh;
}

export function lathe(profile: Array<[number, number]>, segments = 48) {
  return new THREE.LatheGeometry(
    profile.map(([radius, y]) => new THREE.Vector2(radius, y)),
    segments,
  );
}
