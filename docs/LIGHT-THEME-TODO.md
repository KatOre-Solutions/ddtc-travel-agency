# DDTC light brand theme checklist

Status: Complete — light-theme refinement and requested Reviews-page follow-up implemented and verified locally.

This is a refinement of the existing website. Preserve layouts, copy, routes,
photography, logo colours, trip data, prices, dates, disclaimers, SEO, and booking
and enquiry logic. Mark items complete only after doing and verifying the work.

## 1. Preparation and audit

- [x] Read the supplied light brand theme brief.
- [x] Review repository instructions and available project scripts.
- [x] Create this persistent checklist before development.
- [x] Read the applicable Impeccable, Taste, and Emil design instructions and project context.
- [x] Read the installed Next.js CSS, image, and viewport documentation relevant to the changes.
- [x] Audit theme tokens, hardcoded colours, shared components, overlays, and all routes.
- [x] Inspect the existing website visually and capture a reference before editing.

## 2. Shared colour system

- [x] Centralize white, Coastal Mist, Ocean Navy, Travel Blue, Sky Blue, Destination Red, Sunshine Gold, body text, borders, and interaction colours.
- [x] Make white and light surfaces dominant; use navy for hierarchy and blue for standard interactions.
- [x] Apply red selectively to primary booking/enquiry actions; retain restrained gold accents.
- [x] Update shared buttons, links, badges, borders, fields, and focus/hover/disabled states.

## 3. Components and pages

- [x] Refine the white navigation and mobile menu using the existing navy wordmark and unchanged navigation behavior.
- [x] Lighten the homepage hero and overlays while retaining photography, composition, and readable text.
- [x] Update experience cards, catalogue controls, and trip detail pages without changing package facts.
- [x] Update services and about pages with balanced white and Coastal Mist surfaces.
- [x] Update reviews and testimonials while retaining attribution and carousel behavior.
- [x] Update booking/contact surfaces and form states without changing submission logic.
- [x] Refine the shared enquiry CTA and footer for a balanced light-theme finish.
- [x] Check secondary/legal, error, and not-found source for remaining dark-theme styling.

## 4. Quality and validation

- [x] Verify WCAG AA contrast for applicable text, controls, and white text on red buttons.
- [x] Verify keyboard focus, mobile navigation, form labels, and errors with indicators beyond colour.
- [x] Review mobile, tablet, and desktop screenshots of the homepage and representative secondary pages.
- [x] Check reduced motion, overflow, layout stability, and existing interactions.
- [x] Run lint, TypeScript checks, existing unit tests, production build, and applicable browser tests.
- [x] Fix issues found and record actual results and any remaining limitations.

## 5. Handoff

- [x] Record final tokens and primary components/routes updated.
- [x] Summarize skills applied and validation evidence.
- [x] Update this checklist with completed work and any outstanding issues.

## Validation log

- ESLint and TypeScript passed.
- All 18 existing unit tests passed.
- Production build passed; 29 generated pages.
- Existing browser suite passed: 15 passed, 1 desktop-only skip of the mobile-menu test.
- Screenshot-based contrast review caught a tablet hero issue; the tablet scrim was corrected and the production build passed again.
- Final production QA passed: 33 route/viewport checks, all sampled hero text meets AA, no overflow or browser errors. See LIGHT-THEME-IMPLEMENTATION.md.

## Follow-up requested after this checklist

- [x] Integrate the supplied 21st.dev staggered testimonials component into `/reviews` using actual approved customer reviews and the new brand palette.
- [x] Keep the homepage review marquee in place.
- [x] Verify carousel navigation, full review access, keyboard controls, reduced motion, and responsive layout.

Follow-up validation: lint, TypeScript, and production build passed. Expanded browser
suite: 23 passed, 1 expected desktop skip of the mobile-only menu test. All five
cards passed clipping, overlap, and overflow checks at 320, 390, 768, and 1440px.
Full approved review text remains available with JavaScript disabled.
