import type { Metadata } from "next";
import HomeCalculator from "./_home-calculator";

export const metadata: Metadata = {
  title: "Bydlet ve vlastním, nebo v nájmu? | kamspenezi.cz",
  description:
    "Zadej parametry bytu a hypotéky. Kalkulačka porovná čisté jmění po 30 letech vlastního bydlení vs. nájmu s investicí.",
  alternates: {
    canonical: "https://kamspenezi.cz",
  },
  openGraph: {
    title: "Bydlet ve vlastním, nebo v nájmu? | kamspenezi.cz",
    description:
      "Zadej parametry bytu a hypotéky. Kalkulačka porovná čisté jmění po 30 letech vlastního bydlení vs. nájmu s investicí.",
    type: "website",
    url: "https://kamspenezi.cz/koupit-nebo-pronajmout",
    siteName: "kamspenezi.cz",
    locale: "cs_CZ",
    images: [
      {
        url: "/og/og-bydleni.png",
        width: 1200,
        height: 630,
        alt: "Bydlet ve vlastním, nebo v nájmu? Kalkulačka kamspenezi.cz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bydlet ve vlastním, nebo v nájmu? | kamspenezi.cz",
    description:
      "Zadej parametry bytu a hypotéky. Kalkulačka porovná čisté jmění po 30 letech vlastního bydlení vs. nájmu s investicí.",
    images: ["/og/og-bydleni.png"],
  },
};

export default function Home() {
  return <HomeCalculator />;
}
