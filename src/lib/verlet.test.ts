import { Rope } from './verlet';

test('rope settles to its rest length under gravity', () => {
  const r = new Rope({ x: 0, y: 0, z: 0 }, 12, 0.24, 1.52);
  for (let i = 0; i < 2000; i++) r.step(1 / 120);
  const len = r.points.slice(1).reduce((s, p, i) => s + Math.hypot(p.x - r.points[i]!.x, p.y - r.points[i]!.y, p.z - r.points[i]!.z), 0);
  expect(len).toBeCloseTo(12 * 0.24, 1);
  expect(r.tail.y).toBeLessThan(r.points[12]!.y);
});
test('drag is clamped to max reach', () => {
  const r = new Rope({ x: 0, y: 0, z: 0 }, 12, 0.24, 1.52);
  r.step(1 / 120, { x: 100, y: 0, z: 0 });
  expect(Math.hypot(r.tail.x, r.tail.y)).toBeLessThanOrEqual(12 * 0.24 + 1.52 + 0.61);
});
test('flip drives yaw toward PI', () => {
  const r = new Rope({ x: 0, y: 0, z: 0 }, 12, 0.24, 1.52);
  r.flip();
  for (let i = 0; i < 3000; i++) r.step(1 / 120);
  expect(r.yaw).toBeCloseTo(Math.PI, 1);
});
test('flip twice returns toward 0', () => {
  const r = new Rope({ x: 0, y: 0, z: 0 }, 12, 0.24, 1.52);
  r.flip(); r.flip();
  for (let i = 0; i < 3000; i++) r.step(1 / 120);
  expect(r.yaw).toBeCloseTo(0, 1);
});
