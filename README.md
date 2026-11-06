# DDTC Travel Agency

A local, responsive marketing and enquiry website built with Next.js App Router, TypeScript, Tailwind CSS, locally hosted fonts, Lucide icons and Zod-validated trip content. No production deployment has been made.

## Run locally

Use Node 22 or later.

```powershell
npm install
npm run dev
```

Open http://127.0.0.1:3000. Five named customer reviews with confirmed five-star ratings and publication permission appear on the reviews page, with an excerpt on the homepage.

```powershell
npm run typecheck
npm run lint
npm test
npm run test:e2e
npm run build
npm start
```

Browser tests expect the local server on port 3000 and installed Microsoft Edge. Test delivery uses mocks and never sends a real message. Build and tests need subprocess permission in restricted Windows environments.

## Pages and structure

- `src/app`: homepage, about, services, catalogue, twelve trip pages, reviews, contact, privacy, booking information, photo credits, error/404 pages, robots and sitemap.
- `src/lib/experiences.ts`: typed trip records and runtime validation. Each trip’s source posters and verification questions remain attached to its record.
- `src/components`: shared navigation, footer, photo, experience card, filters, package selector and enquiry form.
- `src/app/globals.css`: approved DDTC tokens and responsive composition.
- `events/`: immutable original content references. They are not served as production graphics.
- `docs/POSTER-EXTRACTION.md`: the full extraction from all twelve source posters.
- `docs/CLIENT-CONFIRMATIONS.md`: remaining content and publication questions.
- `ASSET-ATTRIBUTIONS.md` and `/photo-credits`: sources, authors and licenses for real destination imagery.

## Add or edit an experience

Edit `src/lib/experiences.ts`. Add a record with a unique readable ID, dates, category, description, package options, inclusions/exclusions, activities, SEO and verification notes. Preserve missing information as null or an explicit note; never infer hotel nights from a date range. Use separate records for distinct departures. Update the source filenames.

Each option has an ID, transport, advertised price, deposit and optional departure date. Cape Town’s road and flight packages deliberately remain separate. Unknown availability stays “Confirm with DDTC”. Past departures are archived by the catalogue’s date filter, without inferring booking status.

Refresh content documentation with:

```powershell
npx tsx scripts/export-content.ts
```

Then run tests and build. Static pages need rebuilding when content or dates change.

## Replace photography or branding

Place legally reusable images in `public/images`, update the trip’s image and accurate destination alt text, and update `public/image-credits.json` plus `ASSET-ATTRIBUTIONS.md`. Images are optimized by Next.js. Do not use poster graphics or claim stock photography shows actual DDTC customers. Do not remove attribution required by Creative Commons licenses.

The client-selected official logo is preserved in `brand-source/DDTC-primary-client-original.png`. `public/brand/` contains the full primary PNG, contour-traced SVG family and transparent PNG exports. The header uses the horizontal white/gold adaptation on desktop and the exact outlined DDTC wordmark on mobile; the footer uses the full white/gold logo. See `docs/LOGO-ASSETS.md` for source fidelity, variant usage and professional artwork limitations. These are raster-derived web vectors, not claimed to be original professional vector masters.

## Approve a testimonial

Edit `src/lib/reviews.ts`. The five current reviews, names, publication permission and five-star ratings were confirmed by the client through the site owner on 6 November 2026. Original submissions and editing notes are preserved in `docs/REVIEW-SOURCES.md`. Keep each reviewer's meaning and voice; do not add unsupported claims, portraits, surnames, destinations or ratings. Leave new entries unapproved until permission is confirmed, and use a null rating unless the rating is confirmed. Both the reviews page and homepage use only approved records. The reviews page is eligible for indexing when the site-wide launch switch is enabled.

## Enquiry delivery

With no email credentials, the form validates the visitor’s details and prepares a correctly encoded WhatsApp message. The visitor must review and send it themselves; the site never claims it was sent. Direct telephone, email and WhatsApp contact links also work.

For server email, copy `.env.example` to `.env.local` and configure `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL` (a verified sender) and `ENQUIRY_TO_EMAIL`. Restart the server. The endpoint validates again, rejects foreign origins, limits payloads, checks a honeypot and applies a basic process-local rate limit. It reports success only after Resend returns an accepted message ID. Provider acceptance is not a promise of inbox placement. No delivery credentials are exposed to the browser, and the site does not persist enquiry data.

For a public/serverless deployment, add a shared rate limiter and provider abuse controls: the included in-memory limiter is local to one process. Verify delivery using an agreed test recipient after credentials are configured. Live delivery has not been tested without credentials.

## Prepare for deployment

The project is compatible with Vercel’s Next.js build. Use `npm run build` and configure the email variables in the hosting provider. Set `NEXT_PUBLIC_SITE_URL` only after the final domain is confirmed. Then review `ALLOW_INDEXING`; it defaults to false. Do not publish draft terms or unapproved customer stories. Request approval before production deployment.

The sitemap contains no invented domain. Draft legal pages have noindex metadata, and robots blocks indexing by default. The public business schema contains only supplied contact facts, with no aggregate ratings or partnership claims.

## Reference documentation

[Next.js metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata), [Next.js images](https://nextjs.org/docs/app/getting-started/images), [Resend send-email API](https://resend.com/docs/api-reference/emails/send-email).
