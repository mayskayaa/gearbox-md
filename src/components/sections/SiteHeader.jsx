"use client";

import Image from "next/image";
import Link from "next/link";

import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";

export function SiteHeader({ locale, phone }) {
  const isRo = locale === "ro";
  const nav = isRo
    ? [
        { href: "#services", label: "Servicii" },
        { href: "#about", label: "Despre noi" },
        { href: "#contacts", label: "Contacte" },
      ]
    : [
        { href: "#services", label: "Услуги" },
        { href: "#about", label: "О нас" },
        { href: "#contacts", label: "Контакты" },
      ];

  const telHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "#contacts";

  return (
    <header className="relative z-50 overflow-hidden bg-white">
      <div className="container-site flex h-[72px] items-center justify-between gap-2 sm:h-20 sm:gap-3 md:h-[124px]">
        <Link href="/" className="relative block h-7 w-[108px] shrink-0 sm:h-11 sm:w-[169px] md:h-14 md:w-[215px]">
          <Image
            src="/img/Group 2076 (1).png"
            alt="GearBox"
            fill
            sizes="215px"
            priority
            className="object-contain object-left"
          />
        </Link>

        <nav className="hidden min-[360px]:flex min-[360px]:items-center min-[360px]:gap-2 sm:gap-5 md:gap-8">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--ink-muted)] transition hover:text-[var(--ink)] sm:text-[12px] md:text-[13px]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <LocaleSwitcher locale={locale} />
          <a href={telHref} className="btn-primary hidden !px-6 !py-2.5 text-[13px] md:inline-flex">
            {isRo ? "Sună" : "Позвонить"}
          </a>
        </div>
      </div>
    </header>
  );
}
