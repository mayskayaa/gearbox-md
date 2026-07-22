import { describe, expect, it } from "vitest";

import { getGoogleMapsEmbedUrl, getOsmEmbedUrl, parseGoogleMapsUrl, resolveMapConfig } from "@/lib/google-maps";

describe("parseGoogleMapsUrl", () => {
  it("parses @lat,lng from maps url", () => {
    const result = parseGoogleMapsUrl("https://www.google.com/maps/@47.05467,28.77951,17z");
    expect(result).toMatchObject({ latitude: 47.05467, longitude: 28.77951, zoom: 17 });
  });

  it("parses q=lat,lng query", () => {
    const result = parseGoogleMapsUrl("https://www.google.com/maps?q=47.05467,28.77951");
    expect(result).toMatchObject({ latitude: 47.05467, longitude: 28.77951 });
  });

  it("parses place name from q parameter", () => {
    const result = parseGoogleMapsUrl("https://www.google.com/maps?q=GearBox+ATCC");
    expect(result).toEqual({ placeName: "GearBox ATCC" });
  });
});

describe("resolveMapConfig", () => {
  it("falls back to defaults when map is empty", () => {
    const config = resolveMapConfig({});
    expect(config.latitude).toBe(47.05467);
    expect(config.placeName).toBe("GearBox ATCC");
  });

  it("builds OSM embed url with marker", () => {
    const url = getOsmEmbedUrl(
      { placeName: "GearBox", latitude: 47.05, longitude: 28.78, zoom: 16 },
      "ru",
    );
    expect(url).toContain("openstreetmap.org/export/embed.html");
    expect(url).toContain("47.05");
    expect(url).toContain("marker=");
  });

  it("keeps getGoogleMapsEmbedUrl as OSM alias", () => {
    const url = getGoogleMapsEmbedUrl(
      { latitude: 47.05, longitude: 28.78, zoom: 16 },
      "ru",
    );
    expect(url).toContain("openstreetmap.org");
  });
});
