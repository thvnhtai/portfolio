import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { en } from '../content/en';
import { vi } from '../content/vi';
import type { Copy, Lang } from '../content/types';
import { resolveInitialLang, withLangParam } from '../lib/lang';

type Ctx = { lang: Lang; setLang(l: Lang): void; t: Copy };
const LangContext = createContext<Ctx | null>(null);
const COPY: Record<Lang, Copy> = { en, vi };

function readStored(): string | null {
  try { return localStorage.getItem('lang'); } catch { return null; }
}

function applyDocument(lang: Lang) {
  const t = COPY[lang];
  document.documentElement.lang = lang;
  document.title = t.meta.title;
  let m = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!m) {
    m = document.createElement('meta');
    m.name = 'description';
    document.head.appendChild(m);
  }
  m.content = t.meta.description;
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() =>
    resolveInitialLang({ search: window.location.search, stored: readStored(), languages: navigator.languages ?? [] }),
  );
  useEffect(() => applyDocument(lang), [lang]);

  const setLang = useCallback((l: Lang) => {
    try { localStorage.setItem('lang', l); } catch { /* storage blocked */ }
    window.history.replaceState(null, '', withLangParam(window.location.href, l));
    setLangState(l);
  }, []);

  const value = useMemo(() => ({ lang, setLang, t: COPY[lang] }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): Ctx {
  const c = useContext(LangContext);
  if (!c) throw new Error('useLang must be used inside LangProvider');
  return c;
}
