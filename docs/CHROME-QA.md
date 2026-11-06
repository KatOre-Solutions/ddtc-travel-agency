# Chrome interaction audit — 6 November 2026

The core on-site interaction pass is complete on the local production build in the user's installed Chrome, through its browser extension. Pointer and keyboard actions were used. No internal browser was used for this audit. Responsive checks used 1440 × 1000, 768 × 1024 and 390 × 844 viewports; the temporary override was reset afterward.

## Passed in Chrome

- 38 homepage/shared internal link placements: header/footer navigation, logos, calls to action, service fragments, trip image/title links, review navigation and legal/credits routes.
- All homepage and catalogue category buttons; catalogue search, empty-state reset, price/date sorting, and future/past/all departure selectors. There are 12 trips, including all 3 Durban departures.
- Both image and title links for all 12 trips. Every one of the 13 package options displayed its price/deposit and carried the correct destination, dates and package into the enquiry form. Cape Town retains distinct road/flight prices. Its flight enquiry CTA was also retested by mouse click in the short desktop window.
- All 5 service enquiry prefills, the About CTA, booking-information CTA and form privacy link.
- Blank/invalid form submissions, consent, all 6 budget options and all 5 trip-type options. A valid test prepared a complete, correctly encoded WhatsApp message, including ampersands and optional requirements.
- The prepared WhatsApp link opened WhatsApp's actual landing page showing +27 64 058 4396 and the complete test message. No message was sent and no account login was performed.
- All 7 mobile navigation links; pointer open/close, rapid reversal, instant keyboard opening, Escape closing and focus return, and closing after navigation.
- All 5 review names and accessible five-star ratings. The homepage marquee has 2 opposing rows, 5 unique accessible cards, hidden decorative repeats, functioning pause/resume and pointer-hover pause. Actual transforms advanced in opposite directions. No horizontal overflow at desktop/tablet/mobile widths.
- All 15 unique photo-source and licence destinations opened successfully in Chrome.
- Catalogue destination images, header/footer logos and local fonts loaded. No site JavaScript console errors were observed.

## Findings fixed and retested

1. The tall sticky package panel extended below the short desktop viewport. Package panels now scroll normally at desktop heights of 800px or less. The flight selection and enquiry button passed a mouse-click retest.
2. An omitted budget showed a technical validation message. It now says “Please select an approximate budget.” Chrome confirmed the corrected text and no generic technical errors on blank submission.
3. Fractional traveller counts now say “Please enter a whole number of travellers.” Chrome confirmed this message for 1.5 travellers.

## Verification limits

- Chrome's URL policy blocked observation of the external Katore Solutions footer-credit destination. Its configured href is https://katoresolutions.co.za/; destination availability is unverified. No alternate access method was used.
- Telephone and email hrefs were checked. No calls or emails were made. Server email delivery remains unconfigured; the functioning public enquiry path is WhatsApp.
- Responsive viewport checks are not physical phone testing. The touch-pause handler and reduced-motion static layout were reviewed in source but were not exercised with a physical touch device or an OS reduced-motion override.
- Trip facts were transcribed and cross-checked against the supplied posters, not independently guaranteed. Current availability, source ambiguities and outstanding business/legal wording remain in CLIENT-CONFIRMATIONS.md.

## Build and artifacts

Production build, TypeScript, ESLint and all 13 existing automated content/API/asset tests pass after the validation fixes. The prior desktop/mobile browser-suite result is supplementary; this report describes the actual Chrome pass. A Chrome screenshot is saved locally in .tools/chrome-homepage-qa.png, and the homepage is left open in the user's Chrome.
