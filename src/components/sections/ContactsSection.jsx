"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FaFacebookF, FaInstagram, FaViber, FaWhatsapp } from "react-icons/fa";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SiteMap } from "@/components/maps/SiteMap";

function SocialLink({ href, icon, label }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[var(--line)] bg-white px-4 py-2.5 text-[13px] font-medium text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] sm:px-5"
    >
      <span className="shrink-0 text-[15px] leading-none" aria-hidden="true">
        {icon}
      </span>
      {label}
    </a>
  );
}

function formatAddressLines(address) {
  if (!address) return { city: "", street: "" };
  const parts = address.split(",").map((part) => part.trim()).filter(Boolean);
  if (parts.length <= 1) return { city: address, street: "" };
  return { city: parts[0], street: parts.slice(1).join(", ") };
}

export function ContactsSection({ content, locale }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const isRo = locale === "ro";
  const addressLines = formatAddressLines(content.address);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email") || undefined,
          message: formData.get("message") || undefined,
          website: formData.get("website") || "",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Ошибка отправки");
        return;
      }

      setSuccess(true);
      form.reset();
      toast.success(isRo ? "Cererea a fost trimisă!" : "Заявка отправлена!");
    } catch {
      toast.error(isRo ? "Eroare de conexiune" : "Ошибка соединения");
    } finally {
      setLoading(false);
    }
  }

  const socials = content.socials || {};

  return (
    <AnimatedSection id="contacts" className="bg-white pb-16 pt-16 md:pb-24 md:pt-24">
      <div className="container-site">
        <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--ink-muted)]">
          {content.label}
        </p>
        <h2 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-medium text-[var(--ink)]">{content.title}</h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-start">
          <SiteMap
            map={content.map}
            locale={locale}
            address={content.address}
            heightClassName="h-[380px] w-full lg:h-[520px]"
          />

          <div>
            <div className="overflow-hidden rounded-[16px] border border-[var(--line)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 sm:divide-x sm:divide-[var(--line)]">
                <div className="border-b border-[var(--line)] p-8 sm:border-b">
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
                    {isRo ? "Telefon" : "Телефон"}
                  </p>
                  <div className="mt-3 space-y-1.5">
                    {(content.phones || []).map((phone, index) => (
                      <p
                        key={phone}
                        className={
                          index === 0
                            ? "text-[15px] font-semibold text-[var(--ink)]"
                            : "text-[15px] font-medium text-[var(--ink-muted)]"
                        }
                      >
                        <a href={`tel:${phone.replace(/[^\d+]/g, "")}`}>{phone}</a>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="border-b border-[var(--line)] p-8 sm:border-b">
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--ink-muted)]">Email</p>
                  <p className="mt-3 text-[15px] font-medium text-[var(--ink)]">
                    <a href={`mailto:${content.email}`}>{content.email}</a>
                  </p>
                </div>

                <div className="border-b border-[var(--line)] p-8 sm:border-b-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
                    {isRo ? "Adresă" : "Адрес"}
                  </p>
                  <div className="mt-3 text-[15px]">
                    <p className="font-semibold text-[var(--ink)]">{addressLines.city}</p>
                    {addressLines.street ? (
                      <p className="mt-1 font-medium text-[var(--ink-muted)]">{addressLines.street}</p>
                    ) : null}
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
                    {isRo ? "Program" : "Часы работы"}
                  </p>
                  <div className="mt-3 space-y-1 text-[15px]">
                    <p className="font-semibold text-[var(--ink)]">{content.hoursWeekday}</p>
                    <p className="font-medium text-[var(--ink-muted)]">{content.hoursSaturday}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-6 sm:gap-3">
              <SocialLink href={socials.viber} icon={<FaViber />} label="Viber" />
              <SocialLink href={socials.whatsapp} icon={<FaWhatsapp />} label="WhatsApp" />
              <SocialLink href={socials.instagram} icon={<FaInstagram />} label="Instagram" />
              <SocialLink href={socials.facebook} icon={<FaFacebookF />} label="Facebook" />
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4 rounded-[16px] border border-[var(--line)] p-8"
          noValidate
        >
          <h3 className="text-lg font-semibold text-[var(--ink)]">{content.formTitle}</h3>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          {success ? (
            <p className="text-sm text-green-600">
              {isRo ? "Vă mulțumim! Vă contactăm în curând." : "Спасибо! Мы свяжемся с вами."}
            </p>
          ) : null}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1 text-sm text-[var(--ink)]">
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--ink-muted)]">
                {content.formNameLabel}
              </span>
              <input
                name="name"
                required
                className="rounded-lg border border-[var(--line)] bg-white px-4 py-2.5 text-sm text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none"
              />
            </label>
            <label className="grid gap-1 text-sm text-[var(--ink)]">
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--ink-muted)]">
                {content.formPhoneLabel}
              </span>
              <input
                name="phone"
                type="tel"
                required
                className="rounded-lg border border-[var(--line)] bg-white px-4 py-2.5 text-sm text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none"
              />
            </label>
            <label className="grid gap-1 text-sm text-[var(--ink)]">
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--ink-muted)]">
                {content.formEmailLabel}
              </span>
              <input
                name="email"
                type="email"
                className="rounded-lg border border-[var(--line)] bg-white px-4 py-2.5 text-sm text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none"
              />
            </label>
            <label className="grid gap-1 text-sm text-[var(--ink)] sm:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--ink-muted)]">
                {content.formMessageLabel}
              </span>
              <textarea
                name="message"
                rows={3}
                className="rounded-lg border border-[var(--line)] bg-white px-4 py-2.5 text-sm text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none"
              />
            </label>
          </div>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "..." : content.formSubmitLabel}
          </button>
        </form>
      </div>
    </AnimatedSection>
  );
}
