import { expect, test } from "@playwright/test";

test("loads the playable pet loop with reactions", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("heading", {
      name: /nova/i,
    }),
  ).toBeVisible();

  await expect(page.getByText("Normal")).toBeVisible();
  await expect(page.getByRole("button", { name: /feed/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /play/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /rest/i })).toBeVisible();
  await expect(page.getByRole("img", { name: /nova looking happy and healthy/i })).toBeVisible();
  await expect(page.getByText(/keep every vital healthy/i)).toBeVisible();
});
