import { useEffect, useState } from 'react';
import { AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';

type MarketSnapshot = {
  status: 'ok';
  snapshotId: string;
  source: string;
  asOf: string;
  expiresAt: string;
  currency: 'USD';
  unit: 'metric_ton';
  metals: Array<{
    code: string;
    name: string;
    price: number;
    changePct24h: number | null;
  }>;
};

type LoadState =
  | { kind: 'loading' }
  | { kind: 'ready'; snapshot: MarketSnapshot }
  | { kind: 'unavailable' };

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

export default function MarketPanel() {
  const [state, setState] = useState<LoadState>({ kind: 'loading' });

  const load = async (signal?: AbortSignal) => {
    setState({ kind: 'loading' });
    try {
      const response = await fetch('/api/market', {
        signal,
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('market unavailable');
      const snapshot = (await response.json()) as MarketSnapshot;
      if (snapshot.status !== 'ok' || !Array.isArray(snapshot.metals)) throw new Error('invalid market response');
      setState({ kind: 'ready', snapshot });
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setState({ kind: 'unavailable' });
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, []);

  return (
    <div className="border border-zinc-200/80 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-950/40 p-6 sm:p-8 relative overflow-hidden min-h-[420px] shadow-xl rounded-sm">
      <div className="absolute inset-0 bg-grid-mesh opacity-10 pointer-events-none" />
      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h3 className="font-display text-2xl uppercase tracking-widest text-zinc-900 dark:text-white">Market snapshot</h3>
          {state.kind === 'ready' && (
            <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-[9px] font-mono font-semibold uppercase tracking-widest text-green-700 dark:text-green-400">
              Sourced data
            </span>
          )}
        </div>

        {state.kind === 'loading' && (
          <div role="status" className="flex min-h-64 items-center justify-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
            <RefreshCw className="h-4 w-4 animate-spin" aria-hidden="true" /> Checking market availability…
          </div>
        )}

        {state.kind === 'unavailable' && (
          <div className="flex min-h-64 flex-col items-center justify-center text-center">
            <AlertCircle className="mb-4 h-8 w-8 text-orange-700 dark:text-primary" aria-hidden="true" />
            <h4 className="font-display text-xl uppercase tracking-wider text-zinc-900 dark:text-white">Market data is currently unavailable</h4>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              We only publish licensed, timestamped market values. No sample prices are shown when a verified source is unavailable.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={() => void load()} className="border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-300">
                Try again
              </button>
              <a href="#contact" className="inline-flex items-center gap-2 bg-orange-700 dark:bg-primary px-4 py-2 text-xs font-bold uppercase tracking-widest text-white dark:text-zinc-950">
                Request a spot quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        )}

        {state.kind === 'ready' && (
          <div>
            <dl className="grid gap-3 sm:grid-cols-2">
              {state.snapshot.metals.map((metal) => (
                <div key={metal.code} className="border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">{metal.name}</dt>
                  <dd className="mt-2 font-mono text-xl font-bold text-zinc-900 dark:text-white">{priceFormatter.format(metal.price)} <span className="text-[10px] font-normal text-zinc-500">/ metric ton</span></dd>
                  {metal.changePct24h !== null && <dd className={`mt-2 text-xs font-mono ${metal.changePct24h >= 0 ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>{metal.changePct24h >= 0 ? '+' : ''}{metal.changePct24h.toFixed(2)}% / 24h</dd>}
                </div>
              ))}
            </dl>
            <p className="mt-5 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
              Source: {state.snapshot.source} · As of <time dateTime={state.snapshot.asOf}>{new Date(state.snapshot.asOf).toLocaleString()}</time> · USD
            </p>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">Published values are informational and non-binding. Final pricing is confirmed only in a written spot quote.</p>
          </div>
        )}
      </div>
    </div>
  );
}
