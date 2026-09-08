import { test, expect } from "@playwright/test";

// Unlike reservation-wizard.spec.ts, this suite deliberately does NOT mock
// the reservations API: /cancelar/[code] fetches its reservation
// server-side (a Server Component calling the store directly), which
// page.route() can't intercept - only real requests reach it. Each test
// books a real (local-store) reservation on its own far-future date to
// avoid any capacity collision with other parallel tests.

test.describe("Standalone cancellation page", () => {
  test("shows reservation details and cancels on confirm", async ({
    page,
    request,
  }) => {
    const bookRes = await request.post("/api/reservations", {
      data: {
        name: "Carlos Ruiz",
        email: "",
        partySize: 2,
        date: "2099-03-15",
        time: "19:00",
        lang: "es",
      },
    });
    expect(bookRes.status()).toBe(201);
    const { code } = await bookRes.json();

    await page.goto(`/cancelar/${code}`);
    await expect(page.getByText("Carlos Ruiz")).toBeVisible();
    const confirmButton = page.getByRole("button", {
      name: "Confirmar cancelación",
    });
    await expect(confirmButton).toBeVisible();

    await confirmButton.click();
    await expect(page.getByText("Reserva cancelada")).toBeVisible();
  });

  test("shows an already-cancelled state on a second visit", async ({
    page,
    request,
  }) => {
    const bookRes = await request.post("/api/reservations", {
      data: {
        name: "Marta Gil",
        email: "",
        partySize: 2,
        date: "2099-03-16",
        time: "19:00",
        lang: "es",
      },
    });
    const { code } = await bookRes.json();
    await request.post(`/api/reservations/${code}/cancel`);

    await page.goto(`/cancelar/${code}`);
    await expect(page.getByText("Esta reserva ya fue cancelada")).toBeVisible();
  });

  test("shows a not-found state for an unknown code", async ({ page }) => {
    await page.goto("/cancelar/PON-ZZZZZZ");
    await expect(page.getByText("No encontramos esta reserva")).toBeVisible();
  });
});
