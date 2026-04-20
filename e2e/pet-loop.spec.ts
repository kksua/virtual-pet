import { expect, test } from "@playwright/test";

test("lets the player name the pet and use the core care actions", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await page.getByLabel("Pet name").fill("Mochi");
  await page.getByRole("button", { name: "Save name" }).click();

  await expect(
    page.getByRole("heading", {
      name: "Mochi",
    }),
  ).toBeVisible();

  await expect(page.getByText("72/100")).toBeVisible();
  await page.getByRole("button", { name: /feed/i }).click();
  await expect(page.getByText("90/100")).toBeVisible();

  await page.getByRole("button", { name: /rest/i }).click();
  await expect(page.getByText("94/100")).toBeVisible();
});
