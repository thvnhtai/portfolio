import { useEffect, useState } from 'react';

const Q = '(prefers-reduced-motion: reduce)';
const mq = () => (typeof window.matchMedia === 'function' ? window.matchMedia(Q) : null);

export function useReducedMotion(): boolean {
  const [on, setOn] = useState(() => mq()?.matches ?? false);
  useEffect(() => {
    const m = mq();
    if (!m) return;
    const h = () => setOn(m.matches);
    h();
    m.addEventListener('change', h);
    return () => m.removeEventListener('change', h);
  }, []);
  return on;
}
