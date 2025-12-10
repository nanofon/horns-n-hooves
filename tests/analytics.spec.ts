import { test, expect } from "@playwright/test";

const ANALYTICS_ARTICLES = [
  "crypto-perspectives",
  "investing-ahead-of-ai",
  "january-anomaly",
  "japanese-economy",
  "netflix-acquisition",
  "rolling-futures",
  "space-mining",
];

test.describe("Analytics Page", () => {
  test("should load analytics listing page", async ({ page }) => {
    const response = await page.goto("/analytics");
    expect(response?.status()).toBe(200);
  });

  test("should display all article cards", async ({ page }) => {
    await page.goto("/analytics");

    // Wait for content to load
    await page.waitForLoadState("networkidle");

    // Check that article cards are visible
    const articleCards = page.locator('a[href*="/analytics/"]');
    const count = await articleCards.count();

    // We should have 7 articles
    expect(count).toBe(7);
  });

  test("should load all article card images", async ({ page }) => {
    await page.goto("/analytics");
    await page.waitForLoadState("networkidle");

    // Get all images in article cards
    const images = page.locator(".card-image, img[alt]");
    const count = await images.count();

    // Check each image loads successfully
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const src = await img.getAttribute("src");

      if (src) {
        // Verify image has loaded (naturalWidth > 0)
        const naturalWidth = await img.evaluate(
          (el: HTMLImageElement) => el.naturalWidth
        );
        expect(naturalWidth, `Image ${src} should load`).toBeGreaterThan(0);
      }
    }
  });

  test("should have correct image paths with base URL", async ({ page }) => {
    await page.goto("/analytics");
    await page.waitForLoadState("networkidle");

    const images = page.locator('.card-image, img[src*="analytics"]');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const src = await img.getAttribute("src");

      if (src) {
        // Image path should not have double slashes
        expect(src).not.toContain("//images");
        // Should contain the analytics path
        expect(src).toContain("images/analytics");
      }
    }
  });

  test("article cards should be clickable", async ({ page }) => {
    await page.goto("/analytics");
    await page.waitForLoadState("networkidle");

    // Click the first article card
    const firstCard = page.locator('a[href*="/analytics/"]').first();
    await firstCard.click();

    // Should navigate to an article detail page
    await expect(page).toHaveURL(/.*analytics\/.+/);
  });
});

test.describe("Analytics Article Detail Pages", () => {
  for (const slug of ANALYTICS_ARTICLES) {
    test(`should load article: ${slug}`, async ({ page }) => {
      const response = await page.goto(`/analytics/${slug}`);
      expect(response?.status()).toBe(200);
    });

    test(`should display hero image for: ${slug}`, async ({ page }) => {
      await page.goto(`/analytics/${slug}`);
      await page.waitForLoadState("networkidle");

      // Check for hero image
      const heroImage = page.locator('.hero-image, img[class*="hero"]').first();

      if ((await heroImage.count()) > 0) {
        const src = await heroImage.getAttribute("src");
        expect(src).toBeTruthy();

        // Verify image loads
        const naturalWidth = await heroImage.evaluate(
          (el: HTMLImageElement) => el.naturalWidth
        );
        expect(naturalWidth).toBeGreaterThan(0);

        // Image path should not have double slashes
        expect(src).not.toContain("//images");
      }
    });

    test(`should have back to analytics link for: ${slug}`, async ({
      page,
    }) => {
      await page.goto(`/analytics/${slug}`);

      const backLink = page.getByRole("link", { name: /back to analytics/i });
      await expect(backLink).toBeVisible();

      // Test the back link works
      await backLink.click();
      await expect(page).toHaveURL(/.*\/analytics$/);
    });

    test(`should display article content for: ${slug}`, async ({ page }) => {
      await page.goto(`/analytics/${slug}`);

      // Should have a title
      const h1 = page.locator("h1").first();
      await expect(h1).toBeVisible();

      // Should have a publish date
      const date = page.locator('.date, p[class*="date"]').first();
      await expect(date).toBeVisible();

      // Should have content
      const content = page.locator('.content, [class*="content"]').first();
      await expect(content).toBeVisible();
    });
  }
});
