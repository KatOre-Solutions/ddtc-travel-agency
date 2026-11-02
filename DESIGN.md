---
name: DDTC Travel Agency
description: Minimal dark cinematic travel with destination photography and the official DDTC identity.
colors:
  background: "#101722"
  navy: "#10294b"
  ocean: "#1877a5"
  action: "#1764f5"
  action-hover: "#397cf7"
  gold: "#d6ad64"
  ivory: "#f8f6f1"
  white: "#ffffff"
  muted: "#a8b3c5"
  slate: "#334155"
  surface: "#17212e"
  surface-hover: "#202e40"
  field: "#111b28"
  line: "#344154"
  error: "#ffb5b5"
  success: "#a1d7c2"
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
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "15px 24px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
  button-secondary:
    backgroundColor: "{colors.surface-hover}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "15px 24px"
  button-secondary-hover:
    backgroundColor: "{colors.navy}"
  field:
    backgroundColor: "{colors.field}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "13px 12px"
  filter:
    textColor: "{colors.muted}"
    rounded: "{rounded.control}"
    padding: "10px 18px"
  filter-selected:
    backgroundColor: "{colors.surface-hover}"
    textColor: "{colors.white}"
  story-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
    padding: "37px"
  package-panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
    padding: "29px"
  package-option:
    backgroundColor: "{colors.field}"
    rounded: "{rounded.control}"
    padding: "15px 12px"
  package-option-selected:
    backgroundColor: "{colors.navy}"
---

# Design System: DDTC Travel Agency

## Overview

**Creative North Star: "Minimal dark cinematic DDTC"**

The approved DDTC world uses midnight backgrounds, broad destination photographs, white sans-serif headings and quiet champagne details. Saturated blue identifies the main enquiry actions. Generous margins and unboxed experience cards give photography the largest visual role while practical trip information remains readable.

The official client-selected logo is a binding identity asset. Its original serif lettering, travel emblem and gold detail coexist with the interface's sans-serif typography. This document records the implemented website; it establishes no additional print, trademark or corporate artwork rules.

**Key Characteristics:**
- Midnight canvas with tonal navy surfaces.
- Destination photography with restrained corners and dark text scrims.
- Plus Jakarta Sans headings and DM Sans body text.
- Blue enquiry actions, champagne details and visible keyboard focus.
- Original DDTC artwork adapted to navigation and full footer contexts.

## Colors

The palette pairs a dark blue foundation with clear white type, a single saturated action blue and warm champagne detail. Frontmatter values are normative and mirror the stylesheet custom properties.

### Primary
- **Action blue** (`action`, `action-hover`): enquiry buttons, selected radio indicators, text selection and image-card arrow hover.
- **Brand navy** (`navy`): closing enquiry band, selected package options, photo note and floating WhatsApp action.

### Secondary
- **Champagne gold** (`gold`): focus outlines, icon details, quiet emphasis, caret and text-link hover.
- **Ocean blue** (`ocean`): selected package-option outline.

### Neutral
- **Midnight canvas** (`background`): page background and the dark browser theme.
- **Deep surface** (`surface`, `surface-hover`, `field`): panels, selected filters, secondary buttons and form fields.
- **White and ivory** (`white`, `ivory`): main text and softer text over photographs.
- **Muted blue-grey** (`muted`): descriptions, metadata, navigation and legal text.
- **Slate and line** (`slate`, `line`): scrollbar thumb and field strokes.
- **Error pink and success mint** (`error`, `success`): validation and submission feedback.

**The Action Color Rule.** Use action blue for the existing action and selected-state roles; retain champagne for details and keyboard focus.

## Typography

**Display Font:** Plus Jakarta Sans, with sans-serif fallback.
**Body Font:** DM Sans, with sans-serif fallback.

Both fonts are locally hosted variable WOFF2 files. Headings are moderately weighted, tightly tracked and balanced; body copy has open leading. The outlined serif DDTC logo is artwork, not a third interface font.

### Hierarchy
- **Display:** the frontmatter display role describes the desktop photographic hero. At tablet width it is (59px); at mobile it uses `clamp(33px, 8.8vw, 54px)` with (1.18) leading.
- **Headline:** the headline role describes base section headings. Page titles use `clamp(38px, 4.8vw, 68px)`; individual page templates apply their observed sizes rather than a fixed ratio.
- **Title:** the title role describes experience-card headings. Base headings share (1.2) leading, with card titles using the documented (1.35).
- **Body:** the body role is the page default. Lead paragraphs use (20px); hero supporting text uses (17px), becoming (15px) on mobile.
- **Label:** compact metadata and navigation use the label size. Buttons use the separate button role; small buttons use (13px).
- **Prices:** Plus Jakarta Sans with tabular numerals; card prices use (24px), mobile card prices (25px), and the package panel (39px).

**The Artwork Lettering Rule.** Preserve the original outlined DDTC letters; never recreate the logo by typing a substitute serif face.

## Layout

The standard content container caps at (1240px), with total horizontal subtraction of (112px). It changes to (72px) at viewport widths up to (1150px) and (40px) up to (700px). Wide photographic containers cap at (1512px) with (48px) total subtraction; at widths from (1600px) the cap is (1600px) with (80px) subtraction. Mobile wide containers subtract (24px).

Ordinary section padding uses the documented section spacing and switches to compact-section spacing at mobile. Template-specific gaps and padding vary with content. Experience grids use three columns with (27px) column gaps and (48px) row gaps, two columns up to (950px), and one column up to (700px). Editorial split layouts collapse to one column at mobile. The trip sidebar is sticky above mobile and moves before trip copy on mobile. Contact information similarly precedes the enquiry form on mobile.

The header is in normal document flow: (100px) tall on desktop, (84px) up to (950px), and (80px) up to (700px). The navigation logo is (230px) wide, (210px) up to (1150px), and the compact wordmark is (152px) up to (700px). The full footer mark is (250px), (220px) at intermediate widths and (230px) on mobile. Images preserve intrinsic aspect ratio with automatic height and contain fitting. These are implemented web sizes, not inferred corporate clear-space rules.

## Elevation & Depth

Tonal layering provides most depth. Panels use deep surfaces without decorative borders or shadows; photography uses dark gradient scrims to hold white text. The floating WhatsApp action is the deliberate exception, using a soft shadow (`0 5px 20px rgb(0 0 0 / .25)`). Keyboard focus uses a champagne outline (3px), offset by (5px); package-option focus uses a (3px) offset.

## Shapes

Controls have modest corners, photographs and panels have slightly broader corners, and the hero uses the broadest recurring rectangular corner. Caption chips have the smallest radius. Circular shapes are limited to icon actions and radio indicators. Field strokes use (1px); selected package options use an ocean outline. Experience cards remain unboxed, with rounding on the photograph rather than a surrounding card shell.

## Components

### Buttons

Clear, compact enquiry actions. Primary and secondary variants use the frontmatter colors, padding and radius, with minimum height (52px); small buttons use (44px) and padding (12px 18px). Fine-pointer hover changes the background; active presses scale to (.98). Background transitions last (180ms); press transforms last (160ms) with the recorded ease-out curve. Disabled buttons reduce opacity to (.6) and show a waiting cursor. Focus inherits the global champagne outline.

### Filter chips

Category controls are wrapping buttons, not pills. They have minimum height (43px), muted unselected text, and a tonal selected surface with white text. Selection is exposed through `aria-pressed`. Fine-pointer hover uses the deep surface and white text. Mobile horizontal padding becomes (13px).

### Cards / Containers

Experience cards pair a cropped destination photograph with metadata, title, location and a tabular price below. Image ratios are (1.4), becoming (1.45) on mobile. On fine-pointer hover the image scales to (1.035) over (500ms), and the circular arrow turns blue. Story, notice and enquiry panels use tonal surfaces and the documented card radius. Padding varies by role: story preview (37px), enquiry form (35px), package panel (29px), with smaller mobile values.

### Inputs / Fields

Dark fields have a subtle line stroke, documented control corners, minimum height (49px), and visible labels above. Field text is (15px), increasing to (16px) on mobile. Textareas resize vertically. Invalid fields use the error stroke with adjacent error text; success feedback uses the success color. Placeholder text uses muted blue-grey. Search and sort controls use the surface background rather than the form field background.

### Navigation

Desktop links use muted text, white for the current page, and champagne on fine-pointer hover. Up to (950px), links and the header CTA give way to a (44px) menu button. The menu opens in normal flow, exposes `aria-expanded`, and closes on selection or Escape; Escape returns focus to the toggle.

### Official identity artwork

The untouched primary PNG is the fidelity master for the supplied logo. Desktop navigation uses the horizontal SVG, mobile navigation uses the compact traced wordmark, and the footer uses the full white/gold SVG. Full variants retain the company name and motto; navigation variants omit those fine lines for readability. The favicon is extracted from the actual emblem.

The SVG family derives from source contours; its production inks flatten original gradients. Fine palm fronds, anti-aliased edges and cursive joins are approximations. Preserve the exact primary PNG and see [Logo assets](docs/LOGO-ASSETS.md) for file inventory, production method and professional artwork-review limits. Web integration review does not establish these derivatives as print, signage, embroidery or trademark masters.

### Package selector

A tonal sticky panel contains labelled package choices, price, deposit information and an enquiry action. Selected choices use brand navy, an ocean outline and a blue circular indicator. Choice changes update the displayed package price and enquiry context. On mobile, the panel is static and appears above trip details.

Motion is limited to the existing hero settle (1.2s), image hover, small button press and action hover. Hover effects run only for fine pointers. Reduced-motion preferences disable transitions and animations and restore immediate scroll behavior.

## Do's and Don'ts

### Do:
- **Do** preserve the official source artwork and its original serif DDTC contours.
- **Do** use the horizontal, compact and full white/gold variants in their existing navigation and footer contexts.
- **Do** maintain intrinsic logo aspect ratios and the implemented responsive header dimensions.
- **Do** preserve white and ivory text, muted supporting copy, blue actions and champagne focus on the dark canvas.
- **Do** keep keyboard focus visible and honor reduced-motion preferences.

### Don't:
- **Don't** replace the supplied DDTC artwork with generic travel symbols or typed lettering.
- **Don't** turn the raster-derived SVG family into an unqualified claim of original vector-master fidelity.
- **Don't** infer new corporate proportions, clear-space requirements or print approval from these web adaptations.
- **Don't** replace the approved navy palette or locally hosted font pairing during routine extensions.
