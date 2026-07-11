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

test.describe("Pit Stop Details", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator('header button:has-text("Grid")').first().click();
    await page.waitForTimeout(1200);
  });

  test("shows season progress bar with Round text", async ({ page }) => {
    const section = page.locator("#pit-stop");
    await expect(section).toBeVisible();
    await expect(section.locator("text=Round")).toBeVisible();
    await expect(section.locator("text=of")).toBeVisible();
  });

  test("shows DRIVER STANDINGS heading", async ({ page }) => {
    await expect(page.locator("#pit-stop")).toContainText("DRIVER STANDINGS");
  });

  test("shows CONSTRUCTORS heading", async ({ page }) => {
    await expect(page.locator("#pit-stop")).toContainText("CONSTRUCTORS");
  });

  test("shows LAST RACE text", async ({ page }) => {
    const section = page.locator("#pit-stop");
    await expect(section.locator("text=LAST RACE")).toBeVisible();
  });

  test("shows NEXT RACE or RACE WEEKEND text", async ({ page }) => {
    const section = page.locator("#pit-stop");
    await expect(section.locator("text=NEXT RACE").or(section.locator("text=RACE WEEKEND")).or(section.locator("text=SEASON COMPLETE"))).toBeVisible();
  });

  test("shows at least one driver name in standings", async ({ page }) => {
    const section = page.locator("#pit-stop");
    await expect(section.locator("text=Antonelli").or(section.locator("text=Russell")).or(section.locator("text=Hamilton")).first()).toBeVisible();
  });
});
