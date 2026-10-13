import React, { useEffect, useMemo, useState } from 'react';
import { Clock, Zap } from 'lucide-react';
import { memePlaceholder, tokenImageFallbacks } from '../../lib/token-images';

interface TrendingTokenCardProps {
  name: string;
  ticker: string;
  mint?: string;
  marketCap: string;
  lastBuy: string;
  imageUri?: string;
  description?: string;
  onCopy: () => void;
  copyDisabled?: boolean;
  copyLabel?: string;
  copyCost?: string;
}

export const TrendingTokenCard = React.memo(({
  name,
  ticker,
  mint,
  marketCap,
  lastBuy,
  imageUri,
  description,
  onCopy,
  copyDisabled,
  copyLabel,
  copyCost,
}: TrendingTokenCardProps) => {
  const seed = mint || ticker.replace('$', '') || name;
  const placeholder = memePlaceholder(seed);
  const remotes = useMemo(
    () =>
      tokenImageFallbacks(imageUri, mint, ticker.replace('$', '') || name).filter(
        (url) => !url.startsWith('/meme-placeholders/')
      ),
    [imageUri, mint, ticker, name]
  );
  const [src, setSrc] = useState(placeholder);

  useEffect(() => {
    setSrc(placeholder);
    let cancelled = false;
    let i = 0;

    const tryNext = () => {
      if (cancelled || i >= remotes.length) return;
      const url = remotes[i];
      i += 1;
      const probe = new Image();
      probe.onload = () => {
        if (!cancelled) setSrc(url);
      };
      probe.onerror = tryNext;
      probe.referrerPolicy = 'no-referrer';
      probe.src = url;
    };

    tryNext();
    return () => {
      cancelled = true;
    };
  }, [placeholder, remotes]);

  return (
    <div className="bg-[#0f0f0f]/70 border border-white/10 rounded-3xl p-5 flex flex-col hover:border-teal-500/30 transition-colors spotlight-card relative overflow-hidden">
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-11 h-11 rounded-full overflow-hidden border border-white/10 bg-[#121212] shrink-0">
            <img
              src={src}
              alt={name}
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => {
                if (src !== placeholder) setSrc(placeholder);
              }}
            />
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-white truncate">{name}</h3>
            <p className="text-xs font-mono text-teal-300 truncate mt-0.5">{ticker}</p>
          </div>
        </div>

        <div className="text-right shrink-0 ml-3">
          <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-0.5">Market Cap</p>
          <p className="text-sm font-bold text-teal-400">{marketCap}</p>
        </div>
      </div>

      <p className="text-xs text-gray-400 mb-4 line-clamp-2 relative z-10">
        {description || name}
      </p>

      <div className="flex items-center text-cyan-300/80 mb-5 text-xs font-medium relative z-10">
        <Clock className="w-3 h-3 mr-1.5" />
        Last buy: {lastBuy}
      </div>

      <div className="flex items-center justify-between mt-auto gap-3 relative z-10">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
          New mint · same look
        </span>
        <button
          type="button"
          onClick={onCopy}
          disabled={copyDisabled}
          className="bg-teal-500 hover:shadow-[0_0_24px_rgba(20,184,166,0.35)] text-black text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>{copyLabel || 'Copy Coin'}</span>
          {copyCost && (
            <span className="opacity-80 text-[10px] ml-0.5 border-l border-black/20 pl-1.5 font-mono">
              ({copyCost})
            </span>
          )}
        </button>
      </div>
    </div>
  );
});
TrendingTokenCard.displayName = 'TrendingTokenCard';
