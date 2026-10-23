import { CASES } from '../content/cases';
import { LINKS } from '../content/contact';
import type { CaseSlug, Copy, Lang, SectionId } from '../content/types';

export type Command = { id: string; group: 'navigate' | 'projects' | 'actions' | 'links'; label: string; keywords: string; run(): void };

export type PaletteCtx = {
  t: Copy; lang: Lang; setLang(l: Lang): void; openCase(s: CaseSlug): void; scrollTo(id: SectionId): void;
  copyEmail(): void; downloadCv(): void; openUrl(u: string): void;
};

const SECTION_IDS: SectionId[] = ['hero', 'work', 'how', 'career', 'skills', 'leetcode', 'learning', 'contact'];

export function filterCommands(cmds: Command[], query: string): Command[] {
  const q = query.trim().toLowerCase();
  return q ? cmds.filter((c) => `${c.label} ${c.keywords} ${c.group}`.toLowerCase().includes(q)) : cmds;
}

export function moveSelection(index: number, delta: 1 | -1, length: number): number {
  return length === 0 ? 0 : Math.min(length - 1, Math.max(0, index + delta));
}

export function buildCommands(c: PaletteCtx): Command[] {
  const p = c.t.palette;
  const other: Lang = c.lang === 'en' ? 'vi' : 'en';
  return [
    ...SECTION_IDS.map((id): Command => ({ id: `nav:${id}`, group: 'navigate', label: p.sections[id], keywords: id, run: () => c.scrollTo(id) })),
    ...CASES.map((k): Command => ({ id: `case:${k.slug}`, group: 'projects', label: k.name, keywords: `${k.slug} project case`, run: () => c.openCase(k.slug) })),
    { id: 'act:copy-email', group: 'actions', label: p.copyEmail, keywords: 'email mail contact', run: c.copyEmail },
    { id: 'act:cv', group: 'actions', label: p.downloadCv, keywords: 'cv resume pdf', run: c.downloadCv },
    { id: 'act:lang', group: 'actions', label: p.switchLang, keywords: 'language english viet tiếng vietnamese', run: () => c.setLang(other) },
    ...LINKS.map((l): Command => ({ id: `link:${l.id}`, group: 'links', label: l.label, keywords: 'link social', run: () => c.openUrl(l.href) })),
  ];
}
