# Wispr Flow: Style Reference (source material)

> Saved from Refero Styles: https://styles.refero.design/style/ac53825c-1e06-4ae0-8489-cace5c5e0339 (fetched 2026-10-20).
> **How White October uses it:** we borrow the STRUCTURE only (alternating chambers, oversized section radii, 2px ink borders, shadowless flatness, floating nav pill, two-panel FAQ, logo strip on a dark curved chamber, giant footer wordmark). We do NOT use its colours (lavender, teal, cream) or its fonts (EB Garamond, Figtree). WO's own system is in `docs/DESIGN.md`.

**Tagline:** cream broadsheet, dark velvet chambers. **Theme:** mixed.

Wispr Flow reads like an editorial broadsheet rebuilt for software: a warm cream canvas (#ffffeb) hosts weight-400 EB Garamond at display sizes (48-120px), while Figtree handles every interactive surface. Pages alternate between bright cream chambers and deep near-black rooms, separated by 2px ink borders and oversized corner radii (40-80px) that make each section feel rounded like a polished pebble. Four working colours: cream, black, lavender (#f0d7ff) for primary actions, forest teal (#034f46) for inner accents, with an occasional ember orange (#ffa946) for active states.

## Tokens: colours
| Name | Value | Role |
|---|---|---|
| Lavender Whisper | #f0d7ff | Primary CTA fill, accent card surfaces |
| Forest Ink | #034f46 | Secondary surface: pill badges, inner dark-panel cards |
| Ember Glow | #ffa946 | Live/active accent |
| Vast Ink | #1a1a1a | Primary text, button borders, dark section backgrounds |
| Charcoal | #222222 | Secondary button and nav text |
| Fog | #8a8a80 | Muted captions |
| Lumen Stone | #e4e4d0 | Subtle borders, nav pill background |
| Lumen Cream | #ffffeb | Page canvas, card surfaces |
| Pure White | #ffffff | Badge borders on dark, icon strokes |

## Typography
- Display: EB Garamond 400 at 32/48/64/120px, line-height 0.85-0.95, letter-spacing -3.6px at 120px, -1.92px at 64px.
- Body/UI: Figtree 400 (500-700 for emphasis), 14-32px, line-height 1.3; 16px is the workhorse.
- Scale: minor third (1.2) from an 18px base.

## Spacing and shape
- Base unit 8px; comfortable density; max width 1200px; section gap 64-96px; card padding 32px; element gap 8-16px.
- Radii: inputs 12px, buttons 12px, cards 32px, sections 40-80px, badges full pill.

## Components (as observed)
- **Primary CTA:** lavender fill, ink text, 2px solid ink border, 12px radius, 16px/24px padding, Figtree 500 16px.
- **Outlined secondary:** cream fill, ink text, 2px ink border, 12px radius.
- **Floating navigation pill:** cream pill, full radius, 2px ink border; logo left, nav items with dropdown chevrons, CTA pinned right; floats with margin from page edges.
- **Cream content card:** 32px radius, 32px padding, no shadow, optional 2px ink border.
- **Dark feature card ("velvet room"):** #1a1a1a, 40-80px radius, 55-70px padding, cream text.
- **Status badge:** teal pill, cream text, 8px/16px padding.
- **Waveform visualizer:** cream pill with 5-7 animated vertical bars; used as functional punctuation.
- **Section container:** alternating cream and dark fills, 40-80px outer radius, no dividers: fill alternation and rounded corners do the work.
- **Hand-drawn underline accent:** lavender SVG squiggle under 1-2 words in a display headline.
- **Logo strip ("Used by professionals at"):** single-colour logos on a dark curved chamber, horizontally scrolling.
- **FAQ ("Good questions."):** two panels inside a rounded container: dark teal question list on the left with an active row highlight, answer shown as a chat bubble on the right with the brand avatar beneath.
- **Footer:** giant brand mark + wordmark filling the width, small legal links and social icons beneath.

## Do
- Alternate light and dark sections page-wide; every dark chamber is bookended by light.
- 32px radius on cards, 40-80px on dark section cards; never 4-8px on content blocks.
- 2px solid ink borders on interactive elements.
- Authority from scale, not weight, in display type.

## Don't
- No box-shadow elevation (border-driven, flat).
- No non-palette accent colours, no gradient fills.
- No centred body copy blocks.
- No cream content on cream canvas without a border or background change.

## Layout notes
Centred max-width content with full-bleed section backgrounds. Floating nav pill. Sections alternate light/dark with rounded chamber tops. Text-left/visual-right on feature sections; centred stacks for headlines. Footer is a full-width band. Vertical rhythm 64-96px between major sections, 32px between cards, 8-16px within a block.
