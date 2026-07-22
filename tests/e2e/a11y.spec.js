import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("homepage has no serious accessibility violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();

  const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
  expect(serious, formatViolations(serious)).toEqual([]);
});

function formatViolations(violations) {
  return violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length} nodes)`).join("\n");
}
