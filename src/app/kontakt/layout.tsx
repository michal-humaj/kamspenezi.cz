import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt | kamspenezi.cz",
  description: "Máte dotaz ke kalkulačce bydlení? Napište nám přes chat nebo email. Odpovídáme do 24-48 hodin.",
  openGraph: {
    title: "Kontakt | kamspenezi.cz",
    description: "Máte dotaz ke kalkulačce bydlení? Napište nám přes chat nebo email.",
    type: "website",
    locale: "cs_CZ",
    url: "https://kamspenezi.cz/kontakt",
    siteName: "kamspenezi.cz",
    images: [{ url: "/hero-couch.webp", width: 1600, height: 873 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt | kamspenezi.cz",
    description: "Máte dotaz ke kalkulačce bydlení? Napište nám přes chat nebo email.",
    images: ["/hero-couch.webp"],
  },
  alternates: {
    canonical: "https://kamspenezi.cz/kontakt",
  },
};

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

