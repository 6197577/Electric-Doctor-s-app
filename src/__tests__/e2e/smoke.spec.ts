import { test, expect } from '@playwright/test';

test('has title and primary call to action', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Electric Doctor/);

  // Check for the Emergency Video Consult button
  const emergencyButton = page.getByRole('button', { name: /Emergency Video Consult/i });
  await expect(emergencyButton).toBeVisible();
});

test('navigation to marketplace works', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Marketplace');
  await expect(page).toHaveURL(/\/marketplace/);
  await expect(page.locator('h1')).toContainText(/Marketplace/i);
});
