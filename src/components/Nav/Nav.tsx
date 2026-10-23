import { useLang } from '../../i18n/LangProvider';
import { scrollToSection } from '../../lib/route';
import type { Lang } from '../../content/types';
import s from './Nav.module.css';

const LANGS: Lang[] = ['en', 'vi'];

export function Nav({ onOpenPalette, onLogoClick }: { onOpenPalette(): void; onLogoClick(): void }) {
  const { lang, setLang, t } = useLang();
  return (
    <nav className={s.nav} aria-label={t.nav.main}>
      <button className={s.link} data-gravity onClick={onLogoClick}>TAI NGUYEN ©2026</button>
      <div className={s.right}>
        <button className={`${s.link} ${s.hideSm}`} data-gravity data-i18n onClick={() => scrollToSection('work')}>{t.nav.work}</button>
        <button className={`${s.link} ${s.hideSm}`} data-gravity data-i18n onClick={() => scrollToSection('contact')}>{t.nav.contact}</button>
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
