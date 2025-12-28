"use client";

import Link from "next/link";
import { MessageSquare, Mail, Copy, Check, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TrustPageHero } from "@/components/shared/TrustPageHero";
import { CalloutBox } from "@/components/shared/CalloutBox";
import { useCrispChat } from "@/components/chat/CrispChat";
import { trackTrustPageEvent } from "@/lib/analytics";

export default function KontaktPage() {
  const { openChat } = useCrispChat();
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("michal.humaj@gmail.com");
      setEmailCopied(true);
      trackTrustPageEvent("click_contact_email", "copy");
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      window.location.href = "mailto:michal.humaj@gmail.com";
    }
  };

  const handleOpenChat = () => {
    openChat();
  };

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {/* Hero Section */}
      <section 
        className="pt-8 pb-10 md:pt-12 md:pb-14"
        style={{ background: 'var(--bg-base)' }}
      >
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          {/* Breadcrumbs */}
          <nav 
            aria-label="Breadcrumb" 
            className="flex items-center gap-1.5 text-sm font-uiSans mb-6"
          >
            <Link
              href="/"
              className="transition-colors hover:underline"
              style={{ color: 'var(--color-secondary)' }}
            >
              Domů
            </Link>
            <span style={{ color: 'var(--color-bullet)' }}>›</span>
            <span 
              className="font-medium"
              style={{ color: 'var(--color-primary)' }}
            >
              Kontakt
            </span>
          </nav>

          {/* H1 Title */}
          <h1 className="font-displaySerif text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Kontakt
          </h1>

          {/* Subtitle */}
          <p 
            className="mt-4 text-base leading-relaxed md:text-lg max-w-2xl"
            style={{ color: 'var(--color-secondary)' }}
          >
            Máte dotaz ke kalkulačce? Něco nefunguje? Chcete nahlásit chybu nebo nepřesnost v datech? 
            Napište nám – odpovídáme do 24–48 hodin.
          </p>
        </div>
      </section>

      {/* Contact Options Section */}
      <section 
        className="py-12 md:py-16"
        style={{ background: 'var(--bg-lilac-section)' }}
      >
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Chat Option */}
            <div 
              className="rounded-3xl border p-6 md:p-8"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--color-border)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div 
                className="h-12 w-12 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: 'var(--scenario-b-bg)' }}
              >
                <MessageSquare 
                  className="h-6 w-6"
                  style={{ color: 'var(--scenario-b-dot)' }}
                />
              </div>
              <h2 
                className="font-uiSans font-semibold text-xl mb-2"
                style={{ color: 'var(--color-primary)' }}
              >
                Chat
              </h2>
              <p 
                className="font-uiSans text-sm mb-4"
                style={{ color: 'var(--color-secondary)' }}
              >
                Nejrychlejší způsob, jak se nám ozvat. Pokud nejsme online, necháte nám offline zprávu.
              </p>
              <Button onClick={handleOpenChat} className="w-full">
                Otevřít chat
              </Button>
            </div>

            {/* Email Option */}
            <div 
              className="rounded-3xl border p-6 md:p-8"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--color-border)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div 
                className="h-12 w-12 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: 'var(--scenario-a-bg)' }}
              >
                <Mail 
                  className="h-6 w-6"
                  style={{ color: 'var(--scenario-a-dot)' }}
                />
              </div>
              <h2 
                className="font-uiSans font-semibold text-xl mb-2"
                style={{ color: 'var(--color-primary)' }}
              >
                Email
              </h2>
              <p 
                className="font-uiSans text-sm mb-4"
                style={{ color: 'var(--color-secondary)' }}
              >
                Preferujete klasický email? Napište na adresu níže.
              </p>
              <div className="flex gap-2">
                <a
                  href="mailto:michal.humaj@gmail.com"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--bg-hover)]"
                  style={{
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-primary)',
                  }}
                  onClick={() => trackTrustPageEvent("click_contact_email", "mailto")}
                >
                  michal.humaj@gmail.com
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center rounded-full border px-3 transition-colors hover:bg-[var(--bg-hover)]"
                  style={{
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-secondary)',
                  }}
                  title="Zkopírovat email"
                >
                  {emailCopied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Share Link Instructions Section */}
      <section className="py-12 md:py-16" style={{ background: 'var(--bg-base)' }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl mb-3">
            Jak poslat odkaz na svůj výpočet
          </h2>
          <p 
            className="text-base mb-6"
            style={{ color: 'var(--color-secondary)' }}
          >
            Chcete, abychom se podívali na vaše konkrétní nastavení? Pošlete nám odkaz na váš výpočet.
          </p>

          <div 
            className="rounded-2xl border p-6"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--color-border)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <ol className="space-y-4">
              {[
                {
                  step: 1,
                  title: "Otevřete kalkulačku",
                  desc: "Přejděte na hlavní stránku a nastavte své parametry.",
                },
                {
                  step: 2,
                  title: "Nastavte své hodnoty",
                  desc: "Vyberte město, dispozici a upravte parametry podle vaší situace.",
                },
                {
                  step: 3,
                  title: "Zkopírujte URL z adresního řádku",
                  desc: "Odkaz obsahuje vaše nastavení – můžete ho poslat komukoli.",
                },
                {
                  step: 4,
                  title: "Pošlete nám ho v chatu nebo emailu",
                  desc: "Popište svůj dotaz a přiložte odkaz.",
                },
              ].map((item) => (
                <li key={item.step} className="flex gap-4">
                  <span 
                    className="flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center text-sm font-semibold"
                    style={{
                      background: 'var(--bg-lilac-section)',
                      color: 'var(--color-primary)',
                    }}
                  >
                    {item.step}
                  </span>
                  <div>
                    <p 
                      className="font-uiSans font-medium"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {item.title}
                    </p>
                    <p 
                      className="font-uiSans text-sm"
                      style={{ color: 'var(--color-secondary)' }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <Button asChild variant="secondary">
                <Link href="/#zacni-mestem">
                  Otevřít kalkulačku →
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Common Questions Section */}
      <section 
        className="py-12 md:py-16"
        style={{ background: 'var(--bg-lilac-section)' }}
      >
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl mb-6">
            Než napíšete
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                question: "Nerozumím, co scénář A a B znamenají",
                link: "/jak-to-funguje",
                linkText: "Vysvětlení scénářů",
              },
              {
                question: "Chci vědět, odkud berete data",
                link: "/metodika-a-zdroje",
                linkText: "Metodika a zdroje",
              },
              {
                question: "Nevím, jaké hodnoty zadat",
                link: "/#zacni-mestem",
                linkText: "Začněte městem – defaulty se doplní",
              },
              {
                question: "Výsledky mi nepřijdou reálné",
                link: "/metodika-a-zdroje#sources-investice",
                linkText: "Podívejte se na předpoklady",
              },
            ].map((item) => (
              <Link
                key={item.question}
                href={item.link}
                className="group rounded-2xl border p-5 transition-all duration-200 hover:shadow-lg flex items-start gap-4"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <div className="flex-1">
                  <p 
                    className="font-uiSans font-medium mb-1"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {item.question}
                  </p>
                  <p 
                    className="font-uiSans text-sm group-hover:underline"
                    style={{ color: 'var(--scenario-b-dot)' }}
                  >
                    {item.linkText} →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 md:py-10" style={{ background: 'var(--bg-base)' }}>
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <CalloutBox variant="info">
            <p>
              Neposkytujeme finanční poradenství. Odpovídáme na dotazy k fungování kalkulačky, 
              metodice a zdrojům dat. Pro osobní finanční plánování se obraťte na licencovaného poradce.
            </p>
          </CalloutBox>
        </div>
      </section>
    </main>
  );
}

