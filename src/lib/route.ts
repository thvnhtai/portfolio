import { CASES } from '../content/cases';
import type { CaseSlug, SectionId } from '../content/types';

export type Route = { kind: 'home' } | { kind: 'case'; slug: CaseSlug };

export function parseHash(hash: string): Route {
  const m = /^#\/work\/([^/?]+)$/.exec(hash);
  const c = m && CASES.find((x) => x.slug === m[1]);
  return c ? { kind: 'case', slug: c.slug } : { kind: 'home' };
}

export const caseHash = (slug: CaseSlug): string => `#/work/${slug}`;

export function scrollToSection(id: SectionId): void {
  const reduce = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}
