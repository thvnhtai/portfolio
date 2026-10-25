import { useCallback, useEffect, useRef, useState } from 'react';
import { useLang } from '../../i18n/LangProvider';
import { useToast } from '../Toast/Toast';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { hcmcTime, isProbablyAwake } from '../../lib/clock';
import { scrambleFrame } from '../../lib/scramble';
import { copyText } from '../../lib/clipboard';
import { EMAIL, LINKS } from '../../content/contact';
import s from './Contact.module.css';


export function Contact() {
  const { t } = useLang();
  const toast = useToast();
  const reduce = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.5 });
  const [text, setText] = useState(EMAIL);
  const [now, setNow] = useState(() => new Date());
  const iv = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const running = useRef(false);

  const scramble = useCallback(() => {
    if (reduce || running.current) return;
    running.current = true;
    let f = 0;
    iv.current = setInterval(() => {
      f++;
      setText(scrambleFrame(EMAIL, f, Math.random));
      if (f >= EMAIL.length * 2) { clearInterval(iv.current); running.current = false; }
    }, 28);
  }, [reduce]);
  useEffect(() => () => { clearInterval(iv.current); running.current = false; }, []);
  useEffect(() => { if (inView) scramble(); }, [inView, scramble]);

  useEffect(() => {
    if (!inView) return;
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [inView]);

  const copy = async () => toast((await copyText(EMAIL)) ? t.toast.copied : t.toast.copyFailed);
  const c = t.contact;

  return (
    <div ref={ref} className={s.root}>
      <div className={s.clock}>
        {c.nowIn}
        <b>{hcmcTime(now, true)}</b>
        <span>{isProbablyAwake(now) ? c.awake : c.asleep}</span>
      </div>
      <h2 data-gravity className={s.kicker}>{c.kicker}</h2>
      <p className={s.q}>{c.prompt}</p>
      <button type="button" className={s.em} aria-label={EMAIL} aria-describedby="contact-hint" onClick={copy} onMouseEnter={scramble} onFocus={scramble}>
        <span aria-hidden="true">{text}</span>
      </button>
      <p id="contact-hint" className={s.sub}>{c.hint}</p>
      <div className={s.rows}>
        {LINKS.map((l) => (
          <a key={l.id} data-gravity href={l.href} target="_blank" rel="noopener noreferrer">
            {l.label} <span>{l.handle} ↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}
