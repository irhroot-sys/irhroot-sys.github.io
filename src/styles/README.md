# AALKC design system

**Idea: "the measure of our word."** أمانة الكلمة means *the trust of one's word*, and the business runs on weighing, grading and certifying metal. The identity is the logo, extended: navy and steel, one grotesk stamped wide for what is declared and set at normal width for what is read, records on steel plate, generous space, and the photography of the yard. One orchestrated moment — on load the mark assembles in the header while the homepage statement rises and the skyline bars climb out of the credentials band into the photograph — and everything else stays quiet.

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

## Type: stamped and measured
One Latin family, **Mona Sans** (variable: width 75–125, weight 200–900, one self-hosted file), used along its width axis the way a fabricator uses one alloy in several gauges.

| Voice | Latin | Arabic |
| --- | --- | --- |
| Statement — homepage headline | Mona Sans, width 125%, weight 760 | **Reem Kufi** 700 — Kufic, the angular hand of inscriptions cut in stone and metal |
| Declared — page and section titles | Mona Sans, width 112.5%, 720 page titles / 620 sections | **Alexandria** 600 — geometric, upright, tall verticals answering the skyline bars |
| Titles — cards and rows | Mona Sans, width 100%, 600 | Alexandria 560 |
| Measured — body, interface, labels | Mona Sans, width 100%, 400–600 | IBM Plex Sans Arabic 400 / 500 / 600 |
| Figures — symbols, codes, step numbers, large numerals | Mona Sans, width 125%, light (300) | — (Latin in both languages) |

- Roles, not families: components use `--font-statement`, `--font-display`, `--font-text`, `--font-figures` with `--stretch-*` and `--w-*`; every one switches script under `[lang="ar"]`, and a Latin name inside Arabic (`lang="en"`) takes the Latin values back.
- Figures are lining and proportional. Mona Sans draws its tabular figures as a monospace set, which reads as code, so `tabular-nums` is not used.
- Expanded heavy type is set tight (`--lh-display` .98, `--lh-heading` 1.06); Arabic needs room for its marks (`--lh-arabic-display` 1.45, body `--lh-arabic-text` 1.85).
- Long-form reading (`.longform`): `--fs-article` 17–19px at `--lh-article` 1.72 on a `--measure-text` of 66 characters.
- Labels are sentence case. Arabic copy uses Western digits, as the rest of the site does.
- Preloads: Mona Sans on English pages; Plex Sans Arabic 400 and Alexandria on Arabic pages, plus Reem Kufi on the Arabic homepage.

## Materials: paper, steel plate, navy
- **Paper** (`--surface`, `--surface-alt`) for reading.
- **Steel plate** (`--surface-plate` `#E6EAEF`, rules `--plate-rule`) for records — `.register.is-plate`: the company register and the buyer quality facts, set like the data plate riveted to a machine, with a navy top edge. Body text 8.7:1, muted 5.1:1.
- **Navy** for statements only: hero, sectors, closing, footer.
- No textures, gradients-as-decoration or brushed-metal effects: the material is suggested by colour and edge alone.

## Motion: one orchestrated moment
- On load the header mark assembles (`BrandMark animate`): the A's left stroke rises from its foot, the right falls from its apex, the skyline grows between them, and one band of light crosses the finished mark. Parts are revealed through clip paths, never redrawn, so at rest the mark is the approved artwork. Hovering the brand sends the light across again.
- In step with it, the homepage statement rises and the skyline supergraphic climbs into the photograph.
- With reduced motion nothing moves; the mark and hero render at rest.

## Files (import order = cascade order)
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
