import { describe, expect, it } from "vitest";

import { loadMediaFile, saveMediaFile } from "@/lib/media-storage";

describe("media-storage", () => {
  it("exports postgres storage adapter functions", () => {
    expect(typeof saveMediaFile).toBe("function");
    expect(typeof loadMediaFile).toBe("function");
  });
});
