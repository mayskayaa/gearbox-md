"use client";

import { MapDisplayOverlay } from "@/components/maps/MapDisplayOverlay";
import {
  getGoogleMapsDirectionsUrl,
  getGoogleMapsOpenUrl,
  getOsmEmbedUrl,
  resolveMapConfig,
} from "@/lib/google-maps";

/**
 * Reliable public map — OSM iframe embed (no API key), prof-v-hub pattern.
 *
 * @param {{
 *   map?: Record<string, unknown>;
 *   locale?: string;
 *   address?: string;
 *   className?: string;
 *   heightClassName?: string;
 *   showOverlay?: boolean;
 * }} props
 */
export function MapEmbedView({
  map,
  locale = "ru",
  address,
  className,
  heightClassName = "h-[380px] lg:h-[520px]",
  showOverlay = true,
}) {
  const config = resolveMapConfig(map);
  const isRo = locale === "ro";
  const embedUrl = getOsmEmbedUrl(map, locale);
  const openUrl = getGoogleMapsOpenUrl(map);
  const directionsUrl = getGoogleMapsDirectionsUrl(map);

  return (
    <div
      className={`relative overflow-hidden rounded-[16px] border border-[var(--line)] bg-[#e5e3df] shadow-[0_20px_50px_rgba(44,44,44,0.08)] ${heightClassName} ${className || ""}`}
    >
      <iframe
        title={isRo ? "Harta GearBox" : "Карта GearBox"}
        src={embedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0"
        allowFullScreen
      />

      {showOverlay ? (
        <MapDisplayOverlay
          placeName={config.placeName}
          address={address}
          directionsUrl={directionsUrl}
          openUrl={openUrl}
          locale={locale}
        />
      ) : null}
    </div>
  );
}
