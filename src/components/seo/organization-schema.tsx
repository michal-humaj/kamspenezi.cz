/**
 * Organization Schema for kamspenezi.cz
 * Helps Google understand the organization behind the website
 */
export function OrganizationSchema() {
  const schema = {
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
    "sameAs": [
      // Add social media profiles here when available
      // "https://www.linkedin.com/company/kamspenezi",
      // "https://twitter.com/kamspenezi"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "michal.humaj@gmail.com",
      "contactType": "Customer Service"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

