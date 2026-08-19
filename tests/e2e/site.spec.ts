import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('renders critical content in the new industrial design', async ({ page }) => {
  const failedAssets: string[] = [];
  const runtimeErrors: string[] = [];
  page.on('response', (response) => {
    if (response.url().includes('/assets/') && response.status() >= 400) {
      failedAssets.push(`${response.status()} ${response.url()}`);
    }
  });
  page.on('console', (message) => {
    if (message.type() === 'error') runtimeErrors.push(message.text());
  });
  page.on('pageerror', (error) => runtimeErrors.push(error.message));

  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: /Building Value, Recycling the Future/i })).toBeVisible();
  await expect(page.locator('nav[aria-label="Primary navigation"]')).toHaveCount(1);
  await expect(page.getByText(/Premium, transparent, and efficient metal recycling services/i)).toBeVisible();
  expect(failedAssets).toEqual([]);
  expect(runtimeErrors).toEqual([]);
});

test('loads the cinematic hero as high-priority media without hiding conversion content', async ({ page }) => {
  await page.goto('/');

  const hero = page.locator('.hero');
  const image = hero.locator('img.hero-media-image');
  const heading = hero.getByRole('heading', { level: 1 });
  const actions = hero.locator('.hero-actions');

  await expect(image).toHaveAttribute('src', '/assets/service-industrial-dismantling.webp');
  await expect(image).toHaveAttribute('fetchpriority', 'high');
  await expect(image).toHaveJSProperty('complete', true);
  await expect(page.locator('link[rel="preload"][href="/assets/service-industrial-dismantling.webp"]')).toHaveCount(1);
  await expect(heading).toBeVisible();
  await expect(actions).toBeVisible();

  const heroResourceCount = await page.evaluate(() => performance.getEntriesByType('resource')
    .filter((entry) => entry.name.endsWith('/assets/service-industrial-dismantling.webp')).length);
  expect(heroResourceCount).toBe(1);

  const entranceState = await heading.evaluate((element) => {
    const style = getComputedStyle(element.firstElementChild ?? element);
    return { filter: style.filter, opacity: Number(style.opacity) };
  });
  expect(entranceState.filter).toBe('none');
  expect(entranceState.opacity).toBeGreaterThanOrEqual(0.8);

  const heroAnimations = await hero.evaluate((element) => element.getAnimations({ subtree: true }).map((animation) => ({
    iterations: animation.effect?.getTiming().iterations,
  })));
  expect(heroAnimations.every(({ iterations }) => iterations === 1)).toBe(true);
});

test('scopes cinematic depth to the desktop hero and resets it on exit', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Fine-pointer depth is validated once in desktop Chromium.');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');

  const hero = page.locator('.hero');
  const bounds = await hero.boundingBox();
  expect(bounds).not.toBeNull();

  await page.mouse.move(bounds!.x + bounds!.width * 0.88, bounds!.y + bounds!.height * 0.72);
  await expect.poll(() => hero.evaluate((element) => getComputedStyle(element).getPropertyValue('--hero-depth-x').trim())).not.toBe('0px');

  await page.mouse.move(8, 8);
  await expect.poll(() => hero.evaluate((element) => getComputedStyle(element).getPropertyValue('--hero-depth-x').trim())).toBe('0px');
  await expect.poll(() => hero.evaluate((element) => getComputedStyle(element).getPropertyValue('--hero-depth-y').trim())).toBe('0px');
});

test('responds immediately to reduced motion and keeps touch depth static', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const hero = page.locator('.hero');

  if (testInfo.project.name === 'desktop-chromium') {
    const bounds = await hero.boundingBox();
    expect(bounds).not.toBeNull();
    await page.mouse.move(bounds!.x + bounds!.width * 0.82, bounds!.y + bounds!.height * 0.68);
    await expect.poll(() => hero.evaluate((element) => getComputedStyle(element).getPropertyValue('--hero-depth-x').trim())).not.toBe('0px');
  } else {
    await hero.dispatchEvent('pointermove', { clientX: 330, clientY: 240, pointerType: 'touch' });
  }

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(() => hero.evaluate((element) => getComputedStyle(element).getPropertyValue('--hero-depth-x').trim())).toBe('0px');
  await expect.poll(() => hero.evaluate((element) => getComputedStyle(element).getPropertyValue('--hero-depth-y').trim())).toBe('0px');
  await expect(hero.locator('.hero-media-image')).toHaveCSS('animation-name', 'none');
});

test('has no serious or critical axe findings', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
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

test('keeps the stats bar content inside its responsive bounds', async ({ page }) => {
  await page.goto('/');
  const stats = page.getByRole('region', { name: 'Company statistics' });
  await expect(stats.getByText('Eastern Province')).toBeVisible();
  const containerBox = await stats.boundingBox();
  const coverageBox = await stats.getByText('Eastern Province').boundingBox();
  expect(containerBox).not.toBeNull();
  expect(coverageBox).not.toBeNull();
  expect(coverageBox!.x).toBeGreaterThanOrEqual(containerBox!.x);
  expect(coverageBox!.x + coverageBox!.width).toBeLessThanOrEqual(containerBox!.x + containerBox!.width);
  expect(await stats.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
});

test('uses consistent service-card media ratios', async ({ page }) => {
  await page.goto('/');
  const media = page.locator('.service-card .service-media');
  await expect(media).toHaveCount(6);
  const ratios = await media.evaluateAll((elements) => elements.map((element) => {
    const box = element.getBoundingClientRect();
    return box.width / box.height;
  }));
  for (const ratio of ratios) expect(ratio).toBeCloseTo(16 / 9, 1);

  const sources = await page.locator('.service-card img').evaluateAll((images) => images.map((image) => image.getAttribute('src')));
  expect(new Set(sources).size).toBe(6);

  const treatments = await page.locator('.service-card img').evaluateAll((images) => images.map((image) => ({
    fit: getComputedStyle(image).objectFit,
    filter: getComputedStyle(image).filter,
  })));
  expect(new Set(treatments.map(({ fit }) => fit))).toEqual(new Set(['cover']));
  expect(new Set(treatments.map(({ filter }) => filter))).toEqual(new Set(['brightness(0.92) contrast(1.08) saturate(0.88)']));
});

test('uses the premium bilingual body fonts and interactive link states', async ({ page }) => {
  await page.goto('/');

  const englishFonts = await page.evaluate(() => ({
    body: getComputedStyle(document.body).fontFamily,
    heading: getComputedStyle(document.querySelector('h1')!).fontFamily,
  }));
  expect(englishFonts.body).toContain('Montserrat');
  expect(englishFonts.heading).toContain('IBM Plex Sans Condensed');

  const activeNav = page.locator('.primary-nav a.active');
  await expect(activeNav).toHaveCSS('color', 'rgb(0, 79, 159)');

  const footerLink = page.locator('.footer-links a').first();
  await footerLink.hover();
  await expect(footerLink).toHaveCSS('color', 'rgb(255, 255, 255)');
  const underlineTransform = await footerLink.evaluate((link) => getComputedStyle(link, '::after').transform);
  expect(underlineTransform).toBe('matrix(1, 0, 0, 1, 0, 0)');

  await page.getByRole('button', { name: 'AR' }).click();
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  const arabicFonts = await page.evaluate(() => ({
    body: getComputedStyle(document.body).fontFamily,
    heading: getComputedStyle(document.querySelector('h1')!).fontFamily,
  }));
  expect(arabicFonts.body).toContain('Cairo');
  expect(arabicFonts.heading).toContain('Cairo');
});

test('switches the full interface between English and Arabic', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'AR' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.getByRole('heading', { level: 1, name: /نبني القيمة/ })).toBeVisible();
  await expect(page.locator('.primary-nav a[href="/about"]')).toHaveText('من نحن');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await page.goto('/services');
  await expect(page.getByRole('heading', { level: 1, name: /إدارة خردة مصممة للنطاق الصناعي/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'خدمة الحاويات' }).first()).toBeVisible();
  await page.goto('/privacy');
  await expect(page.getByRole('heading', { level: 1, name: 'سياسة الخصوصية' })).toBeVisible();
  await page.getByRole('button', { name: 'EN' }).click();
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page.getByRole('heading', { level: 1, name: 'Privacy Policy' })).toBeVisible();
});

test('keeps the premium bilingual layout contained at every supported breakpoint', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'The breakpoint matrix runs once in Chromium.');
  const widths = [320, 375, 390, 620, 768, 1024, 1440];

  await page.goto('/');
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.locator('.brand img')).toBeVisible();
    await expect(page.getByRole('region', { name: 'Company statistics' }).getByText('Eastern Province')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    expect(await page.getByRole('region', { name: 'Company statistics' }).evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
    if (width <= 620) {
      await expect(page.locator('.brand-wordmark')).toBeHidden();
    } else {
      await expect(page.locator('.brand-wordmark')).toBeVisible();
    }
  }

  await page.setViewportSize({ width: 375, height: 900 });
  await page.getByRole('button', { name: 'AR' }).click();
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.getByRole('region', { name: 'إحصاءات الشركة' }).getByText('المنطقة الشرقية')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    expect(await page.getByRole('region', { name: 'إحصاءات الشركة' }).evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
  }
});

test('isolates phone numerals and flips only directional icons in RTL', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/contact');

  const phoneNumbers = page.locator('bdi.phone-number');
  await expect(phoneNumbers).toHaveCount(3);
  const phoneDirections = await phoneNumbers.evaluateAll((elements) => elements.map((element) => ({
    dir: element.getAttribute('dir'),
    direction: getComputedStyle(element).direction,
    text: element.textContent?.trim(),
  })));
  for (const phone of phoneDirections) {
    expect(phone.dir).toBe('ltr');
    expect(phone.direction).toBe('ltr');
    expect(phone.text).toBe('+966 55 181 1700');
  }

  const arabicAddress = 'القطيف ٣٥٠٨ ١، وحدة ٧٢٦٠، الدمام ٣٢٥١٧، المنطقة الشرقية، المملكة العربية السعودية';
  await expect(page.getByText(arabicAddress, { exact: true })).toHaveCount(0);

  const englishTransforms = await page.locator('.directional-icon').evaluateAll((elements) => elements
    .filter((element) => element.getClientRects().length > 0)
    .map((element) => getComputedStyle(element).transform));
  expect(englishTransforms.length).toBeGreaterThan(0);
  expect(englishTransforms.every((transform) => transform === 'none' || transform === 'matrix(1, 0, 0, 1, 0, 0)')).toBe(true);

  await page.getByRole('button', { name: 'AR' }).click();
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('.contact-methods').getByText(arabicAddress, { exact: true })).toHaveCount(1);
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth))
    .toBe(true);
  const rtlTransforms = await page.locator('.directional-icon').evaluateAll((elements) => elements
    .filter((element) => element.getClientRects().length > 0)
    .map((element) => getComputedStyle(element).transform));
  expect(rtlTransforms.length).toBeGreaterThan(0);
  expect(rtlTransforms.every((transform) => transform === 'matrix(-1, 0, 0, 1, 0, 0)')).toBe(true);
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


test('never strands revealed content at opacity 0, at rest or mid-scroll', async ({ page }) => {
  // Regression guard. The scroll-reveal used to stage every matching element at
  // opacity 0 — including elements already on screen — so a first paint or a
  // fast scroll left whole sections blank until the observer caught up.
  const stranded = async () => page.evaluate(() => {
    const offenders: string[] = [];
    document.querySelectorAll('[data-motion="reveal"]').forEach((element) => {
      const rect = element.getBoundingClientRect();
      const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      if (visible < 40) return;
      if (Number.parseFloat(getComputedStyle(element).opacity) < 0.05) {
        offenders.push(String(element.className) || element.tagName.toLowerCase());
      }
    });
    return offenders;
  });

  for (const path of ['/', '/about', '/services', '/materials', '/faq', '/contact']) {
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(await stranded(), `${path} hides on-screen content at first paint`).toEqual([]);

    const { height, step } = await page.evaluate(() => ({
      height: document.documentElement.scrollHeight,
      step: Math.round(window.innerHeight * 0.9),
    }));
    for (let top = step; top < height; top += step) {
      await page.evaluate((y) => window.scrollTo(0, y), top);
      expect(await stranded(), `${path} goes blank while scrolling past ${top}px`).toEqual([]);
    }
  }
});

test('renders the footer identity as live text tinted for the dark surface', async ({ page }) => {
  // The footer used to show a flattened raster lockup that needed its own white
  // panel to stay legible on the navy background.
  await page.goto('/');
  const brand = page.locator('.footer-brand');
  await expect(brand.locator('img')).toHaveCount(0);

  const mark = page.locator('.footer-brandmark');
  await expect(mark).toBeVisible();
  expect(await mark.evaluate((svg) => getComputedStyle(svg.querySelector('path')!).fill)).toBe('rgb(255, 255, 255)');
  expect(await mark.evaluate((svg) => getComputedStyle(svg).backgroundColor)).toBe('rgba(0, 0, 0, 0)');

  const wordmark = page.locator('.footer-wordmark');
  await expect(wordmark.locator('strong')).toHaveText('AALKC');
  await expect(wordmark).toContainText('Amanat Al-Kalima Company');
  await expect(wordmark.locator('[lang="ar"]')).toHaveText('شركة أمانة الكلمة');
});

test('clears the 44px touch-target floor on coarse pointers', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'Touch sizing only applies to coarse pointers.');
  await page.goto('/');
  expect(await page.evaluate(() => matchMedia('(pointer: coarse)').matches)).toBe(true);

  const undersized = await page.evaluate(() => {
    const offenders: string[] = [];
    document.querySelectorAll('a, button, input, select, textarea, summary').forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const styles = getComputedStyle(element);
      if (styles.visibility === 'hidden' || styles.display === 'none') return;
      if (rect.height < 44) {
        offenders.push(`${String(element.className) || element.tagName.toLowerCase()} ${Math.round(rect.width)}x${Math.round(rect.height)}`);
      }
    });
    return offenders;
  });
  expect(undersized).toEqual([]);
});
