import type { Metadata } from "next";
import { CalculatorSchema } from "@/components/seo/calculator-schema";

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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Kalkulačka bydlení: Spočítej si vlastní vs. nájem",
    description:
      "Zadej kupní cenu bytu, hypotéku a nájem. Porovnej, kolik ti vyjde po 30 letech.",
    type: "website",
    locale: "cs_CZ",
    url: "https://kamspenezi.cz/bydleni-kalkulacka",
    siteName: "kamspenezi.cz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalkulačka bydlení: Spočítej si vlastní vs. nájem",
    description:
      "Zadej kupní cenu bytu, hypotéku a nájem. Porovnej, kolik ti vyjde po 30 letech.",
  },
  alternates: {
    canonical: "https://kamspenezi.cz/bydleni-kalkulacka",
  },
};

export default function BydleniKalkulackaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CalculatorSchema />
      {children}
    </>
  );
}

