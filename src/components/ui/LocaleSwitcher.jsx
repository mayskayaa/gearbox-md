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
    <div className="flex items-center text-sm font-medium sm:text-sm">
      <button
        type="button"
        onClick={() => switchLocale("ru")}
        className={clsx(
          "focus-ring grid min-h-11 min-w-11 place-items-center rounded-lg transition",
          locale === "ru" ? "text-[var(--accent)]" : "text-[var(--ink-muted)] hover:text-[var(--ink)]",
        )}
      >
        RU
      </button>
      <span className="select-none text-[var(--ink-faint)]" aria-hidden>
        |
      </span>
      <button
        type="button"
        onClick={() => switchLocale("ro")}
        className={clsx(
          "focus-ring grid min-h-11 min-w-11 place-items-center rounded-lg transition",
          locale === "ro" ? "text-[var(--accent)]" : "text-[var(--ink-muted)] hover:text-[var(--ink)]",
        )}
      >
        RO
      </button>
    </div>
  );
}
