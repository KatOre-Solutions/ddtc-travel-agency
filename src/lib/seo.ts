import { absoluteUrl, company } from './site';
import type { Experience } from './experiences';

export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TravelAgency', '@id': absoluteUrl('/#agency'),
        name: company.name, legalName: company.legalName, url: absoluteUrl('/'),
        logo: absoluteUrl('/brand/ddtc-primary.png'), image: absoluteUrl('/brand/ddtc-primary.png'),
        telephone: '+27640584396', email: company.email,
        address: { '@type': 'PostalAddress', streetAddress: 'RV017 Rabokala View, Rabokala', addressLocality: 'Brits', postalCode: '0250', addressCountry: 'ZA' },
      },
      { '@type': 'WebSite', '@id': absoluteUrl('/#website'), name: company.name, url: absoluteUrl('/'), inLanguage: 'en-ZA', publisher: { '@id': absoluteUrl('/#agency') } },
    ],
  };
}
export function tripBreadcrumbs(trip: Pick<Experience, 'id' | 'title'>) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Experiences', item: absoluteUrl('/experiences') },
      { '@type': 'ListItem', position: 3, name: trip.title, item: absoluteUrl(`/experiences/${trip.id}`) },
    ],
  };
}
