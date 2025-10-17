import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';
import { LoginPage } from '../pages/login.page';
import { UploadPage } from '../pages/upload.page';

test.describe('Scenario 1: Upload Dataset', () => {
  test('upload coco8 and verify', async ({ page }) => {
    const login = new LoginPage(page);
    await login.login();

    const dashboard = new DashboardPage(page);
    await dashboard.navigateToUpload();

    const upload = new UploadPage(page);
    await upload.uploadDataset();

    await dashboard.navigateToDatasets();
    await expect(page.getByText('Test Coco8').first()).toBeVisible({ timeout: 10000 });  // Pick first match in list
  });
});
