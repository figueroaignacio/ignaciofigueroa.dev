import * as THREE from 'three';
import { CODE_FIRST_LINE, CODE_LINES, CODE_TABS, type CodeTone } from './code-sample';
import type { SceneFonts, SceneStrings } from './types';

type Draw = (g: CanvasRenderingContext2D, width: number, height: number) => void;

const BRAND = '#f8894b';
const INK = '#141414';

function prng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function paint(width: number, height: number, draw: Draw) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const g = canvas.getContext('2d');
  if (!g) throw new Error('2d context unavailable');
  draw(g, width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function repaint(texture: THREE.CanvasTexture, draw: Draw) {
  const canvas = texture.image as HTMLCanvasElement;
  const g = canvas.getContext('2d');
  if (!g) return;
  g.clearRect(0, 0, canvas.width, canvas.height);
  draw(g, canvas.width, canvas.height);
  texture.needsUpdate = true;
}

function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`could not load ${url}`));
    image.src = url;
  });
}

function tiled(texture: THREE.CanvasTexture, x: number, y: number) {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(x, y);
  return texture;
}

export function woodTexture() {
  const texture = paint(1024, 1024, (g, w, h) => {
    const rand = prng(11);
    g.fillStyle = '#3f2c1f';
    g.fillRect(0, 0, w, h);
    const planks = 8;
    const plank = h / planks;
    for (let i = 0; i < planks; i++) {
      g.fillStyle = `rgba(${rand() > 0.5 ? '255,214,170' : '20,10,4'},${0.03 + rand() * 0.07})`;
      g.fillRect(0, i * plank, w, plank);
    }
    for (let i = 0; i < 1700; i++) {
      const y = rand() * h;
      const light = rand() > 0.58;
      g.strokeStyle = light
        ? `rgba(196,150,108,${0.02 + rand() * 0.05})`
        : `rgba(26,14,6,${0.05 + rand() * 0.13})`;
      g.lineWidth = 0.5 + rand() * 2.6;
      const amplitude = rand() * 6;
      const phase = rand() * Math.PI * 2;
      const frequency = 1 + Math.floor(rand() * 3);
      g.beginPath();
      for (let x = 0; x <= w; x += 32) {
        const yy = y + Math.sin((x / w) * Math.PI * 2 * frequency + phase) * amplitude;
        if (x === 0) g.moveTo(x, yy);
        else g.lineTo(x, yy);
      }
      g.stroke();
    }
    for (let i = 0; i < planks; i++) {
      g.fillStyle = 'rgba(12,6,2,0.55)';
      g.fillRect(0, i * plank, w, 2.5);
      g.fillStyle = 'rgba(255,226,190,0.08)';
      g.fillRect(0, i * plank + 2.5, w, 1.5);
    }
  });
  return tiled(texture, 3, 2);
}

export function fabricTexture() {
  const texture = paint(256, 256, (g, w, h) => {
    const rand = prng(4);
    const data = g.createImageData(w, h);
    for (let i = 0; i < data.data.length; i += 4) {
      const v = 16 + rand() * 20;
      data.data[i] = v;
      data.data[i + 1] = v;
      data.data[i + 2] = v + 1;
      data.data[i + 3] = 255;
    }
    g.putImageData(data, 0, 0);
  });
  return tiled(texture, 14, 8);
}

export function yerbaTexture(dry: boolean) {
  return paint(256, 256, (g, w, h) => {
    const rand = prng(dry ? 23 : 31);
    g.fillStyle = dry ? '#8f9650' : '#343d1b';
    g.fillRect(0, 0, w, h);
    const tones = dry
      ? ['#b9bd7a', '#a3a862', '#737d3c', '#d6d0a0', '#c7c98c', '#5f6b33']
      : ['#4c5727', '#262e14', '#566430', '#1c2310', '#6b7838'];
    for (let i = 0; i < 5200; i++) {
      g.fillStyle = tones[Math.floor(rand() * tones.length)] ?? tones[0]!;
      const size = 1 + rand() * 2.6;
      g.fillRect(rand() * w, rand() * h, size, size * (0.5 + rand()));
    }
    for (let i = 0; i < (dry ? 240 : 60); i++) {
      g.strokeStyle = dry ? 'rgba(236,228,186,0.85)' : 'rgba(170,180,120,0.5)';
      g.lineWidth = 1 + rand();
      const x = rand() * w;
      const y = rand() * h;
      const angle = rand() * Math.PI;
      const length = 3 + rand() * 7;
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
      g.stroke();
    }
  });
}

const CODE_COLORS: Record<CodeTone, string> = {
  plain: '#d6d8db',
  keyword: '#c4a7ff',
  string: '#9fd68a',
  type: BRAND,
  number: '#e6c46a',
  tag: '#f2a093',
  call: '#8fb8ff',
};

export function codeTexture(fonts: SceneFonts) {
  return paint(1600, 1034, (g, w, h) => {
    g.fillStyle = '#0e1013';
    g.fillRect(0, 0, w, h);
    g.fillStyle = '#090a0c';
    g.fillRect(0, 0, w, 62);
    g.fillStyle = '#1f2227';
    g.fillRect(0, 62, w, 2);
    g.textBaseline = 'middle';
    g.font = `400 25px ${fonts.mono}`;
    let x = 0;
    CODE_TABS.forEach((tab, index) => {
      const width = g.measureText(tab).width + 68;
      if (index === 0) {
        g.fillStyle = '#0e1013';
        g.fillRect(x, 0, width, 62);
        g.fillStyle = BRAND;
        g.fillRect(x + 26, 25, 13, 13);
        g.fillStyle = '#f5f5f4';
        g.fillText(tab, x + 50, 32);
      } else {
        g.fillStyle = '#8b9098';
        g.fillText(tab, x + 30, 32);
      }
      x += width;
    });
    g.fillStyle = '#8b9098';
    g.textAlign = 'right';
    g.fillText('apps/web · main', w - 28, 32);
    const lineHeight = 43;
    const top = 62 + 40;
    g.font = `400 27px ${fonts.mono}`;
    CODE_LINES.forEach((line, index) => {
      const y = top + index * lineHeight;
      g.textAlign = 'right';
      g.fillStyle = '#5f646c';
      g.fillText(String(CODE_FIRST_LINE + index), 74, y);
      g.textAlign = 'left';
      let cursor = 108;
      for (const [text, tone] of line) {
        g.fillStyle = CODE_COLORS[tone ?? 'plain'];
        g.fillText(text, cursor, y);
        cursor += g.measureText(text).width;
      }
    });
    g.fillStyle = '#f5f5f4';
    g.fillRect(108, top + CODE_LINES.length * lineHeight - 15, 14, 30);
    const shade = g.createLinearGradient(0, 0, w, h);
    shade.addColorStop(0, 'rgba(255,255,255,0.05)');
    shade.addColorStop(0.3, 'rgba(255,255,255,0)');
    g.fillStyle = shade;
    g.fillRect(0, 0, w, h);
  });
}

interface StickerOptions {
  background: string;
  shape: 'disc' | 'tile';
  inset: number;
}

export function stickerTexture(url: string, options: StickerOptions, onChange: () => void) {
  const draw =
    (image: HTMLImageElement | null): Draw =>
    (g, w, h) => {
      const edge = 14;
      g.fillStyle = '#f6f6f3';
      g.beginPath();
      if (options.shape === 'disc') g.arc(w / 2, h / 2, w / 2 - 2, 0, Math.PI * 2);
      else g.roundRect(2, 2, w - 4, h - 4, 62);
      g.fill();
      g.fillStyle = options.background;
      g.beginPath();
      if (options.shape === 'disc') g.arc(w / 2, h / 2, w / 2 - 2 - edge, 0, Math.PI * 2);
      else g.roundRect(2 + edge, 2 + edge, w - 4 - edge * 2, h - 4 - edge * 2, 50);
      g.fill();
      if (image) {
        const size = w * (1 - options.inset * 2);
        g.drawImage(image, (w - size) / 2, (h - size) / 2, size, size);
      }
    };
  const texture = paint(256, 256, draw(null));
  loadImage(url)
    .then((image) => {
      repaint(texture, draw(image));
      onChange();
    })
    .catch(() => undefined);
  return texture;
}

interface TagOptions {
  background: string;
  color: string;
  radius: number;
  width: number;
  height: number;
  size: number;
  pointer?: boolean;
}

export function tagTexture(text: string, fonts: SceneFonts, options: TagOptions) {
  return paint(options.width, options.height, (g, w, h) => {
    g.fillStyle = options.background;
    g.beginPath();
    g.roundRect(2, 2, w - 4, h - 4, options.radius);
    g.fill();
    g.fillStyle = options.color;
    g.textBaseline = 'middle';
    g.font = `500 ${options.size}px ${fonts.mono}`;
    const textWidth = g.measureText(text).width;
    const iconWidth = options.pointer ? options.size * 1.2 : 0;
    let x = (w - textWidth - iconWidth) / 2;
    if (options.pointer) {
      const s = options.size * 0.9;
      const y = h / 2 - s / 2;
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(x + s * 0.82, y + s * 0.47);
      g.lineTo(x + s * 0.47, y + s * 0.59);
      g.lineTo(x + s * 0.35, y + s * 0.94);
      g.closePath();
      g.fill();
      x += iconWidth;
    }
    g.fillText(text, x, h / 2 + 2);
  });
}

export function keycapTexture(fonts: SceneFonts) {
  return paint(256, 256, (g, w, h) => {
    g.fillStyle = '#08222f';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.font = `500 92px ${fonts.mono}`;
    g.fillText('ask', w / 2, h / 2 + 4);
  });
}

export function badgeTexture(
  fonts: SceneFonts,
  strings: SceneStrings,
  photo: string,
  onChange: () => void,
) {
  const draw =
    (image: HTMLImageElement | null): Draw =>
    (g, w, h) => {
      g.fillStyle = '#f3f1ec';
      g.fillRect(0, 0, w, h);
      g.fillStyle = '#3b2a1e';
      g.beginPath();
      g.roundRect(w / 2 - 60, 26, 120, 22, 11);
      g.fill();
      g.fillStyle = '#3d3d3d';
      g.textBaseline = 'top';
      g.font = `400 30px ${fonts.mono}`;
      g.fillText('reclee', 44, 86);
      g.fillStyle = INK;
      g.beginPath();
      g.roundRect(44, 140, 200, 200, 18);
      g.fill();
      if (image) {
        g.save();
        g.beginPath();
        g.roundRect(44, 140, 200, 200, 18);
        g.clip();
        g.filter = 'grayscale(1) contrast(1.15)';
        g.drawImage(image, 44, 140, 200, 200);
        g.restore();
      }
      g.fillStyle = INK;
      g.font = `700 46px ${fonts.sans}`;
      g.fillText(strings.name, 44, 374);
      g.fillStyle = '#3d3d3d';
      g.font = `400 32px ${fonts.sans}`;
      g.fillText(strings.role, 44, 434);
      g.fillStyle = INK;
      g.fillRect(0, h - 92, w, 92);
      g.fillStyle = '#f5f5f4';
      g.font = `400 28px ${fonts.mono}`;
      g.fillText('jul 2026 —', 44, h - 62);
      g.fillStyle = BRAND;
      g.fillRect(w - 66, h - 56, 20, 20);
    };
  const texture = paint(512, 720, draw(null));
  loadImage(photo)
    .then((image) => {
      repaint(texture, draw(image));
      onChange();
    })
    .catch(() => undefined);
  return texture;
}

export function phoneTexture(fonts: SceneFonts, strings: SceneStrings) {
  return paint(360, 760, (g, w, h) => {
    const shade = g.createLinearGradient(0, 0, w, h);
    shade.addColorStop(0, '#1a1d22');
    shade.addColorStop(1, '#0b0c0f');
    g.fillStyle = shade;
    g.fillRect(0, 0, w, h);
    g.fillStyle = '#000000';
    g.beginPath();
    g.roundRect(w / 2 - 54, 24, 108, 30, 15);
    g.fill();
    g.fillStyle = 'rgba(255,255,255,0.12)';
    g.beginPath();
    g.roundRect(24, h / 2 - 76, w - 48, 152, 32);
    g.fill();
    g.fillStyle = BRAND;
    g.fillRect(50, h / 2 - 48, 22, 22);
    g.fillStyle = '#f5f5f4';
    g.textBaseline = 'middle';
    g.font = `400 26px ${fonts.mono}`;
    g.fillText(strings.message, 86, h / 2 - 36);
    g.fillStyle = '#5b5e64';
    g.fillRect(50, h / 2 + 4, w - 100, 12);
    g.fillRect(50, h / 2 + 34, (w - 100) * 0.62, 12);
  });
}

export function kraftTexture(seed: number) {
  return paint(512, 512, (g, w, h) => {
    const rand = prng(seed);
    g.fillStyle = '#d6b273';
    g.fillRect(0, 0, w, h);
    for (let i = 0; i < 2600; i++) {
      const light = rand() > 0.5;
      g.fillStyle = light ? 'rgba(255, 236, 196, 0.18)' : 'rgba(120, 82, 30, 0.14)';
      g.fillRect(rand() * w, rand() * h, 1 + rand() * 6, 1);
    }
  });
}

export function folderLabelTexture(fonts: SceneFonts, strings: SceneStrings) {
  return paint(520, 176, (g, w) => {
    g.fillStyle = '#f4f2ec';
    g.fillRect(0, 0, w, 176);
    g.fillStyle = INK;
    g.textBaseline = 'top';
    g.font = `800 64px ${fonts.sans}`;
    g.fillText('CV', 28, 22);
    g.fillStyle = BRAND;
    g.fillRect(124, 70, 14, 14);
    g.fillStyle = '#3d3d3d';
    g.font = `400 26px ${fonts.mono}`;
    g.fillText(strings.name.toLowerCase(), 28, 112);
  });
}

export function notebookLabelTexture(fonts: SceneFonts) {
  return paint(384, 176, (g, w, h) => {
    g.fillStyle = '#efede6';
    g.fillRect(0, 0, w, h);
    g.fillStyle = INK;
    g.textBaseline = 'top';
    g.font = `800 72px ${fonts.sans}`;
    g.fillText('UTN', 30, 22);
    g.fillStyle = '#3d3d3d';
    g.font = `400 27px ${fonts.mono}`;
    g.fillText('programación · 2025', 30, 114);
  });
}

export function titleTexture(
  text: string,
  fonts: SceneFonts,
  ink: string,
  width: number,
  height: number,
  size: number,
) {
  return paint(width, height, (g, w, h) => {
    g.fillStyle = ink;
    g.textBaseline = 'middle';
    g.font = `700 ${size}px ${fonts.sans}`;
    g.fillText(text, 8, h / 2 + 2, w - 16);
  });
}

export function photoTexture(url: string, onChange: () => void) {
  const draw =
    (image: HTMLImageElement | null): Draw =>
    (g, w, h) => {
      g.fillStyle = '#f4f2ec';
      g.fillRect(0, 0, w, h);
      const inset = 22;
      const side = w - inset * 2;
      g.fillStyle = '#1b1b1c';
      g.fillRect(inset, inset, side, side);
      if (!image) return;
      const crop = Math.min(image.naturalWidth, image.naturalHeight);
      g.filter = 'grayscale(1) contrast(1.08)';
      g.drawImage(
        image,
        (image.naturalWidth - crop) / 2,
        (image.naturalHeight - crop) / 2,
        crop,
        crop,
        inset,
        inset,
        side,
        side,
      );
      g.filter = 'none';
    };
  const texture = paint(310, 375, draw(null));
  loadImage(url)
    .then((image) => {
      repaint(texture, draw(image));
      onChange();
    })
    .catch(() => undefined);
  return texture;
}
