# Regression Tests

This directory contains comprehensive end-to-end tests for the Horns & Hooves website using Playwright.

## Test Coverage

### 1. Homepage Tests (`homepage.spec.ts`)

- ✅ Page loads successfully (200 status)
- ✅ Correct page title
- ✅ Navigation menu displays correctly
- ✅ All images load without errors
- ✅ Navigation links work correctly

### 2. Analytics Tests (`analytics.spec.ts`)

- ✅ Analytics listing page loads
- ✅ All 7 article cards display
- ✅ Article card images load correctly
- ✅ Image paths use correct BASE_URL (no double slashes)
- ✅ Article cards are clickable
- ✅ Each article detail page loads
- ✅ Hero images display on article pages
- ✅ "Back to Analytics" link works
- ✅ Article content displays (title, date, content)

### 3. Portfolios Tests (`portfolios.spec.ts`)

- ✅ Portfolios listing page loads
- ✅ Portfolio cards display
- ✅ Navigation to portfolio detail pages
- ✅ Portfolio simulator component loads
- ✅ Form inputs display
- ✅ API calls are handled
- ✅ Charts/visualizations render

### 4. Static Pages Tests (`static-pages.spec.ts`)

- ✅ About page loads and displays content
- ✅ Philosophy page loads and displays content
- ✅ Contact page loads and displays content
- ✅ All images load on static pages
- ✅ Contact page has contact information or form

### 5. Regression Tests (`regression.spec.ts`)

- ✅ No 404 errors on any page
- ✅ No console errors
- ✅ API errors handled gracefully
- ✅ Pages load within reasonable time (<10s)
- ✅ Mobile responsive design (no horizontal scroll)
- ✅ Content visible on mobile viewports

## Running Tests

### Prerequisites

```bash
npm install
```

### Run all tests

```bash
npm run test
```

### Run tests with UI (interactive mode)

```bash
npm run test:ui
```

### Run tests in headed mode (see browser)

```bash
npm run test:headed
```

### View test report

```bash
npm run test:report
```

### Run specific test file

```bash
npx playwright test tests/analytics.spec.ts
```

### Run tests in specific browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Debug tests

```bash
npx playwright test --debug
```

## CI/CD Integration

Tests run automatically on:

- Every push to `main` branch
- Every pull request
- Manual workflow dispatch

The deployment workflow (`deploy.yml`) includes a test job that must pass before deployment.

## Test Configuration

Tests are configured in `playwright.config.ts`:

- **Base URL**: `http://localhost:4321`
- **Browsers**: Chromium, Firefox, WebKit
- **Mobile**: Pixel 5, iPhone 12
- **Web Server**: Automatically starts preview server before tests

## Writing New Tests

1. Create a new file in the `tests/` directory with `.spec.ts` extension
2. Import test utilities:
   ```typescript
   import { test, expect } from "@playwright/test";
   ```
3. Write test suites using `test.describe()` and individual tests using `test()`
4. Use Playwright's assertions and locators

Example:

```typescript
test.describe("My Feature", () => {
  test("should do something", async ({ page }) => {
    await page.goto("/my-page");
    await expect(page.locator("h1")).toBeVisible();
  });
});
```

## Best Practices

1. **Wait for network idle**: Use `await page.waitForLoadState('networkidle')` for dynamic content
2. **Check image loading**: Verify `naturalWidth > 0` for images
3. **Handle dynamic content**: Add appropriate waits for API calls and animations
4. **Test mobile responsiveness**: Check for horizontal scroll and viewport issues
5. **Monitor console errors**: Listen for console messages and filter critical errors
6. **Check for 404s**: Monitor network responses for missing resources

## Troubleshooting

### Tests fail locally but pass in CI

- Ensure you've built the site: `npm run build`
- Check that preview server is running: `npm run preview`

### Image loading tests fail

- Verify images exist in `public/` directory
- Check BASE_URL configuration in `astro.config.mjs`
- Ensure image paths don't have double slashes

### Timeout errors

- Increase timeout in test: `test.setTimeout(60000)`
- Check if API endpoints are responding
- Verify network connectivity

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright Test Assertions](https://playwright.dev/docs/test-assertions)
