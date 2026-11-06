# Official DDTC logo family

## Source and selection

The user selected the primary DDTC corporate logo on 2 November 2026. The supplied file is a single standalone logo, not a composite brand board. Its exact original is preserved as `brand-source/DDTC-primary-client-original.png` and `public/brand/ddtc-primary.png`; the Downloads original is never modified.

The artwork includes the original serif DDTC lettering, palm trees, gold sun and swooshes, blue mountain/wave composition, two aircraft, the full company name, travel-agency descriptor and cursive motto. It supersedes the provisional generic sun/mountain mark.

## Deliverables

| Variant | SVG | Transparent PNG | Use |
| --- | --- | --- | --- |
| Primary full logo | `public/brand/ddtc-primary.svg` | `public/brand/ddtc-primary.png` | Light surfaces; PNG retains exact supplied pixels |
| Horizontal navigation | `public/brand/ddtc-horizontal.svg` | `public/brand/ddtc-horizontal.png` | Navy desktop navigation |
| Full white and gold | `public/brand/ddtc-white-gold.svg` | `public/brand/ddtc-white-gold.png` | Dark surfaces and website footer |
| Full navy | `public/brand/ddtc-navy.svg` | `public/brand/ddtc-navy.png` | Light surfaces; navy/blue adaptation |
| Compact DDTC wordmark | `public/brand/ddtc-wordmark.svg` | `public/brand/ddtc-wordmark.png` | Mobile navigation; retains original serif letters and C/aircraft detail |
| Compact navy wordmark | `public/brand/ddtc-wordmark-navy.svg` | — | Alternate small mark on light surfaces |
| Sunrise/mountain favicon | `public/brand/ddtc-favicon.svg` | `public/brand/ddtc-favicon.png` | Cropped from the actual emblem, on a navy tile |

The favicon is installed at `src/app/icon.svg`; `src/app/apple-icon.png` provides the 180px home-screen icon. SVGs contain actual vector paths, with no embedded raster images, external fonts or external resources.

## Production method and fidelity

The source already has an alpha channel. Its colour data can look hazy when a preview ignores transparency; the original artwork remains the fidelity master. A generative cleanup was trialled using the built-in image tool, then rejected because details changed. It is not used by the website.

The selected contours were traced directly from the supplied pixels at 1536×1024 using VTracer. Source alpha at the 50% edge defines the contour. Six source-derived inks are classified and traced as spline paths. Every word is outlined from the supplied artwork, rather than recreated using a substitute font or generated text. Gradients are flattened into production inks in the SVG adaptations. The primary PNG retains the original pixels and gradients exactly.

White/gold and navy variants recolour these same contours. The navigation variant rearranges the original emblem, DDTC letters and original “DDTC TRAVEL AGENCY” line into a horizontal lockup. The compact signature omits the detached tip of the large emblem’s swoosh above the first D, while preserving letter contours and the gold C/plane. The favicon extracts the source’s central sunrise and mountain silhouette; it is not a new generic icon.

The full company name and motto remain in the full variants. They are intentionally omitted from the navigation lockup to preserve readability without increasing navigation height. The full footer logo and existing legal text provide the complete identity.

## Remaining artwork limitations

These are **raster-derived web vectors**, not the original Illustrator/EPS master or a claim of pixel-identical manual reconstruction. Small colour regions, anti-aliased edges, fine palm fronds and cursive joins are approximated by the trace. The original gradients are flattened in the SVG family. A professional designer should review and clean the contours and approve the derivative lockups before print, signage, embroidery or trademark-master use. No unseen brand-guideline proportions are claimed.

For the most exact full-logo reproduction, use the untouched primary PNG on a light background at or below its supplied resolution. Following the light-theme refinement of 6 November 2026, the website footer uses that exact primary PNG and navigation uses the existing compact navy wordmark SVG. The white/gold variants remain available for dark-surface reproduction. No artwork files or logo colours were altered for the theme change.

## Reproduction and maintenance

`scripts/trace-logo.py` reproduces the SVG family from the preserved source. Its build-only dependencies are VTracer and NumPy in ignored `.tools/logo-vectorizer`. `scripts/render-brand.mjs` renders transparent PNG exports through the existing Sharp dependency. These are not required at website runtime or for a normal Next.js build.

The header stays 100px on desktop and 80px on mobile. Navigation logo width is 230px on large desktop, 210px on intermediate widths and 152px for the mobile wordmark. The footer logo is 220–250px wide. All retain intrinsic aspect ratio, `height: auto` and `object-fit: contain`.

Website content, journeys, filters, enquiry behaviour, colours, typography and page layouts are preserved.
