"use client";

import { motion } from "framer-motion";

// Hand-drawn arrow SVG component
function HandDrawnArrow() {
  return (
    <svg 
      width="40" 
      height="40" 
      viewBox="0 0 65 60" 
      fill="none" 
      stroke="currentColor" 
      className="text-slate-400 rotate-12"
    >
      <path d="M10 10 C 20 40, 40 50, 50 50" strokeWidth="2" strokeLinecap="round"/>
      <path d="M35 55 L 50 50 L 55 35" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function HeroSection() {
  return (
    <section className="bg-[var(--bg-base)] pt-6 pb-16 md:pt-10 md:pb-24">
      <div className="mx-auto w-full max-w-6xl px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Versus Pills - Above H1 */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5">
              {/* Pill A: Buy */}
              <span className="inline-flex items-center rounded-full bg-[#F7EAD9] px-3 py-1 text-sm font-semibold text-[#C98D4E]">
                <span className="hidden min-[380px]:inline">Scénář A: </span>Koupě
              </span>
              
              {/* Separator */}
              <span className="text-sm italic text-gray-400">vs</span>
              
              {/* Pill B: Rent */}
              <span className="inline-flex items-center rounded-full bg-[#EAE7FF] px-3 py-1 text-sm font-semibold text-[#7D5AE2]">
                <span className="hidden min-[380px]:inline">Scénář B: </span>Nájem<span className="hidden sm:inline"> + ETF</span>
              </span>
            </div>
            
            <h1 className="text-[clamp(36px,5vw,52px)] leading-[1.1] tracking-tight text-[#0F172A]">
              Bydlet ve vlastním, nebo v nájmu
            </h1>

            <p className="mt-4 max-w-xl text-lg text-[#4B5563] md:text-xl font-uiSans leading-relaxed">
              Kalkulačka porovná dvě cesty: koupit byt na hypotéku, nebo bydlet v nájmu a rozdíl v platbách investovat do ETF. Uvidíš, jaký majetek ti vyjde po třiceti letech.
            </p>

            <p className="mt-3 max-w-xl text-base italic text-[#6B7280] md:text-lg font-uiSans">
              Rozhodnutí o bydlení ti ovlivní celý život. Udělej ho na datech, ne na pocitu.
            </p>

            {/* "Zdarma, bez registrace" */}
            <p className="mt-4 text-sm text-[#6B7280] font-uiSans">
              Zdarma, bez registrace.
            </p>

            {/* Hand-drawn Arrow Bridge - Desktop Only */}
            <div className="hidden md:flex items-center gap-3 mt-8 text-slate-500">
              <HandDrawnArrow />
              <span className="text-base font-medium">Začněte výběrem města</span>
            </div>
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

