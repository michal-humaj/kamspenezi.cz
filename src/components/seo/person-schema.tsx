/**
 * Person Schema for Michal Humaj
 * Helps Google create a Knowledge Graph entry
 */
export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Michal Humaj",
    "jobTitle": "Produktový manažer a investor",
    "description": "Produktový manažer a investor, který řeší stejné otázky jako ty. Kalkulačku jsem postavil hlavně pro sebe, abych porovnal vlastní bydlení s nájmem a investicemi.",
    "image": "https://kamspenezi.cz/michal.jpeg",
    "url": "https://kamspenezi.cz",
    "worksFor": {
      "@type": "Organization",
      "name": "kamspenezi.cz"
    },
    "knowsAbout": [
      "Personal Finance",
      "Real Estate Investment",
      "ETF Investing",
      "Product Management"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

