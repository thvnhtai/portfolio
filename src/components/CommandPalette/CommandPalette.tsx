import { useEffect, useMemo, useRef, useState } from 'react';
import { useLang } from '../../i18n/LangProvider';
import { useRoute } from '../../hooks/useRoute';
import { useToast } from '../Toast/Toast';
import { copyText } from '../../lib/clipboard';
import { scrollToSection } from '../../lib/route';
import { lockScroll } from '../../lib/scrollLock';
import { buildCommands, filterCommands, moveSelection, type Command } from '../../lib/palette';
import { CV_PATH, EMAIL } from '../../content/contact';
import type { SectionId } from '../../content/types';
import s from './CommandPalette.module.css';

const GROUPS = ['navigate', 'projects', 'actions', 'links'] as const;

export function CommandPalette({ open, onClose }: { open: boolean; onClose(): void }) {
  const { lang, setLang, t } = useLang();
  const { route, openCase, closeCase } = useRoute();
  const toast = useToast();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const pending = useRef<SectionId | null>(null);
  // after the case overlay unmounts (scroll lock released), run the queued scroll
  useEffect(() => {
    if (route.kind === 'home' && pending.current) { const id = pending.current; pending.current = null; scrollToSection(id); }
  }, [route.kind]);

  const cmds = useMemo(() => buildCommands({
    t, lang, setLang, openCase,
    scrollTo: (id) => {
      if (route.kind === 'case') { pending.current = id; closeCase(); } else scrollToSection(id);
    },
    copyEmail: () => { void copyText(EMAIL).then((ok) => toast(ok ? t.toast.copied : t.toast.copyFailed)); },
    downloadCv: () => window.open(CV_PATH, '_blank', 'noopener'),
    openUrl: (u) => window.open(u, '_blank', 'noopener'),
  }), [t, lang, setLang, openCase, closeCase, route.kind, toast]);
  const shown = useMemo(() => filterCommands(cmds, query), [cmds, query]);
  // group order is fixed, so flatten in that order to keep arrow keys matching what is on screen
  const flat = useMemo(() => GROUPS.flatMap((g) => shown.filter((c) => c.group === g)), [shown]);

  useEffect(() => {
    if (!open) return;
    setQuery(''); setActive(0);
    const opener = document.activeElement;
    const unlock = lockScroll();
    input.current?.focus();
    return () => {
      unlock();
      if (opener instanceof HTMLElement) opener.focus();
    };
  }, [open]);

  useEffect(() => { setActive(0); }, [query]);
  useEffect(() => {
    list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView?.({ block: 'nearest' });
  }, [active]);

  const run = (c: Command | undefined) => { if (c) { c.run(); onClose(); } };
  const key = useRef<(e: KeyboardEvent) => void>();
  key.current = (e) => {
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); onClose(); }
    else if (e.key === 'Tab') e.preventDefault();
  };
  // capture on window so we run before the case overlay's document-level Escape handler
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => key.current?.(e);
    window.addEventListener('keydown', h, true);
    return () => window.removeEventListener('keydown', h, true);
  }, [open]);

  if (!open) return null;
  const p = t.palette;
  const optId = (c: Command) => `pal-opt-${c.id}`;
  return (
    <div className={s.backdrop} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={s.pal} role="dialog" aria-modal="true" aria-label={p.placeholder}>
        <input
          ref={input} className={s.input} value={query} placeholder={p.placeholder} autoComplete="off" spellCheck={false}
          role="combobox" aria-expanded={flat.length > 0} aria-controls="pal-list" aria-autocomplete="list"
          aria-activedescendant={flat[active] ? optId(flat[active]!) : undefined}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => moveSelection(i, e.key === 'ArrowDown' ? 1 : -1, flat.length)); }
            else if (e.key === 'Enter') { e.preventDefault(); run(flat[active]); }
          }}
        />
        {flat.length === 0 && <div role="status" className={s.empty}>{p.empty}</div>}
        <div className={s.res} id="pal-list" role="listbox" aria-label={p.placeholder} ref={list}>
          {GROUPS.map((g) => {
            const items = flat.filter((c) => c.group === g);
            return items.length === 0 ? null : (
              <div key={g} role="group" aria-label={p.groups[g]}>
                <div className={s.grp} aria-hidden="true">{p.groups[g].toUpperCase()}</div>
                {items.map((c) => (
                  <div key={c.id} id={optId(c)} role="option" aria-selected={flat[active] === c} className={s.it}
                    onMouseMove={() => setActive(flat.indexOf(c))} onClick={() => run(c)}>
                    {c.label}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <div className={s.ft} aria-hidden="true"><span>{p.footer.move}</span><span>{p.footer.select}</span><span>{p.footer.close}</span></div>
      </div>
    </div>
  );
}
