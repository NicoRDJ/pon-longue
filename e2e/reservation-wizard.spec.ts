import { test, expect } from "@playwright/test";

test.describe("Reservation wizard", () => {
  test("blocks advancing past step 2 without date and time", async ({
    page,
  }) => {
    await page.goto("/#reservas");
    await page.locator("#reservas").scrollIntoViewIfNeeded();

    await page.getByRole("button", { name: "Siguiente" }).click();
    await expect(page.getByText("¿Qué día y a qué hora?")).toBeVisible();

    await page.getByRole("button", { name: "Siguiente" }).click();
    await expect(page.getByText("¿Qué día y a qué hora?")).toBeVisible();
  });

  test("full happy path reaches the confirmation step with a live summary", async ({
    page,
  }) => {
    await page.goto("/#reservas");
    await page.locator("#reservas").scrollIntoViewIfNeeded();

    await page.getByRole("radio", { name: "Cumpleaños" }).click();
    await page
      .getByRole("button", { name: "Aumentar número de personas" })
      .click();
    await page.getByRole("button", { name: "Siguiente" }).click();

    await page.locator("#rDate").fill("2026-09-01");
    await page.locator('[role="radio"]:not([disabled])').first().click();
    await page.getByRole("button", { name: "Siguiente" }).click();

    await page.locator("#rName").fill("Ana Torres");
    await page.getByRole("radio", { name: "Correo" }).click();
    await page.getByRole("button", { name: "Siguiente" }).click();

    await expect(page.getByText("Ana Torres")).toBeVisible();
    await expect(page.getByText("3 personas")).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Reservar por correo/ }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Siguiente" }),
    ).not.toBeVisible();
  });

  test("a full time slot cannot be selected", async ({ page }) => {
    await page.goto("/#reservas");
    await page.locator("#reservas").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Siguiente" }).click();

    const fullSlot = page.locator('[role="radio"][disabled]').first();
    await expect(fullSlot).toBeVisible();
    await expect(fullSlot).toHaveAttribute("aria-checked", "false");
  });
});
