import dynamic from 'next/dynamic';
import '../polyfills';
import { SeoContainer } from '../components/SeoContainer';

const App = dynamic(() => import('../App'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-black text-blue-400">
      <div className="animate-pulse font-medium">Loading Liquidity Manager...</div>
    </div>
  ),
});

export default function LiquidityPage() {
  return (
    <SeoContainer
      title="Solana Liquidity Manager — Token Club"
      description="Create, manage, lock, and claim fees on Solana liquidity pools with Token Club Liquidity Manager. Raydium and Meteora CP-AMM pool integration."
      canonicalPath="/liquidity"
      h1="Solana Liquidity Manager"
      leadText="Initialize and manage decentralized liquidity pools on Solana with ease. Token Club empowers token creators to provision liquidity on Raydium and Meteora, lock LP tokens, and harvest swap fees."
      features={[
        {
          title: 'Single-Sided Liquidity Pools',
          description:
            'Start a liquidity pool with as little as 0.0001 SOL, reducing initial capital barriers for launching new meme coins and community tokens.',
        },
        {
          title: 'Raydium & Meteora Integration',
          description:
            'Direct support for Raydium Standard AMM pools and Meteora Constant Product AMM (CP-AMM) architectures.',
        },
        {
          title: 'Liquidity Locking for Trust',
          description:
            'Lock LP tokens permanently or for a custom duration to prove commitment and eliminate rug pull risks for your holders.',
        },
        {
          title: 'Real-Time Fee Harvesting',
          description:
            'Inspect accumulated trading fees and claim rewards directly to your connected creator wallet.',
        },
      ]}
      faqs={[
        {
          question: 'What is the minimum SOL required to create a liquidity pool?',
          answer:
            'Token Club supports single-sided pools requiring as little as 0.0001 SOL, alongside standard dual-sided liquidity pools.',
        },
        {
          question: 'Can I withdraw my liquidity later?',
          answer:
            'Yes, unless you choose to permanently burn or lock your LP tokens, you can remove liquidity at any time using the Liquidity or Remove tools.',
        },
        {
          question: 'How do I verify the official Token Club Liquidity Manager?',
          answer:
            'Always ensure your browser URL is https://tokenclub.fun/liquidity. Beware of unauthorized copies or third-party mirrors.',
        },
      ]}
    >
      <App initialTab="liquidity" initialRoute="/liquidity" />
    </SeoContainer>
  );
}
