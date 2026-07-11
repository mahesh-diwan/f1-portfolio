import { test, expect } from "@playwright/test";

test.describe("Pit Stop Grid", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("grid section renders with next race info", async ({ page }) => {
    await page.locator('header button:has-text("Grid")').first().click();
    await page.waitForTimeout(1200);
    const section = page.locator("#pit-stop");
    await expect(section).toBeVisible();
    const text = await section.innerText();
    expect(text).toMatch(/NEXT RACE|RACE WEEKEND|SEASON COMPLETE/);
  });

  test("grid shows countdown for upcoming race", async ({ page }) => {
    await page.locator('header button:has-text("Grid")').first().click();
    await page.waitForTimeout(1200);
    const section = page.locator("#pit-stop");
    const text = await section.innerText();
    if (!text.includes("SEASON COMPLETE")) {
      await expect(section.locator("text=DAYS").or(section.locator("text=GRAND PRIX DAY"))).toBeVisible();
    }
  });

  test("grid shows last race result", async ({ page }) => {
    await page.locator('header button:has-text("Grid")').first().click();
    await page.waitForTimeout(1200);
    const section = page.locator("#pit-stop");
    await expect(section.locator("text=LAST RACE")).toBeVisible();
    await expect(section.locator("text=🏆")).toBeVisible();
  });
});
