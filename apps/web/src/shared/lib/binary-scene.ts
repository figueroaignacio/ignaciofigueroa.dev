export type SceneId = 'setup' | 'desk';

type Stop = [number, string];
type Fill = string | CanvasGradient;
type Points = number[];

const W = 2400;
const H = 900;
const SCALE = 1.5;
const OFFSET_X = 750;
const LEVELS = [0, 0.08, 0.17, 0.27, 0.38, 0.5, 0.63, 0.8, 1];

function painter(c: CanvasRenderingContext2D) {
  const K = (d: number) => {
    const v = Math.round(255 * (1 - d));
    return `rgb(${v},${v},${v})`;
  };
  const A = (a: number) => `rgba(0,0,0,${a})`;
  const Wt = (a: number) => `rgba(255,255,255,${a})`;
  const stops = (g: CanvasGradient, st: Stop[]) => {
    for (const [offset, color] of st) g.addColorStop(offset, color);
    return g;
  };
  const LGS = (x0: number, y0: number, x1: number, y1: number, st: Stop[]) =>
    stops(c.createLinearGradient(x0, y0, x1, y1), st);
  const RGS = (x: number, y: number, r0: number, r1: number, st: Stop[]) =>
    stops(c.createRadialGradient(x, y, r0, x, y, r1), st);
  const RR = (x0: number, y0: number, x1: number, y1: number, r: number, f: Fill) => {
    c.beginPath();
    c.moveTo(x0 + r, y0);
    c.arcTo(x1, y0, x1, y1, r);
    c.arcTo(x1, y1, x0, y1, r);
    c.arcTo(x0, y1, x0, y0, r);
    c.arcTo(x0, y0, x1, y0, r);
    c.closePath();
    c.fillStyle = f;
    c.fill();
  };
  const EL = (x: number, y: number, rx: number, ry: number, f: Fill, rot = 0) => {
    c.beginPath();
    c.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2);
    c.fillStyle = f;
    c.fill();
  };
  const PG = (p: Points, f: Fill) => {
    c.beginPath();
    c.moveTo(p[0], p[1]);
    for (let i = 2; i < p.length; i += 2) c.lineTo(p[i], p[i + 1]);
    c.closePath();
    c.fillStyle = f;
    c.fill();
  };
  const LN = (p: Points, w: number, s: Fill) => {
    c.beginPath();
    c.moveTo(p[0], p[1]);
    for (let i = 2; i < p.length; i += 2) c.lineTo(p[i], p[i + 1]);
    c.lineWidth = w;
    c.lineCap = 'round';
    c.lineJoin = 'round';
    c.strokeStyle = s;
    c.stroke();
  };
  const curve = (p: Points, w: number, s: Fill) => {
    c.beginPath();
    c.moveTo(p[0], p[1]);
    c.bezierCurveTo(p[2], p[3], p[4], p[5], p[6], p[7]);
    c.lineWidth = w;
    c.lineCap = 'round';
    c.strokeStyle = s;
    c.stroke();
  };
  const lerp = (a: Points, b: Points, t: number): Points => [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
  ];
  const keyboard = (
    tl: Points,
    tr: Points,
    bl: Points,
    br: Points,
    rows: number,
    cols: number,
    w: number,
    s: Fill,
  ) => {
    for (let t = 1; t < rows; t++) {
      const a = lerp(tl, bl, t / rows);
      const b = lerp(tr, br, t / rows);
      LN([a[0], a[1], b[0], b[1]], w, s);
    }
    for (let t = 1; t < cols; t++) {
      const a = lerp(tl, tr, t / cols);
      const b = lerp(bl, br, t / cols);
      LN([a[0], a[1], b[0], b[1]], w, s);
    }
  };
  return { c, K, A, Wt, LGS, RGS, RR, EL, PG, LN, curve, lerp, keyboard };
}

type Painter = ReturnType<typeof painter>;

function drawDesk({ c, K, A, Wt, LGS, RGS, RR, EL, PG, LN, lerp, keyboard }: Painter) {
  c.fillStyle = LGS(-500, 0, 1100, 0, [
    [0, K(0.38)],
    [0.5, K(0.08)],
    [1, K(0.4)],
  ]);
  c.fillRect(-520, 0, 1640, 360);
  PG([290, 30, 480, 18, 488, 232, 298, 246], Wt(0.65));
  LN([385, 24, 393, 239], 8, A(0.18));
  LN([294, 138, 484, 125], 8, A(0.18));

  RR(-200, 80, -70, 250, 3, K(0.9));
  RR(-190, 90, -80, 240, 0, K(0.12));
  EL(-112, 135, 20, 20, K(0.55));
  PG([-190, 240, -150, 175, -120, 210, -100, 190, -80, 225, -80, 240], K(0.45));
  EL(-130, 262, 70, 6, A(0.12));

  RR(640, 196, 830, 205, 1, K(0.9));
  const books: Points[] = [
    [650, 140, 12, 0.85],
    [664, 150, 10, 0.55],
    [676, 132, 14, 0.95],
    [692, 146, 11, 0.4],
    [705, 156, 12, 0.75],
  ];
  for (const [x, y, w, d] of books) RR(x, y, x + w, 196, 1, K(d));
  PG([722, 196, 760, 150, 770, 158, 734, 196], K(0.65));
  PG([780, 170, 812, 170, 808, 196, 784, 196], K(0.85));
  EL(788, 160, 8, 16, K(0.7), -0.4);
  EL(804, 158, 8, 18, K(0.85), 0.4);

  PG(
    [30, 290, 104, 290, 96, 362, 38, 362],
    LGS(30, 0, 104, 0, [
      [0, K(0.6)],
      [1, K(0.95)],
    ]),
  );
  RR(26, 284, 108, 296, 3, K(0.9));
  const leaves: Points[] = [
    [50, 250, 13, 30, -0.6, 0.7],
    [82, 245, 13, 32, 0.5, 0.85],
    [66, 230, 12, 36, 0, 0.95],
    [36, 274, 11, 26, -1.1, 0.6],
    [102, 272, 11, 26, 1.1, 0.75],
    [114, 318, 10, 22, 0.3, 0.8],
    [24, 316, 9, 20, -0.3, 0.65],
  ];
  for (const [x, y, rx, ry, rot, d] of leaves) {
    EL(
      x,
      y,
      rx,
      ry,
      LGS(x - rx, 0, x + rx, 0, [
        [0, K(d - 0.25)],
        [1, K(d)],
      ]),
      rot,
    );
    const h = ry * 0.8;
    LN(
      [x + Math.sin(rot) * h, y - Math.cos(rot) * h, x - Math.sin(rot) * h, y + Math.cos(rot) * h],
      2,
      Wt(0.3),
    );
  }

  PG(
    [-520, 358, 1120, 358, 1120, 492, -520, 492],
    LGS(0, 358, 0, 492, [
      [0, K(0.3)],
      [1, K(0.46)],
    ]),
  );
  for (let i = 0; i < 10; i++) {
    const y0 = 366 + i * 13;
    c.beginPath();
    c.moveTo(-520, y0);
    c.bezierCurveTo(0, y0 + 4, 600, y0 - 3, 1120, y0 + 2);
    c.lineWidth = 2;
    c.strokeStyle = A(0.08);
    c.stroke();
  }
  PG([330, 358, 470, 358, 520, 425, 360, 425], Wt(0.25));
  RR(-525, 492, 1125, 508, 0, K(0.85));
  RR(
    -520,
    508,
    1120,
    620,
    0,
    LGS(0, 508, 0, 620, [
      [0, K(0.65)],
      [1, K(0.5)],
    ]),
  );

  EL(-100, 352, 82, 7, A(0.28));
  RR(-180, 330, -24, 348, 2, K(0.85));
  LN([-176, 340, -30, 340], 2, Wt(0.4));
  RR(-170, 312, -40, 330, 2, K(0.5));
  LN([-166, 321, -44, 321], 2, Wt(0.4));
  RR(-176, 294, -34, 312, 2, K(0.95));
  c.beginPath();
  c.ellipse(-104, 288, 50, 34, 0, Math.PI, Math.PI * 2);
  c.lineWidth = 8;
  c.strokeStyle = K(0.95);
  c.stroke();
  EL(-152, 290, 13, 9, K(1));
  EL(-56, 290, 13, 9, K(1));

  PG([650, 412, 716, 408, 726, 444, 656, 448], A(0.3));
  PG([646, 406, 712, 402, 720, 438, 650, 442], K(0.9));

  PG([42, 442, 168, 438, 180, 478, 34, 484], A(0.25));
  PG([38, 436, 164, 432, 174, 470, 30, 476], K(0.1));
  LN([40, 438, 31, 474], 5, K(0.9));
  for (let i = 1; i < 5; i++) {
    const p0 = lerp([42, 436], [33, 476], i / 5);
    const p1 = lerp([164, 432], [174, 470], i / 5);
    LN([p0[0] + 8, p0[1], p1[0] - 6, p1[1]], 1.5, A(0.25));
  }
  LN([190, 478, 250, 448], 6, K(0.9));
  LN([250, 448, 258, 444], 3, K(0.5));

  PG([108, 402, 478, 392, 500, 412, 95, 420], A(0.3));
  PG([150, 168, 402, 152, 412, 346, 156, 354], K(0.95));
  PG([159, 178, 394, 163, 403, 337, 164, 344], K(0.06));
  PG([159, 178, 196, 176, 199, 342, 164, 344], K(0.18));
  for (let i = 0; i < 10; i++) LN([168, 192 + i * 14, 186 - (i % 3) * 5, 192 + i * 14], 3, K(0.45));
  const code: Points[] = [
    [0, 120],
    [14, 150],
    [28, 90],
    [28, 150],
    [14, 60],
    [0, 30],
    [0, 110],
    [14, 150],
    [28, 120],
    [42, 80],
    [28, 140],
    [14, 50],
  ];
  code.forEach(([indent, length], i) => {
    const yl = 190 + i * 12.5;
    const xa = 208 + indent;
    const xb = xa + length;
    LN(
      [xa, yl - (xa - 160) * 0.064, xb, yl - (xb - 160) * 0.064],
      4.5,
      K(i % 4 === 1 ? 0.75 : 0.5),
    );
  });
  LN([156, 354, 412, 346], 5, K(0.7));
  PG(
    [156, 354, 412, 346, 478, 394, 100, 406],
    LGS(0, 346, 0, 406, [
      [0, K(0.48)],
      [1, K(0.62)],
    ]),
  );
  PG([178, 360, 394, 354, 438, 382, 138, 390], K(0.82));
  keyboard([178, 360], [394, 354], [138, 390], [438, 382], 5, 14, 1.5, Wt(0.3));
  PG([250, 393, 336, 391, 343, 402, 246, 404], K(0.38));
  LN([100, 406, 478, 394], 3, K(0.85));

  EL(575, 438, 40, 6, A(0.3));
  RR(
    548,
    170,
    610,
    436,
    10,
    LGS(548, 0, 610, 0, [
      [0, K(0.55)],
      [0.3, K(0.75)],
      [1, K(1)],
    ]),
  );
  RR(556, 180, 563, 425, 3, Wt(0.4));
  RR(552, 150, 606, 176, 6, K(1));
  RR(564, 132, 596, 152, 4, K(0.85));

  EL(530, 438, 58, 9, A(0.32));
  const gourd = () => {
    c.beginPath();
    c.moveTo(492, 352);
    c.bezierCurveTo(460, 374, 460, 432, 520, 436);
    c.bezierCurveTo(580, 432, 580, 374, 548, 352);
    c.closePath();
  };
  gourd();
  c.fillStyle = RGS(498, 378, 4, 92, [
    [0, K(0.3)],
    [0.5, K(0.75)],
    [1, K(1)],
  ]);
  c.fill();
  c.save();
  gourd();
  c.clip();
  c.fillStyle = A(0.28);
  c.fillRect(455, 404, 130, 14);
  for (let i = 0; i < 12; i++) LN([466 + i * 9, 411, 470 + i * 9, 411], 2, Wt(0.25));
  c.restore();
  EL(520, 350, 32, 8, K(0.18));
  c.beginPath();
  c.ellipse(520, 350, 32, 8, 0, 0, Math.PI * 2);
  c.lineWidth = 2;
  c.strokeStyle = A(0.6);
  c.stroke();
  EL(520, 349, 27, 6, K(0.62));
  EL(522, 346, 20, 5, K(0.72));
  LN([528, 346, 548, 262, 559, 256], 5, K(0.85));
  LN([527, 343, 546, 264], 1.5, Wt(0.6));
  LN([505, 330, 494, 300, 508, 272, 497, 244], 12, Wt(0.4));
  LN([520, 322, 514, 298, 524, 272], 9, Wt(0.3));
}

function drawSetup({ c, K, A, Wt, LGS, RGS, RR, EL, PG, LN, keyboard }: Painter) {
  const metal = (x0: number, x1: number) =>
    LGS(x0, 0, x1, 0, [
      [0, K(0.25)],
      [0.3, K(0.04)],
      [0.55, K(0.3)],
      [1, K(0.55)],
    ]);
  const glowEllipse = (x: number, y: number, rx: number, ry: number, alpha: number) => {
    c.save();
    c.translate(x, y);
    c.scale(1, ry / rx);
    EL(
      0,
      0,
      rx,
      rx,
      RGS(0, 0, 0, rx, [
        [0, Wt(alpha)],
        [1, Wt(0)],
      ]),
    );
    c.restore();
  };

  c.fillStyle = RGS(230, 170, 60, 640, [
    [0, K(0.14)],
    [1, K(0.44)],
  ]);
  c.fillRect(-520, 0, 1640, 620);
  glowEllipse(195, 185, 175, 115, 0.3);

  RR(60, 354, 560, 620, 0, K(0.72));
  RR(
    74,
    354,
    420,
    620,
    0,
    LGS(0, 354, 0, 620, [
      [0, K(0.88)],
      [1, K(0.72)],
    ]),
  );
  const panel = (x0: number, x1: number) => {
    RR(
      x0,
      354,
      x1,
      620,
      0,
      LGS(x0, 0, x1, 0, [
        [0, K(0.45)],
        [1, K(0.62)],
      ]),
    );
    for (let x = x0 + 3; x < x1 - 1; x += 4) LN([x, 356, x + 0.6, 618], 0.8, A(0.12));
  };
  panel(60, 74);
  panel(420, 432);
  RR(548, 354, 560, 620, 0, K(0.55));
  RR(
    74,
    354,
    548,
    382,
    0,
    LGS(0, 354, 0, 382, [
      [0, A(0.35)],
      [1, A(0)],
    ]),
  );
  RR(432, 452, 548, 462, 0, K(0.5));
  LN([434, 452.5, 546, 452.5], 1.2, Wt(0.3));
  PG([448, 452, 500, 452, 504, 436, 452, 432], K(0.92));
  LN([452, 438, 500, 441], 1, Wt(0.18));
  RR(
    510,
    420,
    530,
    452,
    2,
    LGS(510, 0, 530, 0, [
      [0, K(0.25)],
      [1, K(0.5)],
    ]),
  );
  RR(432, 540, 548, 550, 0, K(0.5));

  EL(310, 344, 270, 8, A(0.25));
  PG(
    [70, 298, 552, 298, 560, 340, 60, 340],
    LGS(0, 298, 0, 340, [
      [0, K(0.84)],
      [1, K(0.94)],
    ]),
  );
  glowEllipse(200, 314, 150, 20, 0.16);
  for (let x = 74; x < 548; x += 7) {
    LN([x, 301.5, x + 3.5, 301.5], 1, Wt(0.16));
    LN([x - 2, 336.5, x + 2, 336.5], 1, Wt(0.14));
  }
  LN([70, 298.6, 552, 298.6], 1.6, Wt(0.18));
  RR(
    58,
    340,
    562,
    354,
    1,
    LGS(0, 340, 0, 354, [
      [0, K(0.42)],
      [1, K(0.62)],
    ]),
  );
  for (let i = 0; i < 4; i++) LN([62, 343 + i * 3, 558, 342.4 + i * 3 + (i % 2)], 0.9, A(0.13));
  LN([58, 340.4, 562, 340.4], 1.2, Wt(0.28));

  EL(197, 304, 132, 4, A(0.4));
  RR(
    95,
    108,
    295,
    262,
    7,
    LGS(95, 0, 295, 0, [
      [0, K(0.9)],
      [1, K(1)],
    ]),
  );
  LN([102, 108.8, 288, 108.8], 1.2, Wt(0.35));
  EL(195, 112.5, 1.7, 1.7, K(0.45));
  RR(103, 117, 287, 252, 2, K(0.94));
  RR(103, 117, 287, 126, 0, K(0.96));
  RR(134, 117, 178, 126, 0, K(0.84));
  LN([140, 121.5, 168, 121.5], 2.6, K(0.3));
  LN([184, 121.5, 206, 121.5], 2.6, K(0.62));
  LN([214, 121.5, 232, 121.5], 2.6, K(0.62));
  RR(103, 126, 134, 247, 0, K(0.84));
  RR(103, 164, 134, 170, 0, K(0.74));
  for (let i = 0; i < 12; i++) {
    LN(
      [107 + (i % 3) * 3, 132 + i * 9.6, 129 - (i % 4) * 3, 132 + i * 9.6],
      3,
      K(i === 4 ? 0.22 : 0.5),
    );
  }
  RR(134, 160.5, 262, 166.5, 0, K(0.84));
  const indents = [0, 6, 12, 12, 6, 0, 0, 6, 12, 18, 12, 6];
  const tones = [0.1, 0.36, 0.22, 0.5];
  indents.forEach((indent, i) => {
    const y = 132 + i * 9.6;
    LN([138, y, 141.5, y], 2.6, K(0.6));
    const end = Math.min(258, 146 + indent + 40 + hash(i, 99) * 70);
    let x = 146 + indent;
    for (let k = 0; x < end; k++) {
      const len = Math.min(end - x, 6 + hash(i, k) * 18);
      LN([x, y, x + len, y], 4, K(i === 5 ? 0.72 : tones[Math.floor(hash(k, i + 7) * 4)]));
      x += len + 3.5;
    }
  });
  RR(196, 159.5, 198, 166.5, 0, K(0.05));
  RR(262, 126, 287, 247, 0, K(0.87));
  for (let i = 0; i < 29; i++)
    LN([265, 129 + i * 4, 266 + 4 + hash(i, 3) * 14, 129 + i * 4], 1.8, K(0.5));
  RR(262, 140, 287, 172, 0, Wt(0.07));
  RR(103, 247, 287, 252, 0, K(0.8));
  LN([107, 249.5, 132, 249.5], 1.3, K(0.45));
  LN([248, 249.5, 283, 249.5], 1.3, K(0.45));
  PG([215, 117, 252, 117, 172, 252, 135, 252], Wt(0.035));
  LN([92, 262, 298, 262], 2.5, K(0.55));
  PG(
    [92, 262, 298, 262, 322, 302, 68, 302],
    LGS(0, 262, 0, 302, [
      [0, K(0.12)],
      [1, K(0.24)],
    ]),
  );
  PG([110, 266, 280, 266, 292, 284, 100, 284], K(0.58));
  keyboard([110, 266], [280, 266], [100, 284], [292, 284], 5, 15, 1, Wt(0.42));
  PG([162, 287, 226, 287, 228, 298, 160, 298], K(0.22));
  LN([162, 287, 226, 287, 228, 298, 160, 298, 162, 287], 0.8, A(0.25));
  PG([68, 302, 322, 302, 320, 305, 70, 305], K(0.45));
  LN([70, 301.6, 320, 301.6], 1, Wt(0.5));

  EL(400, 322, 26, 4, A(0.4));
  LN([380, 186, 366, 190, 366, 254, 380, 258], 5, K(0.95));
  RR(377, 182, 383, 191, 1, K(0.5));
  RR(377, 252, 383, 261, 1, K(0.5));
  RR(
    380,
    160,
    414,
    320,
    7,
    LGS(380, 0, 414, 0, [
      [0, K(0.74)],
      [0.22, K(0.62)],
      [0.4, K(0.9)],
      [1, K(1)],
    ]),
  );
  RR(385, 168, 389, 306, 2, Wt(0.32));
  RR(409, 170, 411, 306, 1, Wt(0.12));
  EL(397, 161.5, 17, 3, K(0.82));
  RR(382, 134, 412, 163, 5, metal(382, 412));
  for (let i = 0; i < 5; i++) LN([383.5, 140 + i * 4.2, 410.5, 140 + i * 4.2], 0.9, A(0.25));
  EL(397, 134.6, 15, 2.6, K(0.35));
  RR(390, 128, 404, 135, 2, metal(390, 404));
  RR(380, 306, 414, 320, 3, metal(380, 414));
  LN([381, 310.5, 413, 310.5], 0.9, A(0.3));

  EL(462, 322, 28, 4.5, A(0.4));
  EL(
    458,
    300,
    20,
    22,
    RGS(450, 292, 2, 28, [
      [0, K(0.5)],
      [0.5, K(0.85)],
      [1, K(1)],
    ]),
  );
  RR(438, 276, 478, 290, 3, metal(438, 478));
  for (let i = 0; i < 9; i++) LN([441.5 + i * 4.4, 279.5, 441.5 + i * 4.4, 287.5], 0.8, A(0.25));
  EL(458, 277, 20, 5, K(0.15));
  EL(458, 276.6, 17, 3.8, K(0.55));
  EL(461, 275.2, 12, 3.4, K(0.68));
  for (let i = 0; i < 14; i++) {
    EL(451 + hash(i, 1) * 18, 273.6 + hash(i, 2) * 3, 0.9, 0.6, K(hash(i, 3) < 0.5 ? 0.85 : 0.45));
  }
  LN([462, 276, 444, 244, 436, 242], 3.2, K(0.5));
  LN([461, 273, 444, 246], 1, Wt(0.7));
  EL(436, 242, 2.2, 1.6, K(0.4));

  EL(373, 322, 13, 3, A(0.4));
  EL(372, 316, 11, 6, K(1));
  EL(369, 313, 5, 2.2, Wt(0.32));
  LN([372, 310.5, 372, 314], 0.8, Wt(0.25));
  RR(371.2, 311, 372.8, 313.6, 0.8, K(0.6));
}

const SCENES: Record<SceneId, (p: Painter) => void> = { setup: drawSetup, desk: drawDesk };

const FRAMING: Record<
  SceneId,
  { fx: number; fxNarrow: number; anchorY: number; anchorV: number; span: number }
> = {
  setup: { fx: 300, fxNarrow: 290, anchorY: 108, anchorV: 0.2, span: 300 },
  desk: { fx: 300, fxNarrow: 380, anchorY: 152, anchorV: 0.28, span: 320 },
};

const pixelCache = new Map<SceneId, Uint8ClampedArray>();

function scenePixels(id: SceneId) {
  const cached = pixelCache.get(id);
  if (cached) return cached;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const c = canvas.getContext('2d', { willReadFrequently: true });
  if (!c) return null;
  c.fillStyle = '#fff';
  c.fillRect(0, 0, W, H);
  c.setTransform(SCALE, 0, 0, SCALE, OFFSET_X, 0);
  SCENES[id](painter(c));
  const data = c.getImageData(0, 0, W, H).data;
  pixelCache.set(id, data);
  return data;
}

function hash(x: number, y: number) {
  let h = (x * 374761393 + y * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function smooth(e0: number, e1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

export type Motion = 'decode' | 'spotlight';

export interface Grid {
  cols: number;
  rows: number;
  cw: number;
  ch: number;
  cell: number;
  density: Float32Array;
  jitter: Float32Array;
  bit: Uint8Array;
  reveal: Float32Array;
}

export interface Glyphs {
  zero: HTMLCanvasElement;
  one: HTMLCanvasElement;
}

export const DECODE_SECONDS = 2.1;

export function buildGrid(scene: SceneId, width: number, height: number, cell = 5): Grid | null {
  const px = scenePixels(scene);
  if (!px) return null;

  const cw = cell * 0.6 + 0.2;
  const ch = cell * 0.9375;
  const cols = Math.ceil(width / cw);
  const rows = Math.ceil(height / ch);
  const aspect = width / height;
  const frame = FRAMING[scene];

  let rw = frame.span * aspect;
  let rh = frame.span;
  const fullWidth = W / SCALE;
  if (rw > fullWidth) {
    rw = fullWidth;
    rh = rw / aspect;
  } else if (rw < 380) {
    rw = 380;
    rh = rw / aspect;
  }
  const fx = aspect < 1.4 ? frame.fxNarrow : frame.fx;
  const x0 = OFFSET_X + (fx - rw / 2) * SCALE;
  const y0 = (frame.anchorY - frame.anchorV * rh) * SCALE;
  const sx = (rw * SCALE) / cols;
  const sy = (rh * SCALE) / rows;

  const size = cols * rows;
  const density = new Float32Array(size);
  const jitter = new Float32Array(size);
  const bit = new Uint8Array(size);
  const reveal = new Float32Array(size);

  for (let r = 0; r < rows; r++) {
    const v = (r + 0.5) / rows;
    const fade = smooth(0.03, 0.2, v);
    const haze = 0.3 * Math.exp(-Math.pow((v - 0.07) / 0.05, 2));
    for (let q = 0; q < cols; q++) {
      let sum = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const X = Math.round(x0 + (q + 0.5 + dx * 0.3) * sx);
          const Y = Math.round(y0 + (r + 0.5 + dy * 0.3) * sy);
          sum += X < 0 || Y < 0 || X >= W || Y >= H ? 255 : px[(Y * W + X) * 4];
        }
      }
      const i = r * cols + q;
      const d = Math.min(1, (1 - sum / 9 / 255) * fade + haze);
      density[i] = d;
      jitter[i] = (hash(q * 7 + 3, r * 13 + 1) - 0.5) * 1.1;
      bit[i] = hash(q, r) < d ? 1 : 0;
      reveal[i] = 0.15 + (1 - v) * 0.9 + hash(q * 3 + 11, r * 5 + 2) * 0.55;
    }
  }

  return { cols, rows, cw, ch, cell, density, jitter, bit, reveal };
}

export function makeGlyphs(grid: Grid, color: string, fontFamily: string, dpr: number): Glyphs {
  const draw = (glyph: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = Math.ceil(grid.cw * dpr);
    canvas.height = Math.ceil(grid.ch * dpr);
    const c = canvas.getContext('2d');
    if (c) {
      c.font = `500 ${grid.cell * dpr}px ${fontFamily}`;
      c.textBaseline = 'top';
      c.fillStyle = color;
      c.fillText(glyph, 0, 0);
    }
    return canvas;
  };
  return { zero: draw('0'), one: draw('1') };
}

function layer(
  width: number,
  height: number,
  dpr: number,
  paint: (ctx: CanvasRenderingContext2D) => void,
) {
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    paint(ctx);
  }
  return canvas;
}

export class SceneRenderer {
  private readonly base: HTMLCanvasElement;
  private bright: HTMLCanvasElement | null = null;
  private scratch: HTMLCanvasElement | null = null;

  constructor(
    private readonly grid: Grid,
    private readonly glyphs: Glyphs,
    private readonly width: number,
    private readonly height: number,
    private readonly dpr: number,
    private readonly opacity: number,
  ) {
    this.base = layer(width, height, dpr, (ctx) => this.cells(ctx, 0));
  }

  private cells(ctx: CanvasRenderingContext2D, boost: number) {
    const { cols, rows, cw, ch, density, jitter, bit } = this.grid;
    const alpha = this.opacity * (1 + boost * 1.9);
    for (let r = 0; r < rows; r++) {
      for (let q = 0; q < cols; q++) {
        const i = r * cols + q;
        const lv = Math.min(8, Math.round(density[i] * 8 + jitter[i] + boost * 1.9));
        if (lv <= 0) continue;
        ctx.globalAlpha = Math.min(1, LEVELS[lv] * alpha);
        ctx.drawImage(
          bit[i] ? this.glyphs.one : this.glyphs.zero,
          q * this.grid.cw,
          r * ch,
          cw,
          ch,
        );
      }
    }
    ctx.globalAlpha = 1;
  }

  private blit(ctx: CanvasRenderingContext2D, source: HTMLCanvasElement) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(source, 0, 0);
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  still(ctx: CanvasRenderingContext2D) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.blit(ctx, this.base);
  }

  decode(ctx: CanvasRenderingContext2D, time: number) {
    const { cols, rows, cw, ch, density, jitter, bit, reveal } = this.grid;
    const tick = Math.floor(time * 12);

    if (time >= DECODE_SECONDS) {
      this.still(ctx);
      const slow = Math.floor(time * 3);
      for (let i = 0; i < bit.length; i++) {
        if (hash(i, slow) >= 0.006) continue;
        const lv = Math.min(8, Math.round(density[i] * 8 + jitter[i]));
        if (lv <= 0) continue;
        const x = (i % cols) * cw;
        const y = Math.floor(i / cols) * ch;
        ctx.clearRect(x, y, cw, ch);
        ctx.globalAlpha = Math.min(1, LEVELS[lv] * this.opacity);
        ctx.drawImage(bit[i] ? this.glyphs.zero : this.glyphs.one, x, y, cw, ch);
      }
      ctx.globalAlpha = 1;
      return;
    }

    ctx.clearRect(0, 0, this.width, this.height);
    for (let r = 0; r < rows; r++) {
      for (let q = 0; q < cols; q++) {
        const i = r * cols + q;
        const base = density[i] * 8 + jitter[i];
        let level: number;
        let b = bit[i];
        if (time < reveal[i]) {
          if (hash(i, tick) > 0.32 * Math.min(1, time / 0.4)) continue;
          level = 1 + hash(i * 3, tick) * 2.4;
          b = hash(i, tick + 7) < 0.5 ? 0 : 1;
        } else {
          const k = Math.min(1, (time - reveal[i]) / 0.35);
          level = base * k + (1 - k) * 3;
        }
        const lv = Math.min(8, Math.round(level));
        if (lv <= 0) continue;
        ctx.globalAlpha = Math.min(1, LEVELS[lv] * this.opacity);
        ctx.drawImage(b ? this.glyphs.one : this.glyphs.zero, q * cw, r * ch, cw, ch);
      }
    }
    ctx.globalAlpha = 1;
  }

  spotlight(ctx: CanvasRenderingContext2D, spot: { x: number; y: number }) {
    if (!this.bright)
      this.bright = layer(this.width, this.height, this.dpr, (c) => this.cells(c, 1));
    if (!this.scratch) this.scratch = layer(this.width, this.height, this.dpr, () => {});
    const scratch = this.scratch.getContext('2d');
    if (!scratch) return;

    const glow = (c: CanvasRenderingContext2D) => {
      const g = c.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, 260);
      g.addColorStop(0, 'rgba(0,0,0,1)');
      g.addColorStop(0.3, 'rgba(0,0,0,0.76)');
      g.addColorStop(0.58, 'rgba(0,0,0,0.37)');
      g.addColorStop(0.8, 'rgba(0,0,0,0.13)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      return g;
    };

    this.still(ctx);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = glow(ctx);
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.globalCompositeOperation = 'source-over';

    scratch.setTransform(1, 0, 0, 1, 0, 0);
    scratch.globalCompositeOperation = 'copy';
    scratch.drawImage(this.bright, 0, 0);
    scratch.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    scratch.globalCompositeOperation = 'destination-in';
    scratch.fillStyle = glow(scratch);
    scratch.fillRect(0, 0, this.width, this.height);
    scratch.globalCompositeOperation = 'source-over';

    this.blit(ctx, this.scratch);
  }
}
