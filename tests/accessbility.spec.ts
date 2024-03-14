const { test, expect } = require("../fixtures/axe-test");

test("accessibility check", async ({ page, makeAxeBuilder }) => {
  await page.goto("https://www.w3.org/");

  const accessibilityScanResults = await makeAxeBuilder()
    // Automatically uses the shared AxeBuilder configuration,
    // but supports additional test-specific configuration too
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
