import { test, expect } from "@playwright/test";
import { portfolioConfig } from "../portfolioConfig";

test.describe("Content", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display driver name", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText(portfolioConfig.name);
  });

  test("should display driver role", async ({ page }) => {
    await expect(page.getByText(portfolioConfig.role, { exact: true }).first()).toBeVisible();
  });

  test("should display all projects", async ({ page }) => {
    await page.locator('header button:has-text("Projects")').click();
    await page.waitForTimeout(1200);
    for (const project of portfolioConfig.projects) {
      await expect(page.locator(`text=${project.name}`).first()).toBeVisible();
    }
  });

  test("should display all experience entries", async ({ page }) => {
    await page.locator('header button:has-text("Experience")').click();
    await page.waitForTimeout(1200);
    for (const exp of portfolioConfig.experience) {
      await expect(page.locator(`text=${exp.company}`).first()).toBeVisible();
    }
  });

  test("should display all education entries", async ({ page }) => {
    await page.locator('header button:has-text("Education")').click();
    await page.waitForTimeout(1200);
    for (const edu of portfolioConfig.education) {
      await expect(page.locator(`text=${edu.institution}`).first()).toBeVisible();
    }
  });

  test("should display skill groups", async ({ page }) => {
    await page.locator('header button:has-text("Skills")').click();
    await page.waitForTimeout(1200);
    for (const group of portfolioConfig.skills) {
      await expect(page.locator(`text=${group.group}`).first()).toBeVisible();
    }
  });

  test("should expand project details on click", async ({ page }) => {
    if (portfolioConfig.projects.length === 0) return;
    await page.locator('header button:has-text("Projects")').click();
    await page.waitForTimeout(1200);
    const moreBtn = page.locator('button:has-text("DATA")').first();
    await moreBtn.click();
    await expect(page.locator("text=PROBLEM").first()).toBeVisible();
    await expect(page.locator("text=SOLUTION").first()).toBeVisible();
  });
});
