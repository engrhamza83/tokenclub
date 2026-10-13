import dynamic from 'next/dynamic';
import '../polyfills';
import { SeoContainer } from '../components/SeoContainer';

const App = dynamic(() => import('../App'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-black text-blue-400">
      <div className="animate-pulse font-medium">Loading Comparison...</div>
    </div>
  ),
});

export default function ComparisonRoutePage() {
  return (
    <SeoContainer
      title="Smithii vs Token Club: The Most Economical Solana Token Creator"
      description="Compare Token Club vs Smithii vs Orion Tools. See why Token Club is the most economical Solana token launchpad at just 0.1 SOL with free vanity addresses."
      canonicalPath="/comparison"
      h1="Smithii vs Token Club: Solana Token Creator Comparison"
      leadText="Compare the features, pricing, and capabilities of Token Club against leading competitors like Smithii and Orion Tools. Discover why thousands of creators choose Token Club for affordable Solana launches."
      features={[
        {
          title: '0.1 SOL vs 0.3+ SOL Base Fee',
          description:
            'Token Club charges 0.1 SOL for token creation—up to 70% cheaper than Smithii and Orion Tools.',
        },
        {
          title: 'Free Vanity Addresses',
          description:
            'Custom address prefixes and suffixes are included for free on Token Club, whereas competitors charge steep premium fees.',
        },
        {
          title: 'Integrated Liquidity & Volume Tools',
          description:
            'All-in-one ecosystem with Raydium/Meteora liquidity tools, built-in DEX swap, and volume bot utilities in a single interface.',
        },
        {
          title: 'Transparent, No-Code UX',
          description:
            'Simple, non-custodial workflow with transparent Solana transaction simulations and zero hidden platform markup.',
        },
      ]}
      faqs={[
        {
          question: 'Why is Token Club so much cheaper than Smithii?',
          answer:
            'Token Club is engineered to minimize smart contract overhead and optimize Solana compute units, allowing us to pass maximum savings to creators with a flat 0.1 SOL fee.',
        },
        {
          question: 'Are tokens created on Token Club identical to those created on Smithii?',
          answer:
            'Yes. Both platforms deploy standard SPL tokens registered on the Solana blockchain and verified on Metaplex. Tokens created on Token Club have identical compatibility across all DEXs and wallets.',
        },
      ]}
    >
      <App initialRoute="/comparison" />
    </SeoContainer>
  );
}
