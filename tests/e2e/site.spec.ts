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
  await expect(page.getByRole('heading', { level: 1, name: /Integrity, weighed in every tonne/i })).toBeVisible();
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

  await expect(image).toHaveAttribute('src', '/assets/yard/aalkc-yard-entrance-night.webp');
  await expect(image).toHaveAttribute('fetchpriority', 'high');
  await expect(image).toHaveJSProperty('complete', true);
  await expect(heading).toBeVisible();
  await expect(actions).toBeVisible();

  // The preload must offer exactly the candidates the <picture> chooses from,
  // so the browser downloads the hero once — never the preload plus a second,
  // different file.
  const preload = page.locator('link[rel="preload"][as="image"]');
  await expect(preload).toHaveCount(1);
  const preloadCandidates = (await preload.getAttribute('imagesrcset'))!.split(',').map((candidate) => candidate.trim().split(' ')[0]);
  const chosen = new URL(await image.evaluate((element: HTMLImageElement) => element.currentSrc)).pathname;
  expect(preloadCandidates).toContain(chosen);
  const chosenDownloads = await page.evaluate((path) => performance.getEntriesByType('resource')
    .filter((entry) => new URL(entry.name).pathname === path).length, chosen);
  expect(chosenDownloads).toBe(1);

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

  // Clear of the floating contact dock, which sits over the hero's lower
  // trailing corner on short viewports.
  await page.mouse.move(bounds!.x + bounds!.width * 0.8, bounds!.y + bounds!.height * 0.55);
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

test('keeps the company register inside its responsive bounds', async ({ page }) => {
  await page.goto('/');
  const register = page.getByRole('region', { name: 'Company register' });
  await expect(register.getByText('Eastern Province', { exact: true })).toBeVisible();
  await expect(register.getByText('7050308233')).toBeVisible();
  const containerBox = await register.boundingBox();
  const coverageBox = await register.getByText('Eastern Province', { exact: true }).boundingBox();
  expect(coverageBox!.x).toBeGreaterThanOrEqual(containerBox!.x);
  expect(coverageBox!.x + coverageBox!.width).toBeLessThanOrEqual(containerBox!.x + containerBox!.width);
  expect(await register.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
});

test('grades every capability photograph the same way', async ({ page }) => {
  await page.goto('/');
  const frames = page.locator('.capability-plate .plate-frame');
  await expect(frames).toHaveCount(6);
  const ratios = await frames.evaluateAll((elements) => elements.map((element) => {
    const box = element.getBoundingClientRect();
    return Math.round((box.width / box.height) * 100) / 100;
  }));
  expect(new Set(ratios).size).toBe(1);

  const images = page.locator('.capability-plate img');
  const sources = await images.evaluateAll((list) => list.map((image) => image.getAttribute('src')));
  expect(new Set(sources).size).toBe(6);
  const treatments = await images.evaluateAll((list) => list.map((image) => ({
    fit: getComputedStyle(image).objectFit,
    filter: getComputedStyle(image).filter,
  })));
  expect(new Set(treatments.map(({ fit }) => fit))).toEqual(new Set(['cover']));
  // One shared grade makes separately licensed photographs read as one set;
  // it keeps their colour, so it must never desaturate fully.
  const filters = new Set(treatments.map(({ filter }) => filter));
  expect(filters.size).toBe(1);
  expect([...filters][0]).toMatch(/saturate\(/);
  expect([...filters][0]).not.toMatch(/grayscale\(1\)/);

  // Hovering a row brings its photograph forward.
  if (await page.evaluate(() => matchMedia('(min-width: 901px)').matches)) {
    await page.locator('.capability-row').nth(3).hover();
    await expect(page.locator('.capability-plate').nth(3)).toHaveClass(/is-active/);
  }
});

test('uses the premium bilingual body fonts and interactive link states', async ({ page }) => {
  await page.goto('/');

  // The office face AALKC sets the statement and wordmark; the Adobe Fonts
  // project supplies Sweet Square Pro for titles and Futura PT for text.
  await expect(page.locator('link[rel="stylesheet"][href="https://use.typekit.net/jrz4pqn.css"]')).toHaveCount(1);
  const englishFonts = await page.evaluate(() => ({
    body: getComputedStyle(document.body).fontFamily,
    heading: getComputedStyle(document.querySelector('h1')!).fontFamily,
    wordmark: getComputedStyle(document.querySelector('.brand-wordmark strong')!).fontFamily,
    section: getComputedStyle(document.querySelector('main h2')!).fontFamily,
    figure: getComputedStyle(document.querySelector('.assay-symbol')!).fontFamily,
    synthesis: getComputedStyle(document.body).fontSynthesisWeight,
  }));
  expect(englishFonts.body).toMatch(/^"?futura-pt"?, "?General Sans/);
  expect(englishFonts.heading).toMatch(/^"?AALKC"?,/);
  expect(englishFonts.wordmark).toMatch(/^"?AALKC"?,/);
  expect(englishFonts.section).toMatch(/^"?sweet-square-pro/);
  expect(englishFonts.figure).toMatch(/^"?sweet-square-pro/);
  // The project ships two weights of Sweet Square Pro and one of Mawzoon;
  // the browser must never fake the others.
  expect(englishFonts.synthesis).toBe('none');
  // The self-hosted office face is actually served, not just named.
  await page.evaluate(() => document.fonts.ready);
  const loaded = await page.evaluate(() => [...document.fonts].filter((face) => face.status === 'loaded').map((face) => face.family.replaceAll('"', '')));
  expect(loaded).toContain('AALKC');

  // The bar is white, so the active page is set in brand navy (#0E335C); in
  // the compact menu the links sit on a navy sheet and the active one is white.
  const activeNav = page.locator('.primary-nav a.active');
  const compactMenu = await page.evaluate(() => matchMedia('(max-width: 1279px)').matches);
  await expect(activeNav).toHaveCSS('color', compactMenu ? 'rgb(255, 255, 255)' : 'rgb(14, 51, 92)');

  const footerLink = page.locator('.footer-links a').first();
  await footerLink.hover();
  await expect(footerLink).toHaveCSS('color', 'rgb(255, 255, 255)');
  // The underline draws in over a transition; assert where it settles.
  await expect.poll(() => footerLink.evaluate((link) => getComputedStyle(link, '::after').transform)).toBe('matrix(1, 0, 0, 1, 0, 0)');

  await page.getByRole('link', { name: 'AR', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  const arabicFonts = await page.evaluate(() => ({
    body: getComputedStyle(document.body).fontFamily,
    statement: getComputedStyle(document.querySelector('h1')!).fontFamily,
    heading: getComputedStyle(document.querySelector('main h2')!).fontFamily,
    title: getComputedStyle(document.querySelector('main h3')!).fontFamily,
    wordmark: getComputedStyle(document.querySelector('.brand-wordmark strong')!).fontFamily,
  }));
  // Arabic stacks lead with the Latin face (no Arabic glyphs), so Arabic
  // letters fall through to the Arabic face and digits stay Latin. Mawzoon
  // sets the statement and titles; AALKC Kufi the card titles and reading.
  expect(arabicFonts.statement).toMatch(/^"?sweet-square-pro"?, "?mawzoon/);
  expect(arabicFonts.heading).toMatch(/^"?sweet-square-pro"?, "?mawzoon/);
  expect(arabicFonts.title).toMatch(/^"?futura-pt"?, "?General Sans"?, "?AALKC Kufi/);
  expect(arabicFonts.body).toMatch(/^"?futura-pt"?, "?General Sans"?, "?AALKC Kufi/);
  await page.evaluate(() => document.fonts.ready);
  const arabicLoaded = await page.evaluate(() => [...document.fonts].filter((face) => face.status === 'loaded').map((face) => face.family.replaceAll('"', '')));
  expect(arabicLoaded).toContain('AALKC Kufi');
  // The Latin name inside the Arabic header keeps the Latin face.
  expect(arabicFonts.wordmark).toMatch(/^"?AALKC"?,/);
});

test('switches the full interface between English and Arabic', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'AR', exact: true }).click();
  await expect(page).toHaveURL(/\/ar$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.getByRole('heading', { level: 1, name: /في كل طن/ })).toBeVisible();
  await expect(page.locator('.primary-nav a[href="/ar/about"]')).toHaveText('من نحن');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  // The remembered choice carries a returning visitor from an English URL to
  // the same page in Arabic.
  await page.goto('/services');
  await expect(page).toHaveURL(/\/ar\/services$/);
  await expect(page.getByRole('heading', { level: 1, name: /إدارة خردة مصممة للنطاق الصناعي/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'خدمة الحاويات' }).first()).toBeVisible();
  await page.goto('/privacy');
  await expect(page.getByRole('heading', { level: 1, name: 'سياسة الخصوصية' })).toBeVisible();
  await page.getByRole('link', { name: 'EN', exact: true }).click();
  await expect(page).toHaveURL(/\/privacy$/);
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page.getByRole('heading', { level: 1, name: 'Privacy Policy' })).toBeVisible();
});

test('keeps the premium bilingual layout contained at every supported breakpoint', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'The breakpoint matrix runs once in Chromium.');
  const widths = [320, 375, 390, 620, 768, 1024, 1440];

  await page.goto('/');
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.locator('.brand .brand-mark')).toBeVisible();
    await expect(page.getByRole('region', { name: 'Company register' }).getByText('Eastern Province', { exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    expect(await page.getByRole('region', { name: 'Company register' }).evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
    if (width <= 620) {
      await expect(page.locator('.brand-wordmark')).toBeHidden();
    } else {
      await expect(page.locator('.brand-wordmark')).toBeVisible();
    }
  }

  await page.setViewportSize({ width: 375, height: 900 });
  await page.getByRole('link', { name: 'AR', exact: true }).click();
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.getByRole('region', { name: 'سجل الشركة' }).getByText('المنطقة الشرقية', { exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    expect(await page.getByRole('region', { name: 'سجل الشركة' }).evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
  }
});

test('isolates phone numerals and flips only directional icons in RTL', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/contact');

  // Utility bar, contact-page phone and WhatsApp cards, footer.
  const phoneNumbers = page.locator('bdi.phone-number');
  await expect(phoneNumbers).toHaveCount(4);
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

  await page.getByRole('link', { name: 'AR', exact: true }).click();
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
  // The chosen filter is announced as pressed, not shown by colour alone.
  await expect(page.getByRole('button', { name: 'Non-Ferrous' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'false');
});

test('routes each kind of visitor from the homepage to their own page', async ({ page }) => {
  await page.goto('/');
  const routes = page.locator('.pathways .pathway');
  await expect(routes).toHaveCount(3);
  await routes.filter({ hasText: 'Sell scrap' }).getByRole('link').click();
  await expect(page).toHaveURL(/\/sell$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Sell your scrap to AALKC.' })).toBeVisible();
  await expect(page.locator('.material-index a')).toHaveCount(8);
  await expect(page.locator('.pathway-checklist.is-excluded li')).toHaveCount(3);
  await expect(page.locator('.pathway-steps li')).toHaveCount(6);
  // The other two routes are offered at the foot of the page, not this one.
  await expect(page.locator('.pathways .pathway')).toHaveCount(2);
  await expect(page.locator('.pathways')).not.toContainText('Sell scrap');

  // The credentials link lands on the company register.
  await page.getByRole('link', { name: 'company register and certifications' }).click();
  await expect(page).toHaveURL(/\/about#credentials$/);
  await expect(page.locator('#credentials')).toBeInViewport();
});

test('asks buyers for their requirement, not a collection site', async ({ page }) => {
  await page.goto('/buy');
  await expect(page.getByRole('heading', { level: 1, name: 'Source graded scrap from AALKC.' })).toBeVisible();
  await page.locator('.pathway-actions').getByRole('button', { name: 'Request supply' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('heading', { name: 'Request supply' })).toBeVisible();
  await expect(dialog).toContainText('Buy materials from AALKC');
  await expect(dialog.locator('[name="material"]')).toHaveCount(1);
  for (const name of ['location', 'timing', 'weightTons']) await expect(dialog.locator(`[name="${name}"]`), name).toHaveCount(0);
  await expect(dialog.locator('textarea[name="message"]')).toHaveAttribute('placeholder', /destination/);

  // A supplier's quote still asks where and when to collect.
  await page.goto('/sell');
  await page.locator('.pathway-actions').getByRole('button', { name: 'Get a quote' }).click();
  for (const name of ['location', 'timing', 'weightTons']) await expect(page.getByRole('dialog').locator(`[name="${name}"]`), name).toHaveCount(1);
});

test('shows the track record with each organisation\'s own logo, in both languages', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('#track-record');
  await expect(section.getByRole('heading', { level: 2, name: 'Our Experience & Track Record' })).toBeVisible();
  await expect(section.getByRole('heading', { name: 'Selected Industry Engagements' })).toBeVisible();

  // Twelve organisations, each captioned, each logo loaded at its own
  // proportions; two platforms shown apart from them.
  const cards = section.locator('.engagement-grid > li');
  await expect(cards).toHaveCount(12);
  await section.scrollIntoViewIfNeeded();
  for (const card of await cards.all()) {
    await card.scrollIntoViewIfNeeded();
    const img = card.locator('img');
    await expect(img).toHaveAttribute('alt', '');
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    await expect(card.locator('.engagement-name')).not.toBeEmpty();
  }
  await expect(section.locator('.platform-list > li')).toHaveCount(2);
  await expect(section.locator('.platform-list')).toContainText('Etimad');
  await expect(section.locator('.platform-list')).toContainText('Saudi eMazad');
  await expect(section).toContainText('implies no partnership, endorsement or contract award');

  // No card is wider than its column, at any width.
  const overflow = await section.evaluate((el) => [...el.querySelectorAll('.engagement-plate img')].filter((img) => img.getBoundingClientRect().width > (img.parentElement as HTMLElement).clientWidth).length);
  expect(overflow).toBe(0);

  await section.getByRole('link', { name: 'See our auctions and tenders record' }).click();
  await expect(page).toHaveURL(/\/auctions-and-tenders$/);
  await expect(page.locator('.auction-channels .auction-channel-mark img')).toHaveCount(3);

  await page.goto('/ar');
  const arabic = page.locator('#track-record');
  await expect(arabic.getByRole('heading', { level: 2, name: 'خبرتنا وسجل أعمالنا' })).toBeVisible();
  await expect(arabic.locator('.engagement-name').first()).toHaveText('أرامكو السعودية');
  await expect(arabic.locator('.platform-list')).toContainText('المزاد الإلكتروني');
});

test('keeps the auctions record to what its documents prove', async ({ page, request }) => {
  await page.goto('/sell');
  await page.locator('.pathway-send').getByRole('link', { name: 'the sales we take part in' }).click();
  await expect(page).toHaveURL(/\/auctions-and-tenders$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Industrial auctions and tenders, on the record.' })).toBeVisible();

  // Four stages, defined once; every sale carries the same four-notch gauge,
  // the furthest stage first, and no image — so no third-party logo.
  await expect(page.locator('.stage-scale > li')).toHaveCount(4);
  const rows = page.locator('.auction-record > li');
  expect(await rows.count()).toBeGreaterThan(3);
  await expect(rows.first()).toHaveAttribute('data-stage', 'offered');
  for (const gauge of await rows.locator('.stage-gauge').all()) {
    await expect(gauge.locator('i')).toHaveCount(4);
    await expect(gauge).toHaveAttribute('aria-label', /^Stages reached: /);
  }
  await expect(page.locator('.auction-record img, .auction-record svg')).toHaveCount(0);

  // No figures, deposits or outcomes, and the disclaimer stands.
  expect(await page.locator('main').innerText()).not.toMatch(/\bSAR\b|﷼/);
  expect(await page.locator('.auction-record').innerText()).not.toMatch(/\d{5,}|award|\bwon\b|\blost\b|partner|contract/i);
  await expect(page.locator('.auction-disclosure-list')).toContainText('No contract award, partnership or endorsement is implied');

  // A seller can invite AALKC to bid.
  await page.locator('.auction-invite').getByRole('button', { name: 'Invite AALKC to bid' }).click();
  await expect(page.getByRole('dialog').getByRole('heading', { name: 'Invite AALKC to bid' })).toBeVisible();
  await page.getByRole('dialog').getByRole('button', { name: 'Close enquiry form' }).click();

  await page.goto('/ar/auctions-and-tenders');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.getByRole('heading', { level: 1, name: 'المزادات والمناقصات الصناعية، موثّقة.' })).toBeVisible();
  await expect(page.locator('.auction-record .stage-gauge').first()).toHaveAttribute('aria-label', /^المراحل المنجزة: /);

  // Indexed in both languages, with its questions as FAQPage data.
  const html = await (await request.get('/auctions-and-tenders')).text();
  expect(html).toContain('<title>Industrial Scrap Auctions &amp; Tenders | AALKC</title>');
  expect(html).toContain('"@type":"FAQPage"');
  expect(html).toContain('href="/auctions-and-tenders"');
  const sitemap = await (await request.get('/sitemap.xml')).text();
  for (const loc of ['/auctions-and-tenders', '/ar/auctions-and-tenders']) expect(sitemap, loc).toContain(`<loc>https://aalkc.com${loc}</loc>`);
});

test('serves a useful 404 fallback', async ({ page }) => {
  const response = await page.goto('/missing-page');
  expect(response?.status()).toBeLessThan(500);
  await expect(page.getByRole('heading', { name: /That page is not available/i })).toBeVisible();
});


test('never strands revealed content at opacity 0, at rest or mid-scroll', async ({ page }) => {
  // Every scroll step waits for the staggered reveal to finish before it
  // asserts, and mobile walks a much taller document, so this one needs more
  // than the default budget.
  test.setTimeout(150_000);
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
      // Media inside a staged element is masked until the element is
      // released; a mask that never opens hides the photograph just as
      // completely as opacity 0 does.
      element.querySelectorAll('.service-media, .product-media, .service-detail-media').forEach((media) => {
        const mediaRect = media.getBoundingClientRect();
        const mediaVisible = Math.min(mediaRect.bottom, window.innerHeight) - Math.max(mediaRect.top, 0);
        if (mediaVisible < 40) return;
        const clip = getComputedStyle(media).clipPath;
        if (clip && clip !== 'none' && /100%/.test(clip)) offenders.push(`masked ${String(media.className)}`);
      });
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
      // Reveals stagger, so a sample taken the same tick as the scroll would
      // catch elements mid-animation. The invariant is that nothing is still
      // hidden once motion has had time to finish.
      await page.waitForTimeout(700);
      expect(await stranded(), `${path} leaves content hidden at ${top}px`).toEqual([]);
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

test('shows the official mark in its own navy and steel on the white header', async ({ page }) => {
  // The header is white so the approved logo is never recoloured there: the A
  // keeps the logo navy and the skyline bars keep the logo steel.
  await page.goto('/');
  const mark = page.locator('.brand .brand-mark');
  await expect(mark).toBeVisible();
  const fills = await mark.evaluate((svg) => ({
    a: getComputedStyle(svg.querySelector(':scope > path')!).fill,
    bars: getComputedStyle(svg.querySelector(':scope > g path')!).fill,
  }));
  expect(fills).toEqual({ a: 'rgb(14, 51, 92)', bars: 'rgb(125, 131, 137)' });
  // The mark assembles on load, and once its motion has finished every
  // reveal clip sits at rest over the whole mark: the approved artwork, intact.
  const rest = await mark.evaluate(async (svg) => {
    await Promise.all(svg.getAnimations({ subtree: true }).map((animation) => animation.finished));
    return [...svg.querySelectorAll('.mark-reveal')].map((rect) => getComputedStyle(rect).transform);
  });
  expect(rest).toHaveLength(3);
  for (const transform of rest) expect(['none', 'matrix(1, 0, 0, 1, 0, 0)']).toContain(transform);
  const headerSurface = await page.evaluate(() => getComputedStyle(document.querySelector('.site-header')!, '::before').backgroundColor);
  expect(headerSurface).toBe('rgb(255, 255, 255)');
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


test('pins every scroll-driven effect when reduced motion is requested', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/services');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  const readParallax = () => page.evaluate(() => {
    const element = document.querySelector('[data-parallax]');
    return element ? getComputedStyle(element).getPropertyValue('--parallax-y').trim() : null;
  });

  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0, 0); });
  await page.waitForTimeout(250);
  const atTop = await readParallax();
  await page.evaluate(() => window.scrollTo(0, Math.round(window.innerHeight * 0.8)));
  await page.waitForTimeout(300);
  expect(await readParallax(), 'parallax must not track scroll under reduced motion').toBe(atTop);

  // Masks and entrance offsets resolve to their finished state rather than
  // animating to it.
  const unresolved = await page.evaluate(() => {
    const out: string[] = [];
    document.querySelectorAll('.service-media, .product-media, .service-detail-media').forEach((media) => {
      const clip = getComputedStyle(media).clipPath;
      if (clip && clip !== 'none' && /100%/.test(clip)) out.push(String(media.className));
    });
    document.querySelectorAll('[data-motion="reveal"]').forEach((element) => {
      if (Number.parseFloat(getComputedStyle(element).opacity) < 0.99) out.push(String(element.className));
    });
    return out;
  });
  expect(unresolved).toEqual([]);
});

test('moves the hero image with scroll when motion is allowed', async ({ page }) => {
  await page.goto('/services');
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0, 0); });
  await page.waitForTimeout(250);
  const readParallax = () => page.evaluate(() => getComputedStyle(document.querySelector('[data-parallax]')!).getPropertyValue('--parallax-y').trim());
  const atTop = await readParallax();
  await page.evaluate(() => window.scrollTo(0, Math.round(window.innerHeight * 0.7)));
  await page.waitForTimeout(320);
  expect(await readParallax(), 'parallax should track scroll').not.toBe(atTop);
});

test('keeps blend modes out of the stylesheet', async ({ page }) => {
  // A mix-blend-mode anywhere in the scroll path forces its stacking context
  // to composite on the main thread. Replacing the graded overlay with a
  // filter chain took the median frame during scroll from 33ms to 17ms, so
  // this is a performance regression guard, not a style preference.
  await page.goto('/');
  const blended = await page.evaluate(() => {
    const out: string[] = [];
    document.querySelectorAll('body *').forEach((element) => {
      for (const pseudo of [null, '::before', '::after']) {
        const styles = getComputedStyle(element, pseudo);
        if (pseudo && styles.content === 'none') continue;
        if (styles.mixBlendMode && styles.mixBlendMode !== 'normal') {
          out.push(`${element.tagName.toLowerCase()}${pseudo ?? ''}: ${styles.mixBlendMode}`);
        }
      }
    });
    return out;
  });
  expect(blended).toEqual([]);
});

test('ships every page as prerendered HTML with its own head in both languages', async ({ request }) => {
  // What a crawler or link-preview bot sees before any JavaScript runs.
  for (const [path, lang, title, heading] of [
    ['/services', 'en', 'Services | AALKC', 'Scrap management built for industrial scale.'],
    ['/ar/services', 'ar', 'الخدمات | أمانة الكلمة', 'إدارة خردة مصممة للنطاق الصناعي.'],
    ['/', 'en', 'Scrap Metal Buyer &amp; Recycling in Dammam | AALKC', 'weighed in every tonne.'],
    ['/ar', 'ar', 'شراء الخردة المعدنية وإعادة تدويرها في الدمام | أمانة الكلمة', 'في كل طن.'],
  ]) {
    const html = await (await request.get(path)).text();
    const canonical = `https://aalkc.com${path === '/' ? '/' : path}`;
    expect(html, path).toContain(`<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">`);
    expect(html, path).toContain(`<title>${title}</title>`);
    expect(html, path).toContain(`<link rel="canonical" href="${canonical}" />`);
    expect(html, path).toContain(`<meta property="og:url" content="${canonical}" />`);
    expect(html, path).toMatch(/<link rel="alternate" hreflang="en" href="https:\/\/aalkc\.com\/[^"]*" \/>/);
    expect(html, path).toMatch(/<link rel="alternate" hreflang="ar" href="https:\/\/aalkc\.com\/ar[^"]*" \/>/);
    expect(html, path).toContain('hreflang="x-default"');
    expect(html, path).toContain(heading);
    expect(html, path).toContain('<meta name="robots" content="index, follow');
    const jsonLd = JSON.parse(html.match(/<script type="application\/ld\+json" data-page-jsonld>(.*?)<\/script>/)![1]);
    expect(jsonLd['@graph'][0]['@type']).toContain('RecyclingCenter');
  }

  const faq = await (await request.get('/faq')).text();
  expect(faq).toContain('"@type":"FAQPage"');
  expect(faq).toContain('"@type":"BreadcrumbList"');
});

test('ships a noindex 404 document per language with no canonical address', async ({ request }) => {
  for (const [path, heading] of [['/404.html', 'That page is not available.'], ['/ar/404.html', 'هذه الصفحة غير متاحة.']]) {
    const html = await (await request.get(path)).text();
    expect(html, path).toContain('<meta name="robots" content="noindex, follow" />');
    expect(html, path).not.toContain('rel="canonical"');
    expect(html, path).toContain(heading);
  }
});

test('keeps the language in the URL and hydrates prerendered pages cleanly', async ({ page }) => {
  const problems: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error' || message.type() === 'warning') problems.push(message.text()); });
  page.on('pageerror', (error) => problems.push(error.message));

  await page.goto('/ar/materials');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await expect(page.getByRole('heading', { level: 1, name: 'مواد حديدية وغير حديدية.' })).toBeVisible();
  await expect(page).toHaveTitle('المواد | أمانة الكلمة');

  // The switch is a real link to the other language's URL, for crawlers too.
  await expect(page.getByRole('link', { name: 'EN', exact: true })).toHaveAttribute('href', '/materials');
  await expect(page.getByRole('link', { name: 'EN', exact: true })).toHaveAttribute('hreflang', 'en');

  await page.getByRole('link', { name: 'EN', exact: true }).click();
  await expect(page).toHaveURL(/\/materials$/);
  await expect(page).toHaveTitle('Materials | AALKC');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://aalkc.com/materials');

  // An explicit Arabic link is honoured even after choosing English.
  await page.goto('/ar/faq');
  await expect(page).toHaveURL(/\/ar\/faq$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');

  expect(problems).toEqual([]);
});

test('opens the contact concierge with WhatsApp, call and email on every page', async ({ page }) => {
  await page.goto('/ar');
  const toggle = page.getByRole('button', { name: 'تواصل مع أمانة الكلمة' });
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await expect(page.getByRole('button', { name: 'إغلاق خيارات التواصل' })).toHaveAttribute('aria-expanded', 'true');

  const panel = page.getByRole('dialog', { name: 'تحدث إلى فريقنا' });
  await expect(panel).toBeVisible();
  const whatsapp = panel.getByRole('link', { name: /واتساب/ });
  await expect(whatsapp).toBeFocused();
  const href = new URL((await whatsapp.getAttribute('href'))!);
  expect(href.origin + href.pathname).toBe('https://wa.me/966551811700');
  expect(href.searchParams.get('text')).toContain('أمانة الكلمة');
  await expect(panel.getByRole('link', { name: 'اتصل بأمانة الكلمة' })).toHaveAttribute('href', 'tel:+966551811700');
  await expect(panel.getByRole('link', { name: /contact@aalkc\.com/ })).toHaveAttribute('href', 'mailto:contact@aalkc.com');

  // Escape closes it and hands focus back to the launcher.
  await page.keyboard.press('Escape');
  await expect(panel).toBeHidden();
  await expect(page.locator('.concierge-toggle')).toBeFocused();

  // The quote action closes the panel and opens the enquiry dialog.
  await page.locator('.concierge-toggle').click();
  await page.locator('.concierge-quote').click();
  await expect(page.locator('.concierge-panel')).toHaveCount(0);
  await expect(page.locator('.quote-modal')).toBeVisible();
});

test('keeps the hero ledger inside the hero at phone width', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  for (const path of ['/', '/ar']) {
    await page.goto(path);
    const ledger = page.locator('.hero-ledger dl');
    await expect(ledger.locator('dd')).toHaveCount(5);
    const layout = await ledger.evaluate((list) => {
      const box = list.getBoundingClientRect();
      const cells = Array.from(list.children).map((cell) => cell.getBoundingClientRect());
      return { box: { left: box.left, right: box.right }, cells: cells.map((cell) => ({ left: cell.left, right: cell.right })), overflow: list.scrollWidth > list.clientWidth };
    });
    expect(layout.overflow, path).toBe(false);
    for (const cell of layout.cells) {
      expect(cell.left, path).toBeGreaterThanOrEqual(layout.box.left - 1);
      expect(cell.right, path).toBeLessThanOrEqual(layout.box.right + 1);
    }
    await expect(ledger.getByText('7050308233')).toBeVisible();
    await expect(ledger.getByText('ISO 9001 · 14001 · 45001')).toBeVisible();
  }
});

test('links each assay tile to the guide for its material', async ({ page }) => {
  await page.goto('/');
  const tiles = page.locator('.assay-tile');
  await expect(tiles).toHaveCount(8);
  await tiles.filter({ hasText: 'Copper' }).click();
  await expect(page).toHaveURL(/\/materials\/copper$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Copper scrap' })).toBeVisible();
  await expect(page.locator('.page-breadcrumb')).toContainText('Materials');
  await expect(page.locator('.in-brief li')).toHaveCount(4);

  // The guide's quote request arrives with the material already chosen.
  await page.locator('.guide-action').getByRole('button', { name: /Request a spot quote/i }).click();
  await expect(page.getByRole('dialog')).toContainText('Copper');
});

test('prerenders every guide and article with its structured data', async ({ request }) => {
  const jsonLd = (html: string) => JSON.parse(html.match(/<script type="application\/ld\+json" data-page-jsonld>(.*?)<\/script>/)![1])['@graph'];
  const types = (html: string) => jsonLd(html).map((node: { '@type': string | string[] }) => node['@type']);

  for (const [path, lang, title] of [
    ['/materials/copper', 'en', 'Copper scrap | AALKC'],
    ['/ar/materials/heavy-melt-steel', 'ar', 'الفولاذ الثقيل للصهر (HMS 1 و2) | أمانة الكلمة'],
    ['/industries/construction', 'en', 'Scrap metal from construction and contracting | AALKC'],
    ['/process', 'en', 'How we work | AALKC'],
    ['/sell', 'en', 'Sell your scrap | AALKC'],
    ['/ar/buy', 'ar', 'اشترِ من أمانة الكلمة | أمانة الكلمة'],
    ['/ar/process', 'ar', 'كيف نعمل | أمانة الكلمة'],
    ['/insights', 'en', 'Insights | AALKC'],
    ['/insights/scrap-metal-grades-explained', 'en', 'Scrap metal grades explained: how ferrous and non-ferrous scrap is classified | AALKC'],
    ['/ar/insights/saudi-arabia-scrap-metal-industry', 'ar', 'صناعة الخردة المعدنية في المملكة العربية السعودية: التاريخ والجغرافيا والسوق اليوم | أمانة الكلمة'],
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    const html = await response.text();
    expect(html, path).toContain(`<html lang="${lang}"`);
    expect(html, path).toContain(`<title>${title}</title>`);
    expect(html, path).toContain(`<link rel="canonical" href="https://aalkc.com${path}" />`);
    // The body is in the document itself, not fetched after load.
    if (!['/insights', '/sell', '/ar/buy'].includes(path)) expect(html, path).toContain('class="in-brief"');
  }

  // Guides answer their questions as FAQPage data; articles are Articles,
  // published by the company, citing their sources.
  expect(types(await (await request.get('/materials/copper')).text())).toContain('FAQPage');
  expect(types(await (await request.get('/sell')).text())).toContain('FAQPage');
  expect(types(await (await request.get('/ar/buy')).text())).toContain('FAQPage');
  const article = await (await request.get('/insights/saudi-arabia-scrap-metal-industry')).text();
  expect(article).toContain('<meta property="og:type" content="article" />');
  const articleNode = jsonLd(article).find((node: { '@type': string }) => node['@type'] === 'Article');
  expect(articleNode.headline).toBe("Saudi Arabia's scrap metal industry: history, geography and the market today");
  expect(articleNode.author['@id']).toBe('https://aalkc.com/#organization');
  expect(articleNode.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  expect(articleNode.citation.length).toBeGreaterThan(5);
  const breadcrumb = jsonLd(article).find((node: { '@type': string }) => node['@type'] === 'BreadcrumbList');
  expect(breadcrumb.itemListElement.map((item: { name: string }) => item.name)).toEqual(['Home', 'Insights', "Saudi Arabia's scrap metal industry: history, geography and the market today"]);

  const sitemap = await (await request.get('/sitemap.xml')).text();
  for (const loc of ['/sell', '/ar/buy', '/materials/copper', '/ar/materials/rebar', '/industries/electrical', '/process', '/insights', '/ar/insights/preparing-scrap-for-grading']) {
    expect(sitemap, loc).toContain(`<loc>https://aalkc.com${loc}</loc>`);
  }

  const llms = await (await request.get('/llms.txt')).text();
  expect(llms).toContain('# AALKC');
  expect(llms).toContain('(https://aalkc.com/insights/scrap-metal-in-saudi-circular-economy)');
  expect(llms).toContain('(https://aalkc.com/materials/stainless-steel)');
});

test('keeps a guide readable when its code cannot be fetched', async ({ page }) => {
  await page.route(/\/assets\/knowledge-[\w-]+\.js$/, (route) => route.abort());

  // First visit: the prerendered page stays as it is.
  await page.goto('/materials/copper');
  await page.waitForTimeout(500);
  await expect(page.getByRole('heading', { level: 1, name: 'Copper scrap' })).toBeVisible();
  await expect(page.locator('.in-brief li')).toHaveCount(4);

  // In-app navigation: the guide opens with a full page load instead.
  await page.goto('/materials');
  await page.locator('.product-card').filter({ hasText: 'Brass' }).getByRole('link', { name: /Read the material guide/i }).click();
  await expect(page).toHaveURL(/\/materials\/brass$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Brass scrap' })).toBeVisible();
  await expect(page.locator('.in-brief li').first()).toBeVisible();
});

test('loads a guide when navigating to it inside the app', async ({ page }) => {
  await page.goto('/materials');
  await page.locator('.product-card').filter({ hasText: 'Brass' }).getByRole('link', { name: /Read the material guide/i }).click();
  await expect(page).toHaveURL(/\/materials\/brass$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Brass scrap' })).toBeVisible();
  await expect(page).toHaveTitle('Brass scrap | AALKC');
  // Contents links jump to their section.
  const firstEntry = page.locator('.toc a').first();
  const target = (await firstEntry.getAttribute('href'))!;
  await firstEntry.click();
  await expect(page.locator(target)).toBeInViewport();

  await page.goto('/insights');
  await page.getByRole('link', { name: /How to prepare industrial scrap/ }).click();
  await expect(page.getByRole('heading', { level: 1, name: /How to prepare industrial scrap/ })).toBeVisible();
  await expect(page.locator('.sources li').first()).toBeVisible();
});

test('prerenders the service, industries and sustainability pages in both languages', async ({ request }) => {
  for (const [path, lang, title] of [
    ['/services/container-service', 'en', 'Container Service | AALKC'],
    ['/ar/services/container-service', 'ar', 'خدمة الحاويات | أمانة الكلمة'],
    ['/services/global-export', 'en', 'Global Export | AALKC'],
    ['/industries', 'en', 'Industries | AALKC'],
    ['/ar/industries', 'ar', 'القطاعات | أمانة الكلمة'],
    ['/sustainability', 'en', 'Sustainability | AALKC'],
    ['/ar/sustainability', 'ar', 'الاستدامة | أمانة الكلمة'],
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    const html = await response.text();
    expect(html, path).toContain(`<html lang="${lang}"`);
    expect(html, path).toContain(`<title>${title}</title>`);
    expect(html, path).toContain(`<link rel="canonical" href="https://aalkc.com${path}" />`);
  }

  // A service page names its parent in the breadcrumb and describes itself as a Service.
  const service = await (await request.get('/services/metal-sorting')).text();
  const graph = JSON.parse(service.match(/<script type="application\/ld\+json" data-page-jsonld>(.*?)<\/script>/)![1])['@graph'];
  const breadcrumb = graph.find((node: { '@type': string }) => node['@type'] === 'BreadcrumbList');
  expect(breadcrumb.itemListElement.map((item: { name: string }) => item.name)).toEqual(['Home', 'Services', 'Metal Sorting']);
  const serviceNode = graph.find((node: { '@type': string }) => node['@type'] === 'Service');
  expect(serviceNode.name).toBe('Metal Sorting');
  expect(serviceNode.url).toBe('https://aalkc.com/services/metal-sorting');

  const sitemap = await (await request.get('/sitemap.xml')).text();
  for (const loc of ['/services/container-service', '/ar/services/container-service', '/industries', '/ar/sustainability']) {
    expect(sitemap, loc).toContain(`<loc>https://aalkc.com${loc}</loc>`);
  }
});

test('has no serious or critical axe findings on the new company pages', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const path of ['/', '/ar', '/services/scrap-purchasing', '/industries', '/sustainability', '/ar/services/scrap-purchasing', '/sell', '/ar/buy', '/auctions-and-tenders', '/ar/auctions-and-tenders', '/materials/copper', '/ar/industries/electrical', '/process', '/insights', '/insights/scrap-metal-grades-explained', '/ar/insights/scrap-metal-in-saudi-circular-economy']) {
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter((violation) => violation.impact === 'serious' || violation.impact === 'critical'), path).toEqual([]);
  }
});

test('links every service card to its own page and opens the quote dialog from it', async ({ page }) => {
  await page.goto('/services');
  await page.getByRole('link', { name: /View service details/i }).first().click();
  await expect(page).toHaveURL(/\/services\/container-service$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Container Service' })).toBeVisible();
  await expect(page.locator('.page-breadcrumb')).toContainText('Services');

  await page.locator('.service-page-aside').getByRole('button', { name: /Request a quote/i }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  for (const name of ['material', 'weightTons', 'location', 'timing']) {
    await expect(dialog.locator(`[name="${name}"]`), name).toHaveCount(1);
  }
  await expect(dialog.locator('select[name="material"] option')).toContainText(['Copper', 'Mixed or other metals']);
});

test('keeps the full menu on one line wherever it is shown', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop header only');
  for (const width of [1600, 1440, 1366, 1280]) {
    for (const path of ['/', '/ar']) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(path);
      const boxes = await page.evaluate(() => {
        const box = (selector: string) => {
          const rect = document.querySelector(selector)!.getBoundingClientRect();
          return { left: rect.left, right: rect.right, height: rect.height };
        };
        return { nav: box('.primary-nav'), lang: box('.language-toggle'), quote: box('.header-quote'), brand: box('.brand') };
      });
      const label = `${width} ${path}`;
      expect(boxes.quote.height, label).toBeLessThanOrEqual(48);
      const ordered = path === '/' ? [boxes.brand, boxes.nav, boxes.lang, boxes.quote] : [boxes.quote, boxes.lang, boxes.nav, boxes.brand];
      for (let i = 1; i < ordered.length; i += 1) expect(ordered[i].left, label).toBeGreaterThanOrEqual(ordered[i - 1].right);
      expect(Math.max(...ordered.map((b) => b.right)), label).toBeLessThanOrEqual(width);
    }
  }
});
