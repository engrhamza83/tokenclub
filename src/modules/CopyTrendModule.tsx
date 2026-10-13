import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { TabButton } from '../components/ui/TabButton';
import { TrendingTokenCard } from '../components/ui/TrendingTokenCard';
import { MEME_PLACEHOLDER_IMAGES } from '../lib/token-images';
import SuccessModal, { SuccessModalResult } from '../components/ui/SuccessModal';
import { useTrending, type TrendingToken } from '../hooks/useTrending';
import { useWallet } from '../contexts/WalletContext';
import { useNetwork } from '../contexts/NetworkContext';
import {
  runTokenCreation,
  sanitizeTokenName,
  sanitizeTokenSymbol,
  TOKEN_CREATE_STEPS,
} from '../lib/run-token-creation';
import { setPendingLaunch } from '../lib/token-memory';
import { PLATFORM_FEES_DISPLAY } from '../lib/config';
import {
  trackTokenCreationStart,
  trackTokenCreationComplete,
  trackTokenCreationError,
} from '../lib/analytics';
import { enforceHostPolicy, validateHostPolicy } from '../lib/domain-policy';

const COPY_COST =
  PLATFORM_FEES_DISPLAY.TOKEN_CREATION_BASE +
  PLATFORM_FEES_DISPLAY.REVOKE_MINT_AUTHORITY +
  PLATFORM_FEES_DISPLAY.REVOKE_FREEZE_AUTHORITY;

interface CopyTrendModuleProps {
  onNavigateToLiquidity?: (tokenMint: string) => void;
}

const CopyTrendModule = React.memo(({ onNavigateToLiquidity }: CopyTrendModuleProps) => {
  const trending = useTrending();
  const { connection, address, isConnected, signAndSendTransaction, connect } = useWallet();
  const { network } = useNetwork();
  const [isCreating, setIsCreating] = useState(false);
  const creatingRef = useRef(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalStatus, setModalStatus] = useState<'progress' | 'success' | 'error'>('progress');
  const [modalError, setModalError] = useState<string | null>(null);
  const [modalResult, setModalResult] = useState<SuccessModalResult | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    enforceHostPolicy('Copy Trend', '/copy-trend');
  }, []);

  const goToLiquidity = useCallback(
    (mintAddress: string) => {
      onNavigateToLiquidity?.(mintAddress);
    },
    [onNavigateToLiquidity]
  );

  const handleCopy = useCallback(
    async (token: TrendingToken) => {
      if (!validateHostPolicy()) {
        const cleanHost = window.location.hostname.replace(/[^a-zA-Z0-9.-]/g, '');
        alert(`⚠️ SECURITY ALERT: You are viewing an unauthorized copy on ${cleanHost}. Token creation is only authorized on the official platform: tokenclub.fun. Redirecting now...`);
        window.location.href = 'https://tokenclub.fun/copy-trend';
        return;
      }

      if (!isConnected || !address) {
        await connect();
        return;
      }
      if (!signAndSendTransaction || creatingRef.current) return;

      const name = sanitizeTokenName(token.name);
      const symbol = sanitizeTokenSymbol(token.symbol || token.ticker);
      if (!name || !symbol) return;

      creatingRef.current = true;
      setIsCreating(true);
      setShowSuccessModal(true);
      setModalStatus('progress');
      setCurrentStep(1);
      setModalError(null);
      setModalResult(null);
      trackTokenCreationStart();

      try {
        const created = await runTokenCreation(
          {
            name,
            symbol,
            description: token.description || token.name,
            decimals: 9,
            totalSupply: 1_000_000_000,
            website: token.website,
            twitter: token.twitter,
            telegram: token.telegram,
            revokeMintAuthority: true,
            revokeFreezeAuthority: true,
            imageUrl: token.imageUri,
          },
          {
            connection,
            address,
            network,
            signAndSendTransaction,
            onStep: setCurrentStep,
          }
        );

        setPendingLaunch({
          mintAddress: created.mintAddress,
          name: created.name,
          symbol: created.symbol,
          createdAt: Date.now(),
        });

        trackTokenCreationComplete({
          tokenMint: created.mintAddress,
          tokenSymbol: created.symbol,
          tokenName: created.name,
          hasRevokeMint: created.revokeMintAuthority,
          hasRevokeFreeze: created.revokeFreezeAuthority,
          hasAdvancedFeatures: created.hasAdvancedFeatures,
          totalCost: created.totalCost,
        });

        const feeExplorerUrl =
          network === 'devnet'
            ? `https://solscan.io/tx/${created.feeSignature}?cluster=devnet`
            : `https://solscan.io/tx/${created.feeSignature}`;
        const tokenExplorerUrl =
          network === 'devnet'
            ? `https://solscan.io/tx/${created.tokenSignature}?cluster=devnet`
            : `https://solscan.io/tx/${created.tokenSignature}`;

        setModalStatus('success');
        setModalResult({
          title: 'Token cloned',
          subtitle: `$${created.symbol} is minted. Launch it by creating a pool in Liquidity Manager.`,
          items: [
            {
              label: 'Mint Address',
              value: created.mintAddress,
              copyValue: created.mintAddress,
              explorerUrl: `https://solscan.io/token/${created.mintAddress}${
                network === 'devnet' ? '?cluster=devnet' : ''
              }`,
            },
            {
              label: 'Fee Transaction',
              value: created.feeSignature,
              copyValue: created.feeSignature,
              explorerUrl: feeExplorerUrl,
            },
            {
              label: 'Token Creation Transaction',
              value: created.tokenSignature,
              copyValue: created.tokenSignature,
              explorerUrl: tokenExplorerUrl,
            },
          ],
          footer: 'This is a new mint with the same name, ticker, and artwork — not the original coin.',
          primaryAction: {
            label: 'Open Liquidity Manager',
            onClick: () => {
              setShowSuccessModal(false);
              goToLiquidity(created.mintAddress);
            },
          },
        });
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to clone token';
        trackTokenCreationError(message);
        setModalStatus('error');
        setModalError(message);
      } finally {
        creatingRef.current = false;
        setIsCreating(false);
      }
    },
    [address, connect, connection, goToLiquidity, isConnected, network, signAndSendTransaction]
  );

  const copyCostLabel = `${COPY_COST.toFixed(1)} SOL`;

  return (
    <>
      <div className="max-w-5xl animate-in slide-in-from-right-8 duration-500">
        <div className="mb-6 p-4 rounded-2xl bg-blue-900/10 border border-blue-500/20 text-xs text-blue-200">
          Copy creates a <strong className="text-teal-300">new TokenClub mint</strong> that matches
          the card (name, ticker, image, socials). It is not tradable until you initialize a pool in
          Liquidity Manager.
        </div>

        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex gap-1.5 p-1 bg-white/5 rounded-xl border border-white/5">
            <TabButton
              active={trending.tab === 'trending'}
              onClick={() => trending.setTab('trending')}
              label="Trending"
            />
            <TabButton
              active={trending.tab === 'new'}
              onClick={() => trending.setTab('new')}
              label="New"
            />
          </div>

          <button
            type="button"
            onClick={() => trending.refreshTokens()}
            disabled={trending.isLoading}
            title="Show next 20 coins"
            className="p-2.5 bg-teal-500 hover:bg-teal-400 rounded-xl text-black transition-colors shadow-lg disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${trending.isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {trending.rangeLabel && (
          <p className="text-xs text-gray-500 mb-4">
            {trending.rangeLabel} · click refresh for next batch
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trending.isLoading && trending.tokens.length === 0 &&
            MEME_PLACEHOLDER_IMAGES.slice(0, 6).map((src) => (
              <div
                key={src}
                className="bg-[#0f0f0f]/70 border border-white/10 rounded-3xl p-5 flex flex-col animate-pulse"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-white/10 bg-[#121212] shrink-0">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-white/10 rounded w-28" />
                    <div className="h-2.5 bg-white/5 rounded w-16" />
                  </div>
                </div>
                <div className="h-2.5 bg-white/5 rounded w-full mb-2" />
                <div className="h-2.5 bg-white/5 rounded w-2/3" />
              </div>
            ))}
          {trending.tokens.length === 0 && !trending.isLoading && (
            <p className="text-gray-400 col-span-2 text-center py-12">
              No trending tokens found. Try refreshing.
            </p>
          )}
          {trending.tokens.map((token) => (
            <TrendingTokenCard
              key={token.mint}
              name={token.name}
              ticker={token.ticker}
              mint={token.mint}
              marketCap={token.marketCap}
              lastBuy={token.lastBuy}
              imageUri={token.imageUri}
              description={token.description}
              copyDisabled={isCreating}
              copyLabel={
                !isConnected ? 'Connect Wallet' : isCreating ? 'Creating...' : 'Copy Coin'
              }
              copyCost={isConnected && !isCreating ? copyCostLabel : undefined}
              onCopy={() => {
                void handleCopy(token);
              }}
            />
          ))}
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          setModalStatus('progress');
          setModalError(null);
          setModalResult(null);
          setCurrentStep(1);
        }}
        title="Cloning Token"
        errorTitle="Clone Failed"
        successTitle="Token Cloned"
        error={modalError}
        status={modalStatus}
        result={modalResult}
        variant="steps"
        loadingTitle="Cloning this coin on Solana…"
        loadingSubtitle="Uploading metadata and confirming your new mint."
        loadingDetails={[
          'Pinning artwork to IPFS',
          'Creating Token mint',
          'Waiting for Solana confirmation',
        ]}
        currentStep={currentStep}
        totalSteps={8}
        steps={TOKEN_CREATE_STEPS}
        actionType="CREATE"
      />
    </>
  );
});
CopyTrendModule.displayName = 'CopyTrendModule';

export default CopyTrendModule;
