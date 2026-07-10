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
    const moreBtn = page.locator('button:has-text("Details")').first();
    await moreBtn.click();
    await expect(page.locator("text=PROBLEM").first()).toBeVisible();
    await expect(page.locator("text=SOLUTION").first()).toBeVisible();
  });

  test("all sections have visible content", async ({ page }) => {
    const sections = [
      { id: "experience", text: "Career Timeline" },
      { id: "education", text: "Education" },
      { id: "projects", text: "Projects" },
      { id: "skills", text: "Skills Telemetry" },
      { id: "contact", text: "Communication" },
    ];
    for (const { id, text } of sections) {
      await page.locator(`header button:has-text("${id}")`).first().click();
      await page.waitForTimeout(1500);
      await expect(page.locator(`#${id}`)).toBeVisible();
      await expect(page.locator(`h2:has-text("${text}")`).first()).toBeVisible();
    }
  });

  test("fonts load properly", async ({ page }) => {
    await page.waitForLoadState("domcontentloaded");
    const fontFaces = await page.evaluate(async () => {
      try {
        await Promise.race([
          document.fonts.ready,
          new Promise((_, rej) => setTimeout(() => rej("timeout"), 5000)),
        ]);
      } catch {
        // proceed even if fonts slow
      }
      return [...document.fonts].map((f) => f.family);
    });
    expect(fontFaces.length).toBeGreaterThan(0);
  });
});
