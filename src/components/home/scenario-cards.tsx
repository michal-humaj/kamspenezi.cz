"use client";

import { motion } from "framer-motion";

const SCENARIO_LIST = [
  {
    id: "A" as const,
    badge: "Byt na hypotéku",
    label: "Scénář A – vlastní bydlení na hypotéku",
    bullets: [
      "Koupíš byt v Česku financovaný hypotékou s horizontem třiceti let",
      "Platíš splátku hypotéky a všechny náklady spojené s vlastnictvím",
      "Po třiceti letech ti zůstává byt po odečtení poplatků a případného zůstatku dluhu",
    ],
  },
  {
    id: "B" as const,
    badge: "Nájem + ETF",
    label: "Scénář B – nájem plus ETF",
    bullets: [
      "Bydlíš v nájemním bytě",
      "Rozdíl mezi splátkou hypotéky a nájmem investuješ do globálních ETF",
      "Počáteční vlastní zdroje, které by šly do bytu, investuješ také",
      "Po třiceti letech ti zůstává investiční portfolio a žádná hypotéka",
    ],
  },
];

export function ScenarioCards() {
  return (
    <div className="mt-8 md:mt-10 grid gap-6 lg:grid-cols-2">
      {SCENARIO_LIST.map((scenario) => (
        <motion.div
          key={scenario.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          whileHover={{ 
            y: -2,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
          className="rounded-3xl bg-white border border-[#EDEEF3] shadow-[0_8px_28px_rgba(15,23,42,0.06)] p-6 md:p-8 transition-all duration-200 ease-out hover:shadow-[0_12px_32px_rgba(15,23,42,0.10)]"
        >
          <span 
            className="inline-flex items-center gap-1.5 font-medium text-[14px] font-uiSans"
            style={{
              background: scenario.id === "A" ? 'var(--scenario-a-bg)' : 'var(--scenario-b-bg)',
              color: scenario.id === "A" ? 'var(--scenario-a-dot)' : 'var(--scenario-b-dot)',
              borderRadius: 'var(--radius-pill)',
              padding: '2px 10px'
            }}
          >
            <span 
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: scenario.id === "A" ? 'var(--scenario-a-dot)' : 'var(--scenario-b-dot)'
              }}
            />
            {scenario.badge}
          </span>
          <h3 className="mt-4 text-xl font-semibold leading-tight md:text-[22px] font-uiSans">
            {scenario.label}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {scenario.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2.5 text-base leading-relaxed text-[#4B5563] font-uiSans">
                <span 
                  className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full" 
                  style={{ background: 'var(--color-bullet)' }}
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}

