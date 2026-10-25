import { en } from './en'; import { vi } from './vi';
import { CASES } from './cases'; import { SKILLS } from './skills'; import { TIMELINE } from './timeline';
const strings = (o: unknown): string[] => typeof o === 'string' ? [o] : Array.isArray(o) || (o && typeof o === 'object') ? Object.values(o as object).flatMap(strings) : [];

test('every case has EN and VI copy', () => {
  for (const c of CASES) { expect(en.cases[c.slug].lead).toBeTruthy(); expect(vi.cases[c.slug].lead).toBeTruthy(); }
});
test('no empty strings in either language', () => {
  expect(strings(en).filter(s => !s.trim())).toEqual([]);
  expect(strings(vi).filter(s => !s.trim())).toEqual([]);
});
test('no phone number anywhere', () => {
  expect([...strings(en), ...strings(vi)].join(' ')).not.toMatch(/(\+84|\b0)\d[\s.-]?\d{2,3}[\s.-]?\d{3}[\s.-]?\d{3}/);
});
test('no percentages in copy', () => {
  expect([...strings(en), ...strings(vi)].join(' ')).not.toMatch(/\d+\s?%/);
});
test('exactly five cases with the fixed slugs and colours', () => {
  expect(CASES.map(c => [c.slug, c.color])).toEqual([
    ['zen-ledger-portal', '#ff4d00'], ['invoicing-portal', '#111111'], ['universal-config-management', '#6d28d9'],
    ['voucher-dashboard', '#0891b2'], ['cloud-native-ecommerce', '#16a34a']]);
});
test('skills come from the CV list', () => {
  for (const s of ['React','Next.js','TypeScript','Go','gRPC','MySQL','Redis','Module Federation','Kubernetes','Claude Code','Cursor'])
    expect(SKILLS.map(k => k.name)).toContain(s);
});
test('timeline is in date order and job stops link to cases', () => {
  expect(TIMELINE.map(e => e.id)).toEqual(['uit-start','uit-2023','toeic-lr','tma','grab-intern','grab-swe','toeic-sw','graduated','now']);
  expect(TIMELINE.find(e => e.id === 'grab-swe')?.caseSlug).toBe('zen-ledger-portal');
});
