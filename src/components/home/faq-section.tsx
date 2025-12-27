"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ_DATA } from "@/data/faq-data";

export function FAQSection() {
  return (
    <section className="bg-[var(--bg-lilac-section)] pt-12 md:pt-16 pb-[var(--section-padding-y-mobile)] md:pb-[var(--section-padding-y-desktop)]">
      <div className="mx-auto w-full max-w-3xl px-4 lg:px-8">
        <h2 className="text-2xl md:text-3xl">
          Nejčastější otázky
        </h2>
        <p className="mt-3 text-sm text-[var(--color-secondary)] md:text-base font-uiSans">
          Shrnujeme odpovědi na otázky, které slyšíme nejčastěji. Pokud hledáš detailnější metodiku, otevři veřejný Google Sheet.
        </p>

        <Accordion type="single" collapsible className="mt-8 space-y-3">
          {FAQ_DATA.map((faq) => (
            <AccordionItem
              key={faq.question}
              value={faq.question}
              className="rounded-3xl bg-white border border-[var(--color-border)] p-6 md:p-8 transition-all duration-200 ease-out font-uiSans cursor-pointer"
              style={{
                boxShadow: 'var(--shadow-card)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-card)';
              }}
            >
              <AccordionTrigger 
                className="text-left text-base font-medium hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0"
                style={{
                  color: 'var(--color-primary)',
                  '--tw-ring-color': 'var(--btn-focus-ring)'
                } as React.CSSProperties}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent 
                className="text-base leading-relaxed"
                style={{ color: 'var(--color-secondary)' }}
              >
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

