"use client";

import { FiArrowDown } from "react-icons/fi";

import { SiteImage } from "@/components/ui/SiteImage";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

function HighlightedTitle({ title, highlight }) {
  if (!title) return null;
  if (!highlight || !title.includes(highlight)) return title;

  const [before, ...rest] = title.split(highlight);
  const after = rest.join(highlight);
  return (
    <>
      {before}
      <span className="text-[var(--accent)]">{highlight}</span>
      {after}
    </>
  );
}

export function HeroSection({ content, locale, phone }) {
  const telHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : content.ctaHref || "#contacts";

  return (
    <AnimatedSection className="relative flex min-h-[560px] items-center bg-[#111111] py-14 sm:py-16 lg:min-h-[1050px] lg:py-20">
      {/* Background photo -extended vertically beyond the section (Figma-style bleed). */}
      <div className="absolute inset-0 overflow-hidden">
        {content.bgImageUrl ? (
          <div className="absolute inset-x-[-5%] -top-[15%] -bottom-[8%]">
            <SiteImage
              src={content.bgImageUrl}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 110vw, 1760px"
              className="object-cover object-[center_42%]"
            />
          </div>
        ) : null}
        <div className="absolute inset-0 bg-[rgba(50,50,50,0.63)]" />
      </div>

      <div className="container-site relative z-10 lg:-mt-14">
        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/45 sm:text-[11px] sm:tracking-[0.14em]">
          {content.locationTag}
        </p>

        <h1 className="mt-5 max-w-[701px] text-[clamp(1.75rem,5.35vw,4.8rem)] font-bold leading-[1.12] tracking-[-0.01em] text-white sm:mt-8 sm:leading-[1.14] sm:tracking-[-0.015em] lg:leading-[1.18]">
          <HighlightedTitle title={content.title} highlight={content.titleHighlight} />
        </h1>

        <p className="mt-4 max-w-[701px] text-[0.875rem] leading-[1.35] text-white sm:mt-[34px] sm:text-[clamp(1.0625rem,1.4vw,1.25rem)] sm:leading-[1.25]">
          {content.subtitle}
        </p>

        {/* Figma "Group 2070": two pill buttons, 42.05px tall, border-radius 100.118px (fully rounded), gap ~28px. */}
        <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-[34px] sm:gap-[28px]">
          <a
            href={telHref}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 text-[12px] font-bold leading-[19px] text-white transition hover:-translate-y-px hover:bg-white hover:text-[var(--accent)] sm:h-[42px] sm:px-7 sm:text-[13px]"
          >
            {content.ctaText} →
          </a>
          <a
            href="#services"
            className="inline-flex h-10 items-center justify-center rounded-full border border-white/60 px-5 text-[12px] font-bold leading-[19px] text-white transition hover:border-white hover:bg-white/10 sm:h-[42px] sm:px-7 sm:text-[13px]"
          >
            {content.ctaSecondaryText}
          </a>
        </div>
      </div>

      {/* Wave sits flush at the hero bottom (Figma "Vector": 1440x109.9, top 772 of 758+124). The notch reveals the photo, nothing dark below the section. */}
      <div className="absolute inset-x-0 -bottom-px z-10 h-[calc(clamp(2rem,7.64vw,6.875rem)+1px)]" aria-hidden>
        <svg
          className="block h-full w-full"
          viewBox="0 0 1440 110"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 5.72629e-05L574.464 6.14041e-06C612.572 2.74915e-06 640.123 36.0603 667.211 62.8639C680.944 76.4524 699.534 83.8816 720 83.8816C740.466 83.8816 759.056 76.4524 772.789 62.8639C799.877 36.0603 827.428 2.74916e-06 865.536 6.14042e-06L1440 5.72629e-05V109.9H0V5.72629e-05Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Scroll button -Figma Group 2063 / Ellipse 502: 59×59, #FFF; arrow → #DC1F26, rotate 90°. */}
      <a
        href="#specialization"
        className="scroll-arrow absolute bottom-6 left-1/2 z-20 grid size-11 place-items-center rounded-full bg-white sm:bottom-[48px] sm:size-[59px]"
        aria-label={locale === "ro" ? "Derulați" : "Прокрутить"}
      >
        <FiArrowDown strokeWidth={2.5} className="text-[18px] text-[#DC1F26] sm:text-[23px]" aria-hidden />
      </a>
    </AnimatedSection>
  );
}
