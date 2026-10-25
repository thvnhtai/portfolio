import { shouldPlayPreloader, markPreloaded } from './session';
test('plays first time only', () => {
  const s = new Map<string, string>();
  const st = { getItem: (k: string) => s.get(k) ?? null, setItem: (k: string, v: string) => void s.set(k, v) };
  expect(shouldPlayPreloader(st, false)).toBe(true);
  markPreloaded(st);
  expect(shouldPlayPreloader(st, false)).toBe(false);
});
test('never under reduced motion', () => expect(shouldPlayPreloader(null, true)).toBe(false));
test('plays when storage is unavailable', () => expect(shouldPlayPreloader(null, false)).toBe(true));
