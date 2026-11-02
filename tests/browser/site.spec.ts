import { test, expect } from '@playwright/test';

test('home, navigation and all images load with no horizontal overflow', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Explore More.Create Memories.');
  for (const image of await page.locator('img').all()) await image.scrollIntoViewIfNeeded();
  await page.evaluate(() => document.fonts.ready);
  await expect.poll(() => page.locator('img').evaluateAll((images) => images.every((image) => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0))).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});
test('catalogue category, search and empty state work', async ({ page }) => {
  await page.goto('/experiences');
  await expect(page.locator('.experience-card')).toHaveCount(10);
  await page.getByRole('button', { name: 'Beach holidays', exact: true }).click();
  await expect(page.locator('.experience-card')).toHaveCount(3);
  await page.getByRole('textbox', { name: 'Search experiences' }).fill('Durban');
  await expect(page.locator('.experience-card')).toHaveCount(1);
  await page.getByRole('textbox', { name: 'Search experiences' }).fill('No such journey');
  await expect(page.getByText('No journeys found just yet.')).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(page.locator('.experience-card')).toHaveCount(10);
});
test('package selection changes price and persists into enquiry', async ({ page }) => {
  await page.goto('/experiences/cape-town-december-2027');
  await page.getByRole('radio', { name: 'Return flights package' }).check();
  await expect(page.locator('.selected-price')).toContainText('R10 487');
  await page.getByRole('link', { name: 'Enquire About This Trip' }).click();
  await expect(page).toHaveURL(/\/contact\?trip=cape-town-december-2027&package=flights$/, { timeout: 30000 });
  await expect(page.getByRole('textbox', { name: 'Preferred destination' })).toHaveValue('Cape Town');
  await expect(page.getByRole('textbox', { name: 'Travel dates' })).toHaveValue('10–13 Dec 2027');
  await expect(page.getByRole('textbox', { name: 'Preferred package' })).toHaveValue('Cape Town Holiday · Return flights package');
});
test('enquiry validates and prepares a complete WhatsApp message without claiming delivery', async ({ page }) => {
  await page.goto('/contact');
  await page.getByRole('button', { name: 'Prepare WhatsApp Enquiry' }).click();
  await expect(page.getByText('Please enter your full name.')).toBeVisible();
  await page.getByRole('textbox', { name: 'Full name' }).fill('Test Traveller');
  await page.getByRole('textbox', { name: 'Email address' }).fill('test@example.com');
  await page.getByRole('textbox', { name: 'Phone number' }).fill('064 058 4396');
  await page.getByRole('textbox', { name: 'Preferred destination' }).fill('Cape Town');
  await page.getByRole('textbox', { name: 'Travel dates' }).fill('December 2027');
  await page.getByLabel('Approximate budget per person').selectOption('R5,000–R10,000');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Prepare WhatsApp Enquiry' }).click();
  await expect(page.getByText('Your enquiry is ready. Open WhatsApp to review and send it to DDTC.')).toBeVisible();
  const link = await page.getByRole('link', { name: 'Open WhatsApp' }).getAttribute('href');
  expect(new URL(link!).searchParams.get('text')).toContain('Destination: Cape Town');
  expect(new URL(link!).searchParams.get('text')).toContain('test@example.com');
});
test('mobile menu is accessible and closes on escape and navigation', async ({ page, isMobile }) => {
  test.skip(!isMobile);
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Open menu' });
  await toggle.click();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Our Services' }).click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toHaveCount(0);
});
test('every public route responds, trip pages load, and email API fails honestly when unconfigured', async ({ request }) => {
  for (const route of ['/', '/about', '/experiences', '/services', '/reviews', '/contact', '/privacy', '/booking-conditions', '/photo-credits', '/robots.txt', '/sitemap.xml', '/experiences/lesotho-august-2027', '/experiences/bali-august-2027']) expect((await request.get(route)).status(), route).toBe(200);
  expect((await request.get('/experiences/not-real')).status()).toBe(404);
  const response = await request.post('/api/enquiry', { data: { name: 'Test Traveller', email: 'test@example.com', phone: '0640584396', destination: 'Cape Town', dates: 'Flexible', travellers: 2, budget: 'Under R5,000', type: 'Family', consent: true } });
  expect(response.status()).toBe(503);
  expect((await response.json()).error).toContain('not configured');
});
