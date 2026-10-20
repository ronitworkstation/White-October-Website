# White October website: spec (grill-me, approved 2026-10-20)

**Goal:** a marketing site that makes Indian companies trust White October in one scroll and send a quote.

**Success:** Medhansh approves the preview; a quote sent from a phone reaches the test inbox within a minute; Lighthouse mobile performance ≥ 85, accessibility ≥ 95, CLS < 0.1; scrolling the home page on a mid-range Android shows no visible stutter.

## Must-haves and acceptance tests
| Must-have | Accept test | Status |
|---|---|---|
| Header | Portrait logo left (full size over the hero, scaled into the pill on scroll), nav one line centred, "Send a Quote" right at 1024 and 1440px; see-through at the top, solid white once scrolled. At 375px: menu button opens a full-screen menu | rebuilt 2026-10-21; computed styles checked at scroll 0 and 360 |
| Hero | Brochure hook as the headline: 2 lines at 1024px and wider, up to 4 at 375px. Headline, subline and CTA visible without scrolling at 1920x883, 1366x768 and 375x667; the text never overlaps the people in the photo | rebuilt 2026-10-21: 2 lines at 1920/1440/1366, 3 at 375; checked at all five sizes. Landscape uses the outpainted photo (full width, people always below the text); portrait uses the tall mobile photo; no eyebrow |
| Client logos | All 50 present; idle grey; hover, keyboard focus and tap show original colours + orange glow; marquee pauses on hover | built, hover checked |
| Chambers | Sections alternate light/dark with 64px (desktop) / 32px (mobile) curved tops | in progress |
| Palette lock | No hue outside orange, black, white, grey (+ orange tints) except in logos and photos | enforced by wiping Tailwind's palette |
| FAQ | Desktop: click or arrow-key through questions to show the answer bubble. Mobile: accordion | phase 4 |
| Footer | Big contact block; giant cropped mark smiles when it scrolls into view; small wordmark | built (2D smile); 3D in phase 3 |
| Logo intro | First visit only, max 1.2s, skippable, absent under reduced motion; hero image loads behind it | phase 2 |
| Quote form | Validation; test submission shows success and emails aziz998787@gmail.com; error state when offline; WhatsApp opens wa.me prefilled | phase 4 |
| Home solutions | Indigram-style numbered list of the 4 families before the client logos; a row click (or Enter/Space) opens it in place to show its profile cards; one open at a time, all closed on load; closed panels stay in the HTML | rebuilt 2026-10-21; click, keyboard and one-open checked at 1440 and 375 |
| Why White October | Benzai-style label + statement + 4 facts, only facts from the profile and brochure; statement brightens on scroll; with reduced motion everything is plain and visible | built 2026-10-21; statement awaits Medhansh's approval |
| Solution pages | 4 pages; 6 / 5 / 6 / 5 items as in the profile; no prices or SKUs | phase 4 |
| 3D | Gift-box story + footer mark in one canvas; WebGL off or reduced motion → complete static version | phase 3 |
| Smoothness | Lenis + GSAP, transform/opacity only; meets success metrics | Lenis wired to GSAP ticker |
| Responsive | Clean from 375 to 1920px; no horizontal scroll | checking per section |
| SEO basics | Unique title/meta per page, LocalBusiness schema, sitemap, robots, OG image, `/hello-world/` → `/` | phase 5 |
| Editable | Changing a line in `content/*.ts` changes the site after rebuild | true by design |

## Send it back if
An off-palette colour appears; the logo is distorted or wrong; any invented fact (numbers, quotes, claims); other brands' work shown as WO's (exception, Aziz's decision 2026-10-20: the supplied item photo folder is used as given); scrolling stutters; copy sounds AI-written; anything looks templated.

## Out of scope
Product catalogue, prices or cart; blog; CMS/admin panel; testimonials (until real quotes exist); dark-mode toggle; multi-language; Claude signing in to WordPress or hosting; buying domains.

## Assumptions (correct these if wrong)
- Visitors: HR, admin and marketing buyers from Bengaluru and across India, arriving from Google, LinkedIn and WhatsApp-shared links; even phone/laptop split. *(medium)*
- Built to rank for local searches like "corporate gifts Bangalore". *(medium)*
- I draft all copy from the profile and brochure; Medhansh approves it. *(medium)*
- whiteoctober.co is the launch domain; the empty WordPress is retired at launch. *(low)*
- Netlify free tier + Netlify Forms. *(low)*
- No dark-mode toggle; the chambers carry both tones. *(low)*
