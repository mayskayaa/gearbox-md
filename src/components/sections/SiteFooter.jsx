import Link from "next/link";

import { SiteImage } from "@/components/ui/SiteImage";

const DEFAULT_LOGO = "/img/Group 15.png";

const DEFAULT_NAV_LINKS = {
  ru: [
    { label: "Услуги", href: "#services" },
    { label: "О нас", href: "#about" },
    { label: "Контакты", href: "#contacts" },
  ],
  ro: [
    { label: "Servicii", href: "#services" },
    { label: "Despre noi", href: "#about" },
    { label: "Contacte", href: "#contacts" },
  ],
};

export function SiteFooter({ content = {}, locale, phones = [], email, address, hours }) {
  const year = new Date().getFullYear();
  const isRo = locale === "ro";
  const logoUrl = content.logoUrl || DEFAULT_LOGO;
  const navTitle = content.navTitle || (isRo ? "Navigare" : "Навигация");
  const addressTitle = content.addressTitle || (isRo ? "Adresă" : "Адрес");
  const contactsTitle = content.contactsTitle || (isRo ? "Contacte" : "Контакты");
  const navLinks = content.navLinks?.length ? content.navLinks : DEFAULT_NAV_LINKS[isRo ? "ro" : "ru"];
  const copyrightLocation =
    content.copyrightLocation || (isRo ? "Chișinău, Moldova." : "Кишинёв, Молдова.");

  const addressLines = (address || (isRo ? "Chișinău, Calea Ghidighici, 4" : "Кишинёв, Calea Ghidighici, 4"))
    .split(/,\s*(.+)/)
    .filter(Boolean);

  return (
    <footer className="bg-[var(--footer-dark)] pb-8 pt-14 text-white md:min-h-[320px] md:pb-12 md:pt-20">
      <div className="container-site flex flex-col md:min-h-[224px]">
        <div className="flex min-w-0 flex-row items-start justify-between gap-3 sm:gap-6 md:gap-10">
          <Link href="/" className="block shrink-0">
            <SiteImage
              src={logoUrl}
              alt="GearBox"
              width={320}
              height={88}
              className="h-7 w-auto max-w-[148px] sm:h-9 sm:max-w-[200px] md:h-[72px] md:max-w-[320px]"
            />
          </Link>

          <div className="grid min-w-0 grid-cols-[auto_auto_auto] gap-2 sm:gap-6 md:gap-20 lg:gap-28">
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.1em] text-white/55 sm:text-[10px] md:text-[12px] md:tracking-[0.15em]">
                {navTitle}
              </p>
              <ul className="mt-1.5 space-y-1 text-[9px] font-semibold sm:mt-2.5 sm:space-y-1.5 sm:text-xs md:mt-4 md:space-y-2 md:text-[15px]">
                {navLinks.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <a href={link.href} className="hover:text-white/70">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.1em] text-white/55 sm:text-[10px] md:text-[12px] md:tracking-[0.15em]">
                {addressTitle}
              </p>
              <ul className="mt-1.5 space-y-1 text-[9px] font-semibold sm:mt-2.5 sm:space-y-1.5 sm:text-xs md:mt-4 md:space-y-2 md:text-[15px]">
                {addressLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
                {hours ? <li>{hours}</li> : null}
              </ul>
            </div>

            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.1em] text-white/55 sm:text-[10px] md:text-[12px] md:tracking-[0.15em]">
                {contactsTitle}
              </p>
              <ul className="mt-1.5 space-y-1 text-[9px] font-semibold sm:mt-2.5 sm:space-y-1.5 sm:text-xs md:mt-4 md:space-y-2 md:text-[15px]">
                {phones.map((phone) => (
                  <li key={phone}>
                    <a href={`tel:${phone.replace(/[^\d+]/g, "")}`}>{phone}</a>
                  </li>
                ))}
                {email ? (
                  <li className="[overflow-wrap:anywhere]">
                    <a href={`mailto:${email}`}>{email}</a>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 text-[9px] text-white/55 sm:mt-10 sm:text-xs md:mt-auto md:pt-10">
          © {year} GearBox ATCC. {copyrightLocation}
        </div>
      </div>
    </footer>
  );
}
