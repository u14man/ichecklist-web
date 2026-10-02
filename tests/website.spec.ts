import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/features",
  "/features/organized-checklists",
  "/features/mandatory-items",
  "/features/completion-locking",
  "/features/personal-checklists",
  "/features/bulk-actions",
  "/features/progress-tracking",
  "/features/flexible-views",
  "/features/native-experience",
  "/solutions",
  "/solutions/developers",
  "/solutions/qa-teams",
  "/solutions/product-managers",
  "/solutions/release-teams",
  "/pricing",
  "/about",
  "/contact",
  "/demo",
  "/resources",
  "/resources/definition-of-done",
  "/resources/checklists-vs-subtasks",
  "/resources/release-readiness",
  "/docs",
  "/changelog",
  "/privacy",
  "/terms",
];

for (const route of routes) {
  test(`route ${route} renders without errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(route);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page).toHaveTitle(/Jira Checklist/);
    await expect(page.getByRole("main")).toBeVisible();
    expect(errors).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1,
      ),
    ).toBeTruthy();
  });
}

test("desktop menus navigate and close with Escape", async ({ page }) => {
  await page.goto("/");
  const product = page.getByRole("button", { name: "Product", exact: true });
  await product.click();
  await expect(product).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(product).toHaveAttribute("aria-expanded", "false");
  await product.click();
  await page
    .locator("#menu-Product")
    .getByRole("link", { name: /Mandatory items/ })
    .click();
  await expect(page).toHaveURL(/features\/mandatory-items/);
  await expect(page.locator("h1")).toContainText("Done");
});

test("demo progress is independent of filters and personal items", async ({
  page,
}) => {
  await page.goto("/demo");
  const progress = page.getByRole("progressbar", { name: "Overall Progress" });
  await expect(progress).toHaveAttribute("aria-valuenow", "60");
  await page
    .getByRole("checkbox", {
      name: "Complete Check accessibility",
      exact: true,
    })
    .check();
  await expect(progress).toHaveAttribute("aria-valuenow", "70");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Search Checklist Items" })
    .fill("acceptance");
  await expect(page.locator(".demo-item")).toHaveCount(1);
  await expect(progress).toHaveAttribute("aria-valuenow", "70");
  await page.getByRole("button", { name: "Close search" }).click();
  await page.getByRole("tab", { name: /Personal/ }).click();
  await page
    .getByRole("checkbox", { name: "Complete Revisit the empty state idea" })
    .check();
  await expect(progress).toHaveAttribute("aria-valuenow", "70");
  await expect(page.locator(".personal-note")).toContainText("Only you");
});

test("mandatory validation, completion lock, and reopening work", async ({
  page,
}) => {
  await page.goto("/demo");
  await page
    .getByRole("button", { name: "Complete checklist", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toContainText("2 Mandatory Items");
  await page.getByRole("button", { name: "View incomplete items" }).click();
  await expect(
    page.getByRole("checkbox", {
      name: "Complete Check accessibility",
      exact: true,
    }),
  ).toBeFocused();
  await page
    .getByRole("checkbox", {
      name: "Complete Check accessibility",
      exact: true,
    })
    .check();
  await page.getByRole("tab", { name: /Release QA/ }).click();
  await page
    .getByRole("checkbox", {
      name: "Complete Complete regression checks",
      exact: true,
    })
    .check();
  await page
    .getByRole("button", { name: "Complete checklist", exact: true })
    .click();
  await page.getByRole("button", { name: "Complete & lock" }).click();
  await expect(page.locator(".demo-locked-banner")).toBeVisible();
  await expect(
    page.getByRole("checkbox", {
      name: "Complete Complete regression checks",
      exact: true,
    }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Reopen checklist", exact: true })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Reopen checklist" })
    .click();
  await expect(
    page.getByRole("checkbox", {
      name: "Complete Complete regression checks",
      exact: true,
    }),
  ).toBeEnabled();
});

test("inline creation, editing, bulk status, and reset work", async ({
  page,
}) => {
  await page.goto("/demo");
  await page
    .getByRole("textbox", { name: "New Checklist Item" })
    .fill("Review the new feature");
  await page
    .getByRole("textbox", { name: "New Checklist Item" })
    .press("Enter");
  await expect(
    page.getByRole("button", { name: "Review the new feature", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Review the new feature", exact: true })
    .click();
  await page
    .getByRole("dialog")
    .getByLabel("Name", { exact: true })
    .fill("Review the updated feature");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(
    page.getByRole("button", {
      name: "Review the updated feature",
      exact: true,
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Toggle bulk edit" }).click();
  await page
    .getByRole("checkbox", { name: "Select all visible items" })
    .check();
  await page
    .getByRole("combobox", { name: "Bulk status" })
    .selectOption("Done");
  await page.getByRole("button", { name: "Exit bulk edit" }).click();
  await expect(
    page.getByRole("checkbox", { name: "Complete Review the updated feature" }),
  ).toBeChecked();
  await page.getByRole("button", { name: "Reset demo" }).click();
  await expect(
    page.getByRole("button", {
      name: "Review the updated feature",
      exact: true,
    }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("progressbar", { name: "Overall Progress" }),
  ).toHaveAttribute("aria-valuenow", "60");
});

test("view, theme, and column controls work", async ({ page }) => {
  await page.goto("/demo");
  await page.getByRole("button", { name: "List view", exact: true }).click();
  await expect(page.locator(".list-group-label")).toHaveCount(4);
  await page.getByRole("button", { name: "Switch demo to dark mode" }).click();
  await expect(page.locator(".product-demo")).toHaveClass(/demo-dark/);
  await page.getByRole("button", { name: "Configure columns" }).click();
  await page
    .locator(".columns-popover")
    .getByLabel("priority", { exact: true })
    .uncheck();
  await expect(page.locator(".priority-select")).toHaveCount(0);
  await page
    .locator(".columns-popover")
    .getByRole("button", { name: "Done" })
    .click();
});

test("pricing preferences reach an honest contact inquiry", async ({
  page,
}) => {
  await page.goto("/pricing");
  await page.getByRole("tab", { name: /Annual/ }).click();
  const teamCard = page.locator(".plan-featured");
  await teamCard.getByRole("slider", { name: "Team size" }).fill("75");
  await expect(teamCard).toContainText("$750.00");
  await expect(teamCard).toContainText("/year");
  await page.getByRole("link", { name: "Start Free Trial" }).click();
  await expect(
    page.getByRole("combobox", { name: "Team size", exact: true }),
  ).toHaveValue("51–100");
  await expect(
    page.getByRole("combobox", { name: "I’d like to talk about", exact: true }),
  ).toHaveValue("Pricing");
  await expect(page.getByLabel("A little about what you need")).toHaveValue(
    /annual/,
  );
  await page.getByLabel("Your name", { exact: true }).fill("Test Person");
  await page.getByLabel("Work email", { exact: true }).fill("test@example.com");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Prepare my inquiry" }).click();
  await expect(
    page.getByRole("heading", { name: "Your inquiry is ready." }),
  ).toBeVisible();
  await expect(page.locator(".contact-success")).toContainText(
    "doesn’t send messages",
  );
  const downloadEvent = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download", exact: true }).click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe("jira-checklist-inquiry.txt");
});

test("resources filter, help search, FAQ, and unknown routes", async ({
  page,
}) => {
  await page.goto("/resources");
  await page
    .getByRole("button", { name: "Team practices", exact: true })
    .click();
  await expect(page.locator(".resource-card")).toHaveCount(1);
  await page.goto("/docs");
  await page
    .getByRole("textbox", { name: "Search help center" })
    .fill("zzzznotfound");
  await expect(
    page.getByRole("heading", { name: "No matches just yet." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear search & filters" }).click();
  await page
    .getByRole("textbox", { name: "Search help center" })
    .fill("Personal");
  await expect(page.locator(".doc-article").first()).toBeVisible();
  await page.goto("/");
  const question = page.getByRole("button", {
    name: "Can teammates see my Personal Checklist?",
  });
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await page.goto("/not-a-real-page");
  await expect(page.locator("h1")).toContainText("slipped");
});

for (const route of [
  "/",
  "/features",
  "/features/mandatory-items",
  "/solutions/developers",
  "/pricing",
  "/contact",
  "/demo",
  "/docs",
  "/about",
  "/resources",
  "/resources/definition-of-done",
]) {
  test(`mobile layout ${route}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1,
      ),
    ).toBeTruthy();
  });
}

test("mobile menu is usable and closes after navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("button", { name: "Product", exact: true }).click();
  await page
    .locator("#menu-Product")
    .getByRole("link", { name: /Mandatory items/ })
    .click();
  await expect(page).toHaveURL(/features\/mandatory-items/);
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeVisible();
});
