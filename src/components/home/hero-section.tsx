"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const HERO_BULLETS = [
  "Počítáme s realistickými předpoklady výnosů globálních ETF",
  "Pracujeme s daty pro Prahu, Brno, Ostravu, Plzeň a další města",
  <>
    Vzorce jsou transparentní a můžeš si je projít v{" "}
    <a
      href="https://docs.google.com/spreadsheets/d/1blGZCUIqjqSQ-mQ_rB6GP3eSEsf_JTKHQb1ETODUOXA/edit?usp=sharing"
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2 transition-colors duration-180 ease-premium hover:text-kp-primary"
    >
      Google Sheets krok za krokem
    </a>
  </>,
];

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="bg-[var(--bg-base)] pt-6 pb-16 md:pt-10 md:pb-24">
      <div className="mx-auto w-full max-w-6xl px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left: Copy and CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <span 
              className="inline-flex items-center px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#6B7280] font-uiSans"
              style={{ 
                background: 'var(--bg-alt)', 
                borderRadius: 'var(--radius-pill)' 
              }}
            >
              Online kalkulačka bydlení
            </span>
            
            <h1 className="mt-5 text-[clamp(36px,5vw,52px)] leading-[1.1] tracking-tight">
              Bydlet ve vlastním, nebo v nájmu
            </h1>

            <p className="mt-4 max-w-xl text-lg text-[#4B5563] md:text-xl font-uiSans leading-relaxed">
              Kalkulačka porovná dvě cesty: koupit byt na hypotéku, nebo bydlet v nájmu a rozdíl v platbách investovat do ETF. Uvidíš, jaký majetek ti vyjde po třiceti letech.
            </p>

            <p className="mt-3 max-w-xl text-base italic text-[#6B7280] md:text-lg font-uiSans">
              Rozhodnutí o bydlení ti ovlivní celý život. Udělej ho na datech, ne na pocitu.
            </p>

            {/* CTAs */}
            <div className="mt-6">
              {/* Desktop: side by side */}
              <div className="hidden sm:flex items-center gap-6">
                <Link 
                  href="/bydleni-kalkulacka"
                  className="inline-flex items-center justify-center h-[52px] rounded-full bg-[var(--btn-primary-bg)] hover:bg-[var(--btn-primary-hover-bg)] text-white text-[16px] font-semibold px-6 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--btn-focus-ring)]"
                  style={{
                    boxShadow: 'var(--btn-primary-shadow)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = 'var(--btn-primary-shadow-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'var(--btn-primary-shadow)';
                  }}
                >
                  Spočítat moje bydlení
                </Link>
                
                <button
                  onClick={() => scrollToSection("transparentnost")}
                  className="inline-flex items-center justify-center h-[52px] rounded-full bg-white hover:bg-[rgba(15,23,42,0.02)] text-[16px] font-semibold px-6 transition-all duration-200 ease-out border hover:border-[var(--btn-secondary-border-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--btn-focus-ring)]"
                  style={{
                    borderColor: 'var(--btn-secondary-border)',
                    color: 'var(--btn-secondary-text)'
                  }}
                >
                  Zjistit, jak výpočet funguje
                </button>
              </div>

              {/* Mobile: stacked with ghost secondary */}
              <div className="flex sm:hidden flex-col">
                <Link 
                  href="/bydleni-kalkulacka"
                  className="inline-flex items-center justify-center w-full h-[52px] rounded-full bg-[var(--btn-primary-bg)] hover:bg-[var(--btn-primary-hover-bg)] text-white text-[16px] font-semibold px-6 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--btn-focus-ring)]"
                  style={{
                    boxShadow: 'var(--btn-primary-shadow)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = 'var(--btn-primary-shadow-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'var(--btn-primary-shadow)';
                  }}
                >
                  Spočítat moje bydlení
                </Link>
                
                <button
                  onClick={() => scrollToSection("transparentnost")}
                  className="mt-4 w-full inline-flex items-center justify-center h-[52px] rounded-full bg-white hover:bg-[rgba(15,23,42,0.02)] text-[16px] font-semibold px-6 transition-all duration-200 ease-out border hover:border-[var(--btn-secondary-border-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--btn-focus-ring)]"
                  style={{
                    borderColor: 'var(--btn-secondary-border)',
                    color: 'var(--btn-secondary-text)'
                  }}
                >
                  Zjistit, jak výpočet funguje
                </button>
              </div>
            </div>

            {/* "Zdarma, bez registrace" - closer to CTAs */}
            <p className="mt-2 text-sm text-[#6B7280] font-uiSans">
              Zdarma, bez registrace.
            </p>

            {/* Hero bullets - with clear separation */}
            <ul className="mt-6 space-y-2.5 text-base text-[#4B5563] font-uiSans leading-relaxed">
              {HERO_BULLETS.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span 
                    className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full" 
                    style={{ background: 'var(--color-bullet)' }}
                    aria-hidden 
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Illustration placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            whileHover={{ scale: 1.01 }}
            className="mt-10 lg:mt-0 lg:w-[380px] xl:w-[420px] lg:ml-auto"
            style={{
              transition: `transform var(--transition-duration) var(--transition-easing)`
            }}
          >
            <div 
              className="flex flex-col items-center border text-center" 
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)',
                borderRadius: 'var(--radius-card)',
                boxShadow: 'var(--shadow-card)',
                padding: '28px 24px'
              }}
            >
              <div 
                className="flex h-20 w-20 items-center justify-center rounded-full"
                style={{ background: 'var(--bg-section-soft)' }}
              >
                <svg 
                  className="h-10 w-10" 
                  style={{ color: 'var(--scenario-b-text)' }}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={1.5}
                  aria-label="Graf rostoucích sloupců"
                  role="img"
                >
                  <rect x="3" y="13" width="4" height="8" rx="1" />
                  <rect x="10" y="9" width="4" height="12" rx="1" />
                  <rect x="17" y="5" width="4" height="16" rx="1" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-[var(--color-primary)] font-uiSans">
                Vizualizace výsledků tvého bydlení
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-secondary)] font-uiSans">
                Později sem doplníme prémiovou ilustraci s výsledkem kalkulačky.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

