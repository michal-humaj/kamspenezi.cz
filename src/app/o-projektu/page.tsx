import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Mail, Share2, Bug, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustPageHero } from "@/components/shared/TrustPageHero";
import { CalloutBox } from "@/components/shared/CalloutBox";

export const metadata: Metadata = {
  title: "O projektu | kamspenezi.cz",
  description: "Kdo stojí za kalkulačkou kamspenezi.cz, proč vznikla a jaké jsou její principy. Nezávislý nástroj bez provizí a reklam.",
  openGraph: {
    title: "O projektu | kamspenezi.cz",
    description: "Kdo stojí za kalkulačkou kamspenezi.cz, proč vznikla a jaké jsou její principy.",
    type: "website",
    locale: "cs_CZ",
    url: "https://kamspenezi.cz/o-projektu",
    siteName: "kamspenezi.cz",
    images: [{ url: "/hero-couch.webp", width: 1600, height: 873 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "O projektu | kamspenezi.cz",
    description: "Kdo stojí za kalkulačkou kamspenezi.cz, proč vznikla a jaké jsou její principy.",
    images: ["/hero-couch.webp"],
  },
  alternates: {
    canonical: "https://kamspenezi.cz/o-projektu",
  },
};

export default function OProjektuPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {/* Hero Section */}
      <TrustPageHero
        breadcrumbs={[
          { label: "Domů", href: "/" },
          { label: "O projektu" },
        ]}
        title="O projektu kamspenezi.cz"
        subtitle="Nezávislá kalkulačka pro lidi v Česku, kteří chtějí dělat informovaná rozhodnutí o bydlení. Bez provizí, bez reklam, bez prodeje."
      />

      {/* Neutralita Section */}
      <section 
        className="py-12 md:py-16"
        style={{ background: 'var(--bg-lilac-section)' }}
      >
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl mb-6">
            Proč to děláme
          </h2>

          <div className="space-y-6">
            <CalloutBox variant="info" title="Žádné provize, žádný prodej">
              <p>
                Nebereme provize od bank, realitních kanceláří ani investičních společností. 
                Neprodáváme hypotéky, nemovitosti ani investiční produkty. 
                Kalkulačka je nástroj pro vaše informované rozhodnutí – ne marketingový trychtýř.
              </p>
            </CalloutBox>

            <div 
              className="rounded-2xl border p-6 md:p-8"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--color-border)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <p 
                className="font-uiSans text-base leading-relaxed mb-4"
                style={{ color: 'var(--color-secondary)' }}
              >
                Otázka &bdquo;koupit, nebo pronajímat?&ldquo; je jedna z největších finančních rozhodnutí v životě. 
                Přesto většina lidí nemá přístup k nástroji, který by ji férově porovnal.
              </p>
              <p 
                className="font-uiSans text-base leading-relaxed"
                style={{ color: 'var(--color-secondary)' }}
              >
                Typické kalkulačky porovnávají jen splátku hypotéky s nájmem – a ignorují, 
                co by se stalo s penězi, kdybyste je investovali místo koupě nemovitosti. 
                To jsme chtěli změnit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Jak to funguje Section */}
      <section className="py-12 md:py-16" style={{ background: 'var(--bg-base)' }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl mb-6">
            Jak projekt funguje
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Veřejná data",
                desc: "Defaultní hodnoty (ceny bytů, nájmy, sazby) čerpáme z veřejných zdrojů: ČSÚ, CBA Monitor, ČNB. Každý zdroj je zdokumentovaný.",
              },
              {
                title: "Transparentní metodika",
                desc: "Všechny vzorce a předpoklady jsou popsané v metodice. Můžete si ověřit, jak výpočet funguje, v přiloženém Google Sheetu.",
              },
              {
                title: "Otevřená zpětná vazba",
                desc: "Pokud najdete chybu nebo máte lepší zdroj dat, napište nám. Projekt se vyvíjí díky zpětné vazbě od uživatelů.",
              },
            ].map((item) => (
              <div 
                key={item.title}
                className="rounded-2xl border p-6"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--color-border)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <h3 
                  className="font-uiSans font-semibold text-lg mb-3"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {item.title}
                </h3>
                <p 
                  className="font-uiSans text-sm leading-relaxed"
                  style={{ color: 'var(--color-secondary)' }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kdo za tím stojí Section */}
      <section 
        className="py-12 md:py-16"
        style={{ background: 'var(--bg-lilac-section)' }}
      >
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl mb-6">
            Kdo za tím stojí
          </h2>

          <div 
            className="rounded-3xl border p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--color-border)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            {/* Photo */}
            <div className="flex-shrink-0">
              <Image
                src="/michal.jpeg"
                alt="Michal Humaj"
                width={120}
                height={120}
                className="rounded-2xl object-cover"
                style={{ aspectRatio: '1/1' }}
              />
            </div>

            {/* Bio */}
            <div className="flex-1">
              <h3 
                className="font-uiSans font-semibold text-xl mb-1"
                style={{ color: 'var(--color-primary)' }}
              >
                Michal Humaj
              </h3>
              <p 
                className="font-uiSans text-sm mb-4"
                style={{ color: 'var(--color-secondary)' }}
              >
                Produktový manažer a investor
              </p>
              <p 
                className="font-uiSans text-base leading-relaxed mb-4"
                style={{ color: 'var(--color-secondary)' }}
              >
                Kalkulačku jsem postavil hlavně pro sebe, abych porovnal vlastní bydlení s nájmem 
                a investicemi. Řeším stejné otázky jako vy &ndash; a chtěl jsem mít nástroj, 
                kterému můžu věřit a který si můžu ověřit.
              </p>
              <div className="flex gap-3">
                <Button variant="secondary" size="sm" asChild>
                  <Link href="/kontakt">
                    <Mail className="h-4 w-4 mr-2" />
                    Napsat
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jak můžeš pomoct Section */}
      <section className="py-12 md:py-16" style={{ background: 'var(--bg-base)' }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl mb-6">
            Jak můžeš pomoct
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: MessageSquare,
                title: "Pošli zpětnou vazbu",
                desc: "Něco nefunguje? Něco není jasné? Dej nám vědět.",
                href: "/kontakt",
              },
              {
                icon: Share2,
                title: "Sdílej kalkulačku",
                desc: "Znáš někoho, kdo řeší bydlení? Pošli mu odkaz.",
                href: "/",
              },
              {
                icon: Bug,
                title: "Nahlas chybu",
                desc: "Našel jsi bug nebo nepřesnost v datech? Naprav nás.",
                href: "/kontakt",
              },
            ].map((item) => (
              <Link 
                key={item.title}
                href={item.href}
                className="group rounded-2xl border p-5 transition-all duration-200 hover:shadow-lg"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <item.icon 
                  className="h-6 w-6 mb-3"
                  style={{ color: 'var(--color-primary)' }}
                />
                <h3 
                  className="font-uiSans font-semibold text-base mb-1 group-hover:underline"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {item.title}
                </h3>
                <p 
                  className="font-uiSans text-sm"
                  style={{ color: 'var(--color-secondary)' }}
                >
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section 
        className="py-8 md:py-10"
        style={{ background: 'var(--bg-lilac-section)' }}
      >
        <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
          <p 
            className="font-uiSans text-sm"
            style={{ color: 'var(--color-secondary)' }}
          >
            Obsah této stránky není finanční poradenství. Kalkulačka je nástroj pro orientační porovnání 
            a nenahrazuje konzultaci s odborníkem.
          </p>
        </div>
      </section>

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "kamspenezi.cz",
            "url": "https://kamspenezi.cz",
            "logo": "https://kamspenezi.cz/logo-mark.svg",
            "description": "Nezávislá kalkulačka pro lidi v Česku, kteří chtějí dělat informovaná rozhodnutí o bydlení a investicích.",
            "founder": {
              "@type": "Person",
              "name": "Michal Humaj",
              "jobTitle": "Produktový manažer a investor"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "michal.humaj@gmail.com",
              "contactType": "Customer Service"
            }
          })
        }}
      />

      {/* Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Michal Humaj",
            "jobTitle": "Produktový manažer a investor",
            "description": "Produktový manažer a investor. Kalkulačku jsem postavil hlavně pro sebe, abych porovnal vlastní bydlení s nájmem a investicemi.",
            "image": "https://kamspenezi.cz/michal.jpeg",
            "url": "https://kamspenezi.cz/o-projektu",
            "worksFor": {
              "@type": "Organization",
              "name": "kamspenezi.cz"
            },
            "knowsAbout": [
              "Personal Finance",
              "Real Estate Investment",
              "Investment Strategy",
              "Product Management"
            ]
          })
        }}
      />
    </main>
  );
}

