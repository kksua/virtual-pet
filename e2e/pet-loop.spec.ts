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
  await expect(
    page.getByText(/snack secured|massive snack win|emotionally available|🍓/i),
  ).toBeVisible();

  await page.getByRole("button", { name: /rest/i }).click();
  await expect(page.getByText("94/100")).toBeVisible();
});

test("restores the saved pet after a reload", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await page.getByLabel("Pet name").fill("Pebble");
  await page.getByRole("button", { name: "Save name" }).click();
  await page.getByRole("button", { name: /feed/i }).click();

  await page.reload({ waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("heading", {
      name: "Pebble",
    }),
  ).toBeVisible();
  await expect(page.getByText("90/100")).toBeVisible();
  await expect(
    page.getByText(/saved my whole vibe|elite save behavior|save loaded/i),
  ).toBeVisible();
});
