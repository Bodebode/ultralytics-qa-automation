import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test('smoke: login to dashboard', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login();
  await expect(page.getByRole('link', { name: 'Datasets' })).toBeVisible({ timeout: 10000 });  // Target sidebar link
});