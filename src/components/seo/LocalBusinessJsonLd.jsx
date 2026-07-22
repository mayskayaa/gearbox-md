import { getGoogleMapsOpenUrl, resolveMapConfig } from "@/lib/google-maps";
import { SITE_LOCATION } from "@/lib/site-location";

export function LocalBusinessJsonLd({ locale, contacts, settings }) {
  const isRo = locale === "ro";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gearbox.md";
  const map = resolveMapConfig(contacts?.map);
  const addressText = contacts?.address || "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: map.placeName || "GearBox ATCC",
    url: siteUrl,
    image: `${siteUrl}/img/Logo_GearBox.webp`,
    telephone: contacts?.phones || [],
    email: contacts?.email || "service@gearbox.md",
    address: {
      "@type": "PostalAddress",
      streetAddress: addressText.includes(",") ? addressText.split(",").slice(1).join(",").trim() : SITE_LOCATION.streetAddress,
      addressLocality: isRo ? SITE_LOCATION.locality.ro : SITE_LOCATION.locality.ru,
      postalCode: SITE_LOCATION.postalCode,
      addressCountry: SITE_LOCATION.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: map.latitude,
      longitude: map.longitude,
    },
    hasMap: getGoogleMapsOpenUrl(map),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    description: isRo ? settings?.seoDescRo : settings?.seoDescRu,
    areaServed: "Chișinău",
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
