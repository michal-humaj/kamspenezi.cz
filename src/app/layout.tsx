import type { Metadata } from "next";
import { Figtree, Newsreader } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

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
  title: "kamspenezi.cz",
  description:
    "Nezávislá kalkulačka, která porovnává vlastní bydlení na hypotéku s nájmem a investicemi do ETF.",
  metadataBase: new URL("https://kamspenezi.cz"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body
        className={`${figtree.variable} ${newsreader.variable} bg-[var(--bg-page)] text-[var(--text-main)] antialiased`}
      >
        <div className="flex min-h-screen flex-col bg-[var(--bg-page)]">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
