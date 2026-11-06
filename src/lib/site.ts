import type { Metadata } from 'next';
export const company = {
  name: 'DDTC Travel Agency', legalName: 'Diutlwileng Diutlwileng Touring Corporation',
  registration: '2023/871671/07', email: 'diutlwilengdiutlwileng74@gmail.com',
  phone: '064 058 4396', secondaryPhone: '081 486 6678',
  address: 'RV017 Rabokala View, Rabokala, Brits, 0250, South Africa',
};
// Production domain confirmed by the site owner on 6 November 2026.
export const productionSiteUrl = 'https://www.ddtctravels.co.za';
export function normalizeSiteUrl(value: string): string {
  const url = new URL(value);
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin without a path, query, credentials or fragment.');
  }
  return url.origin;
}
export const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL?.trim() || productionSiteUrl);
export function indexingEnabled({ nodeEnv = process.env.NODE_ENV, deploymentEnv = process.env.VERCEL_ENV, flag = process.env.ALLOW_INDEXING ?? 'true', canonicalOrigin = siteUrl }: { nodeEnv?: string; deploymentEnv?: string; flag?: string; canonicalOrigin?: string } = {}): boolean {
  return nodeEnv === 'production' && !['preview', 'development'].includes(deploymentEnv || '') && flag.trim().toLowerCase() === 'true' && canonicalOrigin === productionSiteUrl;
}
export const allowIndexing = indexingEnabled();
export function absoluteUrl(path: string): string {
  const url = new URL(path, `${siteUrl}/`);
  if (url.origin !== siteUrl) throw new Error('Site URLs must stay on the configured canonical origin.');
  return url.toString();
}
export function robotsMetadata(draft = false) {
  return { index: allowIndexing && !draft, follow: allowIndexing,
    ...(allowIndexing && !draft ? { googleBot: { index: true, follow: true, 'max-image-preview': 'large' as const } } : {}),
  };
}
export function metadata(title: string, description: string, path: string, draft = false, photo = { src: 'cape-town-hero.jpg', alt: 'Cape Town coastline and mountains' }): Metadata {
  const fullTitle = `${title} | ${company.name}`;
  const canonical = new URL(absoluteUrl(path));
  canonical.search = ''; canonical.hash = '';
  const images = [{ url: absoluteUrl(`/images/${photo.src}`), alt: photo.alt }];
  return {
    title: { absolute: fullTitle }, description,
    alternates: { canonical: canonical.toString() }, robots: robotsMetadata(draft),
    openGraph: { title: fullTitle, description, type: 'website', locale: 'en_ZA', siteName: company.name, url: canonical.toString(), images },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images },
  };
}
export function whatsapp(message = 'Hello DDTC, I would like to plan a trip.'): string { return `https://wa.me/27640584396?text=${encodeURIComponent(message)}`; }
