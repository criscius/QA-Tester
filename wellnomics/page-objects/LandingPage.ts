import { Page, Locator, expect } from '@playwright/test';
export class LandingPage {
  readonly page: Page;
  readonly getStartedButton: Locator;
  readonly mainHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    // We use data-test-ids or accessible roles for robust selectors
    this.getStartedButton = page.locator('a[href*="servicedesk/customer/portal/3"]');
    this.mainHeading = page.locator('h1');
  }

  async goto() {
    await this.page.goto('https://wellnomics.com/');
  }

  async clickGetStarted() {
  // We use a high-level assertion to wait for the element to be ready
  await expect(this.getStartedButton).toBeVisible({ timeout: 15000 });
  await this.getStartedButton.click();
}
}