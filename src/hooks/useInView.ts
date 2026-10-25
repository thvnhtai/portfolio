import { useEffect, useRef, useState, type RefObject } from 'react';

export function useInView<T extends Element>(
  opts: { threshold?: number; once?: boolean } = {},
): [ref: RefObject<T>, inView: boolean] {
  const { threshold = 0, once = false } = opts;
  const ref = useRef<T>(null);
  const noIO = typeof IntersectionObserver === 'undefined';
  const [inView, setInView] = useState(noIO);
  useEffect(() => {
    const el = ref.current;
    if (noIO || !el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        setInView(e.isIntersecting);
        if (e.isIntersecting && once) io.disconnect();
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once, noIO]);
  return [ref, inView];
}
