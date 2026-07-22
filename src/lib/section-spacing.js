/** Default gap between homepage blocks (px) — matches typical py-20 spacing. */
export const DEFAULT_SECTION_GAP = 80;

/** Homepage blocks that support individual spacing overrides. */
export const SPACING_SECTION_KEYS = [
  "hero",
  "specialization",
  "stats",
  "services",
  "cases",
  "cta",
  "contacts",
];

export const SPACING_SECTION_LABELS = {
  hero: "Hero → до Специализации",
  specialization: "Специализация / бегущая → до Статистики",
  stats: "Статистика → до Услуг",
  services: "Услуги → до О компании",
  cases: "О компании → до CTA",
  cta: "CTA → до Контактов",
  contacts: "Контакты (после блока)",
};

export const DEFAULT_SECTION_SPACING = {
  defaultGap: DEFAULT_SECTION_GAP,
  overrides: {},
};

/**
 * @param {unknown} raw
 * @returns {{ defaultGap: number; overrides: Record<string, number> }}
 */
export function parseSectionSpacing(raw) {
  if (!raw || typeof raw !== "object") {
    return structuredClone(DEFAULT_SECTION_SPACING);
  }

  const value = /** @type {Record<string, unknown>} */ (raw);
  const defaultGap =
    typeof value.defaultGap === "number" && value.defaultGap >= 0
      ? Math.round(value.defaultGap)
      : DEFAULT_SECTION_GAP;

  /** @type {Record<string, number>} */
  const overrides = {};
  if (value.overrides && typeof value.overrides === "object") {
    for (const [key, gap] of Object.entries(value.overrides)) {
      if (typeof gap === "number" && gap >= 0) {
        overrides[key] = Math.round(gap);
      }
    }
  }

  return { defaultGap, overrides };
}

/**
 * @param {{ defaultGap: number; overrides: Record<string, number> }} spacing
 * @param {string} sectionKey
 */
export function getGapAfter(spacing, sectionKey) {
  if (spacing.overrides[sectionKey] !== undefined) {
    return spacing.overrides[sectionKey];
  }
  return spacing.defaultGap;
}
