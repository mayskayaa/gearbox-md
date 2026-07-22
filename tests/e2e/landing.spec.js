import { test, expect } from "@playwright/test";

test("homepage renders hero and contacts", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("#contacts")).toBeVisible();
});

test("inquiry form is visible", async ({ page }) => {
  await page.goto("/#contacts");
  await expect(page.locator('input[name="name"]')).toBeVisible();
  await expect(page.locator('input[name="phone"]')).toBeVisible();
  await expect(page.getByRole("button", { name: /отправить/i })).toBeVisible();
});
