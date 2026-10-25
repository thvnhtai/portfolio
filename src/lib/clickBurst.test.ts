import { expect, test } from 'vitest';
import { createClickBurst } from './clickBurst';

test('fires on the fifth quick click only', () => {
  let t = 0; const b = createClickBurst(5, 1200, () => t);
  expect([0, 1, 2, 3].map(() => { t += 100; return b(); })).toEqual([false, false, false, false]);
  t += 100; expect(b()).toBe(true);
  t += 100; expect(b()).toBe(false);
});
test('slow clicks reset', () => {
  let t = 0; const b = createClickBurst(5, 1200, () => t);
  for (let i = 0; i < 4; i++) { t += 100; b(); }
  t += 2000; expect(b()).toBe(false);
});
