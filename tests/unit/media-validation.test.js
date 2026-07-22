import { describe, expect, it } from "vitest";

import { detectImageMime, validateImageUpload } from "@/lib/media-validation";

describe("media-validation", () => {
  it("detects png signature", () => {
    const buffer = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    expect(detectImageMime(buffer)).toBe("image/png");
  });

  it("rejects non-image buffer", () => {
    const file = new File([Buffer.from("hello")], "bad.txt", { type: "text/plain" });
    const result = validateImageUpload(file, Buffer.from("hello"));
    expect(result.ok).toBe(false);
  });
});
