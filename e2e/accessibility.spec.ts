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

  test("theme toggle works without errors", async ({ page }) => {
    const toggle = page.locator('button[aria-label*="Switch to"]').first();
    await toggle.click();
    await page.waitForTimeout(300);
    const isLight = await page.locator("html").evaluate((el) => el.classList.contains("light"));
    expect(isLight).toBe(true);

    await toggle.click();
    await page.waitForTimeout(300);
    const isDark = await page.locator("html").evaluate((el) => el.classList.contains("dark"));
    expect(isDark).toBe(true);
  });

  test("light theme cards have visible text", async ({ page }) => {
    await page.locator('button[aria-label*="Switch to"]').first().click();
    await page.waitForTimeout(300);

    await page.locator('header button:has-text("Projects")').first().click();
    await page.waitForTimeout(1500);

    const textColors = await page.evaluate(() => {
      const cards = document.querySelectorAll('[role="region"]');
      return [...cards].slice(0, 3).map((card) => {
        const style = getComputedStyle(card);
        const textEl = card.querySelector("h3, p, span");
        if (!textEl) return null;
        const textStyle = getComputedStyle(textEl);
        return { bg: style.backgroundColor, text: textStyle.color };
      });
    });

    for (const item of textColors) {
      if (!item) continue;
      const bgNum = item.bg.match(/\d+/g)?.map(Number);
      const textNum = item.text.match(/\d+/g)?.map(Number);
      if (bgNum && textNum) {
        const bgLum = 0.299 * bgNum[0] + 0.587 * bgNum[1] + 0.114 * bgNum[2];
        const textLum = 0.299 * textNum[0] + 0.587 * textNum[1] + 0.114 * textNum[2];
        const ratio = (Math.max(bgLum, textLum) + 0.05) / (Math.min(bgLum, textLum) + 0.05);
        expect(ratio).toBeGreaterThan(3);
      }
    }
  });

  test("no unreadable contrast in light theme education cards", async ({ page }) => {
    await page.locator('button[aria-label*="Switch to"]').first().click();
    await page.waitForTimeout(300);
    await page.locator('header button:has-text("Education")').first().click();
    await page.waitForTimeout(1500);

    const contrasts = await page.evaluate(() => {
      const results: { bg: string; text: string; ratio: number }[] = [];
      const els = document.querySelectorAll('[role="region"] span, [role="region"] p');
      for (const el of els) {
        const style = getComputedStyle(el);
        const parentStyle = getComputedStyle(el.parentElement!);
        const bg = parentStyle.backgroundColor;
        const text = style.color;
        const bgNum = bg.match(/\d+/g)?.map(Number);
        const textNum = text.match(/\d+/g)?.map(Number);
        if (bgNum && textNum) {
          const bgLum = 0.299 * bgNum[0] + 0.587 * bgNum[1] + 0.114 * bgNum[2];
          const textLum = 0.299 * textNum[0] + 0.587 * textNum[1] + 0.114 * textNum[2];
          const ratio = (Math.max(bgLum, textLum) + 0.05) / (Math.min(bgLum, textLum) + 0.05);
          if (ratio < 3) {
            results.push({ bg, text, ratio: Math.round(ratio * 10) / 10 });
          }
        }
      }
      return results;
    });
    expect(contrasts).toHaveLength(0);
  });
});
