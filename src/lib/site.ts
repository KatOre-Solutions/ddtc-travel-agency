import type { Metadata } from 'next';
export const company = {
  name: 'DDTC Travel Agency', legalName: 'Diutlwileng Diutlwileng Touring Corporation',
  registration: '2023/871671/07', email: 'diutlwilengdiutlwileng74@gmail.com',
  phone: '064 058 4396', secondaryPhone: '081 486 6678',
  address: 'RV017 Rabokala View, Rabokala, Brits, 0250, South Africa',
};
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
export function metadata(title: string, description: string, path: string, draft = false): Metadata {
  return { title, description, ...(siteUrl ? { alternates: { canonical: `${siteUrl}${path}` } } : {}),
    openGraph: { title: `${title} | DDTC Travel Agency`, description, type: 'website', locale: 'en_ZA', ...(siteUrl ? { url: `${siteUrl}${path}`, images: [{ url: `${siteUrl}/images/cape-town-hero.jpg`, alt: 'Cape Town coastline' }] } : {}) },
    ...(draft ? { robots: { index: false, follow: false } } : {}),
  };
}
export function whatsapp(message = 'Hello DDTC, I would like to plan a trip.'): string { return `https://wa.me/27640584396?text=${encodeURIComponent(message)}`; }
