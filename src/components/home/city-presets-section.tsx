"use client";

import { motion } from "framer-motion";

const CITY_PRESETS = [
  {
    id: "praha-2kk-par",
    title: "Praha – 2+kk pro mladý pár",
    description: "Vyrovnaný rozpočet s vyšší pořizovací cenou a nižším nájmem díky sdílení nákladů.",
  },
  {
    id: "brno-2kk-prvni",
    title: "Brno – 2+kk první vlastní bydlení",
    description: "Standardní měsíční rozpočet pro první hypotéku s kombinací vlastních zdrojů a podpory od rodičů.",
  },
  {
    id: "ostrava-31-rodina",
    title: "Ostrava – 3+1 pro rodinu",
    description: "Větší dispozice s nižší pořizovací cenou, ale vyššími náklady na údržbu.",
  },
  {
    id: "plzen-2kk-start",
    title: "Plzeň – 2+kk startovní byt",
    description: "Střední rozpočet s rozumným poměrem nájem vs. hypotéka.",
  },
];

export function CityPresetsSection() {
  const handlePresetSelect = (presetId: string) => {
    // TODO: Load preset values from Google Sheet and prefill calculator
    console.log("Selected preset:", presetId);
    // Navigate to calculator with preset query param
    // window.location.href = `/bydleni-kalkulacka?preset=${presetId}`;
  };

  return (
    <section className="bg-[var(--bg-lilac-section)] py-[var(--section-padding-y-mobile)] md:py-[var(--section-padding-y-desktop)]">
      <div className="mx-auto w-full max-w-6xl px-4 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] font-uiSans">
          Začni podle města
        </p>
        <h2 className="mt-2 text-2xl md:text-3xl">
          Začni podle svého města a velikosti bytu
        </h2>
        <p className="mt-2 max-w-3xl text-base text-[var(--color-secondary)] md:text-lg font-uiSans">
          Vyber si výchozí scénář, který se ti nejvíc blíží. V kalkulačce ho pak můžeš doladit podle sebe.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CITY_PRESETS.map((preset, index) => (
            <motion.div
              key={preset.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
              whileHover={{ 
                y: -2,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              className="flex flex-col rounded-3xl bg-white border border-[#EDEEF3] shadow-[0_8px_28px_rgba(15,23,42,0.06)] p-6 md:p-8 transition-all duration-200 ease-out hover:shadow-[0_12px_32px_rgba(15,23,42,0.10)]"
            >
              <h4 className="text-lg font-semibold leading-tight text-[var(--color-primary)] font-uiSans">
                {preset.title}
              </h4>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-secondary)] font-uiSans">
                {preset.description}
              </p>
              <button
                onClick={() => handlePresetSelect(preset.id)}
                className="mt-4 text-left text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary)] hover:underline font-uiSans"
                style={{
                  transition: `color var(--transition-duration) var(--transition-easing)`
                }}
              >
                Použít jako výchozí
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

