import { test, expect } from "@playwright/test";

test.describe("Keyboard Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(300);
  });

  test("should have visible focus indicators", async ({ page }) => {
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus-visible");
    await expect(focused.first()).toBeVisible();
  });

  test("theme toggle works with keyboard", async ({ page }) => {
    await page.locator('button[aria-label*="Switch to"]').first().click();
    await page.waitForTimeout(300);
    const isLight = await page.locator("html").evaluate((el) => el.classList.contains("light"));
    expect(isLight).toBe(true);
  });
});
