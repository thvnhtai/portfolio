import { useCallback, useEffect, useRef } from 'react';
import { useLang } from '../../i18n/LangProvider';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useToast } from '../Toast/Toast';

const FALL = 1200, BACK = 900, MAX_DELAY = 400;

export function useGravity(): () => void {
  const reduce = useReducedMotion();
  const toast = useToast();
  const { t } = useLang();
  const running = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const restore = useRef<(() => void) | null>(null);

  useEffect(() => () => {
    timers.current.forEach(clearTimeout);
    restore.current?.();
  }, []);

  return useCallback(() => {
    if (reduce || running.current || document.querySelector('[role="dialog"][aria-modal]')) return;
    const vh = window.innerHeight, vw = window.innerWidth;
    const items = [...document.querySelectorAll<HTMLElement>('[data-gravity]')]
      .map((el) => ({ el, r: el.getBoundingClientRect() }))
      .filter(({ r }) => r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < vh && r.right > 0 && r.left < vw);
    if (!items.length) return;
    const els = items.map((i) => i.el);
    running.current = true;
    toast(t.toast.gravity);
    const saved = els.map((el) => ({
      el,
      tr: el.style.getPropertyValue('transform'),
      ts: el.style.getPropertyValue('transition'),
      td: el.style.getPropertyValue('transition-delay'),
    }));
    restore.current = () => {
      saved.forEach(({ el, tr, ts, td }) => {
        el.style.setProperty('transform', tr); // '' removes the property
        el.style.setProperty('transition', ts); // shorthand first: it resets the delay longhand
        el.style.setProperty('transition-delay', td);
      });
      restore.current = null;
      running.current = false;
    };
    const later = (fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); };
    items.forEach(({ el, r }) => {
      const d = Math.random() * MAX_DELAY;
      const drop = vh - r.top + 40;
      el.style.transition = `transform ${FALL}ms ease-in ${d}ms`;
      el.style.transform = `translateY(${drop}px) rotate(${(Math.random() - 0.5) * 60}deg)`;
    });
    later(() => {
      els.forEach((el) => {
        el.style.transition = `transform ${BACK}ms cubic-bezier(.34,1.56,.64,1)`;
        el.style.transform = 'none';
      });
      later(() => restore.current?.(), BACK + 50);
    }, FALL + MAX_DELAY + 50);
  }, [reduce, toast, t]);
}
