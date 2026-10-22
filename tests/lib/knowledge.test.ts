import { describe, expect, it } from 'vitest';
import { industries, materials, services } from '../../src/data/siteContent.jsx';
import { industryMeta, insightMeta, materialMeta } from '../../src/data/knowledge/meta.js';
import { materialGuides } from '../../src/data/knowledge/materials.js';
import { industryGuides } from '../../src/data/knowledge/industries.js';
import { insightBodies } from '../../src/data/knowledge/insights.js';
import { processGuide } from '../../src/data/knowledge/process.js';
import { sources } from '../../src/data/knowledge/sources.js';
import { buyGuide, intents, sellGuide } from '../../src/data/pathways.js';

const STATIC_PAGES = ['/', '/about', '/sell', '/buy', '/services', '/industries', '/sustainability', '/materials', '/process', '/insights', '/faq', '/contact', '/privacy', '/terms'];
const pages = new Set([
  ...STATIC_PAGES,
  ...services.map(({ slug }) => `/services/${slug}`),
  ...materials.map(({ id }) => `/materials/${id}`),
  ...industries.map(({ slug }) => `/industries/${slug}`),
  ...insightMeta.map(({ slug }) => `/insights/${slug}`),
]);

const bodies = { materialGuides, industryGuides, insightBodies, processGuide, sellGuide, buyGuide, intents };

// Every localized pair in a value, wherever it sits.
function pairs(value: unknown, found: { en: string; ar: string }[] = []) {
  if (Array.isArray(value)) value.forEach((item) => pairs(item, found));
  else if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    if (typeof record.en === 'string' && 'ar' in record) found.push(record as { en: string; ar: string });
    else Object.values(record).forEach((item) => pairs(item, found));
  }
  return found;
}

describe('knowledge base', () => {
  it('has a guide and its metadata for every material and sector, and nothing else', () => {
    const materialIds = materials.map(({ id }) => id).sort();
    expect(Object.keys(materialGuides).sort()).toEqual(materialIds);
    expect(Object.keys(materialMeta).sort()).toEqual(materialIds);
    const industrySlugs = industries.map(({ slug }) => slug).sort();
    expect(Object.keys(industryGuides).sort()).toEqual(industrySlugs);
    expect(Object.keys(industryMeta).sort()).toEqual(industrySlugs);
    expect(Object.keys(insightBodies).sort()).toEqual(insightMeta.map(({ slug }) => slug).sort());
  });

  it('writes every piece of copy in both languages', () => {
    const all = pairs([bodies, materialMeta, industryMeta, insightMeta]);
    expect(all.length).toBeGreaterThan(500);
    for (const { en, ar } of all) {
      expect(typeof ar, en).toBe('string');
      expect(ar.trim().length, en).toBeGreaterThan(0);
      // Code names and standards ("Candy", "ISO 9001") are the same in both
      // languages; anything else must actually be written in Arabic.
      if (ar !== en) expect(/[\u0600-\u06FF]/.test(ar), `Arabic for: ${en}`).toBe(true);
    }
  });

  it('links only to pages that exist, with the same links in both languages', () => {
    const linkPattern = /\]\((\/[^)\s]*)\)/g;
    for (const { en, ar } of pairs(bodies)) {
      const enLinks = [...en.matchAll(linkPattern)].map((match) => match[1]);
      const arLinks = [...ar.matchAll(linkPattern)].map((match) => match[1]);
      expect(arLinks, en).toEqual(enLinks);
      for (const link of enLinks) expect(pages.has(link), `${link} in: ${en.slice(0, 60)}`).toBe(true);
    }
    const listed = [
      ...Object.values(materialGuides).flatMap((guide) => [
        ...guide.related.map((id: string) => `/materials/${id}`),
        ...guide.industries.map((slug: string) => `/industries/${slug}`),
        ...guide.services.map((slug: string) => `/services/${slug}`),
        ...guide.insights.map((slug: string) => `/insights/${slug}`),
      ]),
      ...Object.values(industryGuides).flatMap((guide) => [
        ...guide.insights.map((slug: string) => `/insights/${slug}`),
        ...guide.streams.map((stream: unknown[]) => stream[2] as string),
      ]),
      ...Object.values(insightBodies).flatMap((article) => article.related.map(({ to }: { to: string }) => to)),
      ...processGuide.stages.flatMap((stage: { links?: [string, unknown][] }) => (stage.links ?? []).map(([to]) => to)),
    ];
    for (const link of listed) expect(pages.has(link), link).toBe(true);
    for (const { to } of intents) expect(pages.has(to), to).toBe(true);
  });

  it('cites only sources that are defined, over https', () => {
    const cited = [...Object.values(materialGuides).flatMap((guide) => guide.sources), ...insightMeta.flatMap((article) => article.sources)];
    for (const key of cited) expect(sources, key).toHaveProperty(key);
    for (const { url } of Object.values(sources)) expect(url).toMatch(/^https:\/\//);
  });

  it('gives each heading a unique anchor on its page', () => {
    const pagesBlocks = [
      ...Object.values(materialGuides).map((guide) => guide.blocks),
      ...Object.values(industryGuides).map((guide) => [{ type: 'h2', id: 'streams' }, ...guide.blocks]),
      ...Object.values(insightBodies).map((article) => article.blocks),
    ];
    for (const blocks of pagesBlocks) {
      const ids = blocks.filter((block: { type: string }) => block.type === 'h2').map((block: { id: string }) => block.id);
      expect(ids.every(Boolean)).toBe(true);
      expect(new Set([...ids, 'questions']).size).toBe(ids.length + 1);
    }
  });
});
