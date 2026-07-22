export function MapMarkerPin({ label, compact = false }) {
  return (
    <div className="group flex flex-col items-center">
      <div
        className={`relative flex items-center justify-center rounded-full bg-[var(--accent)] shadow-[0_8px_24px_rgba(220,31,38,0.45)] ring-4 ring-white/90 transition-transform group-hover:scale-105 ${
          compact ? "h-9 w-9" : "h-11 w-11"
        }`}
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[var(--accent)] opacity-20" />
        <span className={`rounded-full bg-white ${compact ? "h-2.5 w-2.5" : "h-3 w-3"}`} />
      </div>
      <span
        className={`mt-1 block h-3 w-3 rotate-45 rounded-sm bg-[var(--accent)] shadow-md ${
          compact ? "scale-90" : ""
        }`}
        aria-hidden="true"
      />
      {label ? (
        <span className="mt-2 max-w-[10rem] truncate rounded-full bg-white/95 px-3 py-1 text-[0.65rem] font-semibold text-[var(--ink)] shadow-md ring-1 ring-black/5">
          {label}
        </span>
      ) : null}
    </div>
  );
}
