import { expect, test } from '@playwright/test';

test('production site passes the critical synthetic check', async ({ page }) => {
  const criticalFailures: string[] = [];
  page.on('response', (response) => {
    const url = response.url();
    if ((url.includes('/assets/') || url.endsWith('/AALKC.mp4')) && response.status() >= 400) criticalFailures.push(`${response.status()} ${url}`);
  });
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  await expect(page.locator('#root')).not.toBeEmpty();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  expect(criticalFailures).toEqual([]);
});
