import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://axioned.com/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Axioned/);
});

test("about link", async ({ page }) => {
  await page.goto("https://axioned.com/");

  // Click the get started link.
  await page.getByRole("link", { name: ".about" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole("heading", { name: "About Axioned" })).toBeVisible();
});
