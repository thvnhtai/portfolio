const CHARS = '!<>-_\\/[]{}=+*^?#01abcdef';

export function scrambleFrame(target: string, frame: number, rand: () => number): string {
  if (frame >= target.length * 2) return target;
  return [...target].map((c, i) => (i < frame / 2 || c === '@' || c === '.' ? c : CHARS[Math.floor(rand() * CHARS.length)])).join('');
}
