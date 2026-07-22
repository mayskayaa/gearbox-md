import { FaDirections, FaExternalLinkAlt } from "react-icons/fa";

/**
 * @param {{
 *   placeName: string;
 *   address?: string;
 *   directionsUrl: string;
 *   openUrl: string;
 *   locale?: string;
 * }} props
 */
export function MapDisplayOverlay({ placeName, address, directionsUrl, openUrl, locale = "ru" }) {
  const isRo = locale === "ro";

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1000] bg-gradient-to-t from-black/25 via-black/5 to-transparent p-4 pt-10">
      <div className="pointer-events-auto flex flex-col gap-3 rounded-2xl border border-white/60 bg-white/95 p-4 shadow-xl backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-[var(--ink)]">{placeName}</p>
          {address ? <p className="mt-0.5 truncate text-sm text-[var(--ink-muted)]">{address}</p> : null}
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm"
          >
            <FaDirections aria-hidden="true" />
            {isRo ? "Rută" : "Маршрут"}
          </a>
          <a
            href={openUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <FaExternalLinkAlt aria-hidden="true" />
            {isRo ? "Deschide" : "Открыть"}
          </a>
        </div>
      </div>
    </div>
  );
}
