import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLang } from '../../i18n/LangProvider';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { HOW_STEPS } from '../../content/how';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import s from './HowIWork.module.css';

const ROW_H = 72; // fallback only; real dot positions are measured from the rows
const N = HOW_STEPS.length;
const DOT = 12; // dot offset from row top
const FALLBACK = HOW_STEPS.map((_, i) => i * ROW_H + DOT);
const COND = '(min-width: 721px) and (prefers-reduced-motion: no-preference)';

function paths(ys: number[]) {
  const y = ys as [number, number, number, number, number, number];
  const main = `M36 ${y[0] - 4} V${y[5] + 8}`;
  const c = (ya: number, yb: number, xa: number, xb: number) => { const d = yb - ya; return `C${xa} ${ya + d * 0.7} ${xb} ${yb - d * 0.4} ${xb} ${yb}`; };
  const branch = `M36 ${y[1]} ${c(y[1], y[2], 36, 80)} V${y[3]} ${c(y[3], y[4], 80, 36)}`;
  return { main, branch };
}
const ORANGE = '#ff4d00';
const BLUE = '#1f6feb';

export function HowIWork() {
  const { t, lang } = useLang();
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const rowsEl = useRef<HTMLDivElement>(null);
  const mainPath = useRef<SVGPathElement>(null);
  const branchPath = useRef<SVGPathElement>(null);
  const apply = useRef<(p: number) => void>(() => {});
  const [step, setStep] = useState(N - 1); // all lit unless the pinned path takes over
  const [geo, setGeo] = useState({ y: FALLBACK, h: ROW_H * N });
  const animated = !reduce && typeof window.matchMedia === 'function';

  // measure real row positions (rows wrap, so heights vary)
  useLayoutEffect(() => {
    const el = rowsEl.current;
    if (!el) return;
    const measure = () => {
      const rows = Array.from(el.querySelectorAll<HTMLElement>('[data-row]'));
      const y = rows.map((r) => r.offsetTop + DOT);
      const h = el.offsetHeight;
      setGeo((g) => (g.h === h && g.y.length === y.length && g.y.every((v, i) => v === y[i]) ? g : { y, h }));
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [lang]);

  // re-apply drawing after paths change
  useLayoutEffect(() => { apply.current(-1); }, [geo]);

  useLayoutEffect(() => {
    if (!animated || !root.current) return;
    const mm = gsap.matchMedia(root.current);
    mm.add(COND, () => {
      let progress = 0;
      const draw = (p: number) => {
        const m = mainPath.current, b = branchPath.current;
        if (!m || !b || !m.getTotalLength) return;
        if (p >= 0) progress = p; else p = progress;
        const ml = m.getTotalLength(), bl = b.getTotalLength();
        m.style.strokeDasharray = String(ml); b.style.strokeDasharray = String(bl);
        m.style.strokeDashoffset = String(ml * (1 - Math.min(1, p * 1.15)));
        b.style.strokeDashoffset = String(bl * (1 - Math.max(0, Math.min(1, (p * 6.4 - 1.5) / 2.6))));
        setStep(p > 0.01 ? Math.min(N - 1, Math.floor(p * 6.4)) : 0);
      };
      apply.current = draw;
      draw(0);
      ScrollTrigger.create({
        trigger: root.current, start: 'top top', end: '+=2600', pin: true, scrub: true, invalidateOnRefresh: true,
        onUpdate: (self) => draw(self.progress),
        onRefresh: (self) => draw(self.progress),
      });
      return () => {
        apply.current = () => {};
        [mainPath.current, branchPath.current].forEach((e) => e && (e.style.strokeDasharray = e.style.strokeDashoffset = ''));
        setStep(N - 1);
      };
    });
    return () => mm.revert();
  }, [animated]);

  // layout can change after fonts load or the language swaps
  useEffect(() => {
    if (!animated) return;
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [animated, lang]);
  useEffect(() => {
    if (!animated) return;
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, [animated]);

  const { main, branch } = paths(geo.y);
  const h = t.how;
  return (
    <div ref={root} className={s.ga}>
      <div className={s.pin}>
        <div className={s.l}>
          <small data-i18n>{h.kicker}</small>
          <h2 data-gravity>git log --how-i-work<span data-accent>.</span></h2>
          <p data-i18n>{h.note}</p>
          <code>$ git log --graph --oneline</code>
        </div>
        <div className={s.g} ref={rowsEl}>
          <svg width="110" height={geo.h} aria-hidden="true">
            <path d={main} stroke="#30363d" strokeWidth="3" fill="none" />
            <path ref={mainPath} d={main} stroke={ORANGE} strokeWidth="3" fill="none" />
            <path d={branch} stroke="#30363d" strokeWidth="3" fill="none" />
            <path ref={branchPath} d={branch} stroke={BLUE} strokeWidth="3" fill="none" />
            {HOW_STEPS.map((x, i) => {
              const c = x.branch === 'feature' ? BLUE : ORANGE;
              const on = i <= step;
              return <circle key={x.id} cx={x.branch === 'feature' ? 80 : 36} cy={geo.y[i]} r="8" fill={on ? c : '#0d1117'} stroke={on ? c : '#30363d'} strokeWidth="3" />;
            })}
          </svg>
          {HOW_STEPS.map((x, i) => (
            <div key={x.id} data-row data-on={i <= step} className={`${s.row} ${i <= step ? s.on : ''}`}>
              <div className={s.h}>{x.hash}<em>{x.branch === 'feature' ? '(feature/account-workflows)' : '(main)'}</em>{x.merge && <b>merge ✓</b>}</div>
              <div className={s.m}>{x.commit}</div>
              <div className={s.d} data-i18n><b>{h.steps[x.id].title}.</b> {h.steps[x.id].body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
