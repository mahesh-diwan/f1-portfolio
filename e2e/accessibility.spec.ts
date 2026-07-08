import { test, expect } from "@playwright/test";

test.describe("Accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);
  });

  test("should have semantic headings in correct order", async ({ page }) => {
    const headings = await page.locator("h1, h2, h3").all();
    const tags = await Promise.all(headings.map((h) => h.evaluate((el) => el.tagName)));
    expect(tags[0]).toBe("H1");
  });

  test("should have alt text on all images", async ({ page }) => {
    const images = page.locator("img");
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute("alt");
      expect(alt).not.toBeNull();
    }
  });

  test("should have ARIA labels on interactive elements", async ({ page }) => {
    const buttons = page.locator("main button");
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      const ariaLabel = await buttons.nth(i).getAttribute("aria-label");
      const hasText = (await buttons.nth(i).textContent())?.trim().length;
      expect(ariaLabel || hasText).toBeTruthy();
    }
  });

  test("should have landmarks", async ({ page }) => {
    await expect(page.locator('[role="banner"]')).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator('[role="contentinfo"]')).toBeVisible();
  });

  test("should have accessible command palette", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(100);
    await page.keyboard.down("Control");
    await page.keyboard.press("k");
    await page.keyboard.up("Control");
    await page.waitForTimeout(200);
    const palette = page.locator('[aria-label="Command palette"]');
    await expect(palette).toBeVisible({ timeout: 5000 });
    await expect(palette).toHaveAttribute("aria-modal", "true");
  });
});
