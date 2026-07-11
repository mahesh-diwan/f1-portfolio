import { test, expect } from "@playwright/test";

test.describe("Podium", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("podium section renders with top projects", async ({ page }) => {
    await page.locator('header button:has-text("Podium")').first().click();
    await page.waitForTimeout(1200);
    const section = page.locator("#podium");
    await expect(section).toBeVisible();
    await expect(section.locator("text=PODIUM")).toBeVisible();
  });

  test("podium shows P1, P2, P3 badges", async ({ page }) => {
    await page.locator('header button:has-text("Podium")').first().click();
    await page.waitForTimeout(1200);
    const section = page.locator("#podium");
    await expect(section.locator("text=P1")).toBeVisible();
    await expect(section.locator("text=P2")).toBeVisible();
    await expect(section.locator("text=P3")).toBeVisible();
  });

  test("podium has rank labels", async ({ page }) => {
    await page.locator('header button:has-text("Podium")').first().click();
    await page.waitForTimeout(1200);
    const section = page.locator("#podium");
    await expect(section.locator("text=CHAMPION")).toBeVisible();
    await expect(section.locator("text=RUNNER-UP")).toBeVisible();
    await expect(section.locator("text=THIRD")).toBeVisible();
  });
});
