"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function ServicesSection({ content }) {
  const items = content?.items || [];
  const [openNum, setOpenNum] = useState(null);

  return (
    <AnimatedSection id="services" className="bg-white pt-8">
      <div className="container-site">
        <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--ink-muted)]">
          {content.label}
        </p>
        <h2 className="mt-4 text-[clamp(2.25rem,5vw,3.5rem)] font-medium text-[var(--ink)]">{content.title}</h2>

        <div className="mt-10 divide-y divide-[var(--line)] border-t border-[var(--line)]">
          {items.map((item) => {
            const isOpen = openNum === item.num;

            return (
              <div
                key={item.num}
                className="group md:grid md:grid-cols-[3rem_1fr_1.4fr] md:items-center md:gap-8 md:py-7"
              >
                {/* Mobile: tappable row, description expands below */}
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenNum(isOpen ? null : item.num)}
                  className="flex w-full min-w-0 items-center gap-2 py-6 text-left sm:gap-4 md:hidden"
                >
                  <span className="shrink-0 text-sm font-semibold text-[var(--ink-muted)]">{item.num}</span>
                  <h3 className="min-w-0 flex-1 break-words text-[clamp(1rem,4.8vw,1.5rem)] font-medium leading-tight text-[var(--ink)]">
                    {item.title}
                  </h3>
                  <FiChevronDown
                    aria-hidden="true"
                    className={`shrink-0 text-xl text-[var(--ink-muted)] transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[var(--accent)]" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pl-9 pr-2 text-[15px] text-[var(--ink-muted)]">{item.description}</p>
                  </div>
                </div>

                {/* Desktop: static three-column row */}
                <span className="hidden text-sm font-semibold text-[var(--ink-muted)] md:block">{item.num}</span>
                <h3 className="hidden text-[clamp(1.25rem,2.4vw,1.875rem)] font-medium text-[var(--ink)] transition-colors group-hover:text-[var(--accent)] md:block">
                  {item.title}
                </h3>
                <p className="hidden text-[var(--ink-muted)] md:block">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
