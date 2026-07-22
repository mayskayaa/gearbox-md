import "./globals.css";

import { Bebas_Neue, Inter, Mulish } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { getSiteLocaleServer } from "@/lib/site-locale";

const mulish = Mulish({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-mulish",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

export default async function RootLayout({ children }) {
  const locale = await getSiteLocaleServer();

  return (
    <html
      lang={locale === "ro" ? "ro" : "ru"}
      data-scroll-behavior="smooth"
      className={`${mulish.variable} ${inter.variable} ${bebasNeue.variable}`}
    >
      <body className="bg-white antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
