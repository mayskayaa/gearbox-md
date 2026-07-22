"use client";

import dynamic from "next/dynamic";

const LeafletMapCanvas = dynamic(
  () => import("@/components/maps/LeafletMapCanvas").then((module) => module.LeafletMapCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="h-[380px] animate-pulse rounded-[16px] border border-[var(--line)] bg-[var(--surface-tint)] lg:h-[520px]" />
    ),
  },
);

/**
 * @param {{
 *   map?: Record<string, unknown>;
 *   locale?: string;
 *   address?: string;
 *   className?: string;
 *   heightClassName?: string;
 *   mode?: "display" | "edit";
 *   onPositionChange?: (coords: { latitude: number; longitude: number }) => void;
 *   onZoomChange?: (zoom: number) => void;
 *   showOverlay?: boolean;
 * }} props
 */
export function SiteMap(props) {
  return <LeafletMapCanvas {...props} />;
}
