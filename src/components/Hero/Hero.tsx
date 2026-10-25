import { CV_PATH } from '../../content/contact';
import { useEffect, useState, type ReactNode } from 'react';
import { useLang } from '../../i18n/LangProvider';
import { KineticText } from '../KineticText/KineticText';
import { scrollToSection } from '../../lib/route';
import { hcmcTime, isProbablyAwake } from '../../lib/clock';
import s from './Hero.module.css';

function useNow(intervalMs: number) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

export function Hero({ badgeSlot }: { badgeSlot: ReactNode }) {
  const { t } = useLang();
  const h = t.hero;
  const now = useNow(15000);
  return (
    <div className={s.hero}>
      <div className={s.left}>
        <KineticText as="h1" text="FULLSTACK ENGINEER." className={s.hl} accentLast />
        <p className={s.intro} data-i18n>{h.bio}</p>
        <div className={s.cta}>
          <a data-gravity className={s.primary} href={CV_PATH} download data-i18n>{h.cv}</a>
          <a data-gravity className={s.secondary} href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} data-i18n>{h.touch}</a>
        </div>
      </div>
      <div className={s.badge}>{badgeSlot}</div>
      <dl className={s.meta}>
        <div><dt data-i18n>{h.based}</dt><dd><span data-i18n>{h.city}</span> · {hcmcTime(now)} {isProbablyAwake(now) ? '☀' : '☾'}</dd></div>
        <div><dt data-i18n>{h.prev}</dt><dd>Grab · TMA Solutions</dd></div>
        <div><dt data-i18n>{h.edu}</dt><dd data-i18n>{h.eduValue}</dd></div>
        <div><dt data-i18n>{h.status}</dt><dd className={s.open} data-i18n>{h.open}</dd></div>
      </dl>
    </div>
  );
}
