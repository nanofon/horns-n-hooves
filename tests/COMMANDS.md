# Quick Test Commands Reference

## Basic Commands

```bash
# Run all tests
npm run test

# Run tests with UI (interactive)
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed

# View last test report
npm run test:report
```

## Specific Test Files

```bash
# Run only smoke tests (quick verification)
npx playwright test tests/smoke.spec.ts

# Run only analytics tests
npx playwright test tests/analytics.spec.ts

# Run only homepage tests
npx playwright test tests/homepage.spec.ts

# Run only regression tests
npx playwright test tests/regression.spec.ts
```

## Browser-Specific

```bash
# Test only in Chrome
npx playwright test --project=chromium

# Test only in Firefox
npx playwright test --project=firefox

# Test only in Safari
npx playwright test --project=webkit

# Test on mobile Chrome
npx playwright test --project="Mobile Chrome"

# Test on mobile Safari
npx playwright test --project="Mobile Safari"
```

## Debugging

```bash
# Debug mode (step through tests)
npx playwright test --debug

# Debug specific test file
npx playwright test tests/analytics.spec.ts --debug

# Run with verbose output
npx playwright test --reporter=list

# Run and keep browser open on failure
npx playwright test --headed --debug
```

## Filtering Tests

```bash
# Run tests matching a pattern
npx playwright test -g "should load"

# Run tests in a specific file matching pattern
npx playwright test tests/analytics.spec.ts -g "image"
```

## CI/CD Simulation

```bash
# Run tests like CI does
CI=true npm run test

# Run with retries (like CI)
npx playwright test --retries=2
```

## Before Deployment Checklist

```bash
# 1. Build the site
npm run build

# 2. Run smoke tests (quick)
npx playwright test tests/smoke.spec.ts

# 3. Run all tests
npm run test

# 4. View report if any failed
npm run test:report

# 5. If all pass, deploy!
npm run deploy:gh
```

## Useful Flags

```bash
# Run only failed tests from last run
npx playwright test --last-failed

# Update snapshots (if using visual regression)
npx playwright test --update-snapshots

# Run tests in parallel (faster)
npx playwright test --workers=4

# Run tests sequentially (debugging)
npx playwright test --workers=1

# Set timeout (in ms)
npx playwright test --timeout=60000
```

## Quick Health Check

```bash
# Fastest way to verify everything works
npx playwright test tests/smoke.spec.ts --project=chromium
```

## Generate Test Code

```bash
# Record a new test interactively
npx playwright codegen http://localhost:4321
```

## Installation

```bash
# Install Playwright
npm install -D @playwright/test

# Install browsers
npx playwright install

# Install only Chromium (faster)
npx playwright install chromium
```

---

💡 **Pro Tip**: Use `npm run test:ui` for the best development experience!
