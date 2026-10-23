import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { useLang } from '../../i18n/LangProvider';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useRoute } from '../../hooks/useRoute';
import { TIMELINE } from '../../content/timeline';
import type { TimelineEvent } from '../../content/types';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import s from './Timeline.module.css';

const COND = '(min-width: 721px) and (prefers-reduced-motion: no-preference)';

export function groupByYear(events: TimelineEvent[]): Map<number, TimelineEvent[]> {
  const m = new Map<number, TimelineEvent[]>();
  for (const e of events) m.set(e.year, [...(m.get(e.year) ?? []), e]);
  return m;
}

const GROUPS = [...groupByYear(TIMELINE)];
const YEARS = GROUPS.map(([y]) => y);

export function Timeline() {
  const { t, lang } = useLang();
  const { openCase } = useRoute();
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false); // true only while the pinned/scrubbed stage is really on (desktop + motion)
  const animated = !reduce && typeof window.matchMedia === 'function';

  useLayoutEffect(() => {
    if (!animated || !root.current) return;
    const mm = gsap.matchMedia(root.current);
    mm.add(COND, () => {
      setPinned(true);
      ScrollTrigger.create({
        trigger: root.current, start: 'top top', end: '+=2200', pin: true, scrub: true, invalidateOnRefresh: true,
        onUpdate: (self) => setActive(Math.min(YEARS.length - 1, Math.floor(self.progress * (YEARS.length + 0.2)))),
      });
      return () => { setActive(0); setPinned(false); };
    });
    return () => mm.revert();
  }, [animated]);

  useEffect(() => {
    if (!animated) return;
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [animated, lang]);
  useEffect(() => {
    if (!animated) return;
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, [animated]);

  const tl = t.timeline;
  const card = (e: TimelineEvent, st?: CSSProperties, stage = false) => {
    const c = tl.cards[e.id];
    const inner = (
      <>
        <small>{e.dateLabel[lang]}</small>
        <b data-i18n>{c.title}</b>
        <em data-i18n>{c.sub}</em>
        <span data-i18n>{c.body}</span>
        {e.caseSlug && <i className={s.go} aria-hidden="true">→</i>}
      </>
    );
    return e.caseSlug ? (
      <button key={e.id} data-gravity type="button" className={s.card} style={st} tabIndex={stage ? -1 : undefined} onClick={() => openCase(e.caseSlug!)}>{inner}</button>
    ) : (
      <div key={e.id} data-gravity className={s.card} style={st}>{inner}</div>
    );
  };
  return (
    <div ref={root} className={s.tl} data-anim={animated}>
      <div className={s.pin}>
        <h2 data-gravity className={s.kick} data-i18n>{tl.kicker}</h2>
        <div className={s.year} aria-hidden="true">
          <span>202</span>
          <span className={s.digit}>
            <span className={s.roll} data-active={active} style={{ transform: `translateY(${-active * (100 / YEARS.length)}%)` }}>
              {YEARS.map((y) => <span key={y}>{y % 10}</span>)}
            </span>
          </span>
        </div>
        {/* pinned: the visual stage only shows one year at a time, so it is aria-hidden and a full sr-only list carries the content */}
        <div className={s.ev} aria-hidden={pinned || undefined}>
          {GROUPS.map(([y, evs], i) => (
            <div key={y} className={s.group} data-year={y} data-active={i === active}>
              <h3 className={s.yh}>{y}</h3>
              {evs.map((e, j) => card(e, i === active ? { transitionDelay: `${80 + j * 140}ms` } : undefined, pinned))}
            </div>
          ))}
        </div>
        {pinned && (
          <ol className={s.sr} data-testid="timeline-sr">
            {GROUPS.map(([y, evs]) => (
              <li key={y}><h3>{y}</h3>{evs.map((e) => card(e))}</li>
            ))}
          </ol>
        )}
        <div className={s.ruler} aria-hidden="true">
          {YEARS.map((y, i) => <span key={y} data-on={i === active}>{y}</span>)}
        </div>
      </div>
    </div>
  );
}
