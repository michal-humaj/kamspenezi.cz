import type { Metadata } from "next";
import InvesticePage from "./_investice-calculator";
import { InvesticeCalculatorSchema } from "@/components/seo/investice-calculator-schema";

export const metadata: Metadata = {
  title: "Investiční byt, nebo akciový fond? Kalkulačka | kamspenezi.cz",
  description:
    "Porovnej investiční byt na hypotéku s akciovým fondem. Kalkulačka spočítá čisté jmění za 30 let včetně daní a inflace.",
  alternates: {
    canonical: "https://kamspenezi.cz/investice",
  },
  openGraph: {
    title: "Investiční byt, nebo akciový fond? Kalkulačka | kamspenezi.cz",
    description:
      "Porovnej investiční byt na hypotéku s akciovým fondem. Kalkulačka spočítá čisté jmění za 30 let včetně daní a inflace.",
    type: "website",
    url: "https://kamspenezi.cz/investice",
    siteName: "kamspenezi.cz",
    locale: "cs_CZ",
    images: [
      {
        url: "/og/og-investice.png",
        width: 1200,
        height: 630,
        alt: "Investiční byt nebo akciový fond? Kalkulačka kamspenezi.cz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Investiční byt, nebo akciový fond? Kalkulačka | kamspenezi.cz",
    description:
      "Porovnej investiční byt na hypotéku s akciovým fondem. Kalkulačka spočítá čisté jmění za 30 let včetně daní a inflace.",
    images: ["/og/og-investice.png"],
  },
};

export default function Investice() {
  return (
    <>
      <InvesticeCalculatorSchema />
      <InvesticePage />
    </>
  );
}
