import dynamic from 'next/dynamic';
import '../polyfills';
import { SeoContainer } from '../components/SeoContainer';

const App = dynamic(() => import('../App'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-black text-blue-400">
      <div className="animate-pulse font-medium">Loading Portfolio Explorer...</div>
    </div>
  ),
});

export default function PortfolioPage() {
  return (
    <SeoContainer
      title="My Portfolio & Token Balances — Token Club"
      description="Inspect your connected Solana wallet balances, SPL token holdings, liquidity positions, and account rent with Token Club Portfolio."
      canonicalPath="/portfolio"
      h1="Solana Wallet Portfolio Explorer"
      leadText="Comprehensive wallet analysis and token inspection on Solana. Review SOL balances, SPL token balances, authority states, and active liquidity positions from one interface."
      features={[
        {
          title: 'Wallet Balance Overview',
          description:
            'Instantly view your current SOL balance alongside all connected SPL and Token-2022 holdings.',
        },
        {
          title: 'Token Account Rent Inspection',
          description:
            'Identify dormant or empty token accounts that are unnecessarily locking up SOL rent fees.',
        },
        {
          title: 'Direct Management Access',
          description:
            'Jump directly from portfolio view to Token Creator, Swap, or Security tools with one click.',
        },
        {
          title: 'Private & Local Inspection',
          description:
            'Wallet data is fetched directly from public Solana RPC nodes to your browser without storing your information on external servers.',
        },
      ]}
      faqs={[
        {
          question: 'Does Token Club store my wallet holdings on a server?',
          answer:
            'No. All balances and token states are read live from the Solana blockchain into your browser. Token Club does not track or store your balances on a central database.',
        },
        {
          question: 'How do I connect my wallet?',
          answer:
            'Click the "Connect Wallet" button in the navigation bar and select your preferred Solana wallet (such as Phantom or Solflare).',
        },
      ]}
    >
      <App initialTab="portfolio" initialRoute="/portfolio" />
    </SeoContainer>
  );
}
