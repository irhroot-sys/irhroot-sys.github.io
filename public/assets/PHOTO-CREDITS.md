# AALKC photography sources

## AALKC's own photographs — `public/assets/yard/`

Supplied by AALKC (October 2026) from the company's own photograph library ("WEBSITE IMAGES"): its yard, fleet, equipment and handled material. Used throughout the site — the homepage hero, page heroes, services, material families, sector guides and "The yard" gallery — with captions and alt text that describe only what is visible. Resized to at most 1920 px and re-encoded as WebP; no other alterations. The table of where each is used is `src/data/photos.js`.

- `aalkc-yard-entrance-night.webp` — the AALKC yard entrance at night, company sign on the gate wall (homepage hero, Contact).
- `cable-reel-loading`, `cable-reel-trucks`, `crane-cable-reels`, `flatbed-cable-loops`, `cable-drums-grapple` — cable reels and cable handling and transport.
- `cast-metal-components`, `structural-scrap-yard`, `ferrous-scrap-yard`, `grapple-steel-piles`, `steel-channels-pipes`, `steel-plates`, `steel-beams-containers`, `galvanized-cable-trays` — ferrous and structural material.
- `used-transformers`, `transformers-safety-gates`, `switchgear-dismantling`, `generator-stator`, `stator-interior` — electrical equipment recovery and dismantling.
- `sorted-copper-container` — sorted copper scrap in a shipping container.
- `yard-weighbridge`, `scrap-trailer`, `truck-grapple-loading` — the weighbridge, haulage and loading.

## Licensed photographs

- `yard/foundry-pour.webp` — Yasin Hemmati, Unsplash (file `yasin-hemmati-zHK__gTTTds-unsplash.jpg`, photo ID zHK__gTTTds), used under the Unsplash License. Supplied by AALKC with its photographs; shows a foundry, not an AALKC facility. Used on the "Buy from AALKC" page, which addresses mills and foundries.

The photographs below are used as licensed, representative industrial imagery. They do not depict AALKC facilities unless explicitly stated.

- `service-industrial-dismantling.webp` — Yasin Hemmati, [Unsplash](https://unsplash.com/photos/lp6CBQSr1Ek), used under the Unsplash License. Also used as the homepage hero image.
- `service-heavy-logistics.webp` — Tahir mq, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Jeddah_Islamic_Port_1.jpg), used under CC BY-SA 4.0. Jeddah Islamic Port, Jeddah, Saudi Arabia, photographed 2019. Cropped/resized from the original; no other alterations. Used on the Heavy Logistics service. It shows a Saudi port, not AALKC's Dammam operation, and should be replaced with a photograph of AALKC's own fleet or yard when one is available. (The only openly licensed photo of King Abdulaziz Port, Dammam found on Wikimedia Commons is 314×200 px — too small for the 800 px+ this card needs.)
- `service-container-handling.webp` — Willians Huerta, [Pexels](https://www.pexels.com/photo/36397860/), used under the Pexels License.
- `service-metal-sorting.webp` — Willians Huerta, [Pexels](https://www.pexels.com/photo/36397854/), used under the Pexels License.
- `service-global-trade.webp` — Willians Huerta, [Pexels](https://www.pexels.com/photo/36397819/), used under the Pexels License.
- `service-scrap-metal.webp` — source and license undocumented. Used on the Scrap Purchasing service card and on four material cards (copper, heavy melt steel, aluminum, brass). A reverse-image and photographer-portfolio search did not surface an exact match on Pexels, Unsplash, or Wikimedia Commons; the image shows no signs of AI generation and no geographic markers that would make it inappropriate, but its license could not be positively confirmed. Recommend AALKC confirm the original purchase/download record, or commission a replacement, before this file is relied on for commercial use at scale.
- `service-construction-materials.webp` — source and license undocumented. Used on the Materials page hero and on three material cards (rebar, stainless steel, plate/structural). Same status and recommendation as above.

## Responsive variants

`npm run build` (and `npm run dev`) generate AVIF and WebP copies of every photo above at several widths into `public/assets/img/` (see `scripts/build-images.mjs`). They are derived from these files under the same licences; only the source files are kept in the repository.
