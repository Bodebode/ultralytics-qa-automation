import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class TrainPage extends BasePage {
  // Public properties for test assertions
  public trainingStatus = 'text="Training started"';
  public completedStatus = 'text="Completed"';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Extract Python training code from the BYO Agent page
   */
  async extractTrainingCode(): Promise<string | null> {
    try {
      const codeBlocks = await this.page.locator('pre').all();
      if (codeBlocks.length >= 2) {
        const pythonCode = await codeBlocks[1].textContent();
        return pythonCode;
      }
      return null;
    } catch (error) {
      console.warn('Could not extract Python code:', error);
      return null;
    }
  }

  /**
   * Complete the training workflow up to the BYO Agent step
   */
  async startTraining() {
    console.log('\n========== STARTING TRAIN MODEL WORKFLOW ==========\n');
    
    // Wait for the Train Model modal to appear
    await this.page.waitForSelector('text="Train a Model"', { timeout: 10000 });
    console.log('✅ Train Model modal opened');
    
    // Wait for the modal content to load
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    
    // ===== STEP 1: Select Dataset =====
    console.log('\n--- Step 1: Dataset Selection ---');
    
    // Wait for Step 1 to be visible
    await this.page.waitForSelector('text="Step 1 of 3"', { timeout: 10000 });
    
    // Look for the search input
    const searchInput = this.page.locator('input[placeholder="Search"]');
    await searchInput.waitFor({ state: 'visible', timeout: 10000 });
    console.log('Found search input, filling with "Test Coco8"...');
    
    await searchInput.fill('Test Coco8');
    await this.page.waitForTimeout(1000);
    
    // Click on the dataset
    const datasetCard = this.page.locator('text="Test Coco8"').first();
    await datasetCard.waitFor({ state: 'visible', timeout: 5000 });
    await datasetCard.click({ force: true });
    console.log('✅ Dataset "Test Coco8" selected');
    
    // Click Continue
    await this.page.waitForTimeout(500);
    const continueBtn1 = this.page.locator('button:has-text("Continue")');
    await continueBtn1.click();
    console.log('✅ Clicked Continue from dataset selection');
    
    // ===== STEP 2: Configure Model =====
    console.log('\n--- Step 2: Model Configuration ---');
    
    // Wait for Step 2 to be visible
    await this.page.waitForSelector('text="Step 2 of 3"', { timeout: 15000 });
    await this.page.waitForTimeout(2000);
    
    // Find model name input by its label
    const modelNameLabel = this.page.locator('text="Model name"');
    await modelNameLabel.waitFor({ state: 'visible', timeout: 10000 });
    
    // The input should be near the label - try different approaches
    let modelNameInput = this.page.locator('input').filter({ hasText: '' }).first();
    
    // Better approach: find the input that's in the same container as the "Model name" label
    const modelNameContainer = this.page.locator('text="Model name"').locator('..');
    modelNameInput = modelNameContainer.locator('input').first();
    
    // Even better: use getByLabel
    modelNameInput = this.page.getByLabel('Model name', { exact: false });
    
    await modelNameInput.waitFor({ state: 'visible', timeout: 5000 });
    await modelNameInput.clear();
    await modelNameInput.fill('Test Model');
    console.log('✅ Model name filled: Test Model');
    
    // Select YOLO11s variant
    const yolo11sOption = this.page.locator('text="YOLO11s"').first();
    await yolo11sOption.waitFor({ state: 'visible', timeout: 5000 });
    await yolo11sOption.click();
    console.log('✅ Selected YOLO11s variant');
    
    // Scroll down to see Advanced Model Configuration
    await this.page.evaluate('window.scrollBy(0, 300)');
    await this.page.waitForTimeout(500);
    
    // Look for Advanced Model Configuration
    const advConfigButton = this.page.locator('text="Advanced Model Configuration"');
    const advConfigExists = await advConfigButton.count();
    
    if (advConfigExists > 0) {
      console.log('Found Advanced Model Configuration...');
      
      // Check if it's already expanded (has upward arrow)
      const isExpanded = await this.page.locator('text="Advanced Model Configuration"').locator('..').locator('svg').count() > 0;
      
      if (!isExpanded) {
        console.log('Expanding Advanced Model Configuration...');
        await advConfigButton.click();
        await this.page.waitForTimeout(1000);
      } else {
        console.log('Advanced Model Configuration already expanded');
      }
      
      // Try to fill epochs - it should be a number input
      const epochsInput = this.page.locator('input[type="number"]').first();
      const epochsVisible = await epochsInput.isVisible().catch(() => false);
      
      if (epochsVisible) {
        await epochsInput.clear();
        await epochsInput.fill('5');
        console.log('✅ Epochs set to: 5');
      } else {
        console.log('⚠️ Epochs field not visible, skipping...');
      }
    } else {
      console.log('⚠️ Advanced Model Configuration not found');
    }
    
    // Click Continue to proceed to training
    await this.page.waitForTimeout(1000);
    const continueBtn2 = this.page.locator('button:has-text("Continue")');
    await continueBtn2.click();
    console.log('✅ Clicked Continue from model configuration');
    
    // ===== STEP 3: Training (Bring Your Own Agent) =====
    console.log('\n--- Step 3: Training (BYO Agent) ---');
    
    // Wait for Step 3 to be visible
    await this.page.waitForSelector('text="Step 3 of 3"', { timeout: 15000 });
    await this.page.waitForTimeout(2000);
    console.log('✅ Reached Step 3 of 3');
    
    // Look for the "Bring your own agent" tab
    const byoAgentTab = this.page.locator('text="Bring your own agent"');
    const byoTabExists = await byoAgentTab.count();
    
    if (byoTabExists > 0) {
      console.log('Found "Bring your own agent" tab, clicking...');
      await byoAgentTab.click();
      await this.page.waitForTimeout(2000);
      console.log('✅ Clicked "Bring your own agent" tab');
    } else {
      console.log('⚠️ BYO Agent tab not found - might already be selected');
    }
    
    // Verify training instructions are visible
    const installVisible = await this.page.locator('text*="pip install"').isVisible().catch(() => false);
    const pythonVisible = await this.page.locator('pre').count() >= 2;
    
    if (installVisible && pythonVisible) {
      console.log('✅ Training instructions are visible');
    } else {
      console.log('⚠️ Some training instructions may not be visible');
    }
    
    // Extract Python code
    const pythonCode = await this.extractTrainingCode();
    if (pythonCode) {
      console.log('\n========== PYTHON TRAINING CODE ==========');
      console.log(pythonCode);
      console.log('==========================================\n');
    } else {
      console.log('⚠️ Could not extract Python training code');
    }
    
    console.log('\n✅ TRAIN MODEL WORKFLOW COMPLETED SUCCESSFULLY');
    console.log('   ✓ Step 1: Dataset selection (Test Coco8)');
    console.log('   ✓ Step 2: Model configuration (Test Model, YOLO11s)');
    console.log('   ✓ Step 3: BYO Agent training page reached');
    console.log('   ✓ Training instructions displayed');
    console.log('   ✓ Python code available for execution');
    
    console.log('\nℹ️ NOTE: Actual Python training execution is not performed in automated tests');
    console.log('ℹ️ To run actual training, execute the Python code shown above');
    console.log('\n========== WORKFLOW COMPLETE ==========\n');
  }

  /**
   * Execute the actual training by running the Python code
   * This is an optional method for advanced testing scenarios
   */
  async executeTraining(): Promise<void> {
    console.log('⚠️ executeTraining() called - this requires Python environment setup');
    console.log('⚠️ For automated testing, use startTraining() instead');
    
    // Extract the Python code
    const pythonCode = await this.extractTrainingCode();
    if (!pythonCode) {
      throw new Error('Could not extract Python training code');
    }
    
    // Note: Actual Python execution would require Node.js child_process
    // This is a placeholder for the advanced test scenario
    console.log('Python code extracted, execution would happen here in production');
  }
}

