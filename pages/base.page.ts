import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string = '') {
    if (url) {
      await this.page.goto(url);
    }
  }

  async click(selector: string) {
    // Wait for element to be visible before clicking
    await this.page.waitForSelector(selector, { state: 'visible', timeout: 10000 });
    await this.page.click(selector);
  }

  /**
   * Fill an input field with a value
   * Includes automatic waiting for visibility and scrolling into view
   * @param selector - CSS selector or other locator string
   * @param value - Value to fill
   * @param waitForVisible - Whether to wait for the element to be visible first (default: true)
   */
  async fill(selector: string, value: string, waitForVisible = true) {
    if (waitForVisible) {
      // Wait for the element to be visible
      await this.page.waitForSelector(selector, { state: 'visible', timeout: 10000 });
    }
    
    // Get the locator for the element
    const element = this.page.locator(selector);
    
    // Scroll the element into view if it's not visible in the viewport
    await element.scrollIntoViewIfNeeded();
    
    // Fill the field
    await element.fill(value);
  }

  async expectVisible(selector: string, timeout = 10000) {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }
}

