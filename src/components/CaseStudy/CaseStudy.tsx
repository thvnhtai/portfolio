import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CASES } from '../../content/cases';
import type { CaseSlug, Lang } from '../../content/types';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { lockScroll } from '../../lib/scrollLock';
import { useRoute } from '../../hooks/useRoute';
import { useLang } from '../../i18n/LangProvider';
import { ArchDiagram } from '../ArchDiagram/ArchDiagram';
import { MockUi } from '../Mocks/MockUi';
import s from './CaseStudy.module.css';

const LANGS: Lang[] = ['en', 'vi'];

function readOrigin(): { x: number; y: number } {
  try {
    const o = JSON.parse(sessionStorage.getItem('caseOrigin') ?? 'null');
    if (o && Number.isFinite(o.x) && Number.isFinite(o.y)) return o;
  } catch { /* fall through */ }
  return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
}

export function CaseStudy({ slug }: { slug: CaseSlug }) {
  const { lang, setLang, t } = useLang();
  const { openCase, closeCase } = useRoute();
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const prog = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(document.activeElement);
  const [revealed, setRevealed] = useState(reduce);
  const [origin] = useState(readOrigin);
  const idx = CASES.findIndex((c) => c.slug === slug);
  const c = CASES[idx]!;
  const next = CASES[(idx + 1) % CASES.length]!;
  const copy = t.cases[slug];
  const ui = t.caseUi;

  useEffect(() => {
    if (reduce) return;
    const id = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(id);
  }, [reduce]);

  useEffect(() => {
    const unlock = lockScroll();
    const inert = document.querySelectorAll('main, nav');
    inert.forEach((n) => n.setAttribute('inert', ''));
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape' && !e.defaultPrevented) closeCase(); };
    document.addEventListener('keydown', key);
    const from = opener.current;
    return () => {
      unlock();
      inert.forEach((n) => n.removeAttribute('inert'));
      document.removeEventListener('keydown', key);
      if (from instanceof HTMLElement && from !== document.body) from.focus();
      else { // cold deep link: no opener, so land on the work heading
        const h = document.querySelector<HTMLElement>('#work h2');
        if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); }
      }
    };
  }, [closeCase]);

  // new project (open or Next): back to top, focus the title, re-arm scroll reveals
  useLayoutEffect(() => {
    const el = root.current!;
    el.scrollTop = 0;
    title.current?.focus({ preventScroll: true });
    const items = el.querySelectorAll(`.${s.rv!}`);
    items.forEach((n) => n.classList.remove(s.in!));
    if (typeof IntersectionObserver === 'undefined') { items.forEach((n) => n.classList.add(s.in!)); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add(s.in!); io.unobserve(e.target); }
    }), { root: el, threshold: 0.1 });
    items.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [slug]);

  const onScroll = () => {
    const el = root.current!;
    const max = el.scrollHeight - el.clientHeight;
    prog.current!.style.transform = `scaleX(${max > 0 ? el.scrollTop / max : 0})`;
  };

  const style = {
    '--pc': c.color, '--pt': c.fg,
    ...(reduce ? {} : { clipPath: `circle(${revealed ? '150%' : '0px'} at ${origin.x}px ${origin.y}px)` }),
  } as React.CSSProperties;
  const rv = `${s.rv}`;

  return (
    <div ref={root} className={`${s.cs} ${reduce ? '' : s.reveal}`} style={style} role="dialog" aria-modal="true" aria-labelledby="cs-title" onScroll={onScroll}>
      <div className={s.bar}>
        <span>{`0${idx + 1} / ${String(CASES.length).padStart(2, '0')} · ${ui.case}`}</span>
        <span className={s.barR}>
          <span role="group" aria-label={t.nav.language} className={s.lang}>
            {LANGS.map((l) => (
              <button key={l} aria-pressed={lang === l} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
            ))}
          </span>
          <button className={s.back} onClick={closeCase}>{ui.back}</button>
        </span>
        <div ref={prog} className={s.prog} aria-hidden="true" />
      </div>

      <header className={s.top}>
        <div className={s.idx} aria-hidden="true">0{idx + 1}</div>
        <small className={s.role}>{copy.roleLine}</small>
        <h1 id="cs-title" ref={title} tabIndex={-1}>{c.name}</h1>
        <p className={s.lead}>{copy.lead}</p>
      </header>

      <dl className={s.metas}>
        {copy.meta.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
      </dl>

      <section className={`${s.sec} ${rv}`}>
        <div className={s.lbl}>{ui.product}</div>
        <h2>{c.name}</h2>
        <MockUi kind={c.mock} url={c.url} />
      </section>

      <section className={`${s.sec} ${s.two} ${rv}`}>
        <div><div className={s.lbl}>{ui.problem}</div><h2>{ui.problemH}</h2><p>{copy.problem}</p></div>
        <div><div className={s.lbl}>{ui.approach}</div><h2>{ui.approachH}</h2><p>{copy.approach}</p></div>
      </section>

      <section className={`${s.sec} ${rv}`}>
        <div className={s.lbl}>{ui.built}</div>
        <h2>{ui.builtH}</h2>
        <ol className={s.builts}>
          {copy.built.map(([h, b], i) => (
            <li key={h} className={s.built}><b>{String(i + 1).padStart(2, '0')}</b><h3>{h}</h3><p>{b}</p></li>
          ))}
        </ol>
      </section>

      <section className={`${s.sec} ${rv}`}>
        <div className={s.lbl}>{ui.arch}</div>
        <h2>{ui.archH}</h2>
        <div className={s.arch}><ArchDiagram nodes={c.arch} note={copy.archNote} color={c.color === '#111111' ? '#ff4d00' : c.color} /></div>
      </section>

      <section className={`${s.sec} ${rv}`}>
        <div className={s.lbl}>{ui.outcome}</div>
        <h2>{ui.outcomeH}</h2>
        <div className={s.impact}>
          {copy.outcomes.map(([h, b]) => <div key={h}><h3>{h}</h3><p>{b}</p></div>)}
        </div>
      </section>

      <section className={`${s.sec} ${rv}`}>
        <div className={s.lbl}>{ui.stack}</div>
        <ul className={s.chips}>{c.stack.map((x) => <li key={x}>{x}</li>)}</ul>
        <div className={s.lbl}>{ui.learned}</div>
        <ul className={s.learned}>{copy.learned.map((x) => <li key={x}>{x}</li>)}</ul>
        {c.repo && <a className={s.repo} href={c.repo} target="_blank" rel="noreferrer">{ui.repo}</a>}
      </section>

      <a className={s.next} href={`#/work/${next.slug}`} onClick={(e) => { e.preventDefault(); openCase(next.slug); }}>
        <small>{ui.next}</small>
        <div>{next.name}</div>
      </a>
    </div>
  );
}
