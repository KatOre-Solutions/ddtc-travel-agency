import type { MetadataRoute } from 'next';
import { absoluteUrl, allowIndexing } from '@/lib/site';
export default function robots(): MetadataRoute.Robots {
  // Draft pages must stay crawlable so crawlers can read their noindex tags.
  return { rules: { userAgent: '*', ...(allowIndexing ? { allow: '/', disallow: ['/api/'] } : { disallow: '/' }) }, sitemap: absoluteUrl('/sitemap.xml') };
}
