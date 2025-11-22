"use client";

import { motion } from "framer-motion";

export function ComparisonCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ 
        y: -2,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      className="mx-auto mt-8 md:mt-10 max-w-5xl rounded-3xl bg-white border border-[#EDEEF3] shadow-[0_8px_28px_rgba(15,23,42,0.06)] p-6 md:p-8 transition-all duration-200 ease-out hover:shadow-[0_12px_32px_rgba(15,23,42,0.10)]"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] font-uiSans">
        Ukázkové srovnání
      </p>
      <h3 className="mt-2 text-xl font-semibold md:text-2xl font-uiSans">
        30 let dopředu, dva scénáře
      </h3>

      <div className="mt-3 md:mt-5 grid gap-0 md:grid-cols-2 md:gap-0">
        {/* Scenario A */}
        <div className="flex h-full flex-col gap-3 p-4 md:p-6">
          <span 
            className="inline-flex w-fit items-center gap-1.5 font-medium text-[14px] font-uiSans"
            style={{
              background: 'var(--scenario-a-bg)',
              color: 'var(--scenario-a-dot)',
              borderRadius: 'var(--radius-pill)',
              padding: '2px 10px'
            }}
          >
            <span 
              className="h-1.5 w-1.5 rounded-full" 
              style={{ background: 'var(--scenario-a-dot)' }}
            />
            Byt na hypotéku
          </span>
          <div className="mt-1">
            <p className="text-[11px] font-medium uppercase tracking-wide text-[#9CA3AF] font-uiSans">
              Medián čistého majetku
            </p>
            <p className="mt-1 text-2xl md:text-3xl font-semibold leading-none text-[var(--color-primary)] font-displaySerif">
              8,4 mil. Kč
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-secondary)] font-uiSans">
              Hodnota bytu po odečtení poplatků a zůstatku hypotéky.
            </p>
          </div>
        </div>

        {/* Scenario B */}
        <div 
          className="flex h-full flex-col gap-3 p-4 md:p-6 border-t md:border-t-0 md:border-l border-[#EDEEF3]"
        >
          <span 
            className="inline-flex w-fit items-center gap-1.5 font-medium text-[14px] font-uiSans"
            style={{
              background: 'var(--scenario-b-bg)',
              color: 'var(--scenario-b-dot)',
              borderRadius: 'var(--radius-pill)',
              padding: '2px 10px'
            }}
          >
            <span 
              className="h-1.5 w-1.5 rounded-full" 
              style={{ background: 'var(--scenario-b-dot)' }}
            />
            Nájem + ETF
          </span>
          <div className="mt-1">
            <p className="text-[11px] font-medium uppercase tracking-wide text-[#9CA3AF] font-uiSans">
              Medián čistého majetku
            </p>
            <p className="mt-1 text-2xl md:text-3xl font-semibold leading-none text-[var(--color-primary)] font-displaySerif">
              7,1 mil. Kč
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-secondary)] font-uiSans">
              Hodnota investičního portfolia z rozdílu mezi nájmem a hypotékou.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-5 md:mt-6 px-4 md:px-6 text-sm leading-[1.6] text-[var(--color-secondary)] font-uiSans">
        Scénáře porovnávají stejné měsíční výdaje – rozdíl je jen v tom, kam peníze jdou.
      </p>
      <p className="mt-2 px-4 md:px-6 text-xs text-[#9CA3AF] font-uiSans">
        Čísla jsou ilustrativní. Přesný výsledek uvidíš po zadání svých parametrů.
      </p>
    </motion.div>
  );
}

