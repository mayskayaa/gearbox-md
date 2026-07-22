import { SITE_LOCATION } from "@/lib/site-location";

const DEFAULT_MAP = {
  placeName: "GearBox ATCC",
  googleMapsUrl: "",
  latitude: SITE_LOCATION.latitude,
  longitude: SITE_LOCATION.longitude,
  zoom: 17,
};

/**
 * @param {string} url
 * @returns {{ latitude?: number; longitude?: number; placeName?: string; zoom?: number } | null}
 */
export function parseGoogleMapsUrl(url) {
  if (!url || typeof url !== "string") return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    const combined = `${parsed.pathname}${parsed.search}`;

    const atMatch = combined.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)(?:,(\d+(?:\.\d+)?)z)?/);
    if (atMatch) {
      return {
        latitude: Number(atMatch[1]),
        longitude: Number(atMatch[2]),
        zoom: atMatch[3] ? Math.round(Number(atMatch[3])) : undefined,
      };
    }

    const q = parsed.searchParams.get("q");
    if (q) {
      const decoded = decodeURIComponent(q.replace(/\+/g, " "));
      const coordOnly = decoded.match(/^(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)$/);
      if (coordOnly) {
        return {
          latitude: Number(coordOnly[1]),
          longitude: Number(coordOnly[2]),
        };
      }

      const placeAt = decoded.match(/^(.+?)@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)$/);
      if (placeAt) {
        return {
          placeName: placeAt[1].trim(),
          latitude: Number(placeAt[2]),
          longitude: Number(placeAt[3]),
        };
      }

      return { placeName: decoded.trim() };
    }

    const ll = parsed.searchParams.get("ll") || parsed.searchParams.get("sll");
    if (ll) {
      const [lat, lng] = ll.split(",").map(Number);
      if (Number.isFinite(lat) && Number.isFinite(lng)) {
        return { latitude: lat, longitude: lng };
      }
    }

    const placePath = parsed.pathname.match(/\/maps\/place\/([^/]+)/);
    if (placePath) {
      return { placeName: decodeURIComponent(placePath[1].replace(/\+/g, " ")) };
    }
  } catch {
    return null;
  }

  return null;
}

/**
 * @param {Record<string, unknown> | null | undefined} map
 */
export function resolveMapConfig(map) {
  const source = map && typeof map === "object" ? map : {};
  const latitude = Number(source.latitude);
  const longitude = Number(source.longitude);
  const zoom = Number(source.zoom);

  return {
    placeName: String(source.placeName || source.place || DEFAULT_MAP.placeName).trim(),
    googleMapsUrl: String(source.googleMapsUrl || "").trim(),
    latitude: Number.isFinite(latitude) ? latitude : DEFAULT_MAP.latitude,
    longitude: Number.isFinite(longitude) ? longitude : DEFAULT_MAP.longitude,
    zoom: Number.isFinite(zoom) && zoom > 0 ? Math.round(zoom) : DEFAULT_MAP.zoom,
  };
}

/**
 * @param {Record<string, unknown> | null | undefined} map
 * @param {string} [locale]
 */
export function getOsmEmbedUrl(map, locale = "ru") {
  const config = resolveMapConfig(map);
  const delta = Math.max(0.002, 0.018 * Math.pow(2, 14 - config.zoom));
  const minLng = config.longitude - delta;
  const maxLng = config.longitude + delta;
  const minLat = config.latitude - delta;
  const maxLat = config.latitude + delta;
  const marker = `${config.latitude},${config.longitude}`;

  return `https://www.openstreetmap.org/export/embed.html?bbox=${minLng}%2C${minLat}%2C${maxLng}%2C${maxLat}&layer=mapnik&marker=${marker}`;
}

/**
 * @param {Record<string, unknown> | null | undefined} map
 * @param {string} [locale]
 * @deprecated Use getOsmEmbedUrl — free OpenStreetMap embed without API key.
 */
export function getGoogleMapsEmbedUrl(map, locale = "ru") {
  return getOsmEmbedUrl(map, locale);
}

/**
 * @param {Record<string, unknown> | null | undefined} map
 */
export function getGoogleMapsOpenUrl(map) {
  const config = resolveMapConfig(map);
  if (config.googleMapsUrl) return config.googleMapsUrl;

  const query = config.placeName
    ? encodeURIComponent(config.placeName)
    : `${config.latitude},${config.longitude}`;

  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/**
 * @param {Record<string, unknown> | null | undefined} map
 */
export function getGoogleMapsDirectionsUrl(map) {
  const config = resolveMapConfig(map);
  const destination = config.placeName
    ? encodeURIComponent(config.placeName)
    : `${config.latitude},${config.longitude}`;

  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}

export { DEFAULT_MAP };
