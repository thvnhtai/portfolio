import { hcmcTime, isProbablyAwake } from './clock';

test('HCMC is UTC+7', () => expect(hcmcTime(new Date('2026-10-22T01:05:09Z'))).toBe('08:05'));
test('seconds optional', () => expect(hcmcTime(new Date('2026-10-22T01:05:09Z'), true)).toBe('08:05:09'));
test('awake at 08:00, asleep at 23:00', () => {
  expect(isProbablyAwake(new Date('2026-10-22T01:00:00Z'))).toBe(true);
  expect(isProbablyAwake(new Date('2026-10-22T16:00:00Z'))).toBe(false);
  expect(isProbablyAwake(new Date('2026-10-22T15:59:00Z'))).toBe(true);
});
