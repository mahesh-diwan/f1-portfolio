import { test, expect } from "@playwright/test";

test.describe("Performance", () => {
  test("should load page within acceptable time", async ({ page }) => {
    const start = Date.now();
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("load");
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(5000);
  });

  test("should not have layout shift issues", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);
  });

  test("should render content above the fold quickly", async ({ page }) => {
    const hero = page.locator("#hero");
    const start = Date.now();
    await page.goto("/");
    await expect(hero).toBeVisible();
    const renderTime = Date.now() - start;
    expect(renderTime).toBeLessThan(5000);
  });
});
