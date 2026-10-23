# Portfolio v2

Bilingual (EN/VI) React + Vite + Three.js portfolio, deployed to https://thvnhtai.app/.

## Run
```
npm ci
npm run dev        # http://localhost:5173/
npm test           # unit tests
npm run typecheck
npm run build
npm run e2e        # Playwright smoke (first time: npx playwright install chromium)
```

## Edit content
- Copy: `src/content/en.ts` and `src/content/vi.ts` (keep both in sync).
- Contact details: `src/content/contact.ts`.
- CV: replace `public/cv/Tai_Nguyen_CV.pdf` (keep the filename).
- "Now learning": fill the fields in the Now-learning section of `en.ts` / `vi.ts`; while a field is `null` a placeholder is shown.

## Stats
`npm run stats` runs `scripts/fetch-leetcode.mjs` and writes `public/data/leetcode.json`. It never fails the build: on error the last committed data stays. The deploy workflow runs it on every build, including a nightly cron (02:00 HCMC), so no commit is needed to refresh.

## Deploy
Push to `main` triggers `.github/workflows/deploy.yml` (also runnable via workflow_dispatch). One-time: in repo Settings > Pages set Source to **GitHub Actions**. CI (`ci.yml`) runs typecheck, tests and build on PRs and on main / `feat/**` pushes.
