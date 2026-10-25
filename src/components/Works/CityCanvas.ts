import { CASES } from '../../content/cases';
import type { CaseSlug } from '../../content/types';
import { buildingBox, hitTest, iso, isRoad, type Box, type IsoOrigin } from '../../lib/iso';

export type City = { start(): void; stop(): void; highlight(slug: CaseSlug | null): void; zoomTo(slug: CaseSlug): Promise<void>; origin(slug: CaseSlug): { x: number; y: number } | null; anchor(slug: CaseSlug): { x: number; y: number } | null; dispose(): void };
type Handlers = { onHover(slug: CaseSlug | null): void; onPick(slug: CaseSlug, origin: { x: number; y: number }): void };
type Obj = { a: number; b: number; h: number; c: string; slug?: CaseSlug; tree?: boolean; lift: number; box?: Box };

const G = 10, TW = 70, TH = 35;

function shade(hex: string, f: number) {
  const n = parseInt(hex.slice(1), 16);
  const c = (v: number) => Math.min(255, Math.round(v * f));
  return `rgb(${c(n >> 16)},${c((n >> 8) & 255)},${c(n & 255)})`;
}

export function createCity(canvas: HTMLCanvasElement, { onHover, onPick }: Handlers, opts: { animate?: boolean } = {}): City {
  const ctx = canvas.getContext('2d');
  if (!ctx) return { start() {}, stop() {}, highlight() {}, zoomTo: () => Promise.resolve(), origin: () => null, anchor: () => null, dispose() {} };
  const animate = opts.animate ?? true;
  const x = ctx;

  let seed = 7;
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  const objs: Obj[] = [];
  for (let a = 0; a < G; a++) for (let b = 0; b < G; b++) {
    if (isRoad(a, b)) continue;
    const idx = CASES.findIndex((c) => c.city.a === a && c.city.b === b);
    if (idx >= 0) objs.push({ a, b, h: CASES[idx]!.city.h, c: CASES[idx]!.color, slug: CASES[idx]!.slug, lift: 0 });
    else if (rnd() < 0.45) objs.push({ a, b, h: 12 + rnd() * 30, c: '#d6cfbf', lift: 0 });
    else if (rnd() < 0.5) objs.push({ a, b, h: 0, c: '', tree: true, lift: 0 });
  }
  const bikes = Array.from({ length: 10 }, (_, i) => ({ line: i % 4, t: rnd() * G, v: (rnd() < 0.5 ? -1 : 1) * (0.015 + rnd() * 0.02) }));

  let w = 0, h = 0, o: IsoOrigin = { x: 0, y: 90, tw: TW, th: TH };
  let hover: CaseSlug | null = null, forced: CaseSlug | null = null, zoomed = false, raf = 0, running = false;

  function resize() {
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    w = r.width || 800; h = r.height || 440;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    o = { x: w * 0.6, y: 90, tw: TW, th: TH };
  }

  function drawBox(a: number, b: number, hh: number, col: string, hi: boolean) {
    const i = 0.14;
    const N = iso(a + i, b + i, o), E = iso(a + 1 - i, b + i, o), S = iso(a + 1 - i, b + 1 - i, o), W = iso(a + i, b + 1 - i, o);
    const quad = (f: string, p: { x: number; y: number }[]) => { x.fillStyle = f; x.beginPath(); p.forEach((q, k) => (k ? x.lineTo(q.x, q.y) : x.moveTo(q.x, q.y))); x.closePath(); x.fill(); };
    quad(shade(col, 0.8), [W, S, { x: S.x, y: S.y - hh }, { x: W.x, y: W.y - hh }]);
    quad(shade(col, 0.62), [S, E, { x: E.x, y: E.y - hh }, { x: S.x, y: S.y - hh }]);
    quad(shade(col, col === '#111111' ? 2.4 : 1), [{ x: N.x, y: N.y - hh }, { x: E.x, y: E.y - hh }, { x: S.x, y: S.y - hh }, { x: W.x, y: W.y - hh }]);
    if (hi) { x.strokeStyle = '#ff4d00'; x.lineWidth = 3; x.stroke(); }
    if (col !== '#d6cfbf' && hh > 50) {
      x.fillStyle = 'rgba(255,255,255,.35)';
      for (let k = 14; k < hh - 8; k += 14) { x.fillRect(W.x + 7, W.y - k - 4 + (S.y - W.y) * 0.25, 5, 6); x.fillRect(W.x + 18, W.y - k - 4 + (S.y - W.y) * 0.55, 5, 6); }
    }
  }

  function frame(t: number) {
    x.clearRect(0, 0, w, h);
    for (let a = 0; a < G; a++) for (let b = 0; b < G; b++) {
      const N = iso(a, b, o), E = iso(a + 1, b, o), S = iso(a + 1, b + 1, o), W = iso(a, b + 1, o);
      x.fillStyle = isRoad(a, b) ? '#3a3a3a' : (a + b) % 2 ? '#e5dfd0' : '#ddd6c5';
      x.beginPath(); x.moveTo(N.x, N.y); x.lineTo(E.x, E.y); x.lineTo(S.x, S.y); x.lineTo(W.x, W.y); x.fill();
      if (isRoad(a, b)) { const c = iso(a + 0.5, b + 0.5, o); x.fillStyle = '#f2efe8'; x.fillRect(c.x - 3, c.y - 1, 6, 2); }
    }
    type D = { k: number; o?: Obj; bike?: { a: number; b: number } };
    const draw: D[] = objs.map((ob) => ({ k: ob.a + ob.b, o: ob }));
    if (animate) bikes.forEach((k) => {
      k.t += k.v; if (k.t > G) k.t = 0; if (k.t < 0) k.t = G;
      const [a, b] = k.line === 0 ? [4.5, k.t] : k.line === 1 ? [k.t, 4.5] : k.line === 2 ? [k.t, 8.5] : [8.5, k.t];
      draw.push({ k: a + b - 0.5, bike: { a, b } });
    });
    draw.sort((p, q) => p.k - q.k);
    const hl = forced ?? hover;
    for (const d of draw) {
      if (d.bike) {
        const p = iso(d.bike.a, d.bike.b, o);
        x.fillStyle = '#00b14f'; x.beginPath(); x.ellipse(p.x, p.y - 6, 6, 4, 0, 0, 7); x.fill();
        x.fillStyle = '#111'; x.beginPath(); x.arc(p.x, p.y - 12, 3.2, 0, 7); x.fill();
        continue;
      }
      const ob = d.o!;
      if (ob.tree) {
        const p = iso(ob.a + 0.5, ob.b + 0.5, o);
        x.fillStyle = '#6b4a2b'; x.fillRect(p.x - 1.5, p.y - 10, 3, 10);
        x.fillStyle = '#3f8f4a'; x.beginPath(); x.arc(p.x, p.y - 16, 9, 0, 7); x.fill();
        continue;
      }
      const target = ob.slug && ob.slug === hl ? 14 : 0;
      ob.lift = running ? ob.lift + (target - ob.lift) * 0.15 : target; // snap when no loop is easing it
      const hh = ob.h + (ob.slug ? (animate ? Math.sin(t * 2 + ob.a) * 2 : 0) + ob.lift : 0);
      drawBox(ob.a, ob.b, hh, ob.c, !!ob.slug && ob.slug === hl);
      if (ob.slug) {
        ob.box = buildingBox(ob.a, ob.b, hh, o);
        const pin = ob.box.top - 12 + (animate ? Math.sin(t * 3 + ob.b) * 3 : 0);
        x.beginPath(); x.arc(ob.box.cx, pin, 9, 0, 7); x.fillStyle = ob.c === '#111111' ? '#ff4d00' : '#111'; x.fill();
        x.fillStyle = '#fff'; x.font = '800 10px Helvetica Neue, Arial'; x.textAlign = 'center';
        x.fillText(String(CASES.findIndex((c) => c.slug === ob.slug) + 1), ob.box.cx, pin + 3.5);
      }
    }
  }

  const loop = (ms: number) => { frame(ms / 1000); if (running) raf = requestAnimationFrame(loop); };
  const boxes = () => objs.filter((ob) => ob.slug && ob.box).map((ob) => ({ slug: ob.slug!, box: ob.box! }));
  const local = (e: PointerEvent | MouseEvent) => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  const originOf = (slug: CaseSlug) => {
    const r = canvas.getBoundingClientRect(), b = objs.find((ob) => ob.slug === slug)?.box;
    return b ? { x: r.left + b.cx, y: r.top + b.top + 40 } : { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  };

  const onMove = (e: PointerEvent) => {
    if (zoomed) return;
    const m = local(e), s = hitTest(boxes(), m.x, m.y);
    if (s !== hover) { hover = s; canvas.style.cursor = s ? 'pointer' : ''; onHover(s); if (!running) frame(0); }
  };
  const onLeave = () => { if (hover) { hover = null; onHover(null); if (!running) frame(0); } };
  const onClick = (e: MouseEvent) => {
    if (zoomed) return;
    const m = local(e), s = hitTest(boxes(), m.x, m.y);
    if (s) onPick(s, originOf(s));
  };
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerleave', onLeave);
  canvas.addEventListener('click', onClick);

  let ro: ResizeObserver | undefined;
  if (typeof ResizeObserver !== 'undefined') ro = new ResizeObserver(() => { resize(); if (!running) frame(0); });
  ro?.observe(canvas);
  resize();
  frame(0);

  return {
    start() { if (!animate || running) return; running = true; raf = requestAnimationFrame(loop); },
    stop() { running = false; cancelAnimationFrame(raf); },
    origin: (slug) => originOf(slug),
    anchor(slug) { const b = objs.find((ob) => ob.slug === slug)?.box; return b ? { x: b.cx, y: b.top - 14 } : null; },
    dispose() {
      running = false; cancelAnimationFrame(raf); ro?.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('click', onClick);
    },
    highlight(slug) { forced = slug; if (!running) frame(0); },
    zoomTo(slug) {
      if (!animate) return Promise.resolve();
      zoomed = true;
      const b = objs.find((ob) => ob.slug === slug)?.box;
      if (b) {
        canvas.style.transformOrigin = `${b.cx}px ${b.top + 40}px`;
        canvas.style.transition = 'transform 0.9s cubic-bezier(.6,0,.2,1)';
        canvas.style.transform = 'scale(4.5)';
      }
      return new Promise((res) => setTimeout(() => {
        // reset after the case overlay has taken over
        setTimeout(() => { canvas.style.transition = 'none'; canvas.style.transform = ''; zoomed = false; }, 400);
        res();
      }, 900));
    },
  };
}
