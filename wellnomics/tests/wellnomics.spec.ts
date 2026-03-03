import { test, expect } from '@playwright/test';
import { LandingPage } from '../page-objects/LandingPage';

test.describe('Wellnomics Landing Page Checks', () => {
  
  test('should load the homepage and display the main title', async ({ page }) => {
    const landingPage = new LandingPage(page);
    
    await landingPage.goto();
    
    // Assertion: Verify the main heading is visible
    await expect(landingPage.mainHeading).toBeVisible();
    
    // Ignore case to handle CSS text-transformations (e.g., uppercase)
    await expect(landingPage.mainHeading).toContainText('wellbeing', { ignoreCase: true });
  });

  test('should navigate to the external Service Desk portal via Contact link', async ({ page }) => {
    const landingPage = new LandingPage(page);
    
    await landingPage.goto();

    // FIXED: Changed 'networkidle' to 'domcontentloaded' to avoid infinite loading timeouts.
    // This is more reliable for external portals like Jira Service Desk.
    await Promise.all([
        page.waitForLoadState('domcontentloaded'),
        landingPage.clickGetStarted()
    ]);

    // Regular Expression validation for the URL
    await expect(page).toHaveURL(/.*servicedesk.*/);

    // Using .first() and explicit wait to handle dynamic loading on the portal
    const helpCentreContent = page.getByText(/Help Centre|Contact Us|Log in/i).first();
    
    // Increase timeout for this specific check due to cross-domain latency
    await helpCentreContent.waitFor({ state: 'visible', timeout: 15000 });
    await expect(helpCentreContent).toBeVisible();
  });

  test('should display pricing link in the footer', async ({ page }) => {
      await page.goto('https://wellnomics.com/');

      // Scoping: Targeting the footer (contentinfo) to resolve strict mode violations
      const footer = page.getByRole('contentinfo');
      const pricingLink = footer.getByRole('link', { name: /pricing/i });
      
      await expect(pricingLink).toBeVisible();
  });
});