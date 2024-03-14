import { test, expect } from "@playwright/test";

test("Largest Contentful Paint (LCP) test", async ({ page, browserName }) => {
  // Not supported on Safari yet. Read more: https://developer.mozilla.org/en-US/docs/Web/API/LargestContentfulPaint#browser_compatibility
  test.skip(browserName === "webkit", "Not supported on Safari yet");

  await page.goto("https://axioned.com/");
  const lcp = await page.evaluate(async () => {
    return new Promise((resolve) => {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        resolve(entries[entries.length - 1]);
      }).observe({
        type: "largest-contentful-paint",
        buffered: true,
      });
    });
  });

  if (lcp) {
    const lcpEntry = lcp as PerformanceEntry;
    // Adjust threshold as needed
    expect(lcpEntry.startTime).toBeLessThan(2500);
  }
});

test("Cummulative Layour Shift (CLS) test", async ({ page, browserName }) => {
  // Not supported yet on non-Chromium browsers. Read more: https://developer.mozilla.org/en-US/docs/Web/API/LayoutShift#browser_compatibility
  test.skip(browserName !== "chromium", "Not supported on Firefox or Safari yet");
  await page.goto("https://axioned.com/");
  const cls = await page.evaluate(async () => {
    return new Promise((resolve) => {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        console.log(entries);
        resolve(entries[entries.length - 1]);
      }).observe({
        type: "layout-shift",
        buffered: true,
      });
    });
  });

  // console.log(cls);

  if (cls) {
    const clsEntry = cls as PerformanceEntry & { value: number };
    // Adjust threshold as needed
    expect(clsEntry.value).toBeLessThan(0.1);
  }
});
