import { Toaster } from "sonner";

import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { getSectionByKey, getSiteSettings } from "@/db/queries";
import { getSectionContent, getSiteLocaleServer } from "@/lib/site-locale";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gearbox.md";

export async function generateMetadata() {
  const locale = await getSiteLocaleServer();
  const settings = await getSiteSettings();
  const isRo = locale === "ro";
  const title = isRo ? settings.seoTitleRo : settings.seoTitleRu;
  const description = isRo ? settings.seoDescRo : settings.seoDescRu;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: "/",
      languages: {
        ru: `${siteUrl}?lang=ru`,
        ro: `${siteUrl}?lang=ro`,
      },
    },
    openGraph: {
      type: "website",
      locale: isRo ? "ro_MD" : "ru_MD",
      url: siteUrl,
      title,
      description,
      images: [{ url: "/img/Logo_GearBox.webp", width: 512, height: 512, alt: "GearBox" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/img/Logo_GearBox.webp"],
    },
    robots: { index: true, follow: true },
    icons: { icon: "/img/Logo_GearBox.webp" },
  };
}

export default async function SiteLayout({ children }) {
  const locale = await getSiteLocaleServer();
  const settings = await getSiteSettings();
  const contactsSection = await getSectionByKey("contacts");
  const footerSection = await getSectionByKey("footer");
  const contacts = getSectionContent(contactsSection, locale) || {};
  const footer = getSectionContent(footerSection, locale) || {};
  const phone = contacts.phones?.[0] || "";

  return (
    <>
      <LocalBusinessJsonLd locale={locale} contacts={contacts} settings={settings} />
      <Toaster position="top-right" />
      <SiteHeader locale={locale} phone={phone} />
      <main className="min-h-screen bg-white">{children}</main>
      <SiteFooter
        content={footer}
        locale={locale}
        phones={contacts.phones || []}
        email={contacts.email}
        address={contacts.address}
        hours={contacts.hoursWeekday}
      />
    </>
  );
}
