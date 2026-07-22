"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMenu, FiX, FiPhone } from "react-icons/fi";

import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";

export function SiteHeader({ locale, phone }) {
  const isRo = locale === "ro";
  const menuId = useId();
  const [menuOpen, setMenuOpen] = useState(false);

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
  const callLabel = isRo ? "Sună" : "Позвонить";
  const menuLabel = isRo ? "Meniu" : "Меню";
  const closeLabel = isRo ? "Închide meniul" : "Закрыть меню";

  useEffect(() => {
    if (!menuOpen) return undefined;

    function onKeyDown(event) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    function onResize() {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setMenuOpen(false);
      }
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="relative z-50 bg-white">
      <div className="container-site flex h-[72px] items-center justify-between gap-3 sm:h-20 md:h-[124px]">
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

        <nav className="hidden items-center gap-6 md:flex md:gap-8" aria-label={menuLabel}>
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap py-2 text-[13px] font-semibold uppercase tracking-[0.06em] text-[var(--ink-muted)] transition hover:text-[var(--ink)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <LocaleSwitcher locale={locale} />
          <a href={telHref} className="btn-primary hidden !px-6 !py-2.5 text-[13px] md:inline-flex">
            {callLabel}
          </a>
          <button
            type="button"
            className="focus-ring grid size-11 place-items-center rounded-lg text-[var(--ink)] transition hover:bg-[var(--surface-tint)] md:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? closeLabel : menuLabel}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <FiX size={24} aria-hidden /> : <FiMenu size={24} aria-hidden />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/35 md:hidden"
            aria-label={closeLabel}
            onClick={closeMenu}
          />
          <div
            id={menuId}
            className="absolute inset-x-0 top-full z-50 border-t border-[var(--line)] bg-white shadow-[0_16px_40px_rgba(0,0,0,0.12)] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={menuLabel}
          >
            <nav className="container-site flex flex-col py-2" aria-label={menuLabel}>
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="flex min-h-12 items-center border-b border-[var(--line)] text-[15px] font-semibold uppercase tracking-[0.06em] text-[var(--ink)] last:border-b-0"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={telHref}
                onClick={closeMenu}
                className="btn-primary mt-3 mb-3 inline-flex min-h-12 w-full gap-2 text-[14px]"
              >
                <FiPhone size={18} aria-hidden />
                {callLabel}
              </a>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
