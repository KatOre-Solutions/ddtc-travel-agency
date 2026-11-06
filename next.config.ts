import type { NextConfig } from 'next';
import { productionSiteUrl } from './src/lib/site';
const canonicalHost = new URL(productionSiteUrl).hostname;
const escapedHost = canonicalHost.split('.').join('\\.');
const escapedApexHost = canonicalHost.slice(4).split('.').join('\\.');
const config: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  images: { qualities: [75, 85] },
  async redirects() {
    return [{ source: '/:path*', has: [{ type: 'host', value: escapedApexHost }], destination: `${productionSiteUrl}/:path*`, permanent: true }];
  },
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      { key: 'X-Frame-Options', value: 'DENY' },
    ] }, {
      source: '/:path*',
      missing: [{ type: 'host', value: escapedHost }],
      headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
    }];
  },
};
export default config;
