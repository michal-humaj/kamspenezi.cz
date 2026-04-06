import { MetadataRoute } from 'next';

// Update these dates manually when the corresponding page content changes.
const DATES = {
  calculators: new Date('2026-04-04'),
  metodika:    new Date('2026-04-04'),
  oProjektu:   new Date('2026-02-01'),
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kamspenezi.cz';

  return [
    {
      url: baseUrl,
      lastModified: DATES.calculators,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/investice`,
      lastModified: DATES.calculators,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/o-projektu`,
      lastModified: DATES.oProjektu,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/metodika/bydleni`,
      lastModified: DATES.metodika,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/metodika/investice`,
      lastModified: DATES.metodika,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/metodika/data-a-zdroje`,
      lastModified: DATES.metodika,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
