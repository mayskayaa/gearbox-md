import { test, expect } from "@playwright/test";

test("honeypot inquiry API silently succeeds", async ({ request }) => {
  const res = await request.post("/api/inquiries", {
    data: {
      name: "Bot",
      phone: "+37379911103",
      website: "https://spam.example",
    },
  });

  expect(res.status()).toBe(201);
  await expect(res.json()).resolves.toMatchObject({ success: true });
});
