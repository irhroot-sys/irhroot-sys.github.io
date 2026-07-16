import type { Env, MarketSnapshot } from './types';

const CACHE_KEY = 'latest-market-snapshot';
const CACHE_TTL_SECONDS = 15 * 60;
const MAX_STALE_MS = 6 * 60 * 60 * 1000;

function isSnapshot(value: unknown): value is MarketSnapshot {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as MarketSnapshot;
  return candidate.status === 'ok' && candidate.currency === 'USD' && candidate.unit === 'metric_ton' &&
    typeof candidate.source === 'string' && typeof candidate.asOf === 'string' && Array.isArray(candidate.metals) &&
    candidate.metals.every((metal) => typeof metal.code === 'string' && typeof metal.name === 'string' &&
      Number.isFinite(metal.price) && metal.price > 0 &&
      (metal.changePct24h == null || Number.isFinite(metal.changePct24h)));
}

function isFresh(snapshot: MarketSnapshot, now = Date.now()) {
  return now - Date.parse(snapshot.asOf) <= MAX_STALE_MS && Date.parse(snapshot.expiresAt) > now;
}

export async function getMarketSnapshot(env: Env): Promise<MarketSnapshot | null> {
  const cached = await env.MARKET_CACHE.get<MarketSnapshot>(CACHE_KEY, 'json');
  if (cached && isSnapshot(cached) && isFresh(cached)) return cached;

  if (!env.MARKET_PROVIDER_URL || !env.MARKET_API_KEY || !env.MARKET_PROVIDER_NAME) return null;

  const response = await fetch(env.MARKET_PROVIDER_URL, {
    headers: { Authorization: `Bearer ${env.MARKET_API_KEY}`, Accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`Market provider returned ${response.status}`);

  const providerPayload = await response.json() as unknown;
  if (!isSnapshot(providerPayload)) throw new Error('Market provider returned an invalid canonical payload');
  if (!isFresh({ ...providerPayload, expiresAt: new Date(Date.now() + CACHE_TTL_SECONDS * 1000).toISOString() })) {
    throw new Error('Market provider returned stale data');
  }
  const now = new Date();
  const snapshot: MarketSnapshot = {
    ...providerPayload,
    snapshotId: crypto.randomUUID(),
    source: env.MARKET_PROVIDER_NAME,
    expiresAt: new Date(now.getTime() + CACHE_TTL_SECONDS * 1000).toISOString(),
  };
  await env.MARKET_CACHE.put(CACHE_KEY, JSON.stringify(snapshot), { expirationTtl: CACHE_TTL_SECONDS });
  return snapshot;
}

export async function clearStaleMarketCache(env: Env) {
  const cached = await env.MARKET_CACHE.get<MarketSnapshot>(CACHE_KEY, 'json');
  if (cached && Date.now() - Date.parse(cached.asOf) > MAX_STALE_MS) await env.MARKET_CACHE.delete(CACHE_KEY);
}
