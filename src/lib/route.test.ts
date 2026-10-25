import { parseHash, caseHash } from './route';
test('case route', () => expect(parseHash('#/work/invoicing-portal')).toEqual({ kind: 'case', slug: 'invoicing-portal' }));
test('unknown slug is home', () => expect(parseHash('#/work/nope')).toEqual({ kind: 'home' }));
test('empty is home', () => expect(parseHash('')).toEqual({ kind: 'home' }));
test('caseHash', () => expect(caseHash('voucher-dashboard')).toBe('#/work/voucher-dashboard'));
