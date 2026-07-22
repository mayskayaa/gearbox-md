"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FaLink } from "react-icons/fa";

import { SiteMap } from "@/components/maps/SiteMap";
import { getGoogleMapsOpenUrl, parseGoogleMapsUrl, resolveMapConfig } from "@/lib/google-maps";

/**
 * @param {{ value?: Record<string, unknown>; onChange: (map: Record<string, unknown>) => void }} props
 */
export function MapConfigField({ value, onChange }) {
  const map = resolveMapConfig(value);
  const [linkDraft, setLinkDraft] = useState(null);
  const linkInput = linkDraft ?? map.googleMapsUrl ?? "";
  const previewMap = { ...map, googleMapsUrl: linkInput.trim() || map.googleMapsUrl };

  function update(patch) {
    onChange({ ...map, ...value, ...patch });
  }

  function applyGoogleMapsLink() {
    const parsed = parseGoogleMapsUrl(linkInput);
    if (!parsed) {
      toast.error("Не удалось разобрать ссылку. Вставьте URL из Google Maps или OpenStreetMap.");
      return;
    }

    update({
      googleMapsUrl: linkInput.trim(),
      ...(parsed.placeName ? { placeName: parsed.placeName } : {}),
      ...(parsed.latitude !== undefined ? { latitude: parsed.latitude } : {}),
      ...(parsed.longitude !== undefined ? { longitude: parsed.longitude } : {}),
      ...(parsed.zoom !== undefined ? { zoom: parsed.zoom } : {}),
    });
    setLinkDraft(null);
    toast.success("Координаты извлечены из ссылки");
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
      <div className="border-b border-[var(--border-subtle)] px-4 py-3">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">Карта (OpenStreetMap)</p>
        <p className="mt-1 text-xs text-[var(--text-secondary)]">
          Бесплатная интерактивная карта без API-ключа. Настройки общие для RU и RO.
        </p>
      </div>

      <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
        <div className="space-y-3 border-b border-[var(--border-subtle)] p-4 xl:border-b-0 xl:border-r">
          <label className="admin-label">
            Название на карте (организация / адрес)
            <input
              type="text"
              value={map.placeName}
              onChange={(e) => update({ placeName: e.target.value })}
              placeholder="GearBox ATCC"
              className="admin-input focus-ring"
            />
          </label>

          <label className="admin-label">
            Ссылка Google Maps (для кнопки «Открыть»)
            <div className="flex gap-2">
              <input
                type="url"
                value={linkInput}
                onChange={(e) => setLinkDraft(e.target.value)}
                placeholder="https://www.google.com/maps/place/..."
                className="admin-input focus-ring min-w-0 flex-1"
              />
              <button
                type="button"
                onClick={applyGoogleMapsLink}
                className="admin-btn focus-ring shrink-0 text-xs font-medium"
              >
                Применить
              </button>
            </div>
          </label>

          <div className="grid gap-3 sm:grid-cols-3">
            <label className="admin-label">
              Широта
              <input
                type="text"
                inputMode="decimal"
                value={String(map.latitude)}
                onChange={(e) => update({ latitude: e.target.value })}
                className="admin-input focus-ring"
              />
            </label>
            <label className="admin-label">
              Долгота
              <input
                type="text"
                inputMode="decimal"
                value={String(map.longitude)}
                onChange={(e) => update({ longitude: e.target.value })}
                className="admin-input focus-ring"
              />
            </label>
            <label className="admin-label">
              Масштаб (zoom)
              <input
                type="number"
                min={1}
                max={21}
                value={map.zoom}
                onChange={(e) => update({ zoom: e.target.value })}
                className="admin-input focus-ring"
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-2 text-[0.65rem] text-[var(--text-muted)]">
            <span>
              {previewMap.placeName} · {previewMap.latitude}, {previewMap.longitude} · z{previewMap.zoom}
            </span>
            <a
              href={getGoogleMapsOpenUrl(previewMap)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline"
            >
              <FaLink aria-hidden="true" />
              Открыть
            </a>
          </div>
        </div>

        <div className="p-4">
          <p className="mb-2 text-xs font-semibold text-[var(--text-secondary)]">Интерактивное превью</p>
          <SiteMap
            map={previewMap}
            locale="ru"
            mode="edit"
            showOverlay={false}
            heightClassName="h-[280px] w-full"
            onPositionChange={({ latitude, longitude }) => update({ latitude, longitude })}
            onZoomChange={(zoom) => update({ zoom })}
          />
        </div>
      </div>
    </div>
  );
}
