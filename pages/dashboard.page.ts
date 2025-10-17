import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class DashboardPage extends BasePage {
  // From snapshot: "Upload Dataset" in main content (paragraph/button)
  private uploadButton = 'text="Upload Dataset"';  // Clickable paragraph
  // Sidebar link for Datasets nav
  private datasetsLink = 'a:has-text("Datasets")';  // Or page.getByRole('link', { name: 'Datasets' })
  private trainButton = 'text="Train Model"';  // Clickable paragraph from snapshot

  constructor(page: Page) {
    super(page);
  }

async navigateToUpload() {
  await this.click(this.uploadButton);
  await this.expectVisible('text="Upload Dataset"');  // Wait for form title instead
}

async navigateToDatasets() {
  await this.click(this.datasetsLink);
  await this.page.waitForURL('**/datasets', { timeout: 10000 });  // Wait for /datasets route
}

 async navigateToTrain() {
    await this.click(this.trainButton);
    await this.expectVisible('text="Train a Model"');  // Wait for train screen title
  }
}