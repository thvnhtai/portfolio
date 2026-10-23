import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useLang } from '../../i18n/LangProvider';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import s from './NowLearning.module.css';

export function NowLearning() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const { topics, placeholders: ph } = t.learning;
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
  const field = (text: string | null, placeholder: string) =>
    text ? <p data-i18n>{text}</p> : <p className={s.ph} data-i18n>{placeholder}</p>;

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
          <div>
            <h3 data-i18n>{topic.tab}</h3>
            <p className={s.by} data-i18n>{topic.by}</p>
            <p data-i18n>{topic.why}</p>
          </div>
          <div className={loading ? s.fade : undefined}>
            {topic.learned
              ? <ul>{topic.learned.map((l) => <li key={l} data-i18n>{l}</li>)}</ul>
              : field(null, ph.learned)}
            {field(topic.where, ph.where)}
            {field(topic.takeaway, ph.takeaway)}
          </div>
        </div>
      </div>
    </div>
  );
}
