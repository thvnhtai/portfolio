# Portfolio v2 — Design

Date: 2026-10-21
Owner: Tai Nguyen Thanh (GitHub `thvnhtai`)
Status: Approved by owner (2026-10-22) — next: implementation plan

## Intent

A single-page portfolio whose main job is to **show off frontend craft through
interaction and motion**, while telling the story of a junior fullstack
engineer with real production experience at Grab.

Tai's words: show all skills and experience "with fancy UI … as many effects as
possible". The site itself is the strongest portfolio piece. A recruiter or
hiring manager should leave thinking: "this person can build things that feel
expensive, and has shipped real systems."

Audience: recruiters and hiring managers for **junior fullstack / frontend**
roles — international (English) and Vietnamese companies. The site is
**bilingual: English and Vietnamese**, switchable at any time.

### Goals
- Memorable first 5 seconds (the 3D badge hero).
- Every real project explained in depth (case study pages), even though the Grab
  work is internal and has no public screenshots or code.
- Truthful: every claim traceable to the CV or to Tai.
- Runs as a static site on GitHub Pages.

### Non-goals
- No CMS, no blog, no backend server.
- No light/dark theme toggle (one designed palette; see Visual language).
- No testimonials (Tai has none that are real — explicitly dropped).
- No "Lab" of small demo components (explicitly dropped).
- No GitHub contribution stats (replaced by LeetCode stats).

### Anti-goals (would be a failure even if it "works")
- Invented numbers, metrics, quotes, or responsibilities.
- Real Grab screenshots, internal names beyond what Tai approved, or anything
  that looks like leaked internal material. Mock UIs must be visibly
  "recreated with sample data".
- Effects that make content unreadable or the site unusable on a phone or for
  people who prefer reduced motion.
- A slow, janky site — the effects are meant to prove skill; stutter disproves it.

## Content (source of truth)

All facts come from Tai's CV (Oct 2026) plus this conversation. Tai is still
revising the Grab bullet wording — use the facts, expect the copy to change.

**Identity.** Tai Nguyen (Thanh Tai Nguyen). Portrait photo (ID-style, white
background, white shirt): `docs/superpowers/specs/assets/profile-photo.jpg` —
use it on the badge front (replacing the "TN" initials in the demo). Headline: **"FULLSTACK ENGINEER."**
Based in Ho Chi Minh City (GMT+7). Status: Open to work.
Contact shown publicly: `thanhtaiwork04@gmail.com`, `linkedin.com/in/tai-nt`,
`github.com/thvnhtai`, `leetcode.com/u/thvnhtai`. **Phone number is NOT shown.**

**Experience**
- Grab — Software Engineer (Contract), Dec 2025 – Jun 2026, HCMC.
- Grab — Software Engineer Intern, Jul 2025 – Dec 2025, HCMC.
- TMA Solutions — Frontend Developer Intern, Dec 2024 – Mar 2025, HCMC.

**Education & certs.** B.Sc. Software Engineering, UIT – VNUHCM, Sep 2022 –
Mar 2026, GPA 8.57/10. TOEIC L&R 745 (Sep 2024), TOEIC S&W 280 (Jan 2026).

**Skills (from CV).** React, Next.js, TypeScript, JavaScript, HTML/CSS ·
TanStack Router/Query, Zustand, Zod, Ant Design, Storybook · Micro-frontends
(Module Federation, Nx), component libraries, REST/JSON, WebSocket · Webpack,
Rspack, GitHub Actions, GitLab CI/CD, Docker · Jest, React Testing Library,
unit/integration/E2E, Datadog · Go, gRPC, MySQL, Redis · Claude Code, Cursor.

**Projects (exactly five — Tai confirmed there is nothing else to show):**

| # | Project | Context | Colour |
|---|---------|---------|--------|
| 1 | Zen Ledger Portal | Grab, contract, fullstack | `#ff4d00` |
| 2 | Invoicing Portal | Grab, intern, fullstack | `#111111` |
| 3 | Universal Configuration Management | Grab, intern, frontend | `#6d28d9` |
| 4 | Voucher Management Dashboard | TMA Solutions, intern | `#0891b2` |
| 5 | Cloud-Native E-Commerce Platform | Team project, Jan–Mar 2026, public repo `github.com/sloweyyy/cloud-native-ecommerce-platform` | `#16a34a` |

Tai confirmed the Grab projects **may be described in detail** publicly.
The E-Commerce repo lives under a teammate's account — present it as a team
project and describe Tai's contributions as listed on the CV.

The approved draft copy for all five case studies (lead, meta, problem,
approach, "what I built", architecture nodes, outcomes, stack) lives in the
approved demo `docs/superpowers/specs/assets/demo-v3-hero-city-casestudy.html` (`CASES` array; also the reference for the badge physics, city, and case-study layout). Treat it as the starting
content; it was written strictly from the CV.

**Now learning (three items):** System Design · Go backend in depth · reading
*Designing Data-Intensive Applications*. Tai will supply detail content later.

**LeetCode (live):** user `thvnhtai`. At design time: 563 solved (176 Easy /
305 Medium / 82 Hard), global ranking ~168k, 36-day streak, 132 active days, no
contest rating yet.

## Visual language

- Palette: cream `#f2efe8` background, near-black `#111`, single accent orange
  `#ff4d00`; project colours above used only inside the Works city and each case
  study's header.
- Type: heavy grotesk display (Helvetica Neue–like, weight 900, tight negative
  tracking) for headlines; same family regular/medium for body. Big, editorial,
  "kinetic typography" feel (Tai chose this direction over cosmic / glass /
  terminal styles).
- Motion everywhere, but purposeful: scroll reveals, hover micro-interactions,
  smooth scroll, page-level transitions.

## Site structure (single page + case-study overlays)

Order top to bottom:

1. **Preloader — git clone** (Tai chose P2 in
   `docs/superpowers/specs/assets/demo-extras-options.html`): a dark terminal
   types `git clone https://github.com/thvnhtai/portfolio`, shows a "Receiving
   objects" progress bar filling to 100%, runs `cd portfolio && npm run hello`,
   prints "Hi, I'm Tai. Welcome in.", then the screen splits horizontally (top
   half up, bottom half down) to reveal the hero. Plays once per session; keep
   it short (≈3 s) and skippable (click/key), and skip it entirely under
   reduced motion.
2. **Hero + About — 3D lanyard badge** (approved in demo v3; About is merged
   into the hero, there is no separate About section):
   - Left: "FULLSTACK ENGINEER." huge, then a short bio (2–3 sentences)
     mentioning Grab.
   - Meta row: Based in HCMC + live local clock · Previously Grab · TMA
     Solutions · Education UIT, Software Engineering, GPA 8.57 · ● Open to work.
   - Two actions under the bio: **Download CV ↓** (single replaceable PDF path —
     the CV is still being revised) and **Get in touch** (scrolls to Contact).
   - Right: a real 3D employee badge on a fabric strap (Three.js): rounded card
     with thickness, glossy/iridescent clearcoat, metal clip, printed strap that
     twists with the card, soft shadow on the background, environment
     reflections. The badge front shows Tai's real portrait photo (ID-card
     style), name, role, and a barcode. Physics: verlet rope; drag to swing/throw; card yaws in 3D from
     motion. Double-click flips to the back (QR to LinkedIn, GitHub, email).
   - No water effect (explicitly removed).
3. **Selected Works — isometric mini city** (approved in demo v3):
   - Heading "SELECTED WORKS (5)".
   - A small isometric city; the five projects are coloured, numbered buildings
     that bob slightly; filler buildings and trees; green scooters drive the
     roads (a nod to Grab — no Grab logos).
   - A legend list of the five projects; hovering a name or building lifts and
     outlines the building and shows a tooltip.
   - Clicking zooms the camera into the building, then the case study opens with
     a circular reveal expanding from that building.
4. **How I work — git graph** (Tai chose option A in
   `docs/superpowers/specs/assets/demo-how-i-work-options.html`): a dark,
   GitHub-style section titled `git log --how-i-work.`. The six steps are commits
   on a git graph — Understand, Design (on `main`), Build, Test (on a
   `feature/…` branch, blue), Ship (merge back to `main`, "merge ✓" badge),
   Support. The section pins while scrolling; the branch lines draw and each
   commit lights up as you scroll. Each row: short hash, branch label, a
   conventional-commit message (stays English in both languages, e.g.
   `feat: talk to users, agree API contract`), and the step's description
   (translated). Descriptions and evidence come from the CV — no invented
   numbers.
5. **Career timeline — year odometer** (Tai chose option B in
   `docs/superpowers/specs/assets/demo-timeline-options.html`): dark section; a
   giant year (2022 → 2026) whose last digit rolls like an odometer as you scroll
   (section pins while scrolling); the events of that year slide in as cards on
   the right; a year ruler along the bottom highlights the current year.
   Events, in date order: UIT starts (Sep 2022) · 2023 heads-down at UIT ·
   TOEIC L&R 745 (Sep 2024) · TMA Frontend Intern (Dec 2024 – Mar 2025) ·
   Grab SWE Intern (Jul – Dec 2025) · Grab Software Engineer, contract
   (Dec 2025 – Jun 2026) · TOEIC S&W 280 (Jan 2026) · graduated UIT, GPA 8.57
   (Mar 2026) · Now: open to work. Job cards link to their case studies.
6. **Skills — giant marquee** (Tai chose option C in
   `docs/superpowers/specs/assets/demo-skills-options.html`; replaces the earlier
   physics-pile idea): dark section titled "The stack."; three rows of huge pill
   chips scroll horizontally in alternating directions (row 1 frontend, row 2
   backend + architecture, row 3 delivery + quality + AI tools). Hovering pauses
   the rows and the hovered chip tilts and turns orange. A small coloured dot on
   each chip marks its group; a legend sits at the bottom. Skills list = CV only,
   no proficiency bars or percentages.
7. **LeetCode stats — scoreboard** (Tai chose option A in
   `docs/superpowers/specs/assets/demo-leetcode-options.html`): light section;
   a giant total that counts up from 0 (563 at design time) with the global
   ranking beneath; three rings for Easy / Medium / Hard filled to the true
   ratio solved ÷ total available on LeetCode; current streak, active days and
   submissions in the last year count up; a 12-month submission heatmap whose
   cells pop in. Animations start when the section scrolls into view. All values
   come from the nightly JSON; contest rating appears only if it exists. Links
   to the LeetCode profile.
8. **Now learning — browser tabs** (Tai chose option D in
   `docs/superpowers/specs/assets/demo-now-learning-options.html`): a browser
   window with three open tabs — System Design · Go backend, in depth ·
   *Designing Data-Intensive Applications* — each tab showing a spinning
   "loading" icon (= still learning). Clicking a tab runs a loading bar, swaps the
   URL and shows that topic's page: why I'm learning it, what I've learned so
   far, where I am, favourite takeaway. Content comes from Tai later; ship with
   clearly marked placeholders that are easy to fill. No made-up progress
   percentages. The "why" lines in the demo are drafts for Tai to rewrite.
9. **Contact / footer — decoding email** (Tai chose option D in
   `docs/superpowers/specs/assets/demo-contact-options.html`): light editorial
   section. Prompt line ("Got a role, a project, or a question?"), then the
   email `thanhtaiwork04@gmail.com` set huge in monospace; it "decodes" from
   random characters when the section enters view and again on hover; clicking
   copies it (toast "Email copied ✓"). Below: a ruled list of big links —
   LinkedIn `/in/tai-nt`, GitHub `/thvnhtai`, LeetCode `/u/thvnhtai` — that
   slide and turn orange on hover. Top right: live Ho Chi Minh City clock with
   "● Probably awake / ☾ Probably asleep". No phone number. No form — static
   site.

**Global, on every screen:**
- Custom cursor with colour-inverting blend; letters in display headlines react
  on hover; subtle film grain overlay.
- **⌘K / Ctrl+K command palette** (Tai chose K1): a centred search palette
  in the Raycast/Linear style over a blurred backdrop; grouped results —
  Navigate (sections), Projects (opens case studies), Actions (copy email,
  download CV, switch language), Links (LinkedIn, GitHub, LeetCode); type to
  filter, ↑ ↓ to move, Enter to run, Esc or backdrop click to close. Also
  opened by the ⌘K hint in the nav.
- **Easter egg — gravity mode** (Tai chose E3): clicking the "TAI NGUYEN
  ©2026" logo five times in quick succession makes the page's visible elements
  fall and tumble off-screen, then spring back into place. Disabled under
  reduced motion.
- Sticky nav: name, Work, Contact, **EN / VI language switch**, ⌘K hint.

### Language (EN / VI)
- Every piece of human-readable copy exists in both English and Vietnamese:
  hero bio and meta, section headings, timeline, Now learning, contact, ⌘K
  commands, preloader/microcopy, and all five case studies.
- Stay in English in both languages: the "FULLSTACK ENGINEER." headline (brand),
  company/product/project names, technology names, the badge texture, and the
  recreated mock UIs inside case studies (they imitate English product UIs).
- Switching is instant (no reload), keeps the scroll position and any open case
  study, and plays a short text transition.
- The choice is remembered for the visitor and reflected in the URL so a link
  can be shared in a specific language; `<html lang>` and page title/meta update
  accordingly.
- The ⌘K menu includes "Switch to Tiếng Việt / English".
- Vietnamese copy is drafted by the builder from the English and the CV, then
  reviewed by Tai before launch.

### Case study view (approved in demo v3)
Opened from the city or ⌘K; full-screen overlay with its own scroll and a
reading-progress bar; deep-linkable URL per project. Sections:
header in project colour (index, role line, title, lead) → meta strip (Role,
Company, Timeline, Users/Type) → **The product**: a recreated interactive mock
UI in a browser frame, labelled "Recreated interface with sample data" (Zen
Ledger: live-streaming transaction table; Invoicing: billing schedule table
with bulk download; UCM: config diff with approve/reject and pipeline status;
Voucher: stats + filters + error log; E-Commerce: micro-frontend composition
map) → Problem / Approach → "What I built" numbered cards → animated
architecture diagram → Outcome (three qualitative outcomes, no invented
numbers) → Stack chips + "What I learned" (placeholder for Tai's own words) →
"Next project" link.

## Decided "how"

- **Stack**: React (Tai's choice) + TypeScript, built as a static SPA.
- **Hosting**: GitHub Pages, **replacing the existing `thvnhtai/portfolio` repo**
  (currently a Pages site). Site URL: `https://thvnhtai.github.io/portfolio/`.
  Overwriting the old repo is irreversible — confirm with Tai right before the
  first push.
- **LeetCode data**: LeetCode's GraphQL endpoint can't be called from the
  browser (CORS). A scheduled GitHub Action fetches stats nightly (and on
  deploy) and commits/bundles a JSON file the site reads. Verified the query
  works server-side for `thvnhtai`.
- **3D badge**: Three.js with a custom verlet strap (as in demo v3) — or
  react-three-fiber + a physics lib if the builder prefers, as long as the feel
  matches the demo.

## Constraints

- Static hosting only; GitHub Pages sub-path `/portfolio/` (router and asset
  paths must work there, including deep links and refresh).
- Must be usable on phones: heavy scenes need a sensible mobile behaviour.
- Must respect `prefers-reduced-motion`: effects calm down or turn off, content
  still fully reachable.
- Accessible baseline: keyboard reachable navigation, ⌘K, case studies and
  Now-learning details; readable contrast; real text (not canvas-only) for all
  content that matters.
- Performance: 3D and physics only run while on screen; lazy-load heavy
  sections; good Lighthouse scores are part of the "show-off".

## Left to the builder

- Exact libraries for scroll/animation (GSAP vs Framer Motion, Lenis or native), styling approach, router (hash vs browser
  routing with a 404 fallback for Pages).
- Mobile fallbacks for the badge (e.g. lighter render / tap to swing) and the
  city (e.g. pan/zoom or a list view) — keep the spirit.
- Process steps copy for "How I work", microcopy, and exact animation timings.
- Test strategy and CI checks.
- Repo structure, content files format (typed TS content files suggested so
  Tai can edit copy easily).

## Builder's calls already made in this design (owner please check)

- Default language: English, except visitors whose browser prefers Vietnamese
  land on Vietnamese (a remembered choice or a language in the URL always wins).
- Single CV PDF for both languages (the CV is English); revisit if Tai makes a
  Vietnamese CV.
- Sticky stacking cards dropped — the city now covers "featured projects".
- About merged into the hero (Tai's choice); the separate 3D résumé card is
  dropped — the badge is the hero's 3D object and "Download CV" is a button.
- Certifications (TOEIC) shown as stops on the Career timeline.
- Page transitions = the city zoom + circular reveal into case studies.
- Hero bio: "Hi, I'm Tai — a fullstack engineer who leans frontend. At Grab I
  shipped internal platforms end to end — React/TypeScript UIs, Go services,
  and the pipelines behind them." Hero layout reference:
  `docs/superpowers/specs/assets/demo-v4-hero-about.html` (supersedes v3's hero;
  v3 remains the reference for the city and case studies).
