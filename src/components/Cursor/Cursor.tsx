import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import s from './Cursor.module.css';

const coarse = () => typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches;

export function Cursor() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const off = reduce || coarse();
  useEffect(() => {
    if (off) return;
    const el = ref.current!;
    const move = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      el.style.opacity = "1";
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      el.classList.toggle(s.grow!, !!(e.target as Element | null)?.closest?.('a, button, [data-cursor="grow"]'));
    };
    const hide = () => { el.style.opacity = '0'; };
    window.addEventListener('pointermove', move);
    document.documentElement.addEventListener('pointerleave', hide);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', hide);
    };
  }, [off]);
  return off ? null : <div ref={ref} className={s.cur} aria-hidden="true" />;
}
