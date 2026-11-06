---
name: DDTC Travel Agency
description: Bright coastal travel with the existing destination photography and official DDTC identity.
colors:
  background: "#ffffff"
  navy: "#041855"
  ocean: "#089eee"
  action: "#0463c5"
  action-hover: "#034f9d"
  booking: "#c81024"
  booking-hover: "#a40d1e"
  soft-red: "#fff3f4"
  gold: "#f6b913"
  gold-ink: "#856006"
  ivory: "#42566f"
  white: "#ffffff"
  muted: "#42566f"
  slate: "#71849a"
  surface: "#f2f8ff"
  surface-hover: "#e3f0ff"
  field: "#ffffff"
  line: "#dce6f0"
  field-border: "#71849a"
  error: "#a40d1e"
  success: "#186343"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "clamp(44px, 4.8vw, 72px)"
    fontWeight: 600
    lineHeight: 1.13
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "clamp(29px, 3vw, 42px)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "21px"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.02em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.65
  button:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.5
rounded:
  caption: "4px"
  control: "6px"
  status: "8px"
  card: "10px"
  hero: "12px"
  round: "50%"
spacing:
  icon: "8px"
  inline: "12px"
  field: "20px"
  control: "24px"
  card-gap: "27px"
  compact-section: "52px"
  section: "85px"
---

# Design system: DDTC Travel Agency

## Direction

The client-approved light brand refinement of 6 November 2026 supersedes the previous dark theme. Preserve the site people already like: its page structure, copy, typography, photography, package information, routes, SEO, and enquiry behavior. The visual direction is bright, coastal, welcoming, and professional.

White and Coastal Mist dominate. Navy establishes hierarchy; Travel Blue identifies navigation, links, filters, and secondary actions. Destination Red is reserved for primary trip-planning and enquiry actions. Gold supplies restrained warmth in review stars and the existing logo. The palette is pinned by the brief; no replacement visual concept or new image sourcing is required.

The CSS custom properties in `src/app/globals.css` are the runtime source of truth. Frontmatter records the same values. `--ink` aliases navy, `--focus` aliases action blue, and the existing `--ivory` name now aliases body-text colour for compatibility. The root and exported Next.js viewport use a light colour scheme and white browser theme.

## Colour roles and contrast

| Role | Colour | Usage |
| --- | --- | --- |
| Canvas | #FFFFFF | Page, navigation, footer, inputs |
| Coastal Mist | #F2F8FF | Services, closing CTA, form, notices, review surfaces |
| Ocean Navy | #041855 | Headings, principal text, wordmark |
| Travel Blue | #0463C5 | Links, selection, focus, secondary actions |
| Blue hover | #034F9D | Hover on blue actions and links |
| Sky Blue | #089EEE | Supporting brand accent token |
| Destination Red | #C81024 | Primary booking and enquiry buttons |
| Red hover / error | #A40D1E | Primary hover and labelled errors |
| Soft red | #FFF3F4 | Invalid input background |
| Sunshine Gold | #F6B913 | Decorative rating fill |
| Gold outline | #856006 | Legible star silhouette on light surfaces |
| Body text | #42566F | Paragraphs, captions, supporting information |
| Selected surface | #E3F0FF | Selected packages and filters |
| Subtle line | #DCE6F0 | Quiet separations |
| Field border / scrollbar | #71849A | Visible input boundaries |
| Success | #186343 | Confirmed submission feedback |

Measured WCAG contrast: navy/white 16.57:1; body/white 7.52:1; body/mist 7.04:1; white/red 5.91:1; white/red hover 7.91:1; blue/mist 5.46:1; blue/selected surface 5.05:1; field border/white 3.84:1; error/soft red 7.30:1; success/white 7.23:1; gold outline/mist 5.35:1. Gold is never primary text on white. Error messages remain explicit text associated with invalid fields, not colour alone.

## Typography and layout

Keep locally hosted Plus Jakarta Sans for headings and DM Sans for body copy. The outlined serif logo is artwork, not a third interface font. Heading sizes and weights, grid geometry, section order, image crops, and responsive breakpoints are retained. Marquee quotes are 16px; review initials and trip labels are at least 13px.

The standard content container caps at 1240px with 112px total horizontal subtraction, then 72px up to 1150px and 40px up to 700px. Wide photographs cap at 1512px with 48px subtraction; at 1600px and above the cap is 1600px with 80px subtraction. Mobile wide containers subtract 24px. Normal section padding is 85px, 52px on mobile.

Experience grids retain three columns with 27px gaps and 48px row gaps, two columns up to 950px, one up to 700px. Editorial splits collapse on mobile. Trip package selection moves above the copy on mobile. Headers remain 100px on desktop, 84px on tablet, and 80px on mobile. Navigation artwork is 230px wide, 210px at intermediate widths, and 152px on mobile. Full footer artwork remains 220–250px wide.

## Photography and hero

Keep all existing licensed destination images and their attribution. A neutral white scrim replaces the dark hero overlay, retaining the coastal panorama and the same two-line heading. Desktop uses a left-to-right fade; tablet extends protection beneath the longer headline; mobile uses a top-to-bottom fade with text near the top and the coast visible below. The hero photo, title, body, primary action, and secondary action stay immediately available. White caption surfaces hold navy location and scroll text over the image.

Hero legibility is checked by sampling the rendered photo and scrim beneath text at desktop, tablet, and mobile sizes. General flat-colour contrast cannot establish contrast over photography.

## Shared components

Primary booking actions use `.button-booking`, layered on the existing `.button` shape. Generic buttons remain Travel Blue; secondary buttons use a pale blue surface with blue text. All retain press feedback, visible focus, disabled semantics, and existing dimensions. Links and active navigation use blue; active navigation and filters have an underline as a non-colour cue.

The white mobile menu retains its toggle, Escape behavior, focus restoration, inert closing state, and navigation handling. Menu shadows are reserved for this floating surface. The WhatsApp button stays blue with its existing floating silhouette.

Experience cards stay unboxed and photo-led. Country captions and arrows now sit on light surfaces. No promotional badges or availability claims are added. Trip prices, dates, inclusion lists, disclaimers, package switching, and enquiry parameters are unchanged.

Package panels, notices, review surfaces, forms, services, and closing enquiries use Coastal Mist. Selected package rows use pale blue with a clear blue outline and checked radio mark. Inputs remain white with a stronger border than decorative lines. Invalid inputs use soft red plus the existing error text and `aria-invalid`. Consent and legal links use readable blue.

The footer is white with navy headings and supporting body text. It uses the exact client-supplied primary PNG. Navigation uses the existing navy compact wordmark. Logo files are not recoloured or regenerated. The exact pixel/alpha identity test continues to protect the original. See `docs/LOGO-ASSETS.md` for source provenance and the raster-derived vector limitations.

## Reviews and motion

The homepage keeps the approved two-row review marquee, original customer excerpts, initials, five-star ratings, pause control, hover/touch pause, and offscreen suspension. Reduced motion shows every unique review in a static grid. Duplicated groups stay hidden from screen readers. Original review submissions and permission remain in `docs/REVIEW-SOURCES.md`.

The dedicated Reviews page uses the client-supplied 21st.dev staggered testimonial card pattern. Cards show approved excerpts, initials, names, trip context, and ratings; the selected card is blue with white copy. Manual arrows and side-card selection update the complete review below. Arrow keys and Home/End switch instantly; pointer movement uses 250ms transforms with the existing ease-out. No auto-advance is used. At small widths, a preview excerpt may be clamped while the complete text remains below. A no-JavaScript fallback provides every full review. The homepage continues to use its existing marquee.

The existing hero settle, editorial entrances, photograph reveals, button press feedback, and 200ms mobile-menu transition are retained. No animation dependency is introduced. Reduced-motion handling, focus-triggered reveal, and immediate functional surfaces remain intact. See `src/components/section-motion.tsx` for the existing IntersectionObserver/Web Animations implementation.

## Preservation and maintenance

Do not introduce invented discounts, reviews, reviewer portraits, availability, partnership claims, or completed-trip photography claims. Preserve enquiry-only behavior: no payment or confirmed reservation is made. Follow the route data and disclosure source files; keep visual edits separate from submission logic.

Impeccable colour hierarchy and accessibility guidance, Taste's existing-project preservation and screenshot review, and Emil's interaction restraint informed this refinement. The pinned client brief overrides generic detector advice to delete approved quote emoji, replace review cards, add footage, or increase animation. See `docs/LIGHT-THEME-TODO.md` for progress and `docs/LIGHT-THEME-IMPLEMENTATION.md` for verification evidence and remaining limits.
