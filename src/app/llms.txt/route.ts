import { experiences } from '@/lib/experiences';
import { absoluteUrl, company } from '@/lib/site';

export const dynamic = 'force-static';

export function GET() {
  const trips = experiences.map((trip) =>
    `- [${trip.seo.title}](${absoluteUrl(`/experiences/${trip.id}`)}): ${trip.seo.description}`,
  ).join('\n');

  const content = `# ${company.name}

> DDTC Travel Agency, based in Rabokala near Brits, South Africa, helps individuals, couples, families, social groups and corporate travellers plan holidays and travel experiences.

The registered business is ${company.legalName}. Its website is ${absoluteUrl('/')}.
Address: ${company.address}.
Phone and WhatsApp: +27 64 058 4396. Secondary phone: +27 81 486 6678.
Email: ${company.email}.

Trip pages describe advertised packages. Confirm current prices, departure arrangements, availability and travel requirements directly with DDTC. An enquiry does not reserve a place or confirm a booking, and the website does not accept payments. Privacy and booking information is currently labelled as draft and is awaiting final approval.

## Main pages

- [Home](${absoluteUrl('/')}): Overview of DDTC and featured travel experiences.
- [About DDTC](${absoluteUrl('/about')}): Business background and location.
- [Travel services](${absoluteUrl('/services')}): Individual, couples, family, social group and corporate travel, plus cruise enquiries.
- [Holiday packages and experiences](${absoluteUrl('/experiences')}): Browse advertised trips and departure dates.
- [Traveller reviews](${absoluteUrl('/reviews')}): Published customer accounts of travelling with DDTC.
- [Contact and travel enquiries](${absoluteUrl('/contact')}): Contact details and the trip enquiry form.

## Advertised trips

${trips}

## Optional

- [Photo credits](${absoluteUrl('/photo-credits')}): Image sources and licences.
- [Sitemap](${absoluteUrl('/sitemap.xml')}): Canonical public page URLs.
- [Robots rules](${absoluteUrl('/robots.txt')}): Crawler access rules.
`;

  return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
