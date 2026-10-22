import { industries, materials, services } from "../siteContent.jsx";
import { industryMeta, insightMeta, materialMeta, processMeta, PUBLISHED } from "./meta.js";
import { sources } from "./sources.js";
import { photos } from "../photos.js";

// The light half of the knowledge base: everything the route list, the head,
// navigation and onward links need. The guide and article bodies are not
// imported here — they load with the pages that show them (lib/knowledge.jsx).
export { industryMeta, insightMeta, materialMeta, processMeta, PUBLISHED, sources };

// Photographs for the sector guides, from AALKC's own photographs.
const sectorPhoto = ({ src, alt, focus }) => ({ image: src, alt, focus });
export const industryImages = {
  construction: sectorPhoto(photos.beamsContainers),
  manufacturing: sectorPhoto(photos.cableTrays),
  "industrial-plants": sectorPhoto(photos.generatorStator),
  electrical: sectorPhoto(photos.gatedTransformers),
  commercial: sectorPhoto(photos.truckGrapple),
};

export const ARTICLE_IMAGE = photos.grappleSteel.src;

export function resolveSources(keys = []) {
  return keys.map((key) => {
    const source = sources[key];
    if (!source) throw new Error(`Unknown source "${key}"`);
    return source;
  });
}

const materialById = new Map(materials.map((material) => [material.id, material]));
const industryBySlug = new Map(industries.map((industry) => [industry.slug, industry]));
const serviceBySlug = new Map(services.map((service) => [service.slug, service]));
const insightBySlug = new Map(insightMeta.map((article) => [article.slug, article]));

export const findMaterial = (id) => materialById.get(id);
export const findIndustry = (slug) => industryBySlug.get(slug);
export const findInsightMeta = (slug) => insightBySlug.get(slug);

// Onward links for a guide, built from the slugs it lists: each one points at
// a page that exists, labelled with that page's own title.
export function guideLinks({ materials: materialIds = [], industries: industrySlugs = [], services: serviceSlugs = [], insights: insightSlugs = [] }) {
  return [
    ...materialIds.map((id) => ({ to: `/materials/${id}`, label: materialMeta[id].title, note: materialById.get(id).summary })),
    ...industrySlugs.map((slug) => ({ to: `/industries/${slug}`, label: industryMeta[slug].title, note: "Sector guide" })),
    ...insightSlugs.map((slug) => ({ to: `/insights/${slug}`, label: insightBySlug.get(slug).title, note: insightBySlug.get(slug).category })),
    ...serviceSlugs.map((slug) => ({ to: `/services/${slug}`, label: serviceBySlug.get(slug).title, note: serviceBySlug.get(slug).copy })),
  ];
}
