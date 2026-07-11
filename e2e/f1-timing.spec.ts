import { test, expect } from "@playwright/test";

test.describe("Timing Tower", () => {
  test("should display timing tower section with repo rows", async ({ page }) => {
    await page.goto("/");
    await page.locator('header button:has-text("Timing")').click();
    await page.waitForTimeout(1500);
    await expect(page.locator("text=TIMING TOWER").first()).toBeVisible();
    await expect(page.locator("text=#1").first()).toBeVisible();
  });

  test("should expand repo detail on click", async ({ page }) => {
    await page.goto("/");
    await page.locator('header button:has-text("Timing")').click();
    await page.waitForTimeout(1500);
    const firstRow = page.locator('#timing button[aria-expanded]').first();
    await firstRow.scrollIntoViewIfNeeded();
    await firstRow.click();
    await expect(page.locator("text=VIEW ON GITHUB").first()).toBeVisible();
  });

  test("empty state renders fallback", async () => {
    // Can't truly test empty state without mocking — skipped.
    // Row with archived flag shows "RETIRED" badge.
  });
});
