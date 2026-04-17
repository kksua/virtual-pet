import { expect, test } from "@playwright/test";

test("loads the phase 1 app shell", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("heading", {
      name: /virtual pet app shell is online/i,
    }),
  ).toBeVisible();

  await expect(page.getByText("React + TypeScript")).toBeVisible();
  await expect(page.getByText("Tailwind CSS")).toBeVisible();
});
