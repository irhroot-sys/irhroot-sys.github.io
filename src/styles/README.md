# AALKC design system

**Idea: "the measure of our word."** أمانة الكلمة means *the trust of one's word*, and the business runs on weighing, grading and certifying metal. So the identity uses the visual language of precision documents: registers, captioned photo plates, a graduated scale rule, and monospaced data.

## Sources in the logo
- **Navy `#0E335C` and steel `#7D8389`** are the two logo inks. Every neutral and dark surface is derived from them (`tokens.css`).
- **The skyline bars** become the `.scale-rule`: minor ticks every 8px, a major tick every 80px. It sits under heroes, the process track and the 404 page.
- **The wide, stable A** is echoed by Archivo at an expanded width (`--display-stretch`).
- **Copper** is the single signal colour, taken from the most valuable metal in the yard. Use it for calls to action, indices and what is measured. Never use it as decoration or a gradient.

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
- Square corners. Use hairlines and the ink/paper contrast for depth; shadows only on floating panels.
- Photographs are `.plate`s with a numbered caption, graded with `--photo-grade`. Do not darken them into backgrounds; the homepage hero is the only full-ink moment.
- One copper button per view. Supporting actions are `.secondary-button` or `.inline-action`.
- Section openings use `<SectionHeading index="0n">`: label and title on the left, copy answering on the right.
- Small text must meet 4.5:1. The token comments list the safe text colour for each surface.
- Latin values inside Arabic text (grades, standards, phone numbers) use `dir="ltr"` or `unicode-bidi: plaintext`.
