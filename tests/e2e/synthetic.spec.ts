import { expect, test } from '@playwright/test';

test('production site passes the critical synthetic check', async ({ page }) => {
  const criticalFailures: string[] = [];
  page.on('response', (response) => {
    if (response.url().includes('/assets/') && response.status() >= 400) {
      criticalFailures.push(`${response.status()} ${response.url()}`);
    }
  });

  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1, name: /Building Value, Recycling the Future/i })).toBeVisible();
  await expect(page.locator('#root')).not.toBeEmpty();
  expect(criticalFailures).toEqual([]);
});
