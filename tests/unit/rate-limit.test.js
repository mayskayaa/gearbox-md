import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { consumeRateLimit, resetRateLimit } from "@/lib/rate-limit";

const originalEnv = { ...process.env };

beforeEach(async () => {
  process.env.NODE_ENV = "test";
  delete process.env.DATABASE_URL;
  await resetRateLimit("test-key");
});

afterEach(async () => {
  process.env = { ...originalEnv };
  await resetRateLimit("test-key");
});

describe("consumeRateLimit", () => {
  it("allows requests under the limit", async () => {
    const options = { maxAttempts: 3, windowMs: 60_000, blockMs: 120_000 };

    const first = await consumeRateLimit("test-key", options);
    const second = await consumeRateLimit("test-key", options);

    expect(first.allowed).toBe(true);
    expect(second.allowed).toBe(true);
  });

  it("blocks after exceeding max attempts", async () => {
    const options = { maxAttempts: 2, windowMs: 60_000, blockMs: 120_000 };

    await consumeRateLimit("test-key", options);
    await consumeRateLimit("test-key", options);
    const blocked = await consumeRateLimit("test-key", options);

    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSec).toBeGreaterThan(0);
  });
});
