import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { engagements, logoHeight, markFor, platforms } from '../../src/data/engagements.js';

// The track record shows other organisations' logos, so the data behind it is
// checked: every entry bilingual, every logo file present and sized from its
// real proportions, platforms kept apart from organisations.

const dir = fileURLToPath(new URL('../../src/assets/engagements/', import.meta.url));
// Each logo file is named after its entry's id (small SVGs are inlined by the
// build, so the imported value is not always a path).
const file = (id: string) => ['.svg', '.webp'].map((ext) => dir + id + ext).find((path) => existsSync(path)) ?? dir + id;

function intrinsicRatio(path: string) {
  if (path.endsWith('.svg')) {
    const box = readFileSync(path, 'utf8').match(/viewBox="([^"]+)"/)![1].split(/[\s,]+/).map(Number);
    return box[2] / box[3];
  }
  // WebP (VP8/VP8L/VP8X): read the canvas size from the header.
  const b = readFileSync(path);
  const chunk = b.toString('ascii', 12, 16);
  if (chunk === 'VP8X') return (1 + b.readUIntLE(24, 3)) / (1 + b.readUIntLE(27, 3));
  if (chunk === 'VP8L') { const bits = b.readUInt32LE(21); return ((bits & 0x3fff) + 1) / (((bits >> 14) & 0x3fff) + 1); }
  return (b.readUInt16LE(26) & 0x3fff) / (b.readUInt16LE(28) & 0x3fff);
}

describe('track record data', () => {
  const all = [...engagements, ...platforms];

  it('names every organisation and platform in both languages', () => {
    for (const item of engagements) for (const key of ['name', 'sector'] as const) {
      expect(item[key].en, `${item.id}.${key}`).toBeTruthy();
      expect(item[key].ar, `${item.id}.${key}`).toMatch(/[؀-ۿ]/);
    }
    for (const item of platforms) for (const key of ['name', 'kind', 'text'] as const) {
      expect(item[key].en, `${item.id}.${key}`).toBeTruthy();
      expect(item[key].ar, `${item.id}.${key}`).toMatch(/[؀-ۿ]/);
    }
  });

  it('lists each organisation once and keeps platforms apart', () => {
    const ids = all.map(({ id }) => id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(platforms.map(({ id }) => id)).toEqual(['etimad', 'emazad']);
  });

  it('has a logo file for every entry, sized from the artwork itself', () => {
    for (const item of all) {
      const path = file(item.id);
      expect(existsSync(path), `${item.id}: ${path}`).toBe(true);
      expect(intrinsicRatio(path), item.id).toBeCloseTo(item.ratio, 1);
    }
  });

  it('never ships a logo that can run script', () => {
    for (const item of all) {
      const path = file(item.id);
      if (path.endsWith('.svg')) expect(readFileSync(path, 'utf8'), item.id).not.toMatch(/<script|on\w+=|javascript:|<foreignObject|xlink:href="http/i);
    }
  });

  it('gives every mark the same optical weight within the plate', () => {
    for (const item of all) {
      const height = logoHeight(item);
      expect(height, item.id).toBeGreaterThanOrEqual(1.2);
      expect(height, item.id).toBeLessThanOrEqual(5.4);
    }
  });

  it('describes engagement, never a client, partnership or award', () => {
    const copy = JSON.stringify(all.map(({ name, sector, kind, text }) => ({ name, sector, kind, text }))).toLowerCase();
    for (const word of ['client', 'partner', 'awarded', 'contract', 'شريك', 'عميل', 'ترسية']) expect(copy, word).not.toContain(word);
  });

  it('resolves marks by id for the auctions page', () => {
    expect(markFor('etimad')?.logo).toBeTruthy();
    expect(markFor('al-qahtani-auctions')?.logo).toBeTruthy();
    expect(markFor('missing')).toBeNull();
  });
});
