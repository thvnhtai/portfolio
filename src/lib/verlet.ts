export type Vec3 = { x: number; y: number; z: number };
type Node = { p: Vec3; o: Vec3 };

const SUB = 0.008; // fixed sub-step (s), matches the approved demo's 8 ms
const G = -0.0042, DAMP = 0.982, ITER = 16;

/** Verlet rope with a rigid tail (the badge). Deterministic, no DOM. */
export class Rope {
  private nodes: Node[];
  private tailNode: Node;
  private acc = 0;
  private yawV = 0;
  private yawT = 0;
  yaw = 0.25;

  constructor(private anchor: Vec3, private n: number, private seg: number, private tailLen: number) {
    this.nodes = Array.from({ length: n + 1 }, (_, i) => ({
      p: { x: anchor.x, y: anchor.y - i * seg, z: anchor.z },
      o: { x: anchor.x, y: anchor.y - i * seg, z: anchor.z },
    }));
    const y = anchor.y - n * seg - tailLen;
    this.tailNode = { p: { x: anchor.x + 0.35, y, z: anchor.z + 0.1 }, o: { x: anchor.x + 0.28, y, z: anchor.z } };
  }

  get points(): readonly Vec3[] { return this.nodes.map((k) => k.p); }
  get tail(): Vec3 { return this.tailNode.p; }

  flip() { this.yawT = this.yawT ? 0 : Math.PI; }

  step(dt: number, drag: Vec3 | null = null) {
    this.acc += Math.min(dt, 0.05);
    while (this.acc >= SUB) { this.sub(drag); this.acc -= SUB; }
  }

  private sub(drag: Vec3 | null) {
    const pts = [...this.nodes, this.tailNode];
    const { anchor: a0, n, seg, tailLen } = this;
    for (let i = 1; i < pts.length; i++) {
      const { p, o } = pts[i]!;
      const vx = (p.x - o.x) * DAMP, vy = (p.y - o.y) * DAMP, vz = (p.z - o.z) * DAMP;
      o.x = p.x; o.y = p.y; o.z = p.z;
      p.x += vx; p.y += vy + G; p.z = (p.z + vz) * 0.97;
    }
    const maxLen = n * seg + tailLen + 0.6;
    const pin = () => {
      if (!drag) return;
      let dx = drag.x - a0.x, dy = drag.y - a0.y, dz = drag.z - a0.z;
      const d = Math.hypot(dx, dy, dz);
      if (d > maxLen) { const k = maxLen / d; dx *= k; dy *= k; dz *= k; }
      this.tailNode.p.x = a0.x + dx; this.tailNode.p.y = a0.y + dy; this.tailNode.p.z = a0.z + dz;
    };
    pin();
    for (let k = 0; k < ITER; k++) {
      Object.assign(pts[0]!.p, a0);
      for (let j = 0; j < pts.length - 1; j++) {
        const a = pts[j]!.p, b = pts[j + 1]!.p, last = j === pts.length - 2;
        const dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z;
        const d = Math.hypot(dx, dy, dz) || 1e-6, f = (d - (last ? tailLen : seg)) / d;
        if (j === 0) { b.x -= dx * f; b.y -= dy * f; b.z -= dz * f; }
        else if (last && drag) { a.x += dx * f; a.y += dy * f; a.z += dz * f; }
        else {
          a.x += dx * f * 0.5; a.y += dy * f * 0.5; a.z += dz * f * 0.5;
          b.x -= dx * f * 0.5; b.y -= dy * f * 0.5; b.z -= dz * f * 0.5;
        }
      }
      pin();
    }
    const t = this.tailNode;
    this.yawV += (t.p.x - t.o.x) * 0.5 + (this.yawT - this.yaw) * 0.012;
    this.yawV *= 0.92;
    this.yaw += this.yawV;
  }
}
