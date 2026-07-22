import { describe, expect, it } from "vitest";

import { inquirySchema } from "@/lib/validation";

describe("inquirySchema", () => {
  it("accepts valid inquiry payload", () => {
    const parsed = inquirySchema.safeParse({
      name: "Ivan",
      phone: "+37379911103",
      email: "test@example.com",
      message: "Need diagnostics",
      website: "",
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects honeypot website field", () => {
    const parsed = inquirySchema.safeParse({
      name: "Bot",
      phone: "+37379911103",
      website: "https://spam.example",
    });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.website).toBe("https://spam.example");
    }
  });
});
