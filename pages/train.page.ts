import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class TrainPage extends BasePage {
  private datasetSearch = 'input[placeholder*="Search datasets"]';
  private continueButton = 'button:has-text("Continue")';
  private modelNameInput = 'input[placeholder*="Model name"]';
  private yolo11sVariant = 'label:has-text("YOLO11s")';  // Radio/select
  private advancedConfig = 'button:has-text("Advanced Model Configuration")';
  private epochsInput = 'input[name="epochs"]';
  private byoAgentTab = 'tab:has-text("Bring Your Own Agent")';  // Tab switch
  public connectedMessage = 'text="Connected"';
  private doneButton = 'button:has-text("Done")';
  public trainingStatus = 'text="Training started"';
  public completedStatus = 'text="Completed"';

  constructor(page: Page) {
    super(page);
  }

  async startTraining() {
    await this.fill(this.datasetSearch, 'Test Coco8');  // Your uploaded name
    await this.click(this.continueButton);

    await this.fill(this.modelNameInput, 'Test Model');
    await this.click(this.yolo11sVariant);
    await this.click(this.advancedConfig);
    await this.fill(this.epochsInput, '5');
    await this.click(this.continueButton);

    await this.click(this.byoAgentTab);
    await this.expectVisible(this.connectedMessage, 30000);  // Wait for CLI connect
    await this.click(this.doneButton);

    await this.expectVisible(this.trainingStatus);
    await this.page.waitForSelector(this.completedStatus, { timeout: 120000 });  // 2-min for 5 epochs
  }
}