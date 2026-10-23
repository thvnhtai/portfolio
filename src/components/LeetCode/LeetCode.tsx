import { useEffect, useMemo, useState } from 'react';
import { useLang } from '../../i18n/LangProvider';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { parseStats, ringFraction, sumLastYear, toHeatmap, type LeetCodeStats } from '../../lib/leetcode';
import s from './LeetCode.module.css';

const PROFILE = 'https://leetcode.com/u/thvnhtai';
const R = 40;
const C = 2 * Math.PI * R;

/** rAF count-up with a timestamp-based ease; returns the final value when not animating. */
function useCountUp(target: number, run: boolean, still: boolean, dur = 1400): number {
  const [v, setV] = useState(still ? target : 0);
  useEffect(() => {
    if (still) { setV(target); return; }
    if (!run) return;
    let raf = 0, t0: number | undefined;
    const tick = (now: number) => {
      t0 ??= now;
      const p = Math.min(1, (now - t0) / dur);
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, still, dur]);
  return v;
}

function Count({ to, run, still }: { to: number; run: boolean; still: boolean }) {
  return <>{useCountUp(to, run, still)}</>;
}

function Ring({ label, solved, total, color, on }: { label: string; solved: number; total: number; color: string; on: boolean }) {
  const { t } = useLang();
  return (
    <div className={s.ring}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r={R} stroke="#e5e0d6" />
        <circle cx="50" cy="50" r={R} stroke={color} strokeLinecap="round" strokeDasharray={C}
          strokeDashoffset={on ? C * (1 - ringFraction(solved, total)) : C} className={s.arc} />
      </svg>
      <b>{solved}</b>
      <span>{label}</span>
      <small>{t.leetcode.of} {total}</small>
    </div>
  );
}

function Scoreboard({ d }: { d: LeetCodeStats }) {
  const { t, lang } = useLang();
  const reduce = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25, once: true });
  const run = inView && !reduce;
  const on = inView || reduce;
  const today = useMemo(() => new Date(), []);
  const cells = useMemo(() => toHeatmap(d.calendar, today), [d.calendar, today]);
  const year = useMemo(() => sumLastYear(d.calendar, today), [d.calendar, today]);
  const months = useMemo(() => {
    const out: { col: number; name: string }[] = [];
    let prev = -1;
    for (let w = 0; w < cells.length / 7; w++) {
      const m = new Date(cells[w * 7]!.date).getUTCMonth();
      if (m !== prev) { out.push({ col: w + 1, name: new Date(cells[w * 7]!.date).toLocaleString(lang === 'vi' ? 'vi' : 'en', { month: 'short', timeZone: 'UTC' }) }); prev = m; }
    }
    return out;
  }, [cells, lang]);
  const L = t.leetcode;
  return (
    <div className={s.sb} ref={ref}>
      <h2 data-gravity className={s.kicker}>{L.kicker}</h2>
      <div className={s.row1}>
        <div data-gravity className={s.big}>
          <span><Count to={d.total} run={run} still={reduce} /></span>
          <small>{L.solved}{d.ranking !== null && <> · #{d.ranking.toLocaleString('en-US')} {L.ranking}</>}</small>
        </div>
        <div className={s.rings}>
          <Ring label={L.easy} solved={d.easy} total={d.allEasy} color="#16a34a" on={on} />
          <Ring label={L.medium} solved={d.medium} total={d.allMedium} color="#eab308" on={on} />
          <Ring label={L.hard} solved={d.hard} total={d.allHard} color="#ef4444" on={on} />
        </div>
      </div>
      <div className={s.meta}>
        <div><b><Count to={d.streak} run={run} still={reduce} /></b>{L.streak}</div>
        <div><b><Count to={d.activeDays} run={run} still={reduce} /></b>{L.activeDays}</div>
        <div><b><Count to={year} run={run} still={reduce} /></b>{L.lastYear}</div>
        {d.contestRating !== null && <div><b>{d.contestRating}</b>{L.contest}</div>}
      </div>
      <p className={s.sr}>{year} {L.lastYear}</p>
      <div aria-hidden="true">
        <div className={`${s.hm} ${on ? s.on : ''}`}>
          {cells.map((c, i) => (
            <i key={c.date} className={s[`l${c.level}`]} style={{ transitionDelay: reduce ? '0s' : `${Math.floor(i / 7) * 12}ms` }} />
          ))}
        </div>
        <div className={s.months}>
          {months.map((m) => <span key={m.col} style={{ gridColumn: m.col }}>{m.name}</span>)}
        </div>
      </div>
      <a className={s.link} href={PROFILE} target="_blank" rel="noopener noreferrer">{L.profile}</a>
    </div>
  );
}

export function LeetCode() {
  const { t } = useLang();
  const [data, setData] = useState<LeetCodeStats | null | undefined>(undefined);
  useEffect(() => {
    let live = true;
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}data/leetcode.json`);
        if (!res.ok) throw new Error(String(res.status));
        const parsed = parseStats(await res.json());
        if (live) setData(parsed);
      } catch {
        if (live) setData(null);
      }
    })();
    return () => { live = false; };
  }, []);
  if (data === undefined) return <div className={s.root} aria-busy="true" />;
  return (
    <div className={s.root}>
      {data ? <Scoreboard d={data} /> : (
        <a className={s.fallback} href={PROFILE} target="_blank" rel="noopener noreferrer">{t.leetcode.unavailable}</a>
      )}
    </div>
  );
}
