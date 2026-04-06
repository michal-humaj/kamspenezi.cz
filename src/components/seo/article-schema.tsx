/**
 * Article Schema — signals E-E-A-T for in-depth content pages.
 * Used on methodology pages to associate authorship and publication date.
 */
interface ArticleSchemaProps {
  headline: string;
  description: string;
  url: string;
  datePublished: string;  // ISO 8601 e.g. "2026-01-15"
  dateModified: string;
}

export function ArticleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": headline,
    "description": description,
    "url": url,
    "inLanguage": "cs",
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Person",
      "name": "Michal Humaj",
      "url": "https://kamspenezi.cz/o-projektu",
    },
    "publisher": {
      "@type": "Organization",
      "name": "kamspenezi.cz",
      "url": "https://kamspenezi.cz",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kamspenezi.cz/logo-mark.svg",
      },
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": "kamspenezi.cz",
      "url": "https://kamspenezi.cz",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
