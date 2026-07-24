import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('renders critical content in the new industrial design', async ({ page }) => {
  const failedAssets: string[] = [];
  page.on('response', (response) => {
    if (response.url().includes('/assets/') && response.status() >= 400) {
      failedAssets.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: /Building Value, Recycling the Future/i })).toBeVisible();
  await expect(page.locator('nav[aria-label="Primary navigation"]')).toHaveCount(1);
  await expect(page.getByText(/Premium, transparent, and efficient metal recycling services/i)).toBeVisible();
  expect(failedAssets).toEqual([]);
});

test('has no serious or critical axe findings', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')).toEqual([]);
});

test('supports keyboard navigation and the quote dialog focus trap', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  await page.getByRole('button', { name: /Request a Quote/i }).first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('dialog').locator('input[name="name"]')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
});

test('filters and searches the material catalogue', async ({ page }) => {
  await page.goto('/materials');
  await page.getByRole('button', { name: 'Non-Ferrous' }).click();
  const catalogue = page.locator('.product-grid');
  await expect(catalogue.getByRole('heading', { name: 'Copper' })).toBeVisible();
  await expect(catalogue.getByRole('heading', { name: 'Steel' })).toHaveCount(0);
  await page.getByPlaceholder('Search materials').fill('brass');
  await expect(catalogue.getByRole('heading', { name: 'Brass' })).toBeVisible();
});

test('serves a useful 404 fallback', async ({ page }) => {
  const response = await page.goto('/missing-page');
  expect(response?.status()).toBeLessThan(500);
  await expect(page.getByRole('heading', { name: /That page is not available/i })).toBeVisible();
});
