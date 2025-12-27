/**
 * SoftwareApplication Schema for the Housing Calculator
 * Helps Google recognize this as a finance tool/calculator
 */
export function CalculatorSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Kalkulačka bydlení",
    "alternateName": "Hypotéka vs. Nájem kalkulačka",
    "description": "Porovnej, jestli se ti víc vyplatí koupit byt na hypotéku, nebo pronajímat a investovat. Transparentní kalkulačka s daty z českých krajských měst.",
    "url": "https://kamspenezi.cz",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CZK",
    },
    "featureList": [
      "Porovnání hypotéky a nájmu",
      "Výpočet čisté hodnoty majetku po 30 letech",
      "Simulace investic",
      "Data pro všech 13 českých krajských měst",
      "Zdarma bez registrace",
    ],
    "screenshot": "https://kamspenezi.cz/og-calculator.png",
    "author": {
      "@type": "Person",
      "name": "Michal Humaj",
    },
    "provider": {
      "@type": "Organization",
      "name": "kamspenezi.cz",
    },
    "inLanguage": "cs",
    "isFamilyFriendly": true,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

