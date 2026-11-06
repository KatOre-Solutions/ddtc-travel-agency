import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';
import { experiences } from '@/lib/experiences';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...['/', '/about', '/services', '/experiences', '/reviews', '/contact', '/photo-credits'].map((path) => ({ url: absoluteUrl(path) })),
    ...experiences.map((trip) => ({ url: absoluteUrl(`/experiences/${trip.id}`), images: [absoluteUrl(`/images/${trip.image}`)] })),
  ];
}
