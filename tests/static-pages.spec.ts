import { test, expect } from "@playwright/test";

test.describe("Static Pages", () => {
  const pages = [
    { path: "/about", name: "About" },
    { path: "/philosophy", name: "Philosophy" },
    { path: "/contact", name: "Contact" },
  ];

  for (const { path, name } of pages) {
    test(`should load ${name} page`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
    });

    test(`${name} page should have content`, async ({ page }) => {
      await page.goto(path);

      // Should have a heading
      const heading = page.locator("h1, h2").first();
      await expect(heading).toBeVisible();

      // Should have some text content
      const body = page.locator("body");
      const text = await body.textContent();
      expect(text?.length).toBeGreaterThan(50);
    });

    test(`${name} page should load all images`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");

      const images = await page.locator("img").all();

      for (const img of images) {
        const src = await img.getAttribute("src");
        if (src && !src.startsWith("data:")) {
          const naturalWidth = await img.evaluate(
            (el: HTMLImageElement) => el.naturalWidth
          );
          expect(
            naturalWidth,
            `Image ${src} should load on ${name} page`
          ).toBeGreaterThan(0);
        }
      }
    });
  }
});

test.describe("Contact Page Specific", () => {
  test("should have contact form or contact information", async ({ page }) => {
    await page.goto("/contact");

    // Look for either a form or contact details
    const form = page.locator("form");
    const email = page.locator('a[href^="mailto:"]');
    const phone = page.locator('a[href^="tel:"]');

    const hasForm = (await form.count()) > 0;
    const hasEmail = (await email.count()) > 0;
    const hasPhone = (await phone.count()) > 0;

    // Should have at least one way to contact
    expect(hasForm || hasEmail || hasPhone).toBe(true);
  });
});
