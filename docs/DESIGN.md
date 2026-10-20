# White October: website design system

The source of truth for how the site looks. Tokens live in `app/globals.css` (`@theme`); this file explains them.
Structure is borrowed from Wispr Flow (`docs/references/wispr-flow-DESIGN.md`); everything visual is White October's own.

## Central idea
The WO mark is a **tilted square** and a **smiling ball**. Every shape on the site comes from those two:
the 3D gift box (square), the ball that smiles (circle), pill buttons, list bullets, the FAQ avatar, the intro, the footer.

## Colour (strict: 4 colours + tints)
| Token | Hex | Use |
|---|---|---|
| `orange` | #FF7200 | From the logo master file. Fills (buttons, tiles, smile), text **on black** (7.7:1) |
| `orange-ink` | #E86A00 | Orange words **on white**, large text (24px+) only (3.2:1). Never small orange text on white |
| `orange-1..3` | #FFC08F, #FFA25A, #E0761F | Profile p10 tints. Industry tiles only |
| `black` | #0E0E0E | Dark chamber surfaces |
| `ink` | #111111 | Text on light |
| `white` | #FFFFFF | Cards, hover tiles, text on dark |
| `canvas` | #FAFAFA | Light chamber background |
| `panel` | #EFEFEF | Secondary light surfaces |
| `grey` | #797676 | Brand grey (profile numerals): large numerals, graphics, rules. Only 4.3:1 on #FAFAFA, so not for small text |
| `grey-ink` | #6B6868 | Muted body text on light (5.3:1 on #FAFAFA) |
| `grey-soft` | #B9B7B7 | Idle client logos, muted text on dark |

Nothing else. Client logos and photos are the only place other hues appear.

## Type
- **Outfit** (free Gilroy stand-in, chosen in the font lab 2026-10-20; swap to real Gilroy by changing `app/fonts.ts`).
  Headings use the profile's **Bold + Regular pairing** ("**Recognition** Solutions"). Body 18px / 1.6, measure 65ch.
- **Antonio Bold** for display: big numerals (01-04), statements, the footer.
- Scale: 1.25. Display clamps: hero 44-88px, section heads 36-64px.
- No em dashes anywhere in copy.

## Shape (one system)
| Element | Radius |
|---|---|
| Section chambers | 64px top corners desktop, 32px mobile |
| Cards, image frames | 32px (24px mobile) |
| Inputs | 14px |
| Buttons, badges, nav | full pill |
Interactive elements carry a 2px ink border on light (white on dark). Shadowless. The only glow: the orange halo on hovered client logos.

## Space
8px base. Max content width 1280px. 96-128px between sections desktop, 64px mobile. Card padding 32px.

## Motion rules
- Every animation has a one-line reason: story, hierarchy, or feedback.
- Transform and opacity only. Lenis smooth scroll; GSAP ScrollTrigger for pins (`start: "top top"`); `motion/react` for UI micro-interactions; never GSAP/Three and Motion in the same component tree.
- One shared WebGL canvas for all 3D (drei `View`), device tiers, static fallbacks.
- Everything collapses to static under `prefers-reduced-motion`.
- Easing default: `cubic-bezier(0.16, 1, 0.3, 1)` (expo out). Durations 0.4-0.9s.

## Section rhythm (home)
light hero, **dark** clients, light hook, light solutions, **dark** story/process (pinned 3D), light bento, grey industries, **dark** experience centre, light FAQ, **dark** footer.

## Where we overrode the taste skill (references win)
- Alternating light/dark chambers instead of a single page theme (Wispr reference).
- Centred hero headline (giftative reference).
- No dark-mode toggle: the chambers carry both tones.
