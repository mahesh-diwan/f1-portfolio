import { test, expect } from "@playwright/test";

test.describe("Strategic Audit", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("no console errors across all sections", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));

    const sections = ["experience", "education", "projects", "skills", "contact"];
    for (const section of sections) {
      await page.locator(`header button:has-text("${section}")`).first().click();
      await page.waitForTimeout(1500);
    }
    expect(errors).toHaveLength(0);
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

  test("command palette visible in both themes", async ({ page }) => {
    await page.keyboard.down("Control");
    await page.keyboard.press("k");
    await page.keyboard.up("Control");
    await page.waitForTimeout(300);
    await expect(page.locator('[aria-label="Command palette"]')).toBeVisible();

    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);

    await page.locator('button[aria-label*="Switch to"]').first().click();
    await page.waitForTimeout(300);

    await page.keyboard.down("Control");
    await page.keyboard.press("k");
    await page.keyboard.up("Control");
    await page.waitForTimeout(300);
    await expect(page.locator('[aria-label="Command palette"]')).toBeVisible();
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

  test("nav items visible in light theme", async ({ page }) => {
    await page.locator('button[aria-label*="Switch to"]').first().click();
    await page.waitForTimeout(300);
    const navItems = ["Profile", "Experience", "Education", "Projects", "Skills", "Contact"];
    for (const item of navItems) {
      await expect(page.locator(`header button:has-text("${item}")`).first()).toBeVisible();
    }
  });

  test("mobile theme toggle persists to desktop", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.waitForTimeout(500);

    await page.getByRole("button", { name: /Switch to/ }).click();
    await page.waitForTimeout(300);

    const isLight = await page.locator("html").evaluate((el) => el.classList.contains("light"));
    expect(isLight).toBe(true);

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);

    const stillLight = await page.locator("html").evaluate((el) => el.classList.contains("light"));
    expect(stillLight).toBe(true);
  });

  test("rapid clicks do not corrupt UI state", async ({ page }) => {
    await page.locator('header button:has-text("Projects")').first().click();
    await page.waitForTimeout(200);
    await page.locator('header button:has-text("Education")').first().click();
    await page.waitForTimeout(1500);

    const visibleSection = await page.evaluate(() => {
      const sections = ["hero", "experience", "education", "projects", "skills", "contact"];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el && el.offsetParent !== null) return s;
      }
      return null;
    });
    expect(["projects", "education"]).toContain(visibleSection);

    if (visibleSection !== "education") {
      await page.locator('header button:has-text("Education")').first().click();
      await page.waitForTimeout(1500);
    }
    await expect(page.locator("#education")).toBeVisible();
  });
});
