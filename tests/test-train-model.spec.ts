import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { TrainPage } from '../pages/train.page';

test.describe('Scenario 2: Train Model', () => {
  test('should complete train model workflow with BYO Agent', async ({ page }) => {
    // Step 1: Login
    const loginPage = new LoginPage(page);
    await loginPage.login();
    console.log('✅ Login successful');

    // Step 2: Navigate to Train page
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateToTrain();
    console.log('✅ Navigated to Train page');

    // Step 3: Complete the training workflow
    const trainPage = new TrainPage(page);
    await trainPage.startTraining();
    
    // Verify that we successfully completed the workflow
    // The startTraining() method will throw an error if any step fails
    console.log('✅ Train Model test completed successfully');
  });

  // Optional: Advanced test that actually executes Python training
  // This test is skipped by default as it requires:
  // - Ultralytics package installed (pip install ultralytics)
  // - Valid API key and model configuration
  // - Longer execution time (several minutes)
  test.skip('should execute actual training with Python', async ({ page }) => {
    // Step 1: Login
    const loginPage = new LoginPage(page);
    await loginPage.login();

    // Step 2: Navigate to Train page
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateToTrain();

    // Step 3: Complete the training workflow and execute Python code
    const trainPage = new TrainPage(page);
    await trainPage.startTraining();
    
    // Step 4: Execute the actual training
    await trainPage.executeTraining();
    
    // Note: In a real implementation, you would wait for training completion
    // and verify the status. This is a placeholder for demonstration.
    console.log('✅ Training execution completed successfully');
  });
});

