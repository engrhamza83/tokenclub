import { useCallback, useEffect, useState } from 'react';
import { PAGE_SIZE, type StaticTrendingCoin } from '../lib/trending-coins';
import type { TrendingDataSource } from '../lib/live-trending';

export type TrendingToken = StaticTrendingCoin;
export type TrendingTab = 'trending' | 'new';

interface TrendingApiResponse {
  tokens: TrendingToken[];
  total: number;
  offset: number;
  pageSize: number;
  page: number;
  pageCount: number;
  source?: TrendingDataSource;
  error?: string;
}

export function useTrending() {
  const [tab, setTab] = useState<TrendingTab>('trending');
  const [tokens, setTokens] = useState<TrendingToken[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(5);
  const [total, setTotal] = useState(0);
  const [dataSource, setDataSource] = useState<TrendingDataSource>('static');

  const loadPage = useCallback(async (pageIndex: number, nextTab: TrendingTab = tab) => {
    setIsLoading(true);
    try {
      const offset = pageIndex * PAGE_SIZE;
      const r = await fetch(
        `/api/pump/trending?tab=${encodeURIComponent(nextTab)}&offset=${offset}`
      );
      const data = (await r.json()) as TrendingApiResponse;

      if (!r.ok || data.error) {
        throw new Error(data.error || `Trending fetch failed (${r.status})`);
      }

      setTokens(data.tokens ?? []);
      setPage(data.page ?? pageIndex);
      setPageCount(data.pageCount ?? 1);
      setTotal(data.total ?? 0);
      setDataSource(data.source ?? 'static');
    } catch (err) {
      console.error('[useTrending]', err);
      setTokens([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    setPage(0);
    void loadPage(0, tab);
  }, [tab, loadPage]);

  const refreshTokens = useCallback(() => {
    const nextPage = pageCount > 0 ? (page + 1) % pageCount : 0;
    void loadPage(nextPage);
  }, [page, pageCount, loadPage]);

  const rangeLabel =
    total > 0
      ? `Showing ${page * PAGE_SIZE + 1}–${Math.min((page + 1) * PAGE_SIZE, total)} of ${total}${
          dataSource === 'live' ? ' · live' : ' · cached'
        }`
      : '';

  return {
    tab,
    setTab,
    tokens,
    isLoading,
    refreshTokens,
    page,
    pageCount,
    total,
    rangeLabel,
    dataSource,
  };
}
