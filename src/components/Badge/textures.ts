import * as THREE from 'three';

function canvasTex(w: number, h: number, draw: (x: CanvasRenderingContext2D, w: number, h: number) => void) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d')!, w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}
function rr(x: CanvasRenderingContext2D, X: number, Y: number, w: number, h: number, r: number) {
  x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r);
  x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath();
}

export function loadPhoto(url: string): Promise<HTMLImageElement | null> {
  return new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = url; });
}

export function frontTexture(photo: HTMLImageElement | null) {
  return canvasTex(680, 960, (x, w, h) => {
    x.fillStyle = '#121212'; x.fillRect(0, 0, w, h);
    const g = x.createLinearGradient(0, 0, w, h); g.addColorStop(0, 'rgba(255,255,255,.06)'); g.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = g; x.fillRect(0, 0, w, h);
    x.fillStyle = '#ff4d00'; x.fillRect(0, 0, w, 210);
    x.fillStyle = '#e9e4d8'; rr(x, w / 2 - 70, 40, 140, 30, 15); x.fill();
    x.fillStyle = '#111'; x.font = '800 30px Helvetica Neue, Arial'; x.textAlign = 'center'; x.fillText('ENGINEERING · VISITOR PASS', w / 2, 160);
    const pw = 252, ph = 316, px = w / 2 - pw / 2, py = 236;
    x.save(); rr(x, px, py, pw, ph, 18); x.clip();
    if (photo) {
      const sw = photo.width, sh = photo.width * ph / pw;
      x.drawImage(photo, 0, (photo.height - sh) * 0.35, sw, sh, px, py, pw, ph);
    } else {
      x.fillStyle = '#f2efe8'; x.fillRect(px, py, pw, ph);
      x.fillStyle = '#111'; x.font = '900 110px Helvetica Neue, Arial'; x.fillText('TN', w / 2, py + ph / 2 + 38);
    }
    x.restore();
    x.lineWidth = 6; x.strokeStyle = '#ff4d00'; rr(x, px, py, pw, ph, 18); x.stroke();
    x.fillStyle = '#f2efe8'; x.font = '900 74px Helvetica Neue, Arial'; x.fillText('TAI NGUYEN', w / 2, 650);
    x.fillStyle = '#ff4d00'; x.font = '700 38px Helvetica Neue, Arial'; x.fillText('Fullstack Engineer', w / 2, 704);
    x.fillStyle = '#8a8a8a'; x.font = '600 25px Helvetica Neue, Arial'; x.fillText('HCMC · GMT+7 · ex-GRAB', w / 2, 750);
    x.fillStyle = '#f2efe8'; for (let b = 0; b < 46; b++) if ((b * 7) % 3) x.fillRect(90 + b * 11, 790, (b % 4) + 2, 80);
    x.fillStyle = '#555'; x.font = '600 22px ui-monospace, Menlo, monospace'; x.fillText('ID 2025-0715 · TN-FSE', w / 2, 910);
  });
}

export function backTexture() {
  return canvasTex(680, 960, (x, w, h) => {
    x.fillStyle = '#f2efe8'; x.fillRect(0, 0, w, h);
    x.fillStyle = '#111';
    const q = 21, s = 22, ox = w / 2 - q * s / 2, oy = 150;
    let seed = 7; // deterministic pseudo-random for the QR-style noise
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let r = 0; r < q; r++) for (let c = 0; c < q; c++) {
      const finder = (r < 7 && c < 7) || (r < 7 && c > 13) || (r > 13 && c < 7);
      const ring = finder && !(((r % 14) > 0 && (r % 14) < 6 && (c % 14) > 0 && (c % 14) < 6) && !((r % 14) > 1 && (r % 14) < 5 && (c % 14) > 1 && (c % 14) < 5));
      if (finder ? ring : rnd() < 0.48) x.fillRect(ox + c * s, oy + r * s, s, s);
    }
    x.textAlign = 'center';
    x.font = '800 36px Helvetica Neue, Arial'; x.fillText('linkedin.com/in/tai-nt', w / 2, 700);
    x.fillStyle = '#ff4d00'; x.font = '700 32px Helvetica Neue, Arial'; x.fillText('github.com/thvnhtai', w / 2, 752);
    x.fillStyle = '#777'; x.font = '600 26px Helvetica Neue, Arial'; x.fillText('thanhtaiwork04@gmail.com', w / 2, 800);
    x.fillStyle = '#aaa'; x.font = '600 22px Helvetica Neue, Arial'; x.fillText('double-click to flip back', w / 2, 900);
  });
}

export function strapTexture() {
  const t = canvasTex(1024, 64, (x, w, h) => {
    x.fillStyle = '#ff4d00'; x.fillRect(0, 0, w, h);
    x.fillStyle = 'rgba(0,0,0,.12)'; for (let i = 0; i < w; i += 3) x.fillRect(i, 0, 1, h);
    x.fillStyle = '#111'; x.font = '900 34px Helvetica Neue, Arial'; x.textBaseline = 'middle';
    for (let i = 0; i < 4; i++) x.fillText('TAI NGUYEN ✦ FULLSTACK ✦', i * 256 - 10, h / 2 + 2);
  });
  t.wrapS = THREE.RepeatWrapping;
  return t;
}
