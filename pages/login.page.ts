import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { testConfig } from '../config/test.config';

export class LoginPage extends BasePage {
  private signInToggle = 'div.title:has-text("Sign In")';
  private emailInput = 'input[type="email"]';
  private passwordInput = 'input[type="password"]';
  private loginButton = 'button:has-text("Sign In")';

  constructor(page: Page) {
    super(page);
  }

  async login() {
    await this.navigate('https://hub.ultralytics.com');
    await this.expectVisible(this.signInToggle);

    await this.click(this.signInToggle);
    await this.expectVisible(this.emailInput);

    await this.fill(this.emailInput, testConfig.email);
    await this.fill(this.passwordInput, testConfig.password);
    await this.click(this.loginButton);

    // Final assert: Wait for "Datasets" in sidebar (post-login indicator)
    await this.expectVisible('text="Datasets"');
  }
}