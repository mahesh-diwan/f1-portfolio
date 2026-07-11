import { test, expect } from "@playwright/test";

test.describe("Pit Stop Countdown", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("pit-stop section renders with race info", async ({ page }) => {
    await page.locator('header button:has-text("Grid")').first().click();
    await page.waitForTimeout(1200);
    const section = page.locator("#pit-stop");
    await expect(section).toBeVisible();
    const text = await section.innerText();
    expect(text).toMatch(/NEXT RACE|RACE WEEKEND|SEASON COMPLETE/);
  });

  test("pit-stop displays countdown timer for upcoming race", async ({ page }) => {
    await page.locator('header button:has-text("Grid")').first().click();
    await page.waitForTimeout(1200);
    const section = page.locator("#pit-stop");
    const hasCountdown = await section.locator("text=DAYS").isVisible()
      .catch(() => false);
    const hasSeasonComplete = (await section.innerText()).includes("SEASON COMPLETE");
    if (!hasSeasonComplete) {
      await expect(section.locator("text=DAYS").or(section.locator("text=GRAND PRIX DAY"))).toBeVisible();
    }
  });
});
