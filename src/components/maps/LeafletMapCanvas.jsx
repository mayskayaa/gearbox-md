"use client";

import { useEffect, useMemo } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, ZoomControl, useMap, useMapEvents } from "react-leaflet";
import { renderToStaticMarkup } from "react-dom/server";

import { MapAttributionInfo } from "@/components/maps/MapAttributionInfo";
import { MapDisplayOverlay } from "@/components/maps/MapDisplayOverlay";
import { MapMarkerPin } from "@/components/maps/MapMarkerPin";
import {
  getGoogleMapsDirectionsUrl,
  getGoogleMapsOpenUrl,
  resolveMapConfig,
} from "@/lib/google-maps";
import { MAP_TILES } from "@/lib/map-tiles";

import "leaflet/dist/leaflet.css";

function createMarkerIcon(label, compact) {
  return L.divIcon({
    html: renderToStaticMarkup(<MapMarkerPin label={label} compact={compact} />),
    className: "gearbox-leaflet-marker",
    iconSize: [44, 52],
    iconAnchor: [22, compact ? 44 : 52],
  });
}

function MapViewController({ latitude, longitude, zoom, enabled }) {
  const map = useMap();

  useEffect(() => {
    if (!enabled || !map) return;
    map.setView([latitude, longitude], zoom, { animate: false });
  }, [enabled, latitude, longitude, map, zoom]);

  return null;
}

function MapInit() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    map.whenReady(() => {
      map.invalidateSize();
    });

    const timer = window.setTimeout(() => map.invalidateSize(), 250);
    return () => window.clearTimeout(timer);
  }, [map]);

  return null;
}

function MapInteractionLayer({ mode, onPositionChange, onZoomChange }) {
  useMapEvents({
    click(event) {
      if (mode !== "edit" || !onPositionChange) return;
      onPositionChange({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      });
    },
    zoomend(event) {
      if (!onZoomChange) return;
      onZoomChange(event.target.getZoom());
    },
  });

  return null;
}

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
export function LeafletMapCanvas({
  map,
  locale = "ru",
  address,
  className,
  heightClassName = "h-[380px] lg:h-[520px]",
  mode = "display",
  onPositionChange,
  onZoomChange,
  showOverlay = true,
}) {
  const isEdit = mode === "edit";
  const config = resolveMapConfig(map);

  const position = useMemo(
    () => [config.latitude, config.longitude],
    [config.latitude, config.longitude],
  );

  const markerIcon = useMemo(
    () => createMarkerIcon(isEdit ? config.placeName : undefined, isEdit),
    [config.placeName, isEdit],
  );

  const openUrl = getGoogleMapsOpenUrl(map);
  const directionsUrl = getGoogleMapsDirectionsUrl(map);

  return (
    <div
      className={`relative overflow-hidden rounded-[16px] border border-[var(--line)] bg-[#e5e3df] ${
        isEdit ? "" : "shadow-[0_20px_50px_rgba(44,44,44,0.08)]"
      } ${heightClassName} ${className || ""}`}
    >
      <MapContainer
        center={position}
        zoom={config.zoom}
        scrollWheelZoom={isEdit}
        className="gearbox-map h-full w-full"
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          attribution={MAP_TILES.attribution}
          url={MAP_TILES.url}
          subdomains={MAP_TILES.subdomains}
          maxZoom={MAP_TILES.maxZoom}
        />
        <ZoomControl position="topright" />
        <MapInit />
        {isEdit ? (
          <MapViewController
            latitude={config.latitude}
            longitude={config.longitude}
            zoom={config.zoom}
            enabled
          />
        ) : null}
        <MapInteractionLayer
          mode={mode}
          onPositionChange={onPositionChange}
          onZoomChange={onZoomChange}
        />
        <Marker
          position={position}
          icon={markerIcon}
          draggable={isEdit}
          eventHandlers={
            isEdit
              ? {
                  dragend(event) {
                    if (!onPositionChange) return;
                    const { lat, lng } = event.target.getLatLng();
                    onPositionChange({ latitude: lat, longitude: lng });
                  },
                }
              : undefined
          }
        />
      </MapContainer>

      <MapAttributionInfo />

      {isEdit ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-black/35 to-transparent px-4 py-3">
          <p className="text-xs font-medium text-white drop-shadow">
            Перетащите маркер или кликните по карте, чтобы обновить координаты
          </p>
        </div>
      ) : null}

      {showOverlay && !isEdit ? (
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
