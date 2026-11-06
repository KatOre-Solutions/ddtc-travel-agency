import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';
import { experiences } from '@/lib/experiences';
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return ['/', '/about', '/services', '/experiences', '/reviews', '/contact', '/photo-credits', ...experiences.map((trip) => `/experiences/${trip.id}`)].map((path) => ({ url: `${siteUrl}${path}`, changeFrequency: 'monthly' as const, priority: path === '/' ? 1 : 0.7 }));
}
