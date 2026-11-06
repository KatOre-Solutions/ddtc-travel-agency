import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SectionMotion } from '@/components/section-motion';
import { JsonLd } from '@/components/json-ld';
import { company, robotsMetadata, siteUrl } from '@/lib/site';
import { websiteSchema } from '@/lib/seo';
import './globals.css';
const jakarta = localFont({ src: '../../public/fonts/plus-jakarta-sans.woff2', variable: '--font-heading', display: 'swap', weight: '200 800' });
const dm = localFont({ src: '../../public/fonts/dm-sans.woff2', variable: '--font-body', display: 'swap', weight: '100 1000' });
export const metadata: Metadata = {
  title: { default: 'DDTC Travel Agency | Holidays & Group Travel', template: '%s | DDTC Travel Agency' },
  description: 'DDTC Travel Agency in Rabokala, Brits plans South African holidays, international packages and group travel. Explore trips and enquire on WhatsApp.',
  metadataBase: new URL(siteUrl),
  robots: robotsMetadata(),
  applicationName: company.name,
};
export const viewport: Viewport = { themeColor: '#101722', colorScheme: 'dark' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-ZA" className={`${jakarta.variable} ${dm.variable}`}><body><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main">{children}</main><Footer/><SectionMotion/><JsonLd data={websiteSchema()}/></body></html>;
}
