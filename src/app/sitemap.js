const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gearbox.md";

export default function sitemap() {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          ru: `${siteUrl}?lang=ru`,
          ro: `${siteUrl}?lang=ro`,
        },
      },
    },
  ];
}
