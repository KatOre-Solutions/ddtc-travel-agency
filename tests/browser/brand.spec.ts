import { test, expect } from '@playwright/test';

test('official navigation, footer and favicon assets render without stretching', async ({ page, isMobile }) => {
  await page.goto('/');
  const logo = page.locator('.site-header .brand-image');
  await expect(logo).toBeVisible();
  const result = await logo.evaluate((image) => {
    const element = image as HTMLImageElement;
    const box = element.getBoundingClientRect();
    return { src: element.currentSrc, loaded: element.complete && element.naturalWidth > 0, ratio: box.width / box.height, width: box.width, header: element.closest('header')!.getBoundingClientRect().height };
  });
  expect(result.loaded).toBe(true);
  expect(result.src).toContain('ddtc-wordmark-navy.svg');
  expect(result.ratio).toBeCloseTo(1165/230,1);
  expect(result.header).toBe(isMobile ? 80 : 100);
  await page.locator('.site-footer').scrollIntoViewIfNeeded();
  await expect(page.locator('.footer-brand .brand-image')).toHaveAttribute('src','/brand/ddtc-primary.png');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('link',{name:'DDTC home',exact:true}).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href',/icon\.svg/);
});
