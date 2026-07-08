import { test, expect } from "@playwright/test";

const PALETTE = '[aria-label="Command palette"]';

async function openPalette(page: import("@playwright/test").Page) {
  await page.keyboard.press("Escape");
  await page.waitForTimeout(50);
  await page.keyboard.down("Control");
  await page.keyboard.press("k");
  await page.keyboard.up("Control");
  await page.waitForTimeout(200);
}

test.describe("Keyboard Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(300);
  });

  test("should open command palette with Ctrl+K", async ({ page }) => {
    await page.locator("body").click();
    await page.waitForTimeout(100);
    await openPalette(page);
    await expect(page.locator(PALETTE)).toBeVisible({ timeout: 3000 });
    await page.keyboard.press("Escape");
    await expect(page.locator(PALETTE)).not.toBeVisible();
  });

  test("should open command palette with Meta+K on Mac", async ({ page }) => {
    test.skip(process.platform !== "darwin", "Meta key is macOS only");
    await page.keyboard.press("Meta+k");
    await expect(page.locator(PALETTE)).toBeVisible();
    await page.keyboard.press("Escape");
  });

  test("should navigate commands with arrow keys", async ({ page }) => {
    await openPalette(page);
    await expect(page.locator(PALETTE)).toBeVisible({ timeout: 5000 });
    await page.waitForTimeout(200);

    const items = page.locator(`${PALETTE} [role="option"]`);
    await expect(items.first()).toBeVisible({ timeout: 3000 });
    const count = await items.count();
    expect(count).toBeGreaterThan(0);

    await page.keyboard.press("ArrowDown");
    await expect(items.nth(1)).toHaveAttribute("aria-selected", "true");
  });

  test("should have visible focus indicators", async ({ page }) => {
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus-visible");
    await expect(focused.first()).toBeVisible();
  });
});
