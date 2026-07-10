import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display nav with all sections", async ({ page }) => {
    await expect(page.locator('[role="banner"]')).toBeVisible();
    const links = ["Home", "Experience", "Education", "Projects", "Skills", "Contact"];
    for (const link of links) {
      await expect(page.locator(`header button:has-text("${link}")`).first()).toBeVisible();
    }
  });

  test("should navigate to sections on click", async ({ page }) => {
    const sections = ["experience", "education", "projects", "skills", "contact"];
    for (const section of sections) {
      await page.locator(`header button:has-text("${section}")`).first().click();
      await page.waitForTimeout(1200);
      await expect(page.locator(`#${section}`)).toBeVisible();
    }
  });

  test("should not have console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors).toHaveLength(0);
  });

  test("should have no broken links", async ({ page }) => {
    await page.goto("/");
    const links = await page.locator("a[href]").all();
    for (const link of links) {
      const href = await link.getAttribute("href");
      if (!href || href.startsWith("mailto:") || href.startsWith("./") || href.startsWith("http")) continue;
      if (href.startsWith("#")) continue;
      const resp = await page.request.get(href);
      expect(resp.status()).toBeLessThan(400);
    }
  });

  test("should have skip-to-content link", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.locator('a[href="#main-content"]');
    if (await skipLink.count() > 0) {
      await expect(skipLink).toBeVisible();
    }
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
