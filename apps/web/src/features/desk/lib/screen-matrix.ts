export function quadFacesViewer(quad: number[]) {
  let area = 0;
  for (let i = 0; i < 4; i++) {
    const next = (i + 1) % 4;
    area += (quad[i * 2] ?? 0) * (quad[next * 2 + 1] ?? 0);
    area -= (quad[next * 2] ?? 0) * (quad[i * 2 + 1] ?? 0);
  }
  return area > 1200;
}

export function quadTransform(width: number, height: number, quad: number[]) {
  const [x0 = 0, y0 = 0, x1 = 0, y1 = 0, x2 = 0, y2 = 0, x3 = 0, y3 = 0] = quad;
  const dx1 = x1 - x2;
  const dx2 = x3 - x2;
  const sx = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2;
  const dy2 = y3 - y2;
  const sy = y0 - y1 + y2 - y3;
  const det = dx1 * dy2 - dy1 * dx2;
  const g = det ? (sx * dy2 - sy * dx2) / det : 0;
  const k = det ? (dx1 * sy - dy1 * sx) / det : 0;
  const a = x1 - x0 + g * x1;
  const b = x3 - x0 + k * x3;
  const d = y1 - y0 + g * y1;
  const e = y3 - y0 + k * y3;
  const flat = Math.abs(g) < 1e-6 && Math.abs(k) < 1e-6 && Math.abs(b) < 0.6 && Math.abs(d) < 0.6;
  if (flat && Math.abs(a - width) < 0.6 && Math.abs(e - height) < 0.6) {
    return `translate(${Math.round(x0)}px, ${Math.round(y0)}px)`;
  }
  return `matrix3d(${a / width}, ${d / width}, 0, ${g / width}, ${b / height}, ${e / height}, 0, ${k / height}, 0, 0, 1, 0, ${x0}, ${y0}, 0, 1)`;
}
