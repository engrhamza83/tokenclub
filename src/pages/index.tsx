import dynamic from 'next/dynamic';
import '../polyfills';
import { SeoContainer } from '../components/SeoContainer';

const App = dynamic(() => import('../App'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-black text-blue-400">
      <div className="animate-pulse font-medium">Loading Token Club...</div>
    </div>
  ),
});

export default function Home() {
  return (
    <SeoContainer
      title="Token Club (Official) — Solana Token Creator, Swaps & Liquidity"
      description="The official Token Club (tokenclub.fun) platform for Solana. Create SPL tokens for 0.1 SOL, execute swaps, manage liquidity pools, and revoke authorities non-custodially."
      canonicalPath="/"
      h1="Token Club Solana Workspace"
      leadText="Token Club is the authoritative non-custodial Solana workspace for creating SPL tokens, executing swaps, managing liquidity pools, and securing token launches from one unified interface."
      features={[
        {
          title: 'Create SPL Tokens for 0.1 SOL',
          description:
            'Deploy fully compliant Solana SPL tokens in seconds with zero coding. Includes customizable metadata, 9 decimals, supply controls, and free vanity address generation.',
        },
        {
          title: 'Liquidity Pool Management',
          description:
            'Initialize, add, remove, lock, and claim fees on Solana liquidity pools with direct Raydium AMM and Meteora CP-AMM integrations starting from 0.0001 SOL.',
        },
        {
          title: 'Security & Authority Revocation',
          description:
            'Revoke freeze authority, revoke mint authority, burn token supply, and clean up abandoned token accounts to recover locked SOL rent.',
        },
        {
          title: 'DEX Swap Aggregator',
          description:
            'Trade Solana tokens with transparent pricing, route optimization, and instant wallet transaction signing.',
        },
      ]}
      faqs={[
        {
          question: 'What is the official website for Token Club?',
          answer:
            'The only authentic, official website for Token Club is tokenclub.fun. Beware of unauthorized clone websites or third-party mirrors.',
        },
        {
          question: 'How much does it cost to create a Solana token on Token Club?',
          answer:
            'Token Club charges a flat fee of 0.1 SOL for token creation. Unlike competitors charging 0.3+ SOL, Token Club includes custom vanity addresses and complete authority management at no extra charge.',
        },
        {
          question: 'Does Token Club hold custody of my private keys or funds?',
          answer:
            'No. Token Club is strictly non-custodial. Every transaction is constructed in your browser and signed directly in your connected wallet software (Phantom, Solflare, etc.).',
        },
        {
          question: 'Is Token Club affiliated with the legacy TCT cryptocurrency token?',
          answer:
            'No. Token Club (tokenclub.fun) is an independent Solana decentralized software platform. It is not affiliated with the older 2018 Ethereum ERC-20 project that traded under the ticker symbol TCT.',
        },
      ]}
    >
      <App initialTab="create" initialRoute="/" />
    </SeoContainer>
  );
}
