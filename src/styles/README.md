# AALKC design system

**Idea: "the measure of our word."** أمانة الكلمة means *the trust of one's word*, and the business runs on weighing, grading and certifying metal. So the identity uses the visual language of precision documents: registers, captioned photo plates, a graduated scale rule, and monospaced data.

## Colour: Navy · Steel · Platinum
The palette is the official logo, extended. Both scales sit on the mark's own hue (≈211°), so the whole site reads as one material family.

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Brand navy | `--navy-800` | `#0E335C` | Dark surfaces, headings, primary actions |
| Brand steel | `--steel-500` / `--metal` | `#7D8389` | Hairline accents on navy panels, inactive display titles, non-text marks |
| White / mist / frost | `--white`, `--mist`, `--frost` | `#FFFFFF`, `#F3F6F9`, `#E8EDF2` | Light grounds; sections alternate white and mist |
| Cobalt (signal on light) | `--signal` | `#2D63A0` | Indices, labels, active states, focus |
| Ice / platinum (signal on navy) | `--signal-on-ink`, `--platinum` | `#9FC2EA`, `#D3DCE6` | Indices, hovers and highlights on navy |
| Footer | `--navy-900`, `--navy-950` | `#0A2848`, `#081F3A` | Deepest surfaces — still navy, never near-black |

- **No gold, copper or orange.** The yard's photographs already carry the warm metals; the interface stays in the logo's cool register and lets the material be the warmth.
- **Primary action:** solid brand navy with white type on light ground; inverted (white, navy type) on navy. Hover lifts to `--navy-600` / `--navy-100`.
- **The logo is never recoloured** on light ground. The header is white so the mark shows in its true navy and steel. On navy (footer only) the approved reversed form is used: white A, steel bars.

## Sources in the logo
- **The skyline bars** become the `.scale-rule`: minor ticks every 8px, a major tick every 80px. It sits under heroes, the process track and the 404 page.
- **The wide, stable A** is echoed by Archivo at an expanded width (`--display-stretch`).
- **Navy-to-steel** is the system's quiet motion: capability titles rest in steel and turn navy when chosen; navy panels carry a steel top rule.

## Type
| Role | Latin | Arabic |
| --- | --- | --- |
| Display (h1/h2) | Archivo Variable, 116–125% width | Noto Kufi Arabic |
| Text | IBM Plex Sans | IBM Plex Sans Arabic |
| Data / labels | IBM Plex Mono | IBM Plex Sans Arabic |

## Files (import order = cascade order)
1. `tokens.css`: colour, type, space, layout, motion and photo-grade tokens, with contrast notes.
2. `base.css`: element defaults for both scripts, focus, layout utilities, reveal motion.
3. `primitives.css`: label, section heading, scale rule, plate, buttons, chips, check list, register, form fields.
4. `layout/header.css`, `layout/footer.css`: site chrome.
5. `components/overlays.css`: contact concierge and quote dialog.
6. `components/home.css`: statement hero, assay register, capability index, method, sectors, company register, closing, service card.
7. `pages/pages.css`: interior page hero and page-specific compositions.

## Rules
- Square corners. Use hairlines and the navy/white contrast for depth; shadows only on floating panels.
- Photographs are `.plate`s with a numbered caption, graded with `--photo-grade` (held-back saturation so warm scrap tones sit quietly in the cool interface). Do not darken them into backgrounds; the homepage hero is the only full-navy photographic moment.
- One navy primary button per view (white on navy surfaces). Supporting actions are `.secondary-button` or `.inline-action`.
- Dark panels add the `on-ink` class so labels, buttons, headings and focus rings switch to their on-navy values automatically.
- Section openings use `<SectionHeading index="0n">`: label and title on the left, copy answering on the right.
- Small text must meet 4.5:1. The token comments list the safe text colour for each surface.
- Latin values inside Arabic text (grades, standards, phone numbers) use `dir="ltr"` or `unicode-bidi: plaintext`.
