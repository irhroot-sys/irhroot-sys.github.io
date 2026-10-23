import { describe, expect, it } from 'vitest';
import { auctionCapabilities, auctionChannels, auctionDisclosures, auctionRecord, auctionStages, auctionsGuide, furthestStage } from '../../src/data/auctions.js';

// The auctions record is public and makes claims about named organisations,
// so its publication rules are enforced here rather than left to review.

const STAGE_IDS = auctionStages.map(({ id }) => id);
const text = (value: unknown) => JSON.stringify(value);
const everything = text({ auctionRecord, auctionChannels, auctionCapabilities, auctionDisclosures, auctionsGuide });

describe('auctions record', () => {
  it('defines the four stages of a sale in order', () => {
    expect(STAGE_IDS).toEqual(['reviewed', 'invited', 'inspected', 'offered']);
  });

  it('gives every entry both languages, a channel, a scope and a period', () => {
    for (const record of auctionRecord) {
      for (const key of ['seller', 'channel', 'scope', 'period'] as const) {
        expect(record[key]?.en, `${record.id}.${key}`).toBeTruthy();
        expect(record[key]?.ar, `${record.id}.${key}`).toBeTruthy();
      }
      for (const key of ['sector', 'region', 'note'] as const) {
        if (record[key]) expect(record[key].ar, `${record.id}.${key}`).toBeTruthy();
      }
    }
  });

  it('claims only known stages, each once', () => {
    for (const record of auctionRecord) {
      expect(record.stages.length, record.id).toBeGreaterThan(0);
      expect(new Set(record.stages).size, record.id).toBe(record.stages.length);
      for (const stage of record.stages) expect(STAGE_IDS, record.id).toContain(stage);
    }
  });

  it('lists each sale once and each seller once', () => {
    const ids = auctionRecord.map(({ id }) => id);
    const sellers = auctionRecord.map(({ seller }) => seller.en.toLowerCase());
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(sellers).size).toBe(sellers.length);
  });

  it('orders the record by the furthest stage reached', () => {
    const depth = auctionRecord.map((record) => STAGE_IDS.indexOf(furthestStage(record).id));
    expect(depth).toEqual([...depth].sort((a, b) => b - a));
  });

  it('never publishes an amount, a deposit figure, a reference number or an outcome', () => {
    // Currency, any figure of four or more digits that is not a year, and the
    // vocabulary of a result.
    expect(everything).not.toMatch(/\b(SAR|SR|USD|ريال)\b|﷼|⃁/);
    // ISO standard numbers are the one kind of long figure the page may carry.
    const longNumbers = everything.replace(/ISO \d+/g, '').match(/\d{4,}/g) ?? [];
    for (const number of longNumbers) expect(Number(number), number).toBeGreaterThanOrEqual(2017);
    for (const number of longNumbers) expect(Number(number), number).toBeLessThanOrEqual(2030);
    const claims = auctionRecord.map((record) => text(record)).join(' ').toLowerCase();
    for (const word of ['won', 'awarded', 'winning', 'partner', 'contract', 'rejected', 'lost', 'رست', 'ترسية', 'شريك', 'شراكة', 'عقد']) {
      expect(claims, word).not.toContain(word);
    }
  });

  it('keeps the disclaimer that names imply no award, partnership or endorsement', () => {
    const disclosures = text(auctionDisclosures);
    expect(disclosures).toMatch(/No contract award, partnership or endorsement is implied/);
    expect(disclosures).toMatch(/no third-party logo/);
  });
});
