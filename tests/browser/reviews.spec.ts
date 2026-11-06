import { test, expect } from '@playwright/test';
import { publishedReviews } from '../../src/lib/reviews';

test('Reviews carousel cycles through the approved full reviews and wraps in both directions', async ({ page }) => {
  await page.goto('/reviews');
  const carousel = page.getByRole('region', { name: 'Traveller review carousel' });
  await expect(carousel).toBeVisible();
  const next = carousel.getByRole('button', { name: 'Next testimonial' });
  const previous = carousel.getByRole('button', { name: 'Previous testimonial' });
  for (const review of publishedReviews) {
    const detail = page.getByRole('article', { name: `Full review by ${review.name}` });
    await expect(detail).toBeVisible();
    for (const paragraph of review.paragraphs) await expect(detail).toContainText(paragraph);
    await expect(detail.getByRole('img', { name: '5 out of 5 stars' })).toBeVisible();
    await next.click();
  }
  await expect(page.getByRole('article', { name: `Full review by ${publishedReviews[0].name}` })).toBeVisible();
  await previous.click();
  await expect(page.getByRole('article', { name: `Full review by ${publishedReviews.at(-1)!.name}` })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(carousel.locator('img')).toHaveCount(0);
  await expect(page.getByText('COMPANY', { exact: false })).toHaveCount(0);
});

test('carousel supports keyboard navigation and reduced motion without losing review content', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/reviews');
  const carousel = page.getByRole('region', { name: 'Traveller review carousel' });
  const next = carousel.getByRole('button', { name: 'Next testimonial' });
  await next.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('article', { name: `Full review by ${publishedReviews[1].name}` })).toBeVisible();
  await page.keyboard.press('End');
  await expect(page.getByRole('article', { name: `Full review by ${publishedReviews.at(-1)!.name}` })).toBeVisible();
  await page.keyboard.press('Home');
  await expect(page.getByRole('article', { name: `Full review by ${publishedReviews[0].name}` })).toBeVisible();
  expect(await carousel.locator('.stagger-card-active').evaluate(el => getComputedStyle(el).transitionDuration)).toBe('0s');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('article', { name: `Full review by ${publishedReviews[1].name}` })).toBeVisible();
  await expect(next).toBeFocused();
});

test('homepage retains its existing review marquee', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.review-marquee-rows')).toBeVisible();
  await expect(page.locator('.stagger-carousel')).toHaveCount(0);
});

test('full approved reviews remain available without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${baseURL}/reviews`);
  for (const review of publishedReviews) for (const paragraph of review.paragraphs) await expect(page.getByText(paragraph, { exact: true })).toBeVisible();
  await context.close();
});
