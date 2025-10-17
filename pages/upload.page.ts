import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { testConfig } from '../config/test.config';

export class UploadPage extends BasePage {
private datasetNameInput = 'input[placeholder*="Dataset"]';  // Matches "Dataset (date)"
  private fileInput = 'input[type="file"]';
  private createButton = 'button:has-text("Create")';  // Or text="Upload"
  constructor(page: Page) {
    super(page);
  }

    async uploadDataset() {
        await this.fill(this.datasetNameInput, 'Test Coco8'); // Required field from snapshot
        await this.page.setInputFiles(this.fileInput, testConfig.datasetPath); // Works on hidden input
        await this.click(this.createButton);
        // await this.expectVisible('text="uploaded"'); // Success toast/status
    }
}
