import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SectionMotion } from '@/components/section-motion';
import { company, siteUrl } from '@/lib/site';
import './globals.css';
const jakarta = localFont({ src: '../../public/fonts/plus-jakarta-sans.woff2', variable: '--font-heading', display: 'swap', weight: '200 800' });
const dm = localFont({ src: '../../public/fonts/dm-sans.woff2', variable: '--font-body', display: 'swap', weight: '100 1000' });
export const metadata: Metadata = {
  title: { default: 'DDTC Travel Agency | Explore More. Create Memories.', template: '%s | DDTC Travel Agency' },
  description: 'Thoughtfully planned holidays for individuals, families, social groups and corporate travellers. Explore DDTC’s local getaways and international journeys.',
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  robots: process.env.ALLOW_INDEXING === 'true' ? { index: true, follow: true } : { index: false, follow: false },
  applicationName: company.name,
};
export const viewport: Viewport = { themeColor: '#101722', colorScheme: 'dark' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = { '@context': 'https://schema.org', '@type': 'TravelAgency', name: company.name, legalName: company.legalName, telephone: '+27640584396', email: company.email, ...(siteUrl ? { url: siteUrl } : {}), address: { '@type': 'PostalAddress', streetAddress: 'RV017 Rabokala View, Rabokala', addressLocality: 'Brits', postalCode: '0250', addressCountry: 'ZA' } };
  return <html lang="en-ZA" className={`${jakarta.variable} ${dm.variable}`}><body><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main">{children}</main><Footer/><SectionMotion/><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}/></body></html>;
}
