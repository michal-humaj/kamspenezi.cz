import type { Metadata } from "next";
import HomeCalculator from "./_home-calculator";
import { FAQSchema } from "@/components/seo/faq-schema";
import { CalculatorSchema } from "@/components/seo/calculator-schema";

export const metadata: Metadata = {
  title: "Vlastní bydlení, nebo nájem? Kalkulačka | kamspenezi.cz",
  description:
    "Zadej cenu bytu, hypotéku a nájem. Kalkulačka ti ukáže, kolik budeš mít po 30 letech – ať si koupíš, nebo zůstaneš v nájmu.",
  alternates: {
    canonical: "https://kamspenezi.cz",
  },
  openGraph: {
    title: "Vlastní bydlení, nebo nájem? Kalkulačka | kamspenezi.cz",
    description:
      "Zadej cenu bytu, hypotéku a nájem. Kalkulačka ti ukáže, kolik budeš mít po 30 letech – ať si koupíš, nebo zůstaneš v nájmu.",
    type: "website",
    url: "https://kamspenezi.cz",
    siteName: "kamspenezi.cz",
    locale: "cs_CZ",
    images: [
      {
        url: "/og/og-bydleni.png",
        width: 1200,
        height: 630,
        alt: "Vlastní bydlení nebo nájem? Kalkulačka kamspenezi.cz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vlastní bydlení, nebo nájem? Kalkulačka | kamspenezi.cz",
    description:
      "Zadej cenu bytu, hypotéku a nájem. Kalkulačka ti ukáže, kolik budeš mít po 30 letech – ať si koupíš, nebo zůstaneš v nájmu.",
    images: ["/og/og-bydleni.png"],
  },
};

export default function Home() {
  return (
    <>
      <FAQSchema />
      <CalculatorSchema />
      <HomeCalculator />
    </>
  );
}
