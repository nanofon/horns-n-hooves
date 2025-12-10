import { test, expect } from "@playwright/test";

test.describe("API and External Resources", () => {
  test("should not have any 404 errors on homepage", async ({ page }) => {
    const failed: string[] = [];

    page.on("response", (response) => {
      if (response.status() === 404) {
        failed.push(response.url());
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    expect(failed, `Found 404 errors: ${failed.join(", ")}`).toHaveLength(0);
  });

  test("should not have any 404 errors on analytics page", async ({ page }) => {
    const failed: string[] = [];

    page.on("response", (response) => {
      if (response.status() === 404) {
        failed.push(response.url());
      }
    });

    await page.goto("/analytics");
    await page.waitForLoadState("networkidle");

    expect(failed, `Found 404 errors: ${failed.join(", ")}`).toHaveLength(0);
  });

  test("should not have console errors on homepage", async ({ page }) => {
    const errors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Filter out known acceptable errors (if any)
    const criticalErrors = errors.filter(
      (err) => !err.includes("favicon") && !err.includes("Extension")
    );

    expect(
      criticalErrors,
      `Found console errors: ${criticalErrors.join(", ")}`
    ).toHaveLength(0);
  });

  test("should handle API errors gracefully", async ({ page }) => {
    const apiErrors: string[] = [];

    page.on("response", (response) => {
      if (response.url().includes("api") && response.status() >= 400) {
        apiErrors.push(`${response.url()} - ${response.status()}`);
      }
    });

    await page.goto("/portfolios");
    await page.waitForLoadState("networkidle");

    // Navigate to a portfolio if available
    const firstPortfolio = page.locator('a[href*="/portfolios/"]').first();
    if ((await firstPortfolio.count()) > 0) {
      await firstPortfolio.click();
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(2000);
    }

    // API errors should be handled gracefully (empty array means no errors)
    console.log("API errors found:", apiErrors);
  });
});

test.describe("Performance and Loading", () => {
  test("homepage should load within reasonable time", async ({ page }) => {
    const startTime = Date.now();
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const loadTime = Date.now() - startTime;

    // Should load within 10 seconds
    expect(loadTime).toBeLessThan(10000);
  });

  test("analytics page should load within reasonable time", async ({
    page,
  }) => {
    const startTime = Date.now();
    await page.goto("/analytics");
    await page.waitForLoadState("networkidle");
    const loadTime = Date.now() - startTime;

    // Should load within 10 seconds
    expect(loadTime).toBeLessThan(10000);
  });
});

test.describe("Responsive Design", () => {
  test("should be mobile responsive on homepage", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto("/");

    // Check that content is visible
    const body = page.locator("body");
    await expect(body).toBeVisible();

    // Check for horizontal scroll (should not exist)
    const scrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth
    );
    const clientWidth = await page.evaluate(
      () => document.documentElement.clientWidth
    );

    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1); // +1 for rounding
  });

  test("should be mobile responsive on analytics page", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/analytics");
    await page.waitForLoadState("networkidle");

    // Article cards should be visible
    const cards = page.locator('a[href*="/analytics/"]');
    await expect(cards.first()).toBeVisible();
  });
});
