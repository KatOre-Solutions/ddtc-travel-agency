import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';
export default function robots(): MetadataRoute.Robots {
  const indexable = process.env.ALLOW_INDEXING === 'true' && !!siteUrl;
  return { rules: { userAgent: '*', ...(indexable ? { allow: '/', disallow: ['/api/', '/privacy', '/booking-conditions'] } : { disallow: '/' }) }, ...(indexable ? { sitemap: `${siteUrl}/sitemap.xml` } : {}) };
}
