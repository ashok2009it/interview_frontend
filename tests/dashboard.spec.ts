import { test } from "@playwright/test";
import { DEMO_USER, DEMO_PASS } from "./common";

test.describe("Auth", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`signin`);
  });

  test("Check Dashboard Functionalities", async ({ page }) => {
    await page.getByPlaceholder("E-mail").fill(DEMO_USER);
    await page.getByPlaceholder("E-mail").press("Tab");
    await page.getByPlaceholder("Password").fill(DEMO_PASS);
    await page.getByRole("button", { name: "Sign In" }).click();

    await page.getByRole("button", { name: "Teams" }).click();

    await page.getByRole("button", { name: "Users" }).click();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
