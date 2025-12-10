import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load successfully", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
  });

  test("should have correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/RS Asset Management/i);
  });

  test("should display main navigation", async ({ page }) => {
    await page.goto("/");

    // Check for navigation links
    const nav = page.locator("nav");
    await expect(nav).toBeVisible();

    // Check for key navigation items
    await expect(page.getByRole("link", { name: /home/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /about/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /analytics/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /portfolios/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /philosophy/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /contact/i })).toBeVisible();
  });

  test("should load background images", async ({ page }) => {
    await page.goto("/");

    // Wait for page to be fully loaded
    await page.waitForLoadState("networkidle");

    // Check that no broken images exist
    const images = await page.locator("img").all();
    for (const img of images) {
      const src = await img.getAttribute("src");
      if (src) {
        const naturalWidth = await img.evaluate(
          (el: HTMLImageElement) => el.naturalWidth
        );
        expect(naturalWidth).toBeGreaterThan(0);
      }
    }
  });

  test("should have working navigation links", async ({ page }) => {
    await page.goto("/");

    // Wait for page to load
    await page.waitForLoadState("networkidle");

    // Test About link - use evaluate to bypass viewport issues on mobile
    const aboutLink = page.getByRole("link", { name: /about/i });
    await aboutLink.evaluate((el: HTMLElement) => el.click());
    await expect(page).toHaveURL(/.*about/);

    // Navigate back
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Test Analytics link
    const analyticsLink = page.getByRole("link", { name: /analytics/i });
    await analyticsLink.evaluate((el: HTMLElement) => el.click());
    await expect(page).toHaveURL(/.*analytics/);
  });
});
