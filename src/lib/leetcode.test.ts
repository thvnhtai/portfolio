import { toHeatmap, ringFraction, sumLastYear, parseStats } from './leetcode';

test('heatmap is 53 weeks and handles empty calendar', () => {
  const h = toHeatmap({}, new Date('2026-10-22T00:00:00Z'));
  expect(h).toHaveLength(371);
  expect(new Date(h[0]!.date).getUTCDay()).toBe(0);
  expect(h.every((d) => d.level === 0)).toBe(true);
});
test('heatmap levels by quartile of max and sums last year', () => {
  const today = new Date('2026-10-22T00:00:00Z');
  const cal = { [String(Date.UTC(2026, 9, 22) / 1000)]: 8, [String(Date.UTC(2026, 9, 21) / 1000)]: 1, [String(Date.UTC(2020, 0, 1) / 1000)]: 5 };
  const h = toHeatmap(cal, today);
  expect(h.find((d) => d.date === '2026-10-22')).toMatchObject({ count: 8, level: 4 });
  expect(h.find((d) => d.date === '2026-10-21')).toMatchObject({ count: 1, level: 1 });
  expect(sumLastYear(cal, today)).toBe(9);
});
test('ringFraction guards zero', () => {
  expect(ringFraction(5, 0)).toBe(0);
  expect(ringFraction(176, 972)).toBeCloseTo(0.181, 3);
  expect(ringFraction(9, 3)).toBe(1);
});
test('parseStats rejects bad shapes', () => {
  expect(parseStats({ total: 'x' })).toBeNull();
  expect(parseStats(null)).toBeNull();
});
