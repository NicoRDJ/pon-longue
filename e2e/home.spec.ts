import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("renders the hero with brand and tagline", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "el lujo no tiene hora",
    );
    await expect(
      page.getByRole("link", { name: "Reservar mesa" }),
    ).toBeVisible();
  });

  test("decorative clock renders as an accessible image", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("img", { name: /reloj decorativo/i }),
    ).toBeVisible();
  });

  test("concept section is reachable via anchor link", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Conocer el concepto" }).click();
    await expect(page.locator("#concepto")).toBeInViewport();
  });

  test("has no console errors on load", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });
});
