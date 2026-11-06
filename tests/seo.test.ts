import { test } from 'node:test';
import assert from 'node:assert/strict';
import { absoluteUrl, indexingEnabled, metadata, normalizeSiteUrl, productionSiteUrl, siteUrl } from '../src/lib/site';
import { serializeJsonLd, tripBreadcrumbs, websiteSchema } from '../src/lib/seo';
import { experiences } from '../src/lib/experiences';
import sitemap from '../src/app/sitemap';

test('production can be indexed while previews, local development and an explicit opt-out cannot', () => {
  const production = { nodeEnv: 'production', deploymentEnv: 'production', flag: 'true', canonicalOrigin: productionSiteUrl };
  assert.equal(indexingEnabled(production), true);
  for (const change of [{ deploymentEnv: 'preview' }, { deploymentEnv: 'development' }, { nodeEnv: 'development' }, { flag: 'false' }, { canonicalOrigin: 'https://preview.example' }]) {
    assert.equal(indexingEnabled({ ...production, ...change }), false);
  }
});

test('canonicals consolidate enquiry parameters and social previews retain the destination image', () => {
  assert.equal(normalizeSiteUrl(`${productionSiteUrl}/`), productionSiteUrl);
  for (const invalid of ['https://example.com/path', 'https://example.com/?draft=true', 'https://user:password@example.com', 'ftp://example.com']) assert.throws(() => normalizeSiteUrl(invalid));
  assert.throws(() => absoluteUrl('https://another.example/'));
  const page = metadata('Travel Enquiries', 'Ask DDTC about your travel plans.', '/contact?trip=durban-may-2027&package=road#form', false, { src: 'durban-beachfront.jpg', alt: 'Durban beachfront' });
  assert.deepEqual(page.title, { absolute: 'Travel Enquiries | DDTC Travel Agency' });
  assert.equal(page.alternates?.canonical, `${siteUrl}/contact`);
  assert.equal(page.openGraph?.url, `${siteUrl}/contact`);
  assert.ok(page.twitter && 'card' in page.twitter);
  assert.equal(page.twitter.card, 'summary_large_image');
  assert.deepEqual(page.openGraph?.images, [{ url: `${siteUrl}/images/durban-beachfront.jpg`, alt: 'Durban beachfront' }]);
  assert.equal((metadata('Draft', 'Draft information.', '/privacy', true).robots as { index: boolean }).index, false);
});

test('sitemap contains every public trip once and excludes legal drafts and enquiry variants', () => {
  const entries = sitemap();
  assert.equal(entries.length, 7 + experiences.length);
  assert.equal(new Set(entries.map((entry) => entry.url)).size, entries.length);
  assert.equal(new Set(experiences.map((trip) => trip.seo.description)).size, experiences.length);
  assert.ok(entries.every((entry) => entry.url.startsWith(`${siteUrl}/`) && !entry.url.includes('?')));
  assert.ok(entries.every((entry) => !/\/(privacy|booking-conditions|api)(\/|$)/.test(new URL(entry.url).pathname)));
  for (const trip of experiences) {
    const entry = entries.find((item) => item.url === `${siteUrl}/experiences/${trip.id}`);
    assert.deepEqual(entry?.images, [`${siteUrl}/images/${trip.image}`]);
  }
});

test('business identity and trip breadcrumbs use confirmed facts without unsupported ratings or offers', () => {
  const schema = websiteSchema();
  const agency = schema['@graph'].find((item) => item['@type'] === 'TravelAgency')!;
  assert.equal(agency.url, `${siteUrl}/`);
  assert.equal(agency.telephone, '+27640584396');
  assert.equal(agency.address?.addressCountry, 'ZA');
  const serialized = JSON.stringify(schema);
  assert.ok(!serialized.includes('aggregateRating') && !serialized.includes('openingHours') && !serialized.includes('offers'));
  for (const trip of experiences) {
    const crumbs = tripBreadcrumbs(trip).itemListElement;
    assert.deepEqual(crumbs.map((item) => item.position), [1, 2, 3]);
    assert.equal(crumbs[2].name, trip.title);
    assert.equal(crumbs[2].item, `${siteUrl}/experiences/${trip.id}`);
  }
});

test('JSON-LD cannot terminate its script element and still round-trips the original data', () => {
  const value = { name: '</script><script>alert("test")</script>' };
  const serialized = serializeJsonLd(value);
  assert.equal(serialized.includes('<'), false);
  assert.deepEqual(JSON.parse(serialized), value);
});
