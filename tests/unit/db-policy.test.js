import { afterEach, describe, expect, it } from "vitest";

import {
  databaseUnavailableResponse,
  isMemoryFallbackAllowed,
  shouldUseMemoryStore,
} from "@/lib/db-policy";

const originalEnv = { ...process.env };

afterEach(() => {
  process.env = { ...originalEnv };
});

describe("db-policy", () => {
  it("allows memory fallback only outside production", () => {
    process.env.NODE_ENV = "development";
    expect(isMemoryFallbackAllowed()).toBe(true);

    process.env.NODE_ENV = "production";
    expect(isMemoryFallbackAllowed()).toBe(false);
  });

  it("uses memory store only when database is missing in non-production", () => {
    process.env.NODE_ENV = "development";
    delete process.env.DATABASE_URL;
    expect(shouldUseMemoryStore()).toBe(true);

    process.env.NODE_ENV = "production";
    expect(shouldUseMemoryStore()).toBe(false);
  });

  it("returns a safe 503 payload when database is unavailable", () => {
    const response = databaseUnavailableResponse();
    expect(response.status).toBe(503);
    expect(response.body.code).toBe("DATABASE_NOT_CONFIGURED");
    expect(response.body.error).toMatch(/DATABASE_URL/i);
  });
});
