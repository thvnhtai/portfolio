import { test, expect, type Page } from '@playwright/test';

// Skip the preloader only if it is actually showing (Space, not Escape: keeps intent obvious; Escape is covered by its own test below).
async function skipPreloader(page: Page) {
  const pre = page.getByTestId('preloader').first();
  if (await pre.count()) {
    await page.keyboard.press('Space');
    await pre.waitFor({ state: 'detached' });
  }
}
const BACK_VI = '← Quay lại thành phố';

test('home → case → language → reload keeps case + VI', async ({ page }) => {
  await page.goto('/?lang=en');
  await skipPreloader(page);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('FULLSTACK ENGINEER.');
  await page.locator('#work').getByRole('button', { name: /Zen Ledger Portal/ }).first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('dialog').getByRole('button', { name: 'VI' }).click();
  await expect(page.getByText(BACK_VI)).toBeVisible();
  await page.reload();
  await skipPreloader(page);
  await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByText(BACK_VI)).toBeVisible();
});

test('cold deep link to a VI case, survives reload', async ({ browser, baseURL }) => {
  const ctx = await browser.newContext({ baseURL });
  const page = await ctx.newPage();
  await page.goto('/?lang=vi#/work/invoicing-portal');
  await skipPreloader(page);
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByText(BACK_VI)).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
  await page.reload();
  await skipPreloader(page);
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByText(BACK_VI)).toBeVisible();
  await ctx.close();
});

test('Escape on the preloader does not close a cold deep-linked case', async ({ browser, baseURL }) => {
  const ctx = await browser.newContext({ baseURL });
  const page = await ctx.newPage();
  await page.goto('/?lang=vi#/work/invoicing-portal');
  await expect(page.getByTestId('preloader').first()).toBeAttached();
  await page.keyboard.press('Escape');
  await expect(page.getByTestId('preloader')).toHaveCount(0);
  await expect(page.getByRole('dialog')).toBeVisible();
  await ctx.close();
});

test('reduced motion: no preloader, content visible', async ({ browser, baseURL }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce', baseURL });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(page.getByTestId('preloader')).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByText('git log --how-i-work.')).toBeVisible();
  await ctx.close();
});

test('phone: no horizontal scroll, one-line nav', async ({ browser, baseURL }) => {
  const ctx = await browser.newContext({ baseURL, viewport: { width: 375, height: 812 } });
  const page = await ctx.newPage();
  await page.goto('/');
  await skipPreloader(page);
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); }
  });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(await page.evaluate(() => document.querySelector('nav')!.getBoundingClientRect().height)).toBeLessThan(60);
  await ctx.close();
});
