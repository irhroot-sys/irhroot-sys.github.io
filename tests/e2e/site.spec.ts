import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  await page.route('**/api/market', async (route) => {
    await route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ status: 'unavailable', reason: 'provider_not_configured' }) });
  });
});

test('renders critical content and intentional market unavailable state', async ({ page }) => {
  const failed: string[] = [];
  page.on('requestfailed', (request) => {
    if (!request.url().includes('/api/market')) failed.push(request.url());
  });
  await page.goto('/');
  await expect(page.locator('#root')).not.toBeEmpty();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Market data is currently unavailable' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Request a spot quote/i })).toBeVisible();
  expect(failed).toEqual([]);
});

test('has no serious or critical axe findings', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const results = await new AxeBuilder({ page }).disableRules(['color-contrast']).analyze();
  expect(results.violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')).toEqual([]);
});

test('honors reduced motion and supports keyboard navigation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#home')).toBeFocused();
  await expect(page.getByRole('button', { name: /Play hero motion and video/ })).toBeVisible();
});

test('serves a useful 404 fallback', async ({ page }) => {
  const response = await page.goto('/missing-page');
  expect(response?.status()).toBeLessThan(500);
  await expect(page.locator('body')).not.toBeEmpty();
});
