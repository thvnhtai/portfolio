export type Tap = { t: number; x: number; y: number; moved: boolean };

/** Returns true on the second of two quick, close, non-dragged taps; then resets. */
export function createDoubleTap(windowMs = 300, maxDist = 24) {
  let last: Tap | null = null;
  return (e: Tap): boolean => {
    if (e.moved) { last = null; return false; }
    if (last && e.t - last.t < windowMs && Math.hypot(e.x - last.x, e.y - last.y) < maxDist) { last = null; return true; }
    last = e;
    return false;
  };
}
