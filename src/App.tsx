import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { LangProvider, useLang } from './i18n/LangProvider';
import { ToastProvider } from './components/Toast/Toast';
import { Nav } from './components/Nav/Nav';
import { useReducedMotion } from './hooks/useReducedMotion';
import { Cursor } from './components/Cursor/Cursor';
import { Grain } from './components/Grain/Grain';
import { Hero } from './components/Hero/Hero';
import { Preloader } from './components/Preloader/Preloader';
import { markPreloaded, shouldPlayPreloader } from './lib/session';
import { BadgeFallback } from './components/Badge/BadgeFallback';
import { Works } from './components/Works/Works';
import { CaseStudy } from './components/CaseStudy/CaseStudy';
import { useRoute } from './hooks/useRoute';
import { HowIWork } from './components/HowIWork/HowIWork';
import { Timeline } from './components/Timeline/Timeline';
import { Skills } from './components/Skills/Skills';
import { LeetCode } from './components/LeetCode/LeetCode';
import { NowLearning } from './components/NowLearning/NowLearning';
import { Contact } from './components/Contact/Contact';
import { CommandPalette } from './components/CommandPalette/CommandPalette';
import { useGravity } from './components/GravityEgg/useGravity';
import { createClickBurst } from './lib/clickBurst';
import type { SectionId } from './content/types';

const Badge = lazy(() => import('./components/Badge/Badge'));

const SECTIONS: SectionId[] = ['hero', 'work', 'how', 'career', 'skills', 'leetcode', 'learning', 'contact'];

function getSession(): Storage | null {
  try { return sessionStorage; } catch { return null; }
}

function Shell() {
  const { lang } = useLang();
  const reduce = useReducedMotion();
  const [swapping, setSwapping] = useState(false);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (reduce) return;
    setSwapping(true);
    const id = setTimeout(() => setSwapping(false), 230);
    return () => { clearTimeout(id); setSwapping(false); };
  }, [lang, reduce]);
  const { route } = useRoute();
  const [paletteOpen, setPaletteOpen] = useState(false);
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.repeat || !((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) return;
      const el = e.target instanceof HTMLElement ? e.target : null;
      if (el && !el.closest('[role="dialog"][aria-modal]') && el.closest('input, textarea, [contenteditable]:not([contenteditable="false"])')) return;
      e.preventDefault();
      setPaletteOpen((o) => !o);
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, []);
  const gravity = useGravity();
  const burst = useRef(createClickBurst(5, 1200, () => performance.now()));
  const [preloading, setPreloading] = useState(() => shouldPlayPreloader(getSession(), reduce));
  return (
    <div className={swapping ? 'swapping' : undefined}>
      {preloading && <Preloader onDone={() => { markPreloaded(getSession()); setPreloading(false); }} />}
      <Cursor />
      <Grain />
      <Nav onOpenPalette={() => setPaletteOpen(true)} onLogoClick={() => { if (burst.current()) gravity(); }} />
      <main>
        {SECTIONS.map((id) => (
          <section key={id} id={id}>{id === 'work' && <Works />}{id === 'how' && <HowIWork />}{id === 'career' && <Timeline />}{id === 'skills' && <Skills />}{id === 'leetcode' && <LeetCode />}{id === 'learning' && <NowLearning />}{id === 'contact' && <Contact />}{id === 'hero' && <Hero badgeSlot={<Suspense fallback={<BadgeFallback />}><Badge /></Suspense>} />}</section>
        ))}
      </main>
      {route.kind === 'case' && <CaseStudy slug={route.slug} />}
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <ToastProvider>
        <Shell />
      </ToastProvider>
    </LangProvider>
  );
}
