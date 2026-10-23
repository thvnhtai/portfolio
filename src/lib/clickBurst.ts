export function createClickBurst(count: number, windowMs: number, now: () => number): () => boolean {
  let n = 0;
  let last = -Infinity;
  return () => {
    const t = now();
    n = t - last <= windowMs ? n + 1 : 1;
    last = t;
    if (n >= count) { n = 0; return true; }
    return false;
  };
}
