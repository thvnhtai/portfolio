import { createDoubleTap } from './doubleTap';

const tap = (t: number, x = 0, y = 0, moved = false) => ({ t, x, y, moved });

test('two quick taps flip once; third starts a new pair', () => {
  const d = createDoubleTap();
  expect(d(tap(0))).toBe(false);
  expect(d(tap(100))).toBe(true);
  expect(d(tap(150))).toBe(false);
  expect(d(tap(200))).toBe(true);
});
test('slow, far, or dragged taps do not flip', () => {
  const d = createDoubleTap();
  d(tap(0));
  expect(d(tap(400))).toBe(false);
  expect(d(tap(450, 100, 0))).toBe(false);
  expect(d(tap(500, 100, 0, true))).toBe(false);
  expect(d(tap(550, 100, 0))).toBe(false);
});
