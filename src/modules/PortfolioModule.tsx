import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Wallet, RefreshCw, Settings } from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';
import { useWallet } from '../contexts/WalletContext';
import { PortfolioManager, TokenBalance } from '../lib/portfolio';
import { PublicKey } from '@solana/web3.js';
import { useNetwork } from '../contexts/NetworkContext';
import { createRateLimitedConnection } from '../lib/rate-limited-connection';
import { getWireUrlForUsage } from '../lib/config';
import { MANAGE_TOKEN_KEY } from '../lib/token-memory';

interface PortfolioModuleProps {
  onNavigateToLiquidity?: (tokenMint: string) => void;
}

const PortfolioModule = React.memo<PortfolioModuleProps>(({ onNavigateToLiquidity }) => {
  const { address, isConnected } = useWallet();
  const { network } = useNetwork();
  const [solBalance, setSolBalance] = useState<number>(0);
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tokensCreated, setTokensCreated] = useState<number>(0);
  const inFlightRef = useRef(false);
  const lastFetchMsRef = useRef(0);

  const readConnection = useMemo(
    () =>
      createRateLimitedConnection(getWireUrlForUsage(network, 'portfolio'), {
        commitment: 'confirmed',
        rateLimit: {
          maxRequestsPerSecond: 8,
          maxConcurrentRequests: 3,
          retryDelay: 500,
          maxRetries: 4,
        },
      }),
    [network]
  );

  const portfolioManager = useMemo(() => new PortfolioManager(readConnection), [readConnection]);

  const handleManageToken = (tokenMint: string) => {
    // Store token address in localStorage for LiquidityModule to pick up
    localStorage.setItem(MANAGE_TOKEN_KEY, tokenMint);
    
    // Navigate to liquidity tab
    if (onNavigateToLiquidity) {
      onNavigateToLiquidity(tokenMint);
    } else {
      // Fallback: use URL navigation
      window.history.pushState({}, '', '/liquidity');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const fetchPortfolio = useCallback(async (force = false) => {
    if (!isConnected || !address) {
      setSolBalance(0);
      setTokenBalances([]);
      return;
    }

    if (inFlightRef.current) return;
    const now = Date.now();
    if (!force && now - lastFetchMsRef.current < 7000) {
      return;
    }

    inFlightRef.current = true;
    setIsLoading(true);
    try {
      const publicKey = new PublicKey(address);

      const [sol, tokens] = await Promise.all([
        portfolioManager.getSolBalance(publicKey),
        portfolioManager.getTokenAccounts(publicKey),
      ]);
      setSolBalance(sol);
      setTokenBalances(tokens);

      const createdTokens = JSON.parse(localStorage.getItem('tokenclub_created_tokens') || '[]');
      setTokensCreated(createdTokens.length);
      lastFetchMsRef.current = Date.now();
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      inFlightRef.current = false;
      setIsLoading(false);
    }
  }, [isConnected, address, portfolioManager]);

  useEffect(() => {
    fetchPortfolio(false);
  }, [fetchPortfolio]);

  const formatBalance = (balance: number) => {
    if (balance >= 1000000) {
      return `${(balance / 1000000).toFixed(2)}M`;
    }
    if (balance >= 1000) {
      return `${(balance / 1000).toFixed(2)}K`;
    }
    return balance.toFixed(4);
  };

  return (
    <div className="animate-in slide-in-from-right-8 duration-500 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Portfolio Overview</h2>
        <button
          onClick={() => fetchPortfolio(true)}
          disabled={isLoading}
          className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="SOL Balance" 
          value={`${solBalance.toFixed(4)} SOL`} 
        />
        <StatCard 
          label="Token Holdings" 
          value={tokenBalances.length.toString()} 
        />
        <StatCard 
          label="Tokens Created" 
          value={tokensCreated.toString()} 
        />
      </div>

      {!isConnected ? (
        <div className="bg-[#0f0f0f]/60 border border-white/10 rounded-3xl p-12 text-center spotlight-card">
          <div className="inline-flex p-4 rounded-full bg-white/5 mb-4 shadow-inner">
            <Wallet className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-bold text-white">Wallet Not Connected</h3>
          <p className="text-gray-500 text-sm mt-2">Connect your wallet to view your portfolio</p>
        </div>
      ) : tokenBalances.length === 0 ? (
        <div className="bg-[#0f0f0f]/60 border border-white/10 rounded-3xl p-12 text-center spotlight-card">
          <div className="inline-flex p-4 rounded-full bg-white/5 mb-4 shadow-inner">
            <Wallet className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-bold text-white">No Tokens Found</h3>
          <p className="text-gray-500 text-sm mt-2">You don&apos;t have any tokens in this wallet</p>
        </div>
      ) : (
        <div className="bg-[#0f0f0f]/60 border border-white/10 rounded-3xl p-6 spotlight-card">
          <h3 className="text-lg font-bold text-white mb-4">Token Holdings</h3>
          <div className="space-y-2">
            {tokenBalances.map((token, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center">
                    <span className="text-blue-400 font-bold text-xs">
                      {token.mint.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-mono text-white">
                      {token.mint.slice(0, 4)}...{token.mint.slice(-4)}
                    </div>
                    <div className="text-xs text-gray-500">Decimals: {token.decimals}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-bold text-white">
                      {formatBalance(token.uiAmount)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {token.balance.toLocaleString()} raw
                    </div>
                  </div>
                  <button
                    onClick={() => handleManageToken(token.mint)}
                    className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 text-xs font-medium"
                    title="Manage liquidity for this token"
                  >
                    <Settings className="w-4 h-4" />
                    Manage
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
PortfolioModule.displayName = 'PortfolioModule';

export default PortfolioModule;
export type { PortfolioModuleProps };
