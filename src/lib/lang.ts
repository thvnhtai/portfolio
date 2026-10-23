import type { Lang } from '../content/types';

const isLang = (v: string | null | undefined): v is Lang => v === 'en' || v === 'vi';

export function resolveInitialLang(input: { search: string; stored: string | null; languages: readonly string[] }): Lang {
  const fromUrl = new URLSearchParams(input.search).get('lang');
  if (isLang(fromUrl)) return fromUrl;
  if (isLang(input.stored)) return input.stored;
  return input.languages.some((l) => l.toLowerCase().startsWith('vi')) ? 'vi' : 'en';
}

export function withLangParam(href: string, lang: Lang): string {
  const u = new URL(href, 'http://x');
  u.searchParams.set('lang', lang);
  return u.pathname + u.search + u.hash;
}
