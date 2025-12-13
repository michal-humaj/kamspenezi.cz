import type { Metadata, Viewport } from "next";
import { Figtree, Newsreader } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ui-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kalkulačka bydlení: Spočítej si vlastní vs. nájem | kamspenezi.cz",
  description:
    "Zadej kupní cenu bytu, hypotéku a nájem. Porovnej, kolik ti vyjde po 30 letech vlastní bydlení na hypotéku vs. nájem + investice do ETF. Transparentní výpočet s daty z Prahy, Brna, Ostravy a dalších měst.",
  keywords: [
    "kalkulačka hypotéky",
    "spočítat hypotéku",
    "nájem vs vlastní",
    "kalkulačka bydlení Praha",
    "kalkulačka ETF",
    "investice vs hypotéka",
    "koupit nebo pronajímat",
  ],
  metadataBase: new URL("https://kamspenezi.cz"),
  openGraph: {
    title: "Kalkulačka bydlení: Spočítej si vlastní vs. nájem",
    description:
      "Zadej kupní cenu bytu, hypotéku a nájem. Porovnej, kolik ti vyjde po 30 letech.",
    type: "website",
    locale: "cs_CZ",
    url: "https://kamspenezi.cz",
    siteName: "kamspenezi.cz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalkulačka bydlení: Spočítej si vlastní vs. nájem",
    description:
      "Zadej kupní cenu bytu, hypotéku a nájem. Porovnej, kolik ti vyjde po 30 letech.",
  },
  alternates: {
    canonical: "https://kamspenezi.cz",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // DO NOT set maximumScale or userScalable=no - this prevents Safari zoom but also breaks accessibility
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body
        className={`${figtree.variable} ${newsreader.variable} antialiased`}
        style={{
          margin: 0,
          padding: 0,
          background: 'var(--bg-base)',
          color: 'var(--color-primary)',
        }}
      >
        <GoogleAnalytics />
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
