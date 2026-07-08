import { test, expect } from "@playwright/test";

const viewports = [
  { width: 320, height: 700 },
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
];

test.describe("Responsive Design", () => {
  for (const viewport of viewports) {
    test(`should render at ${viewport.width}x${viewport.height}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForLoadState("load");

      await expect(page.locator("#hero")).toBeVisible();
    });
  }

  test("should show mobile menu toggle on small screens", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    const toggle = page.locator('button[aria-label*="Open navigation"]');
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(page.locator('nav[aria-label="Mobile navigation"]')).toBeVisible();
  });
});
