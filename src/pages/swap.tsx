import dynamic from 'next/dynamic';
import '../polyfills';
import { SeoContainer } from '../components/SeoContainer';

const App = dynamic(() => import('../App'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-black text-blue-400">
      <div className="animate-pulse font-medium">Loading Token Club Swap...</div>
    </div>
  ),
});

export default function SwapPage() {
  return (
    <SeoContainer
      title="Token Club Swap — Best Route Solana DEX Aggregator"
      description="Execute fast, decentralized swaps on Solana with Token Club Swap. Transparent routing, minimal slippage, and instant wallet execution at tokenclub.fun."
      canonicalPath="/swap"
      h1="Token Club Solana Swap"
      leadText="Swap any SPL token on Solana with low slippage and best route execution. Token Club interfaces with leading decentralized liquidity sources to ensure optimal rates for traders."
      features={[
        {
          title: 'Decentralized Route Optimization',
          description:
            'Aggregates liquidity across top Solana AMMs to deliver the most favorable price execution on every trade.',
        },
        {
          title: 'Non-Custodial & Wallet-Signed',
          description:
            'Every swap simulation is transparently inspected and signed directly inside your connected Solana wallet.',
        },
        {
          title: 'Sub-Second Confirmations',
          description:
            'Leverages Solana high-speed parallel transaction processing for instant settlement.',
        },
        {
          title: 'Minimal Fee Overhead',
          description:
            'Transparent fee display with zero hidden markup on liquidity routes.',
        },
      ]}
      faqs={[
        {
          question: 'What is Token Club Swap?',
          answer:
            'Token Club Swap is a decentralized exchange interface that allows users to swap SOL and any SPL token directly on the Solana blockchain.',
        },
        {
          question: 'Do I need to deposit funds into Token Club to swap?',
          answer:
            'No. Token Club is non-custodial. Funds never leave your wallet until you explicitly confirm the transaction.',
        },
        {
          question: 'What is the official URL for Token Club Swap?',
          answer:
            'The only official address is https://tokenclub.fun/swap. Do not execute trades on unauthorized clones or third-party mirrors.',
        },
      ]}
    >
      <App initialTab="swap" initialRoute="/swap" />
    </SeoContainer>
  );
}
