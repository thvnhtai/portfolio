# Portfolio v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Tai Nguyen's bilingual (EN/VI) single-page portfolio — git-clone preloader, 3D lanyard-badge hero, isometric-city works with case-study overlays, and six more sections — as a static React site on GitHub Pages at `https://thvnhtai.github.io/portfolio/`.

**Architecture:** Vite + React + TypeScript SPA with no router library: the case study open is encoded in the URL hash (`#/work/<slug>`), the language in the query (`?lang=vi`). All copy lives in typed content files (`en.ts` / `vi.ts` sharing one `Copy` type) behind a `LangProvider`. Pure logic (language resolution, routing, verlet rope, isometric math, heatmap, scramble, clock, palette filter) lives in `src/lib/` with unit tests; canvas/WebGL/GSAP code is thin and pauses off-screen. LeetCode stats come from a JSON file refreshed nightly by a GitHub Action.

**Tech Stack:** Node 20 · vite@5.4.11 · @vitejs/plugin-react@4.3.4 · react@18.3.1 / react-dom@18.3.1 · typescript@5.6.3 · three@0.160.0 (+ @types/three@0.160.0) · gsap@3.12.5 (ScrollTrigger) · @fontsource/inter-tight@5.1.0 · @fontsource/jetbrains-mono@5.1.1 · vitest@2.1.8 · jsdom@25.0.1 · @testing-library/react@16.1.0 · @testing-library/user-event@14.5.2 · @testing-library/jest-dom@6.6.3 · @playwright/test@1.49.1. Styling: CSS Modules + one global tokens file (no CSS framework).

**Spec:** `docs/superpowers/specs/2026-10-21-portfolio-v2-design.md` — read it alongside this plan. Approved visual/behaviour references are the demos in `docs/superpowers/specs/assets/` (open them in a browser; they are the source for copy and feel).

## Global Constraints

- Vite `base: '/portfolio/'`; every asset/data URL is built from `import.meta.env.BASE_URL`.
- Palette tokens: `--cream: #f2efe8`, `--ink: #111111`, `--accent: #ff4d00`. Project colours only in the city and case headers: Zen Ledger `#ff4d00`, Invoicing `#111111`, UCM `#6d28d9`, Voucher `#0891b2`, E-Commerce `#16a34a`.
- Display type: Inter Tight 900, letter-spacing ≈ −0.05em; body Inter Tight 500; mono JetBrains Mono.
- Headline is exactly `FULLSTACK ENGINEER.` (orange period) in both languages.
- Public contact only: `thanhtaiwork04@gmail.com`, `https://www.linkedin.com/in/tai-nt`, `https://github.com/thvnhtai`, `https://leetcode.com/u/thvnhtai`. No phone number anywhere.
- No invented numbers, metrics, quotes, proficiency bars or progress percentages. Every factual claim traces to the spec's Content section.
- Every human-readable string has EN and VI versions; brand headline, company/project/tech names, badge texture text, mock-UI contents and git commit messages stay English in both.
- Mock UIs carry the label "Recreated interface with sample data — not production screenshots." (VI: "Giao diện dựng lại với dữ liệu mẫu — không phải ảnh chụp hệ thống thật.").
- `prefers-reduced-motion: reduce` ⇒ no preloader, no gravity egg, no auto-scrolling marquees, no pinning; all content still visible.
- Heavy scenes (Three.js badge, city canvas) render only while on screen and are code-split with `React.lazy`.
- Case slugs (fixed): `zen-ledger-portal`, `invoicing-portal`, `universal-config-management`, `voucher-dashboard`, `cloud-native-ecommerce`.
- CV file path: `public/cv/Tai_Nguyen_CV.pdf` (placeholder PDF until Tai supplies the final one).
- Commits end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **Shared deep link opened cold** — `…/portfolio/?lang=vi#/work/invoicing-portal` must open straight into the Vietnamese Invoicing case study, and closing it must land on the home page in VI (Task 3 + Task 10 tests).
2. **LeetCode JSON stale, partial or missing** — empty calendar, `contestRating: null`, or a failed fetch must render the section without `NaN`, `undefined` or a crash, and hide the contest stat (Task 15 tests).
3. **Reduced motion** — preloader skipped, pinned sections render as plain lists, gravity egg ignored, marquee static (Tasks 6, 12, 13, 14, 19 tests).
4. **No WebGL / phone** — badge falls back to a static styled card with the photo; city keeps a fully usable legend list; page never blank (Tasks 8, 9 tests).
5. **Clipboard unavailable** — copying the email when `navigator.clipboard` is missing or rejects shows "Couldn't copy — select the email" instead of a false success (Task 17 test, reused by Task 18).

---

## File Structure

```
portfolio-v2/
  index.html                         # fonts preload, root, <html lang="en">
  vite.config.ts                     # base '/portfolio/', vitest config
  tsconfig.json                      # strict, noUncheckedIndexedAccess
  public/
    cv/Tai_Nguyen_CV.pdf             # placeholder
    img/profile.jpg                  # copied from specs/assets/profile-photo.jpg
    data/leetcode.json               # written by scripts/fetch-leetcode.mjs
  scripts/fetch-leetcode.mjs         # LeetCode GraphQL → public/data/leetcode.json
  .github/workflows/ci.yml           # typecheck + unit + build on PR/push
  .github/workflows/deploy.yml       # fetch stats + build + deploy Pages (push to main, nightly cron)
  e2e/smoke.spec.ts                  # Playwright smoke
  src/
    main.tsx  App.tsx
    styles/tokens.css  styles/global.css
    content/
      types.ts                       # Copy, CaseStudy, TimelineEvent, Skill, LearningTopic, HowStep, Command
      en.ts  vi.ts                   # Copy objects (all prose)
      cases.ts                       # language-neutral case data (slug, colour, stack, arch, mock kind)
      skills.ts  timeline.ts  how.ts # language-neutral parts
    lib/
      lang.ts  route.ts  clock.ts  scramble.ts  session.ts
      clickBurst.ts  palette.ts  leetcode.ts  clipboard.ts
      verlet.ts  iso.ts
    hooks/
      useReducedMotion.ts  useInView.ts  useRoute.ts
    i18n/LangProvider.tsx            # context: lang, setLang, t (Copy)
    components/
      Nav/  Cursor/  Grain/  KineticText/  Toast/
      Preloader/  Hero/  Badge/  Works/  CaseStudy/  Mocks/  ArchDiagram/
      HowIWork/  Timeline/  Skills/  LeetCode/  NowLearning/  Contact/
      CommandPalette/  GravityEgg/
  src/**/*.test.ts(x)                # colocated unit tests
```

---

### Task 1: Project scaffold

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/styles/tokens.css`, `src/styles/global.css`, `src/test-setup.ts`, `public/img/profile.jpg`, `public/cv/Tai_Nguyen_CV.pdf`
- Test: `src/App.test.tsx`

**Interfaces:**
- Produces: `npm run dev | build | test | typecheck`; `<App />` default export; CSS custom properties `--cream --ink --accent --font-display --font-mono`.

- [ ] **Step 1: Initialise** — `npm init -y`, install the exact versions from Tech Stack; scripts: `"dev":"vite"`, `"build":"tsc -b && vite build"`, `"test":"vitest run"`, `"typecheck":"tsc -b --noEmit"`. `vite.config.ts`: `base: '/portfolio/'`, `test: { environment: 'jsdom', setupFiles: './src/test-setup.ts', css: { modules: { classNameStrategy: 'non-scoped' } } }`. `tsconfig`: `strict`, `noUncheckedIndexedAccess`, `jsx: react-jsx`, types `vitest/globals`, `@testing-library/jest-dom`. Copy `docs/superpowers/specs/assets/profile-photo.jpg` → `public/img/profile.jpg`; create a one-page placeholder PDF at `public/cv/Tai_Nguyen_CV.pdf`.

- [ ] **Step 2: Write the failing test**

```tsx
// src/App.test.tsx
import { render, screen } from '@testing-library/react';
import App from './App';
test('renders the brand headline', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('FULLSTACK ENGINEER.');
});
```

- [ ] **Step 3: Run** `npm test` — Expected: FAIL (App not found).
- [ ] **Step 4: Implement** `App` returning `<main><h1>FULLSTACK ENGINEER.</h1></main>`; `tokens.css` defines the palette/font variables; `global.css` imports `@fontsource/inter-tight/{500,700,900}.css` and `@fontsource/jetbrains-mono/{500,800}.css`, sets `body { background: var(--cream); color: var(--ink); }`.
- [ ] **Step 5: Run** `npm test && npm run build` — Expected: PASS, `dist/index.html` references `/portfolio/assets/…`.
- [ ] **Step 6: Commit** `chore: scaffold vite react ts portfolio`

---

### Task 2: Content model and bilingual copy

**Files:**
- Create: `src/content/types.ts`, `src/content/en.ts`, `src/content/vi.ts`, `src/content/cases.ts`, `src/content/skills.ts`, `src/content/timeline.ts`, `src/content/how.ts`
- Test: `src/content/content.test.ts`

**Interfaces:**
- Produces:
  - `type Lang = 'en' | 'vi'`
  - `type CaseSlug = 'zen-ledger-portal' | 'invoicing-portal' | 'universal-config-management' | 'voucher-dashboard' | 'cloud-native-ecommerce'`
  - `CASES: readonly CaseBase[]` where `CaseBase = { slug: CaseSlug; name: string; color: string; fg: string; mock: 'ledger'|'invoice'|'diff'|'voucher'|'mfe'; url: string; arch: string[]; stack: string[]; repo?: string; city: { a: number; b: number; h: number } }`
  - `type CaseCopy = { roleLine: string; lead: string; meta: [label: string, value: string][]; problem: string; approach: string; built: [title: string, body: string][]; archNote: string; outcomes: [title: string, body: string][] }`
  - `type Copy` — `en` and `vi` are both typed `Copy`. Keys later tasks read (add more if needed, never rename these):
    `nav{work, contact, openPalette}` · `hero{bio, cv, touch, based, city, prev, edu, eduValue, status, open, badgeHint}` · `works{heading, intro, tip}` · `caseUi{case, back, product, note, problem, problemH, approach, approachH, built, builtH, arch, archH, outcome, outcomeH, stack, learned, learnedPlaceholder, next, repo}` · `cases: Record<CaseSlug, CaseCopy>` · `how{kicker, title, note, steps: Record<HowStep['id'], { title: string; body: string }>}` · `timeline{kicker, cards: Record<TimelineEvent['id'], { title: string; sub: string; body: string }>}` · `skills{title, listLabel, groups: Record<Skill['group'], string>}` · `leetcode{kicker, solved, ranking, streak, activeDays, lastYear, contest, easy, medium, hard, of, profile, unavailable}` · `learning{title, placeholders{learned, where, takeaway}, topics: { id: 'system-design'|'go'|'ddia'; tab: string; by: string; url: string; why: string; learned: string[] | null; where: string | null; takeaway: string | null }[]}` · `contact{kicker, prompt, hint, nowIn, awake, asleep}` · `palette{placeholder, groups{navigate, projects, actions, links}, copyEmail, downloadCv, switchLang, sections: Record<SectionId, string>, footer{move, select, close}}` · `preloader{greeting, skipHint}` · `toast{copied, copyFailed, gravity}` · `meta{title, description}`.
  - `type SectionId = 'hero'|'work'|'how'|'career'|'skills'|'leetcode'|'learning'|'contact'`.
  - `SKILLS: Skill[]` with `Skill = { name: string; group: 'fe'|'ar'|'be'|'dv'|'qa'|'ai' }`; `TIMELINE: TimelineEvent[]` with `{ id: string; year: 2022|2023|2024|2025|2026; dateLabel: Record<Lang,string>; caseSlug?: CaseSlug; kind: 'edu'|'cert'|'work'|'now' }`; `HOW_STEPS: HowStep[]` with `{ id: string; hash: string; branch: 'main'|'feature'; commit: string; merge?: boolean; evidence: string[] }`.

Copy sources (port verbatim, then fix only what the spec changed):
- Case EN text: `CASES` in `specs/assets/demo-v3-hero-city-casestudy.html`. Case VI text: `CASES_VI` and `UI.vi` in `specs/assets/demo-v6-lang-full.html`.
- Hero EN/VI, nav, works heading: `I18N` in `demo-v6-lang-full.html` (hero bio per spec "Builder's calls").
- How I work: commit messages and EN descriptions in `demo-how-i-work-options.html` (`STEPS`); VI descriptions `hw1d…hw6d` in `demo-v7-how-i-work.html`.
- Timeline: `EV` in `demo-timeline-options.html` (spec §5 list is authoritative; add the "2023 heads-down at UIT" card). Draft VI.
- Skills: `S` in `demo-skills-options.html` (spec §Skills list is authoritative).
- Now learning: `L` + placeholder labels in `demo-now-learning-options.html`; VI drafted.
- Contact: `demo-contact-options.html` option D.

- [ ] **Step 1: Write the failing tests**

```ts
// src/content/content.test.ts
import { en } from './en'; import { vi } from './vi';
import { CASES } from './cases'; import { SKILLS } from './skills'; import { TIMELINE } from './timeline';
const strings = (o: unknown): string[] => typeof o === 'string' ? [o] : Array.isArray(o) || (o && typeof o === 'object') ? Object.values(o as object).flatMap(strings) : [];

test('every case has EN and VI copy', () => {
  for (const c of CASES) { expect(en.cases[c.slug].lead).toBeTruthy(); expect(vi.cases[c.slug].lead).toBeTruthy(); }
});
test('no empty strings in either language', () => {
  expect(strings(en).filter(s => !s.trim())).toEqual([]);
  expect(strings(vi).filter(s => !s.trim())).toEqual([]);
});
test('no phone number anywhere', () => {
  expect([...strings(en), ...strings(vi)].join(' ')).not.toMatch(/(\+84|\b0)\d[\s.-]?\d{2,3}[\s.-]?\d{3}[\s.-]?\d{3}/);
});
test('no percentages in copy', () => {
  expect([...strings(en), ...strings(vi)].join(' ')).not.toMatch(/\d+\s?%/);
});
test('exactly five cases with the fixed slugs and colours', () => {
  expect(CASES.map(c => [c.slug, c.color])).toEqual([
    ['zen-ledger-portal', '#ff4d00'], ['invoicing-portal', '#111111'], ['universal-config-management', '#6d28d9'],
    ['voucher-dashboard', '#0891b2'], ['cloud-native-ecommerce', '#16a34a']]);
});
test('skills come from the CV list', () => {
  for (const s of ['React','Next.js','TypeScript','Go','gRPC','MySQL','Redis','Module Federation','Kubernetes','Claude Code','Cursor'])
    expect(SKILLS.map(k => k.name)).toContain(s);
});
test('timeline is in date order and job stops link to cases', () => {
  expect(TIMELINE.map(e => e.id)).toEqual(['uit-start','uit-2023','toeic-lr','tma','grab-intern','grab-swe','toeic-sw','graduated','now']);
  expect(TIMELINE.find(e => e.id === 'grab-swe')?.caseSlug).toBe('zen-ledger-portal');
});
```

- [ ] **Step 2: Run** `npx vitest run src/content` — Expected: FAIL (modules missing).
- [ ] **Step 3: Implement** the types and content files from the sources above. Zen Ledger `meta` "Users" stays as in demo; E-Commerce `repo: 'https://github.com/sloweyyy/cloud-native-ecommerce-platform'`. City coordinates from demo v3: `{a:2,b:2,h:120}`, `{a:6,b:2,h:85}`, `{a:2,b:6,h:95}`, `{a:6,b:6,h:62}`, `{a:9,b:2,h:140}`. "What I learned" stays a placeholder string in both languages.
- [ ] **Step 4: Run** `npx vitest run src/content` — Expected: PASS.
- [ ] **Step 5: Commit** `feat(content): bilingual typed content for all sections`

---

### Task 3: Language and route core

**Files:**
- Create: `src/lib/lang.ts`, `src/lib/route.ts`, `src/hooks/useRoute.ts`, `src/i18n/LangProvider.tsx`
- Test: `src/lib/lang.test.ts`, `src/lib/route.test.ts`, `src/i18n/LangProvider.test.tsx`

**Interfaces:**
- Consumes: `Lang`, `Copy`, `CaseSlug`, `en`, `vi` (Task 2).
- Produces:
  - `resolveInitialLang(input: { search: string; stored: string | null; languages: readonly string[] }): Lang` — precedence: `?lang=` → stored → browser prefers `vi*` → `'en'`.
  - `withLangParam(href: string, lang: Lang): string` — sets/replaces `lang` query, preserves hash.
  - `type Route = { kind: 'home' } | { kind: 'case'; slug: CaseSlug }`; `parseHash(hash: string): Route` (unknown slug → home); `caseHash(slug: CaseSlug): string` → `'#/work/<slug>'`.
  - `useRoute(): { route: Route; openCase(slug: CaseSlug): void; closeCase(): void }` — listens to `hashchange`; `closeCase` replaces hash with `''` keeping query.
  - `<LangProvider>`; `useLang(): { lang: Lang; setLang(l: Lang): void; t: Copy }` — `setLang` writes `localStorage['lang']`, updates URL via `history.replaceState(withLangParam(...))`, sets `document.documentElement.lang`, `document.title = t.meta.title`, and the `<meta name="description">` content to `t.meta.description`.

- [ ] **Step 1: Write the failing tests**

```ts
// src/lib/lang.test.ts
import { resolveInitialLang, withLangParam } from './lang';
test('url wins', () => expect(resolveInitialLang({ search: '?lang=vi', stored: 'en', languages: ['en-US'] })).toBe('vi'));
test('stored beats browser', () => expect(resolveInitialLang({ search: '', stored: 'en', languages: ['vi-VN'] })).toBe('en'));
test('vietnamese browser', () => expect(resolveInitialLang({ search: '', stored: null, languages: ['vi-VN', 'en'] })).toBe('vi'));
test('default english, ignores junk', () => expect(resolveInitialLang({ search: '?lang=fr', stored: 'xx', languages: ['fr'] })).toBe('en'));
test('withLangParam keeps hash', () => expect(withLangParam('/portfolio/?a=1#/work/invoicing-portal', 'vi')).toBe('/portfolio/?a=1&lang=vi#/work/invoicing-portal'));
// src/lib/route.test.ts
import { parseHash, caseHash } from './route';
test('case route', () => expect(parseHash('#/work/invoicing-portal')).toEqual({ kind: 'case', slug: 'invoicing-portal' }));
test('unknown slug is home', () => expect(parseHash('#/work/nope')).toEqual({ kind: 'home' }));
test('empty is home', () => expect(parseHash('')).toEqual({ kind: 'home' }));
test('caseHash', () => expect(caseHash('voucher-dashboard')).toBe('#/work/voucher-dashboard'));
```

```tsx
// src/i18n/LangProvider.test.tsx — Review Focus #1
test('cold deep link with ?lang=vi renders VI and sets <html lang>', () => {
  window.history.replaceState(null, '', '/portfolio/?lang=vi#/work/invoicing-portal');
  render(<LangProvider><Probe /></LangProvider>); // Probe renders t.nav.contact and useRoute().route.kind
  expect(screen.getByText('Liên hệ')).toBeInTheDocument();
  expect(document.documentElement.lang).toBe('vi');
  expect(screen.getByTestId('route')).toHaveTextContent('case');
});
test('setLang keeps hash and persists', async () => { /* click a button calling setLang('en'); expect location.hash unchanged, localStorage.lang==='en', location.search contains lang=en */ });
```

- [ ] **Step 2: Run** `npx vitest run src/lib src/i18n` — Expected: FAIL.
- [ ] **Step 3: Implement** the four modules with the signatures above (use `URL`/`URLSearchParams`; wrap `localStorage` access in try/catch).
- [ ] **Step 4: Run** — Expected: PASS.
- [ ] **Step 5: Commit** `feat: language resolution, hash routing, LangProvider`

---

### Task 4: App shell, nav, motion hooks

**Files:**
- Create: `src/hooks/useReducedMotion.ts`, `src/hooks/useInView.ts`, `src/components/Nav/Nav.tsx`, `Nav.module.css`, `src/components/Toast/Toast.tsx` (+ `ToastProvider`), `src/test-utils.tsx`
- Modify: `src/App.tsx`, `src/main.tsx`
- Test: `src/components/Nav/Nav.test.tsx`

**Interfaces:**
- Consumes: `useLang`, `useRoute` (Task 3).
- Produces:
  - `useReducedMotion(): boolean` (matchMedia, live).
  - `useInView<T extends Element>(opts?: { threshold?: number; once?: boolean }): [ref: RefObject<T>, inView: boolean]`.
  - `useToast(): (message: string) => void`.
  - `src/test-utils.tsx` exports `Providers({ children })` = `LangProvider` + `ToastProvider`, and `mockReducedMotion(on: boolean)` (stubs `matchMedia`). All later component tests use these.
  - Section element ids used everywhere: `hero`, `work`, `how`, `career`, `skills`, `leetcode`, `learning`, `contact`. `scrollToSection(id: string): void` exported from `src/lib/route.ts` (smooth unless reduced motion).
  - `<Nav onOpenPalette={() => void} onLogoClick={() => void} />` — logo text `TAI NGUYEN ©2026`, links Work/Contact (scroll), EN/VI segmented switch (`role="group"`, two `aria-pressed` buttons), ⌘K hint button.
  - App wraps everything in `LangProvider` → `ToastProvider`; root element gets class `swapping` for 230 ms on language change (CSS fades `[data-i18n]` text) — skip under reduced motion.

- [ ] **Step 1: Write the failing test**

```tsx
test('EN/VI switch translates nav and keeps the open case', async () => {
  window.history.replaceState(null, '', '/portfolio/#/work/zen-ledger-portal');
  render(<App />);
  await userEvent.click(screen.getByRole('button', { name: 'VI' }));
  expect(screen.getByRole('button', { name: 'Liên hệ' })).toBeInTheDocument();
  expect(location.hash).toBe('#/work/zen-ledger-portal');
  expect(screen.getByRole('button', { name: 'VI' })).toHaveAttribute('aria-pressed', 'true');
});
test('⌘K hint calls onOpenPalette', async () => { /* render <Nav onOpenPalette={fn} …/>, click name /⌘K/, expect fn called */ });
```

- [ ] **Step 2: Run** `npx vitest run src/components/Nav` — Expected: FAIL.
- [ ] **Step 3: Implement** hooks, `Nav`, `ToastProvider` (bottom-centre pill, `role="status"`, 1.5 s), and App layout with empty `<section id=…>` placeholders in spec order.
- [ ] **Step 4: Run** — Expected: PASS.
- [ ] **Step 5: Commit** `feat: app shell, sticky nav with EN/VI switch, motion hooks`

---

### Task 5: Global effects — cursor, grain, kinetic headline letters

**Files:**
- Create: `src/components/Cursor/Cursor.tsx` (+css), `src/components/Grain/Grain.tsx` (+css), `src/components/KineticText/KineticText.tsx` (+css)
- Modify: `src/App.tsx`
- Test: `src/components/KineticText/KineticText.test.tsx`

**Interfaces:**
- Produces: `<KineticText as="h1"|"h2"|"span" text: string className?: string />` — renders `aria-label={text}` on the wrapper and `aria-hidden` per-letter spans (hover: lift −18 %, rotate −6°, orange; reference demo v4 `.ch`). `<Cursor />` — 80 px white circle, `mix-blend-mode: difference`, grows to 150 px over `a, button, [data-cursor="grow"]`; not rendered when `(pointer: coarse)` or reduced motion. `<Grain />` — fixed SVG-noise overlay, opacity 0.1, `pointer-events: none`, animation off under reduced motion.

- [ ] **Step 1: Write the failing test**

```tsx
test('KineticText keeps accessible text and splits letters', () => {
  render(<KineticText as="h2" text="SELECTED WORKS" />);
  expect(screen.getByRole('heading', { name: 'SELECTED WORKS' })).toBeInTheDocument();
  expect(document.querySelectorAll('[aria-hidden="true"] span, span[aria-hidden="true"]').length).toBeGreaterThanOrEqual(13);
});
```

- [ ] **Step 2: Run** — FAIL. **Step 3: Implement.** **Step 4: Run** — PASS. Also `npm run dev` and check the cursor inverts over the headline.
- [ ] **Step 5: Commit** `feat: custom cursor, grain overlay, kinetic headline letters`

---

### Task 6: Preloader — git clone

**Files:**
- Create: `src/lib/session.ts`, `src/components/Preloader/Preloader.tsx` (+css)
- Modify: `src/App.tsx`
- Test: `src/lib/session.test.ts`, `src/components/Preloader/Preloader.test.tsx`

**Interfaces:**
- Produces: `shouldPlayPreloader(storage: Pick<Storage,'getItem'> | null, reducedMotion: boolean): boolean` (false if reduced motion or `sessionStorage['preloaded']==='1'`); `markPreloaded(storage)`. `<Preloader onDone={() => void} />` — lines from `t.preloader` (terminal text stays English; the final greeting line is translated), progress bar 0→100 %, total ≈ 3 s, then top half `translateY(-100%)` / bottom half `translateY(100%)` over 0.8 s; any key or click skips straight to `onDone`. Reference: P2 in `demo-extras-options.html`.

- [ ] **Step 1: Write the failing tests**

```ts
test('plays first time only', () => { const s = new Map(); const st = { getItem: (k: string) => s.get(k) ?? null, setItem: (k: string, v: string) => s.set(k, v) };
  expect(shouldPlayPreloader(st, false)).toBe(true); markPreloaded(st); expect(shouldPlayPreloader(st, false)).toBe(false); });
test('never under reduced motion', () => expect(shouldPlayPreloader(null, true)).toBe(false));
```
```tsx
test('skips on keypress', async () => { vi.useFakeTimers(); const done = vi.fn(); render(<Preloader onDone={done} />);
  fireEvent.keyDown(window, { key: 'Enter' }); expect(done).toHaveBeenCalledOnce(); });
test('finishes on its own', () => { vi.useFakeTimers(); const done = vi.fn(); render(<Preloader onDone={done} />);
  act(() => vi.advanceTimersByTime(4500)); expect(done).toHaveBeenCalledOnce(); });
```

- [ ] **Step 2: Run** — FAIL. **Step 3: Implement** (timers via `setTimeout`, not rAF, so fake timers drive it). **Step 4: Run** — PASS.
- [ ] **Step 5: Commit** `feat: git-clone preloader, once per session, skippable`

---

### Task 7: Hero + About (layout, bio, meta, CTAs, clock)

**Files:**
- Create: `src/lib/clock.ts`, `src/components/Hero/Hero.tsx` (+css)
- Test: `src/lib/clock.test.ts`, `src/components/Hero/Hero.test.tsx`

**Interfaces:**
- Consumes: `useLang`, `KineticText`, `scrollToSection`.
- Produces: `hcmcTime(d: Date, withSeconds?: boolean): string` (`Asia/Ho_Chi_Minh`, en-GB 24 h); `isProbablyAwake(d: Date): boolean` (HCMC hour 8–22 inclusive → true). `<Hero badgeSlot: ReactNode />` — left column: `<KineticText as="h1" text="FULLSTACK ENGINEER." />` (period orange), bio, CTAs `Download CV ↓` (`<a href={BASE_URL+'cv/Tai_Nguyen_CV.pdf'} download>`) and `Get in touch →` (scrolls to `contact`); meta row (Based in + live clock · Previously Grab · TMA Solutions · Education UIT · Software Eng. · GPA 8.57 · ● Open to work). Layout per `demo-v4-hero-about.html`.

- [ ] **Step 1: Write the failing tests**

```ts
test('HCMC is UTC+7', () => expect(hcmcTime(new Date('2026-10-22T01:05:09Z'))).toBe('08:05'));
test('awake at 08:00, asleep at 23:00', () => {
  expect(isProbablyAwake(new Date('2026-10-22T01:00:00Z'))).toBe(true);
  expect(isProbablyAwake(new Date('2026-10-22T16:00:00Z'))).toBe(false);
});
```
```tsx
test('CV link points under the base path', () => { render(<Providers><Hero badgeSlot={null} /></Providers>);
  expect(screen.getByRole('link', { name: /Download CV/ })).toHaveAttribute('href', '/portfolio/cv/Tai_Nguyen_CV.pdf'); });
test('shows education and no phone', () => { /* expect text 'GPA 8.57'; expect body text not to match /\+84/ */ });
```

- [ ] **Step 2: Run** — FAIL. **Step 3: Implement.** **Step 4: Run** — PASS.
- [ ] **Step 5: Commit** `feat: hero with merged about, CTAs and live HCMC clock`

---

### Task 8: 3D lanyard badge

**Files:**
- Create: `src/lib/verlet.ts`, `src/components/Badge/BadgeScene.ts` (imperative Three.js), `src/components/Badge/Badge.tsx`, `src/components/Badge/BadgeFallback.tsx` (+css), `src/components/Badge/textures.ts`
- Modify: `src/App.tsx` (lazy-load `Badge` into `Hero badgeSlot`)
- Test: `src/lib/verlet.test.ts`, `src/components/Badge/Badge.test.tsx`

**Interfaces:**
- Produces:
  - `type Vec3 = { x: number; y: number; z: number }`; `class Rope { constructor(anchor: Vec3, segments: number, segLen: number, tailLen: number); step(dt: number, drag?: Vec3 | null): void; points: readonly Vec3[]; tail: Vec3; yaw: number; flip(): void }` — verlet integration with damping 0.982, gravity, 16 constraint iterations, drag clamped to max reach; `yaw` driven by horizontal tail velocity with spring toward 0 or π (`flip()` toggles target). Port from `demo-v3-hero-city-casestudy.html` (module script).
  - `createBadgeScene(canvasHost: HTMLElement, opts: { photoUrl: string }): { start(): void; stop(): void; dispose(): void }` — renderer, RoomEnvironment env map, shadow-catching wall, rounded ExtrudeGeometry card + front/back `MeshPhysicalMaterial` (clearcoat 1, iridescence 0.35), metal clip, ribbon strap with canvas texture "TAI NGUYEN ✦ FULLSTACK ✦", pointer drag via raycast, double-click flip. Front texture draws `profile.jpg` (ID style), `TAI NGUYEN`, `Fullstack Engineer`, `HCMC · GMT+7 · ex-GRAB`, barcode; back: QR-style grid, `linkedin.com/in/tai-nt`, `github.com/thvnhtai`, `thanhtaiwork04@gmail.com`. Camera z = 11, strap N = 12, SEG = 0.24 (values from demo v4).
  - `<Badge />` — uses `useInView` to `start/stop`; renders `<BadgeFallback />` when `!supportsWebGL()` or reduced motion; DPR capped at 1.5 on `(pointer: coarse)`.
  - `supportsWebGL(): boolean` exported from `Badge.tsx`.

- [ ] **Step 1: Write the failing tests**

```ts
test('rope settles to its rest length under gravity', () => {
  const r = new Rope({ x: 0, y: 0, z: 0 }, 12, 0.24, 1.52);
  for (let i = 0; i < 2000; i++) r.step(1 / 120);
  const len = r.points.slice(1).reduce((s, p, i) => s + Math.hypot(p.x - r.points[i]!.x, p.y - r.points[i]!.y, p.z - r.points[i]!.z), 0);
  expect(len).toBeCloseTo(12 * 0.24, 1);
  expect(r.tail.y).toBeLessThan(r.points[12]!.y);
});
test('drag is clamped to max reach', () => {
  const r = new Rope({ x: 0, y: 0, z: 0 }, 12, 0.24, 1.52);
  r.step(1 / 120, { x: 100, y: 0, z: 0 });
  expect(Math.hypot(r.tail.x, r.tail.y)).toBeLessThanOrEqual(12 * 0.24 + 1.52 + 0.61);
});
test('flip drives yaw toward PI', () => { const r = new Rope({x:0,y:0,z:0}, 12, 0.24, 1.52); r.flip(); for (let i = 0; i < 3000; i++) r.step(1/120); expect(r.yaw).toBeCloseTo(Math.PI, 1); });
```
```tsx
test('falls back to the static card without WebGL', () => { /* mock HTMLCanvasElement.getContext → null; render <Badge/>; expect img alt "Tai Nguyen" and text "TAI NGUYEN" */ });
```

- [ ] **Step 2: Run** — FAIL. **Step 3: Implement** `verlet.ts` first, then the scene (no unit tests for WebGL), fallback card (CSS card with photo, name, role, slight tilt on hover). **Step 4: Run** tests — PASS; `npm run dev`: drag swings, double-click flips, scene stops when scrolled away (check `renderer.info.render.frame` stops increasing in DevTools).
- [ ] **Step 5: Commit** `feat: 3D lanyard badge with verlet strap and static fallback`

---

### Task 9: Selected Works — isometric city

**Files:**
- Create: `src/lib/iso.ts`, `src/components/Works/CityCanvas.ts`, `src/components/Works/Works.tsx` (+css)
- Test: `src/lib/iso.test.ts`, `src/components/Works/Works.test.tsx`

**Interfaces:**
- Consumes: `CASES` (city coords), `useRoute().openCase`, `useInView`.
- Produces:
  - `iso(a: number, b: number, o: { x: number; y: number; tw: number; th: number }): { x: number; y: number }`; `isRoad(a: number, b: number): boolean` (a or b ∈ {4, 8}); `buildingBox(a,b,h,o): { top: number; left: number; right: number; bottom: number; cx: number }`; `hitTest(boxes: {slug: CaseSlug; box: Box}[], x: number, y: number): CaseSlug | null`.
  - `createCity(canvas, { onHover(slug|null), onPick(slug, origin: {x,y}) }): { start(); stop(); highlight(slug|null); zoomTo(slug): Promise<void> }` — G = 10 grid, tw = 70, th = 35, filler buildings/trees from a seeded PRNG (seed 7), 10 green `#00b14f` scooters on road lines, bobbing project buildings with numbered pins (reference demo v3).
  - `<Works />` — `KineticText` heading "SELECTED WORKS (5)" (VI "DỰ ÁN TIÊU BIỂU (5)"), legend of 5 `<button>`s (hover highlights building, click opens), canvas `aria-hidden`; on click: `zoomTo` (scale 4.5, 0.9 s) then `openCase(slug)` and stores the origin in `sessionStorage['caseOrigin']` for the reveal. Under `(max-width: 720px)` the legend is the primary UI (stacked cards with project colour) and the canvas is a decorative strip.

- [ ] **Step 1: Write the failing tests**

```ts
const O = { x: 500, y: 90, tw: 70, th: 35 };
test('iso projection', () => { expect(iso(0, 0, O)).toEqual({ x: 500, y: 90 }); expect(iso(1, 0, O)).toEqual({ x: 535, y: 107.5 }); });
test('roads', () => { expect(isRoad(4, 1)).toBe(true); expect(isRoad(2, 2)).toBe(false); });
test('hit test picks the building under the pointer', () => {
  const box = buildingBox(2, 2, 120, O);
  expect(hitTest([{ slug: 'zen-ledger-portal', box }], box.cx, box.top + 10)).toBe('zen-ledger-portal');
  expect(hitTest([{ slug: 'zen-ledger-portal', box }], 0, 0)).toBeNull();
});
```
```tsx
test('legend buttons open the case', async () => { render(<Providers><Works /></Providers>);
  await userEvent.click(screen.getByRole('button', { name: /Zen Ledger Portal/ }));
  await waitFor(() => expect(location.hash).toBe('#/work/zen-ledger-portal')); });
```

- [ ] **Step 2: Run** — FAIL. **Step 3: Implement** (in jsdom `getContext` returns null → `createCity` must no-op safely; `Works` still opens the case immediately when the city is unavailable). **Step 4: Run** — PASS; visually compare with demo v3 in `npm run dev`.
- [ ] **Step 5: Commit** `feat: isometric city works section with accessible legend`

---

### Task 10: Case study overlay

**Files:**
- Create: `src/components/CaseStudy/CaseStudy.tsx` (+css)
- Modify: `src/App.tsx` (render when `route.kind === 'case'`)
- Test: `src/components/CaseStudy/CaseStudy.test.tsx`

**Interfaces:**
- Consumes: `useRoute`, `useLang`, `CASES`, `t.cases[slug]`, `t.caseUi`, `<MockUi kind />` and `<ArchDiagram nodes note color />` (Task 11 — render a placeholder `<div data-testid="mock"/>` until then and swap in Task 11).
- Produces: `<CaseStudy slug: CaseSlug />` — `role="dialog" aria-modal="true" aria-labelledby` title; circular `clip-path` reveal from `sessionStorage['caseOrigin']` (centre if absent; none under reduced motion); sticky bar `0N / 05 · Case study`, EN/VI switch, `← Back to the city`; reading-progress bar; sections in spec order; `.rv` scroll reveals; Next project link → next slug (wraps). Focus moves to the dialog title on open and returns to the triggering element on close; `Escape` closes; body scroll locked while open. Layout and styles from demo v3/v6.

- [ ] **Step 1: Write the failing tests**

```tsx
test.each(['zen-ledger-portal','invoicing-portal','universal-config-management','voucher-dashboard','cloud-native-ecommerce'])
('renders %s with title and outcomes', (slug) => {
  window.history.replaceState(null, '', `/portfolio/#/work/${slug}`); render(<App />);
  const dlg = screen.getByRole('dialog'); expect(within(dlg).getAllByRole('heading').length).toBeGreaterThan(4);
});
test('Escape closes back to home', async () => { /* open zen, press Escape, expect no dialog and location.hash === '' */ });
test('next project wraps from E-Commerce to Zen Ledger', async () => { /* open cloud-native-ecommerce, click /NEXT PROJECT/, expect hash #/work/zen-ledger-portal */ });
test('VI deep link renders Vietnamese case copy (Review Focus #1)', () => {
  window.history.replaceState(null, '', '/portfolio/?lang=vi#/work/invoicing-portal'); render(<App />);
  expect(screen.getByText('← Quay lại thành phố')).toBeInTheDocument();
});
test('E-Commerce shows the public repo link', () => { /* expect link href https://github.com/sloweyyy/cloud-native-ecommerce-platform */ });
```

- [ ] **Step 2: Run** — FAIL. **Step 3: Implement.** **Step 4: Run** — PASS.
- [ ] **Step 5: Commit** `feat: case study overlay with reveal, progress, focus management`

---

### Task 11: Recreated mock UIs and architecture diagram

**Files:**
- Create: `src/components/Mocks/MockUi.tsx`, `LedgerMock.tsx`, `InvoiceMock.tsx`, `DiffMock.tsx`, `VoucherMock.tsx`, `MfeMock.tsx`, `Mocks.module.css`, `src/components/ArchDiagram/ArchDiagram.tsx`
- Modify: `src/components/CaseStudy/CaseStudy.tsx` (replace placeholder)
- Test: `src/components/Mocks/Mocks.test.tsx`, `src/components/ArchDiagram/ArchDiagram.test.tsx`

**Interfaces:**
- Produces: `<MockUi kind: CaseBase['mock'] url: string />` — browser-frame chrome with `url`, the mock body, and the translated "Recreated interface…" note under it. `LedgerMock` prepends a random transaction row every 1300 ms (max 7 rows, `TX-######`, account `ACC-#####`, type CREDIT/DEBIT/TRANSFER/REFUND, Settled/Pending, amount 10–9010), paused when off-screen or reduced motion; other mocks are static tables/diffs/cards per `mockHTML` in demo v3. `<ArchDiagram nodes: string[] note: string color: string />` — inline SVG, animated dashed links and travelling dots (static under reduced motion), `role="img"` with `aria-label` = nodes joined by " → ".

- [ ] **Step 1: Write the failing tests**

```tsx
test.each(['ledger','invoice','diff','voucher','mfe'] as const)('%s mock shows the recreated label', (kind) => {
  render(<Providers><MockUi kind={kind} url="x" /></Providers>);
  expect(screen.getByText(/Recreated interface with sample data/)).toBeInTheDocument();
});
test('ledger streams rows, capped at 7', () => { vi.useFakeTimers(); render(<Providers><MockUi kind="ledger" url="x" /></Providers>);
  act(() => vi.advanceTimersByTime(1300 * 12)); expect(screen.getAllByRole('row').length - 1).toBe(7); });
test('diagram is labelled', () => { render(<ArchDiagram nodes={['React UI','Go service']} note="" color="#ff4d00" />);
  expect(screen.getByRole('img', { name: 'React UI → Go service' })).toBeInTheDocument(); });
```

- [ ] **Step 2: Run** — FAIL. **Step 3: Implement.** **Step 4: Run** — PASS (also re-run Task 10 tests).
- [ ] **Step 5: Commit** `feat: recreated mock UIs and animated architecture diagrams`

---

### Task 12: How I work — git graph

**Files:**
- Create: `src/components/HowIWork/HowIWork.tsx` (+css)
- Test: `src/components/HowIWork/HowIWork.test.tsx`

**Interfaces:**
- Consumes: `HOW_STEPS`, `t.how`, GSAP `ScrollTrigger`, `useReducedMotion`.
- Produces: `<HowIWork />` in `#how` — dark (`#0d1117`) left title `git log --how-i-work.` + note + `$ git log --graph --oneline`; right SVG graph (main lane x=36 orange, feature lane x=80 blue `#1f6feb`, branch out after step 2, merge at step 5), rows: short hash, `(main)`/`(feature/realtime-feed)`, `merge ✓` badge on step 5, commit message (English always), translated description. ScrollTrigger pins the section for ~2600 px; path `strokeDashoffset` and row `.on` follow progress. Reduced motion: no pin, all rows `.on`, paths fully drawn. Reference option A in `demo-how-i-work-options.html`.

- [ ] **Step 1: Write the failing test**

```tsx
test('commit messages stay English in VI', () => {
  window.history.replaceState(null, '', '/portfolio/?lang=vi'); render(<Providers><HowIWork /></Providers>);
  expect(screen.getByText('feat: talk to users, agree API contract')).toBeInTheDocument();
  expect(screen.getByText(/Bắt đầu từ chính người dùng/)).toBeInTheDocument();
});
test('reduced motion shows every step lit (Review Focus #3)', () => { /* mock matchMedia reduce=true; expect 6 rows with class containing "on" */ });
```

- [ ] **Step 2: Run** — FAIL. **Step 3: Implement** (register ScrollTrigger once in `src/lib/gsap.ts`; kill triggers on unmount). **Step 4: Run** — PASS.
- [ ] **Step 5: Commit** `feat: how-i-work git graph with scroll-driven drawing`

---

### Task 13: Career timeline — year odometer

**Files:**
- Create: `src/components/Timeline/Timeline.tsx` (+css)
- Test: `src/components/Timeline/Timeline.test.tsx`

**Interfaces:**
- Consumes: `TIMELINE`, `t.timeline`, `useRoute().openCase`, GSAP ScrollTrigger.
- Produces: `<Timeline />` in `#career` — pinned dark section; giant `202` + rolling last digit (2–6) in orange; cards for the active year slide in from the right; year ruler 2022…2026 with the active year orange. Job cards (`tma`, `grab-intern`, `grab-swe`) are buttons opening their case (`voucher-dashboard`, `invoicing-portal`, `zen-ledger-portal`). Reduced motion: no pin; years rendered as a plain stacked list. Also export `groupByYear(events: TimelineEvent[]): Map<number, TimelineEvent[]>` from the component file.

- [ ] **Step 1: Write the failing tests**

```ts
test('groups events by year', () => {
  const g = groupByYear(TIMELINE);
  expect([...g.keys()]).toEqual([2022, 2023, 2024, 2025, 2026]);
  expect(g.get(2025)!.map(e => e.id)).toEqual(['grab-intern', 'grab-swe']);
  expect(g.get(2026)!.map(e => e.id)).toEqual(['toeic-sw', 'graduated', 'now']);
});
```
```tsx
test('job card opens its case study', async () => { render(<Providers><Timeline /></Providers>); /* reduced motion list; click button /TMA Solutions/; expect hash #/work/voucher-dashboard */ });
```

- [ ] **Step 2: Run** — FAIL. **Step 3: Implement.** **Step 4: Run** — PASS.
- [ ] **Step 5: Commit** `feat: career timeline year odometer`

---

### Task 14: Skills — giant marquee

**Files:**
- Create: `src/components/Skills/Skills.tsx` (+css)
- Test: `src/components/Skills/Skills.test.tsx`

**Interfaces:**
- Consumes: `SKILLS`, `t.skills`.
- Produces: `<Skills />` in `#skills` — dark, title "The stack." (VI "Bộ công cụ."); three rows (fe · be+ar · dv+qa+ai), each row's chips rendered twice for a seamless CSS `translateX(-50%)` loop (40 s / 46 s reverse / 52 s); hover on the row container pauses all rows; chip hover tilts −3° and turns orange; coloured group dot (`fe #ff4d00, ar #6d28d9, be #0891b2, dv #16a34a, qa #eab308, ai #ec4899`); legend at bottom. The duplicated half is `aria-hidden`. A visually hidden `<ul>` lists each skill once for screen readers. Reduced motion: rows wrap, no animation.

- [ ] **Step 1: Write the failing test**

```tsx
test('every CV skill is listed once for assistive tech, no percentages', () => {
  render(<Providers><Skills /></Providers>);
  const list = screen.getByRole('list', { name: /skills/i });
  expect(within(list).getAllByRole('listitem')).toHaveLength(SKILLS.length);
  expect(document.body.textContent).not.toMatch(/\d+\s?%/);
});
```

- [ ] **Step 2: Run** — FAIL. **Step 3: Implement.** **Step 4: Run** — PASS.
- [ ] **Step 5: Commit** `feat: skills giant marquee`

---

### Task 15: LeetCode data pipeline and scoreboard

**Files:**
- Create: `scripts/fetch-leetcode.mjs`, `scripts/leetcode-transform.mjs`, `scripts/fixtures/leetcode-response.json`, `public/data/leetcode.json`, `src/lib/leetcode.ts`, `src/components/LeetCode/LeetCode.tsx` (+css)
- Test: `scripts/leetcode-transform.test.mjs` (run by vitest), `src/lib/leetcode.test.ts`, `src/components/LeetCode/LeetCode.test.tsx`

**Interfaces:**
- Produces:
  - `type LeetCodeStats = { fetchedAt: string; username: 'thvnhtai'; total: number; easy: number; medium: number; hard: number; allEasy: number; allMedium: number; allHard: number; ranking: number | null; streak: number; activeDays: number; contestRating: number | null; calendar: Record<string, number> }` (calendar keys = unix seconds as strings).
  - `transform(graphqlData): LeetCodeStats` in `leetcode-transform.mjs` (query from spec "Decided how"; fields `matchedUser{profile{ranking} submitStatsGlobal{acSubmissionNum{difficulty count}} userCalendar{streak totalActiveDays submissionCalendar}} allQuestionsCount{difficulty count} userContestRanking{rating}`). `fetch-leetcode.mjs` POSTs to `https://leetcode.com/graphql` with `Referer: https://leetcode.com`, writes `public/data/leetcode.json`, and on any failure exits 0 leaving the previous file untouched.
  - `toHeatmap(calendar: Record<string, number>, today: Date): { date: string; count: number; level: 0|1|2|3|4 }[]` — 53 full weeks ending today (Sunday-aligned), level by quartile of the max.
  - `ringFraction(solved: number, total: number): number` — `solved/total` clamped to [0,1], 0 when total ≤ 0.
  - `sumLastYear(calendar, today): number`.
  - `<LeetCode />` in `#leetcode` — fetches `BASE_URL + 'data/leetcode.json'`; giant total counts up from 0 when in view; ranking line; three SVG rings (Easy `#16a34a`, Medium `#eab308`, Hard `#ef4444`) to `ringFraction`; streak / active days / last-year submissions count up; heatmap cells pop in by week; contest stat only when `contestRating !== null`; link to the profile; on fetch failure renders a compact card "Stats unavailable — see my LeetCode profile ↗". Reference option A in `demo-leetcode-options.html`.
- Capture the fixture once: run the query from the spec with `curl` and save the response to `scripts/fixtures/leetcode-response.json`.

- [ ] **Step 1: Write the failing tests**

```ts
// scripts/leetcode-transform.test.mjs
import fixture from './fixtures/leetcode-response.json';
test('transform maps difficulties and totals', () => {
  const s = transform(fixture.data);
  expect(s.total).toBe(s.easy + s.medium + s.hard);
  expect(s.allEasy).toBeGreaterThan(s.easy);
  expect(typeof s.calendar).toBe('object');
});
test('missing contest ranking becomes null', () => expect(transform({ ...fixture.data, userContestRanking: null }).contestRating).toBeNull());
// src/lib/leetcode.test.ts
test('heatmap is 53 weeks and handles empty calendar (Review Focus #2)', () => {
  const h = toHeatmap({}, new Date('2026-10-22T00:00:00Z'));
  expect(h.length % 7).toBe(0); expect(h.length).toBeGreaterThanOrEqual(365); expect(h.every(d => d.level === 0)).toBe(true);
});
test('ringFraction guards zero', () => { expect(ringFraction(5, 0)).toBe(0); expect(ringFraction(176, 972)).toBeCloseTo(0.181, 3); });
```
```tsx
test('renders without NaN when stats are partial and hides contest', async () => {
  vi.spyOn(global, 'fetch').mockResolvedValue(new Response(JSON.stringify({ ...SAMPLE, calendar: {}, contestRating: null })));
  render(<Providers><LeetCode /></Providers>);
  await screen.findByText(/thvnhtai/); expect(document.body.textContent).not.toMatch(/NaN|undefined/);
  expect(screen.queryByText(/contest/i)).toBeNull();
});
test('fetch failure shows the fallback card', async () => { vi.spyOn(global, 'fetch').mockRejectedValue(new Error('x'));
  render(<Providers><LeetCode /></Providers>); expect(await screen.findByText(/Stats unavailable/)).toBeInTheDocument(); });
```

- [ ] **Step 2: Run** — FAIL. **Step 3: Implement**; run `node scripts/fetch-leetcode.mjs` to create the real `public/data/leetcode.json`. **Step 4: Run** — PASS.
- [ ] **Step 5: Commit** `feat: LeetCode nightly data pipeline and scoreboard`

---

### Task 16: Now learning — browser tabs

**Files:**
- Create: `src/components/NowLearning/NowLearning.tsx` (+css)
- Test: `src/components/NowLearning/NowLearning.test.tsx`

**Interfaces:**
- Consumes: `t.learning` → `{ title: string; topics: { id: 'system-design'|'go'|'ddia'; tab: string; by: string; url: string; why: string; learned: string[] | null; where: string | null; takeaway: string | null }[]; placeholders: { learned: string; where: string; takeaway: string } }`.
- Produces: `<NowLearning />` in `#learning` — browser window; ARIA tabs (`role="tablist"`, `tab`, `tabpanel`; ←/→ move, Home/End); each tab shows a spinning loader icon (static under reduced motion); switching runs a 0.6 s loading bar, swaps the URL bar text and panel. Null fields render the dashed placeholder box with the placeholder text so Tai can see what to fill. Reference option D in `demo-now-learning-options.html`.

- [ ] **Step 1: Write the failing tests**

```tsx
test('arrow keys move between tabs and show the panel', async () => {
  render(<Providers><NowLearning /></Providers>);
  const tabs = screen.getAllByRole('tab'); tabs[0]!.focus();
  await userEvent.keyboard('{ArrowRight}');
  expect(screen.getAllByRole('tab')[1]).toHaveAttribute('aria-selected', 'true');
  expect(await screen.findByRole('tabpanel')).toHaveTextContent(/Go backend/);
});
test('unfilled fields show placeholders, no percentages', () => { render(<Providers><NowLearning /></Providers>);
  expect(screen.getAllByText(/Tai fills in|e\.g\. chapter/).length).toBeGreaterThan(0);
  expect(document.body.textContent).not.toMatch(/\d+\s?%/); });
```

- [ ] **Step 2: Run** — FAIL. **Step 3: Implement.** **Step 4: Run** — PASS.
- [ ] **Step 5: Commit** `feat: now-learning browser tabs with placeholders`

---

### Task 17: Contact — decoding email

**Files:**
- Create: `src/lib/scramble.ts`, `src/lib/clipboard.ts`, `src/components/Contact/Contact.tsx` (+css)
- Test: `src/lib/scramble.test.ts`, `src/lib/clipboard.test.ts`, `src/components/Contact/Contact.test.tsx`

**Interfaces:**
- Consumes: `hcmcTime`, `isProbablyAwake`, `useToast`, `useInView`.
- Produces:
  - `scrambleFrame(target: string, frame: number, rand: () => number): string` — characters with index `< frame/2` are final; `@` and `.` always final; others from `!<>-_\/[]{}=+*^?#01abcdef`; returns `target` when `frame >= target.length * 2`.
  - `copyText(text: string): Promise<boolean>` — `navigator.clipboard.writeText`, falls back to a hidden `<textarea>` + `document.execCommand('copy')`; resolves `false` if both fail.
  - `<Contact />` in `#contact` — prompt line, `<button>` containing the email in JetBrains Mono ~46 px that decodes on enter-view and on hover (28 ms/frame), click → `copyText` → toast `t.toast.copied` ("Email copied ✓") or `t.toast.copyFailed` ("Couldn't copy — select the email"); ruled link list LinkedIn `/in/tai-nt ↗`, GitHub `/thvnhtai ↗`, LeetCode `/u/thvnhtai ↗` (real `<a target="_blank" rel="noopener">`); clock block top-right with `● Probably awake` / `☾ Probably asleep — reply tomorrow` (translated). Reduced motion: no scramble.

- [ ] **Step 1: Write the failing tests**

```ts
test('scramble resolves to target', () => expect(scrambleFrame('a@b.c', 10, () => 0)).toBe('a@b.c'));
test('scramble keeps @ and . fixed', () => { const f = scrambleFrame('ab@cd.ef', 0, () => 0.5); expect(f[2]).toBe('@'); expect(f[5]).toBe('.'); });
test('copyText reports failure when no clipboard (Review Focus #5)', async () => {
  Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true });
  document.execCommand = vi.fn().mockReturnValue(false);
  expect(await copyText('x')).toBe(false);
});
```
```tsx
test('failed copy shows the failure toast, not success', async () => { /* clipboard undefined, execCommand false; click email button; expect findByText(/Couldn't copy/) */ });
test('links are real external links', () => { render(<Providers><Contact /></Providers>);
  expect(screen.getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('href', 'https://www.linkedin.com/in/tai-nt'); });
```

- [ ] **Step 2: Run** — FAIL. **Step 3: Implement.** **Step 4: Run** — PASS.
- [ ] **Step 5: Commit** `feat: contact section with decoding email and safe copy`

---

### Task 18: Command palette (⌘K)

**Files:**
- Create: `src/lib/palette.ts`, `src/components/CommandPalette/CommandPalette.tsx` (+css)
- Modify: `src/App.tsx` (global shortcut, Nav hint)
- Test: `src/lib/palette.test.ts`, `src/components/CommandPalette/CommandPalette.test.tsx`

**Interfaces:**
- Consumes: `useLang`, `useRoute`, `scrollToSection`, `copyText`, `useToast`, `CASES`.
- Produces:
  - `type Command = { id: string; group: 'navigate'|'projects'|'actions'|'links'; label: string; keywords: string; run(): void }`.
  - `filterCommands(cmds: Command[], query: string): Command[]` — case-insensitive substring over `label + keywords + group`; keeps original order.
  - `moveSelection(index: number, delta: 1 | -1, length: number): number` — clamps to `[0, length-1]`, returns 0 when length is 0.
  - `buildCommands(ctx: { t: Copy; lang: Lang; setLang(l: Lang): void; openCase(s: CaseSlug): void; scrollTo(id: SectionId): void; copyEmail(): void; downloadCv(): void; openUrl(u: string): void }): Command[]` — ids: `nav:<SectionId>`, `case:<slug>`, `act:copy-email`, `act:cv`, `act:lang`, `link:linkedin|github|leetcode`.
  - `<CommandPalette open: boolean onClose(): void />` — `role="dialog"` with a `combobox` input and `listbox` of `option`s grouped under translated headings; ↑/↓ via `moveSelection`, Enter runs then closes, Esc/backdrop closes, focus returns to the opener. Commands: Navigate (Home, Selected Works, How I work, Career, Skills, LeetCode, Now learning, Contact), Projects (5 cases → `openCase`), Actions (Copy email → `copyText` + toast, Download CV → open PDF, Switch to Tiếng Việt / Switch to English), Links (LinkedIn, GitHub, LeetCode). Global shortcut: `(metaKey||ctrlKey) && key==='k'` toggles, ignored when the event target is an `input`/`textarea` outside the palette.

- [ ] **Step 1: Write the failing tests**

```ts
const noop = () => {};
const CMDS = buildCommands({ t: en, lang: 'en', setLang: noop, openCase: noop, scrollTo: noop, copyEmail: noop, downloadCv: noop, openUrl: noop });
test('filter by keyword', () => expect(filterCommands(CMDS, 'zen').map(c => c.id)).toEqual(['case:zen-ledger-portal']));
test('moveSelection clamps', () => { expect(moveSelection(0, -1, 5)).toBe(0); expect(moveSelection(4, 1, 5)).toBe(4); expect(moveSelection(0, 1, 0)).toBe(0); });
```
```tsx
test('⌘K opens, typing filters, Enter opens the case', async () => {
  render(<App />); await userEvent.keyboard('{Meta>}k{/Meta}');
  await userEvent.type(screen.getByRole('combobox'), 'invoic'); await userEvent.keyboard('{Enter}');
  expect(location.hash).toBe('#/work/invoicing-portal'); expect(screen.queryByRole('combobox')).toBeNull();
});
test('switch language command', async () => { /* open, type "viet", Enter; expect nav 'Liên hệ' */ });
```

- [ ] **Step 2: Run** — FAIL. **Step 3: Implement.** **Step 4: Run** — PASS.
- [ ] **Step 5: Commit** `feat: command palette with keyboard navigation`

---

### Task 19: Easter egg — gravity mode

**Files:**
- Create: `src/lib/clickBurst.ts`, `src/components/GravityEgg/useGravity.ts`
- Modify: `src/components/Nav/Nav.tsx` (logo click), `src/App.tsx`
- Test: `src/lib/clickBurst.test.ts`, `src/components/GravityEgg/useGravity.test.tsx`

**Interfaces:**
- Produces: `createClickBurst(count: number, windowMs: number, now: () => number): () => boolean` — returns true on the click that completes `count` clicks each within `windowMs` of the previous, then resets. `useGravity(): () => void` — trigger; selects visible elements marked `data-gravity` inside the viewport, animates them falling past the bottom with random rotation (1.2 s, ease-in, random 0–0.4 s delay), then springs them back (0.9 s) and clears inline styles; no-op under reduced motion or while running; announces via toast "🍎 Gravity on". Mark nav items, headings, buttons and cards with `data-gravity`. Wired: Nav logo click → `burst()` → `trigger()` with `createClickBurst(5, 1200, performance.now)`.

- [ ] **Step 1: Write the failing tests**

```ts
test('fires on the fifth quick click only', () => { let t = 0; const b = createClickBurst(5, 1200, () => t);
  expect([0,1,2,3].map(() => { t += 100; return b(); })).toEqual([false,false,false,false]); t += 100; expect(b()).toBe(true); });
test('slow clicks reset', () => { let t = 0; const b = createClickBurst(5, 1200, () => t); for (let i = 0; i < 4; i++){ t += 100; b(); } t += 2000; expect(b()).toBe(false); });
```
```tsx
test('no-op under reduced motion (Review Focus #3)', () => { /* matchMedia reduce; call trigger; expect no element has inline transform */ });
```

- [ ] **Step 2: Run** — FAIL. **Step 3: Implement.** **Step 4: Run** — PASS.
- [ ] **Step 5: Commit** `feat: gravity-mode easter egg on five logo clicks`

---

### Task 20: CI, deploy, smoke test, launch checklist

**Files:**
- Create: `.github/workflows/ci.yml`, `.github/workflows/deploy.yml`, `playwright.config.ts`, `e2e/smoke.spec.ts`, `README.md`
- Modify: `package.json` (`"e2e": "playwright test"`, `"stats": "node scripts/fetch-leetcode.mjs"`)

**Interfaces:**
- `ci.yml`: on `pull_request` and `push` → Node 20, `npm ci`, `npm run typecheck`, `npm test`, `npm run build`.
- `deploy.yml`: on `push` to `main`, `schedule: cron '0 19 * * *'` (02:00 HCMC) and `workflow_dispatch` → `npm ci` → `npm run stats` → `npm run build` → `actions/upload-pages-artifact@v3` (path `dist`) → `actions/deploy-pages@v4`; permissions `pages: write`, `id-token: write`.
- `playwright.config.ts`: `webServer: { command: 'npm run build && npx vite preview --port 4173', url: 'http://localhost:4173/portfolio/' }`.

- [ ] **Step 1: Write the smoke test**

```ts
// e2e/smoke.spec.ts
test('home → case → language → back', async ({ page }) => {
  await page.goto('/portfolio/?lang=en');
  await page.keyboard.press('Escape'); // skip preloader
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('FULLSTACK ENGINEER.');
  await page.getByRole('button', { name: /Zen Ledger Portal/ }).first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'VI' }).first().click();
  await expect(page.getByText('← Quay lại thành phố')).toBeVisible();
  await page.reload(); await page.keyboard.press('Escape');
  await expect(page.getByText('← Quay lại thành phố')).toBeVisible();
});
test('reduced motion: no preloader, content visible', async ({ browser }) => {
  const page = await (await browser.newContext({ reducedMotion: 'reduce' })).newPage();
  await page.goto('/portfolio/'); await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByText('git log --how-i-work.')).toBeVisible();
});
```

- [ ] **Step 2: Run** `npx playwright install chromium && npm run e2e` — Expected: PASS (fix any failures in the owning task's code).
- [ ] **Step 3: Write `README.md`** — how to run, where to edit copy (`src/content/en.ts`/`vi.ts`), how to replace the CV PDF, how to fill Now-learning fields, how stats refresh.
- [ ] **Step 4: Verify** `npm run typecheck && npm test && npm run build` all pass; open `npx vite preview` at `/portfolio/` on a phone-sized viewport (375 px) and desktop; Lighthouse (Chrome DevTools) performance and accessibility ≥ 90 on desktop — note scores in the PR/commit message.
- [ ] **Step 5: Commit** `ci: add CI, Pages deploy with nightly stats, e2e smoke`
- [ ] **Step 6: STOP — launch needs Tai.** Pushing to `github.com/thvnhtai/portfolio` replaces the existing Pages site and is irreversible. Ask Tai to (a) confirm the overwrite, (b) review the Vietnamese copy, (c) supply the final CV PDF and Now-learning content, and (d) set the repo's Pages source to "GitHub Actions". Only after a clear yes: add the remote and push `main`.
