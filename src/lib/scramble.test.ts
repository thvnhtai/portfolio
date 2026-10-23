import { scrambleFrame } from './scramble';
test('scramble resolves to target', () => expect(scrambleFrame('a@b.c', 10, () => 0)).toBe('a@b.c'));
test('scramble keeps @ and . fixed', () => {
  const f = scrambleFrame('ab@cd.ef', 0, () => 0.5);
  expect(f[2]).toBe('@');
  expect(f[5]).toBe('.');
});
test('first chars resolve as frames advance', () => expect(scrambleFrame('abcd', 4, () => 0).slice(0, 2)).toBe('ab'));
