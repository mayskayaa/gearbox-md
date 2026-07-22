"use client";

import { useRouter, usePathname } from "next/navigation";
import clsx from "clsx";

export function LocaleSwitcher({ locale }) {
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(next) {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    document.cookie = `locale=${next};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
    router.push(`${pathname}?lang=${next}`);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-0.5 text-xs font-medium sm:gap-1 sm:text-sm">
      <button
        type="button"
        onClick={() => switchLocale("ru")}
        className={clsx(
          "focus-ring rounded px-1 py-0.5 transition sm:px-1.5",
          locale === "ru" ? "text-[var(--accent)]" : "text-[var(--ink-muted)] hover:text-[var(--ink)]",
        )}
      >
        RU
      </button>
      <span className="text-[var(--ink-faint)]">|</span>
      <button
        type="button"
        onClick={() => switchLocale("ro")}
        className={clsx(
          "focus-ring rounded px-1 py-0.5 transition sm:px-1.5",
          locale === "ro" ? "text-[var(--accent)]" : "text-[var(--ink-muted)] hover:text-[var(--ink)]",
        )}
      >
        RO
      </button>
    </div>
  );
}
