import { useEffect, useState } from 'react';
import { useLang } from '../../i18n/LangProvider';
import { scrollToSection } from '../../lib/route';
import type { Lang, SectionId } from '../../content/types';
import s from './Nav.module.css';

const LANGS: Lang[] = ['en', 'vi'];
// Work + Contact show from tablet up; the middle three only on wide screens.
const LINKS = [['work', ''], ['how', 'wide'], ['career', 'wide'], ['skills', 'wide'], ['contact', '']] as const;

// The section crossing the middle of the viewport is the current one.
function useActiveSection(): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) setActive(e.target.id as SectionId);
    }), { rootMargin: '-50% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return active;
}

export function Nav({ onOpenPalette, onLogoClick }: { onOpenPalette(): void; onLogoClick(): void }) {
  const { lang, setLang, t } = useLang();
  const active = useActiveSection();
  return (
    <nav className={s.nav} aria-label={t.nav.main}>
      <button className={s.link} data-gravity onClick={onLogoClick}>TAI NGUYEN ©2026</button>
      <div className={s.right}>
        {LINKS.map(([id, size]) => (
          <button key={id} className={`${s.sec} ${s.hideSm} ${size ? s.wide : ''} ${active === id ? s.cur : ''}`}
            aria-current={active === id ? 'true' : undefined} data-gravity data-i18n onClick={() => scrollToSection(id)}>{t.nav[id]}</button>
        ))}
        <div role="group" data-gravity aria-label={t.nav.language} className={s.lang}>
          {LANGS.map((l) => (
            <button key={l} aria-pressed={lang === l} className={lang === l ? s.on : undefined} onClick={() => setLang(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <button className={s.kbd} data-gravity aria-label={`${t.nav.openPalette} (⌘K)`} onClick={onOpenPalette}>⌘K</button>
      </div>
    </nav>
  );
}
