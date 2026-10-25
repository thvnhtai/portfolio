import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { CASES } from '../../content/cases';
import type { LearningTopic, StepState } from '../../content/types';
import { useLang } from '../../i18n/LangProvider';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useRoute } from '../../hooks/useRoute';
import { storeCaseOrigin } from '../../lib/route';
import s from './NowLearning.module.css';

const DENSE = 8; // more steps than this render as a thin bar (chapters) instead of named chips
const STATES: StepState[] = ['done', 'now', 'next', 'light'];

export function NowLearning() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const { openCase } = useRoute();
  const { topics, legend } = t.learning;
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const select = (i: number) => {
    refs.current[i]?.focus();
    if (i === active && !loading) return;
    setActive(i);
    clearTimeout(timer.current);
    if (reduce) { setShown(i); setLoading(false); return; }
    setLoading(true);
    timer.current = setTimeout(() => { setShown(i); setLoading(false); }, 600);
  };
  const onKey = (e: KeyboardEvent) => {
    const n = topics.length;
    const next = e.key === 'ArrowRight' ? (active + 1) % n : e.key === 'ArrowLeft' ? (active + n - 1) % n
      : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    select(next);
  };
  const topic = topics[shown]!;
  const urlTopic = topics[active]!;
  const used = (tp: LearningTopic) => STATES.filter((st) => tp.progress.some((r) => r.steps.some(([, x]) => x === st)));

  return (
    <div className={s.root}>
      <h2 data-gravity className={s.title} data-i18n>{t.learning.title}</h2>
      <div className={s.win}>
        <div role="tablist" aria-label={t.learning.title} className={s.tabs} onKeyDown={onKey}>
          {topics.map((tp, i) => (
            <button key={tp.id} ref={(el) => { refs.current[i] = el; }} role="tab" type="button"
              id={`learn-tab-${tp.id}`} aria-selected={i === active} aria-controls="learn-panel"
              tabIndex={i === active ? 0 : -1} className={`${s.tab} ${i === active ? s.on : ''}`}
              onClick={() => select(i)}>
              <span className={s.sp} aria-hidden="true" />
              <span data-i18n>{tp.tab}</span>
            </button>
          ))}
        </div>
        <div className={s.url}><span>{urlTopic.url}</span></div>
        <div className={s.bar} aria-hidden="true">{loading && <i className={s.fill} />}</div>
        <div role="tabpanel" id="learn-panel" aria-labelledby={`learn-tab-${topic.id}`} tabIndex={0}
          className={s.page}>
          <div className={s.head}>
            <h3 data-i18n>{topic.tab}</h3>
            <p className={s.by} data-i18n>{topic.by}</p>
            <p data-i18n>{topic.why}</p>
            <figure className={s.quote}>
              <figcaption data-i18n>{t.learning.takeawayLabel}</figcaption>
              <blockquote data-i18n>{topic.takeaway}</blockquote>
            </figure>
          </div>
          <div className={`${s.prog} ${loading ? s.fade : ''}`} key={`p-${topic.id}`}>
            <ul className={s.legend} aria-hidden="true">
              {used(topic).map((st) => <li key={st}><i className={s[st]} />{legend[st]}</li>)}
            </ul>
            {topic.progress.map((row) => (
              <div key={row.label} className={s.row}>
                <b data-i18n>{row.label}</b>
                <ol className={row.steps.length > DENSE ? s.bars : s.chips}>
                  {row.steps.map(([name, st], i) => (
                    <li key={name} className={s[st]} title={name} style={{ '--i': i } as CSSProperties}>
                      <span className={row.steps.length > DENSE ? s.sr : undefined} data-i18n>{name}</span>
                      <span className={s.sr}>{` — ${legend[st]}`}</span>
                    </li>
                  ))}
                </ol>
                <p className={s.note} data-i18n>{row.note}</p>
              </div>
            ))}
          </div>
          <div className={`${s.links} ${loading ? s.fade : ''}`}>
            <p className={s.lbl} data-i18n>{t.learning.linksLabel}</p>
            <ul>
              {topic.links.map((l) => {
                const c = CASES.find((x) => x.slug === l.slug)!;
                return (
                  <li key={l.concept}>
                    <a href={`#/work/${l.slug}`} style={{ '--pc': c.color === '#111111' ? '#ff4d00' : c.color } as CSSProperties}
                      onClick={(e) => { e.preventDefault(); storeCaseOrigin({ x: e.clientX, y: e.clientY }); openCase(l.slug); }}>
                      <span className={s.concept}><span data-i18n>{l.concept}</span><span className={s.to} aria-hidden="true">→</span></span>
                      <span className={s.where}><i aria-hidden="true" />{c.name} · <span data-i18n>{l.where}</span></span>
                      <span className={s.lesson} data-i18n>{l.lesson}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
