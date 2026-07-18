import { describe, expect, it, vi } from 'vitest';
import { getMarketSnapshot } from '../../worker/src/market';
import type { Env, MarketSnapshot } from '../../worker/src/types';

function env(overrides: Partial<Env> = {}) {
  return {
    MARKET_CACHE: { get: vi.fn().mockResolvedValue(null), put: vi.fn(), delete: vi.fn() },
    ENVIRONMENT: 'development',
    ...overrides,
  } as unknown as Env;
}

describe('getMarketSnapshot', () => {
  it('returns unavailable when no provider is configured', async () => {
    expect(await getMarketSnapshot(env())).toBeNull();
  });

  it('returns a fresh cached snapshot without contacting a provider', async () => {
    const now = Date.now();
    const snapshot: MarketSnapshot = {
      status: 'ok', snapshotId: 'snapshot-1', source: 'Licensed provider',
      asOf: new Date(now).toISOString(), expiresAt: new Date(now + 60_000).toISOString(),
      currency: 'USD', unit: 'metric_ton',
      metals: [{ code: 'CU', name: 'Copper', price: 9000, changePct24h: 1.2 }],
    };
    const cache = { get: vi.fn().mockResolvedValue(snapshot), put: vi.fn(), delete: vi.fn() };
    expect(await getMarketSnapshot(env({ MARKET_CACHE: cache as never }))).toEqual(snapshot);
    expect(cache.put).not.toHaveBeenCalled();
  });

  it('maps and caches a fresh licensed-provider snapshot without changing its timestamp', async () => {
    const asOf = new Date(Date.now() - 60_000).toISOString();
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json({
      status: 'ok', snapshotId: 'provider-id', source: 'ignored', asOf,
      expiresAt: new Date(Date.now() + 60_000).toISOString(), currency: 'USD', unit: 'metric_ton',
      metals: [{ code: 'CU', name: 'Copper', price: 9000, changePct24h: null }],
    })));
    const cache = { get: vi.fn().mockResolvedValue(null), put: vi.fn(), delete: vi.fn() };
    const snapshot = await getMarketSnapshot(env({
      MARKET_CACHE: cache as never, MARKET_PROVIDER_URL: 'https://provider.example/market',
      MARKET_PROVIDER_NAME: 'Licensed Provider', MARKET_API_KEY: 'secret',
    }));
    expect(snapshot).toMatchObject({ asOf, source: 'Licensed Provider' });
    expect(cache.put).toHaveBeenCalledOnce();
    vi.unstubAllGlobals();
  });

  it('rejects provider snapshots older than six hours', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json({
      status: 'ok', snapshotId: 'stale', source: 'provider', asOf: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() + 60_000).toISOString(), currency: 'USD', unit: 'metric_ton',
      metals: [{ code: 'CU', name: 'Copper', price: 9000, changePct24h: null }],
    })));
    await expect(getMarketSnapshot(env({
      MARKET_PROVIDER_URL: 'https://provider.example/market', MARKET_PROVIDER_NAME: 'Licensed Provider', MARKET_API_KEY: 'secret',
    }))).rejects.toThrow('stale data');
    vi.unstubAllGlobals();
  });
});
