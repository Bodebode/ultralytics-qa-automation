import { test, expect } from '@playwright/test';
import { spawn } from 'child_process';
import { DashboardPage } from '../pages/dashboard.page';
import { LoginPage } from '../pages/login.page';
import { TrainPage } from '../pages/train.page';

test.describe('Scenario 2: Train Model', () => {
  test('train with coco8 and verify', async ({ page }) => {
    const login = new LoginPage(page);
    await login.login();

    const dashboard = new DashboardPage(page);
    await dashboard.navigateToTrain();

    const train = new TrainPage(page);
    await train.startTraining();

    // CLI Steps 9-10: Spawn yolo (adjust args per HUB "Step 1/2" instructions)
    const yoloProc = spawn('yolo', [
      'train',
      'model=yolo11s.pt',
      'data=./data/coco8.yaml',  // Unzipped path
      'epochs=5',
      '--agent'  // For HUB connect
    ]);
    yoloProc.on('error', (err) => console.error(`YOLO error: ${err}`));
    yoloProc.stdout.on('data', (data) => console.log(`YOLO: ${data}`));

    // Wait for UI "Connected"
    await page.waitForSelector(train.connectedMessage, { timeout: 30000 });

    // Clean up CLI
    yoloProc.kill('SIGINT');

    // Assert training started/completed
    await expect(page.locator(train.trainingStatus)).toBeVisible();
    await expect(page.locator(train.completedStatus)).toBeVisible({ timeout: 120000 });
  });
});