"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FiInfo } from "react-icons/fi";

import { MAP_ATTRIBUTION_HTML } from "@/lib/map-tiles";

const SHOW_DELAY_MS = 400;
const HIDE_DELAY_MS = 150;

export function MapAttributionInfo() {
  const [visible, setVisible] = useState(false);
  const showTimer = useRef(null);
  const hideTimer = useRef(null);

  const clearTimers = useCallback(() => {
    if (showTimer.current) {
      window.clearTimeout(showTimer.current);
      showTimer.current = null;
    }
    if (hideTimer.current) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  function handleEnter() {
    if (hideTimer.current) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    if (visible) return;

    if (!showTimer.current) {
      showTimer.current = window.setTimeout(() => {
        setVisible(true);
        showTimer.current = null;
      }, SHOW_DELAY_MS);
    }
  }

  function handleLeave() {
    if (showTimer.current) {
      window.clearTimeout(showTimer.current);
      showTimer.current = null;
    }
    if (!visible) return;

    if (!hideTimer.current) {
      hideTimer.current = window.setTimeout(() => {
        setVisible(false);
        hideTimer.current = null;
      }, HIDE_DELAY_MS);
    }
  }

  function handleFocus() {
    clearTimers();
    setVisible(true);
  }

  function handleBlur(event) {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    clearTimers();
    setVisible(false);
  }

  return (
    <div
      className="pointer-events-auto absolute left-3 top-3 z-[1000]"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocusCapture={handleFocus}
      onBlurCapture={handleBlur}
    >
      <button
        type="button"
        aria-expanded={visible}
        aria-label="Источники данных карты"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white/95 text-[var(--ink-muted)] shadow-md backdrop-blur-sm transition hover:bg-white hover:text-[var(--ink)]"
      >
        <FiInfo size={16} aria-hidden="true" />
      </button>

      <div
        className={`absolute left-0 top-full mt-2 min-w-[210px] rounded-lg border border-black/10 bg-white/95 px-3 py-2 text-[11px] leading-relaxed text-[#333] shadow-lg backdrop-blur-sm transition-opacity duration-150 [&_a]:text-[#0078a8] [&_a]:underline ${
          visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!visible}
        dangerouslySetInnerHTML={{ __html: MAP_ATTRIBUTION_HTML }}
      />
    </div>
  );
}
