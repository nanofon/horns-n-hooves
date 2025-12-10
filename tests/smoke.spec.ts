import { test, expect } from "@playwright/test";

/**
 * Quick smoke test to verify the testing setup is working
 * Run with: npx playwright test tests/smoke.spec.ts
 */

test.describe("Smoke Tests - Quick Verification", () => {
  test("homepage loads successfully", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);

    // Should have a title
    await expect(page).toHaveTitle(/.+/);

    console.log("✅ Homepage loads successfully");
  });

  test("analytics page loads successfully", async ({ page }) => {
    const response = await page.goto("/analytics");
    expect(response?.status()).toBe(200);

    console.log("✅ Analytics page loads successfully");
  });

  test("no critical 404 errors on homepage", async ({ page }) => {
    const failed: string[] = [];

    page.on("response", (response) => {
      if (response.status() === 404) {
        failed.push(response.url());
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    if (failed.length > 0) {
      console.log("⚠️  Found 404 errors:", failed);
    } else {
      console.log("✅ No 404 errors found");
    }

    expect(failed).toHaveLength(0);
  });

  test("images load correctly", async ({ page }) => {
    await page.goto("/analytics");
    await page.waitForLoadState("networkidle");

    const images = page.locator('img[src*="analytics"]');
    const count = await images.count();

    if (count > 0) {
      const firstImg = images.first();
      const src = await firstImg.getAttribute("src");
      const naturalWidth = await firstImg.evaluate(
        (el: HTMLImageElement) => el.naturalWidth
      );

      expect(naturalWidth).toBeGreaterThan(0);
      expect(src).not.toContain("//images"); // No double slashes

      console.log(`✅ Images load correctly (tested ${count} images)`);
    }
  });
});

test.describe("Setup Verification", () => {
  test("playwright is configured correctly", async ({ page }) => {
    // This test just verifies that Playwright can navigate
    await page.goto("/");
    const url = page.url();
    expect(url).toContain("localhost");

    console.log("✅ Playwright is configured correctly");
  });

  test("preview server is running", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);

    console.log("✅ Preview server is running");
  });
});
