import { expect, test } from "@playwright/test";

test("has generated article", async ({ page }) => {
  await page.goto("/boids");
  expect(await page.textContent("article.container")).toContain("works");
});
