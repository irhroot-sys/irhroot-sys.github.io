# AALKC design system

**Idea: "the measure of our word."** أمانة الكلمة means *the trust of one's word*, and the business runs on weighing, grading and certifying metal. The identity is the logo, extended: navy and steel, a firm contemporary grotesk for what is declared and an open one for what is read, records on steel plate, generous space, and the photography of the yard. One orchestrated moment — on load the mark assembles in the header while the homepage statement rises and the skyline bars climb out of the credentials band into the photograph — and everything else stays quiet.

## Colour: Navy · Steel · Platinum
The palette is the official logo, extended. Both scales sit on the mark's own hue (≈211°), so the whole site reads as one material family.

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Brand navy | `--navy-800` | `#0E335C` | Dark surfaces, headings, primary actions |
| Brand steel | `--steel-500` / `--metal` | `#7D8389` | Hairline accents on navy panels, inactive display titles, non-text marks |
| White / mist / frost | `--white`, `--mist`, `--frost` | `#FFFFFF`, `#F5F7FA`, `#E8EDF2` | Light grounds; sections alternate white and mist |
| Signal on light | `--signal` (`--navy-500`) | `#2F5F91` | Links, active states, focus — 6.6:1 on white |
| Ice / platinum (signal on navy) | `--signal-on-ink` (`--navy-300`), `--platinum` | `#A9C3DE`, `#D3DCE6` | Indices, hovers and highlights on navy |
| Footer | `--navy-900`, `--navy-950` | `#0A2848`, `#081F3A` | Deepest surfaces — still navy, never near-black |

- **No gold, copper or orange.** The yard's photographs already carry the warm metals; the interface stays in the logo's cool register and lets the material be the warmth.
- **Primary action:** solid brand navy with white type on light ground; inverted (white, navy type) on navy. Hover lifts to `--navy-600` / `--navy-100`.
- **The logo is never recoloured** on light ground. The header is white so the mark shows in its true navy and steel. On navy (footer only) the approved reversed form is used: white A, steel bars.

## Sources in the logo
- **The skyline bars** are reused, never redrawn: `SkylineGraphic` renders the exact paths exported from `BrandMark.jsx`. On the homepage hero they rise from the credentials band as a navy silhouette against the photograph. They are never mirrored in Arabic.
- **Kickers** carry two bars from the mark — the A's navy stroke and a shorter steel bar — instead of an index number.
- **The scale rule** (minor tick every 8px, major every 80px) appears only where something is weighed: the four-step process track, and the 404 page. It sits under heroes, the process track and the 404 page.
- **Navy-to-steel** is the system's quiet motion: capability titles rest in steel and turn navy when chosen; navy panels carry a steel top rule.

## Type: brand, declared and measured
AALKC's own office typefaces lead; the rest come from its Adobe Fonts web project `jrz4pqn` (linked in `index.html`, served by Adobe under AALKC's Creative Cloud licence, every family set to `font-display: swap`).

| Voice | Latin | Arabic |
| --- | --- | --- |
| Brand — homepage statement, page titles, wordmark, footer signature | **AALKC** (office face; capitals only) | **Mawzoon** (Adobe; single weight) |
| Section titles | **Sweet Square Pro** Medium (Adobe) | Mawzoon |
| Card and row titles | Sweet Square Pro Medium | **AALKC Kufi** Bold (office face; Noto Kufi Arabic, OFL) |
| Body, interface, labels | **Futura PT** Book / Medium / Demi (Adobe) | AALKC Kufi Regular |
| Figures — symbols, codes, step numbers, large numerals | Sweet Square Pro Extra Light | — (Latin in both languages) |

- **AALKC is capitals only**, so it never sets chemical symbols (Cu, Fe), long titles or running text. Files, licence and provenance: `src/assets/fonts/aalkc/`.
- **Weights are never synthesised** (`font-synthesis-weight: none` on `body`): each face ships only the weights in use.
- **Fallbacks**: General Sans and Cabinet Grotesk (ITF Free Font License), fetched unaltered at build time by `scripts/fetch-fonts.mjs` into `src/fonts/` (gitignored — the licence forbids committing them), used only if Adobe Fonts cannot be reached.
- Roles, not families: `--font-statement`, `--font-brand`, `--font-display`, `--font-title`, `--font-text`, `--font-figures`; each switches script under `[lang="ar"]`, and a Latin name inside Arabic (`lang="en"`) takes the Latin values back.
- The Arabic stacks lead with the Latin face (no Arabic glyphs), so Arabic letters fall through to Mawzoon or AALKC Kufi while digits, ISO codes and names stay Latin.
- Preloads: AALKC Bold on English pages, AALKC Kufi Regular on Arabic pages; Adobe Fonts is preconnected.
- Long-form reading: `--fs-article` 17–19px at `--lh-article` 1.72 on a 66-character measure. Labels are sentence case. Arabic copy uses Western digits.

## Materials: paper, steel plate, navy
- **Paper** (`--surface`, `--surface-alt`) for reading.
- **Steel plate** (`--surface-plate` `#E6EAEF`, rules `--plate-rule`) for records — `.register.is-plate`: the company register and the buyer quality facts, set like the data plate riveted to a machine, with a navy top edge. Body text 8.7:1, muted 5.1:1.
- **Navy** for statements only: hero, sectors, closing, footer.
- No textures, gradients-as-decoration or brushed-metal effects: the material is suggested by colour and edge alone.

## Motion: one orchestrated load, then quiet reveals
- **On load** the header mark assembles (`BrandMark animate`): the A's left stroke rises from its foot, the right falls from its apex, the skyline grows between them, and one band of light crosses the finished mark. Parts are revealed through clip paths, never redrawn, so at rest the mark is the approved artwork. Hovering the brand sends the light across again.
- In step with it the homepage statement is **unveiled line by line** (`line-unveil`: each line rises out from behind its own baseline), followed by the lede and actions, while the skyline supergraphic climbs into the photograph.
- **On scroll** (staged by `MotionManager`, only for content that starts below the fold): section titles and the footer signature unveil the same way; other content rises gently; photographs open behind a mask; the process scale rule draws itself across like a gauge sweeping to its reading.
- With reduced motion nothing moves; everything renders at rest.

## Files (import order = cascade order)
0. `fonts.css`: `@font-face` for the build-fetched Latin faces.
1. `tokens.css`: colour, type, space, layout, motion and photo-grade tokens, with contrast notes.
2. `base.css`: element defaults for both scripts, focus, layout utilities, reveal motion.
3. `primitives.css`: label, section heading, scale rule, plate, buttons, chips, check list, register, form fields.
4. `layout/header.css`, `layout/footer.css`: site chrome.
5. `components/overlays.css`: contact concierge and quote dialog.
6. `components/home.css`: statement hero, assay register, capability index, method, sectors, company register, closing, service card.
7. `pages/pages.css`: interior page hero and page-specific compositions.
8. `pages/guides.css`: the reading layout shared by material guides, sector guides, articles and *How we work* — "in brief", the margin column (contents and register), long-form body, tables, sources, onward links — plus the article header and the Insights reading room.

## Rules
- Square corners. Use hairlines and the navy/white contrast for depth; shadows only on floating panels.
- Photographs are clean, square-cut frames with no captions or registration marks, graded with `--photo-grade` (held-back saturation so warm scrap tones sit quietly in the cool interface). Hero photographs run to the edge of the screen and meet the copy with a clean vertical cut. Never darken them into backgrounds.
- One navy primary button per view (white on navy surfaces). Supporting actions are `.secondary-button` or `.inline-action`.
- Dark panels add the `on-ink` class so labels, buttons, headings and focus rings switch to their on-navy values automatically.
- Section openings use `<SectionHeading>`: kicker and title on the left, copy answering on the right. Sections are not numbered; only true sequences (the process steps, legal clauses) carry numbers.
- Small text must meet 4.5:1. The token comments list the safe text colour for each surface.
- Latin values inside Arabic text (grades, standards, phone numbers) use `dir="ltr"` or `unicode-bidi: plaintext`.
