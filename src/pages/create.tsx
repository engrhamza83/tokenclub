import dynamic from 'next/dynamic';
import '../polyfills';
import { SeoContainer } from '../components/SeoContainer';

const App = dynamic(() => import('../App'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-black text-blue-400">
      <div className="animate-pulse font-medium">Loading Token Creator...</div>
    </div>
  ),
});

export default function CreateTokenPage() {
  return (
    <SeoContainer
      title="Create Solana Token (0.1 SOL) — Token Club"
      description="Create fully compliant SPL tokens on Solana for just 0.1 SOL with Token Club. Free vanity address generation, metadata pinning, and authority controls."
      canonicalPath="/create"
      h1="Solana SPL Token Creator"
      leadText="Deploy a custom Solana SPL token in seconds. Configure name, symbol, decimals, total supply, metadata, and authorities directly from your browser with no coding required."
      features={[
        {
          title: '0.1 SOL Flat Creation Fee',
          description:
            'Deploy on Solana for just 0.1 SOL—up to 70% cheaper than Smithii or Orion Tools. No hidden fees or surprise charges.',
        },
        {
          title: 'Free Vanity Address Generation',
          description:
            'Generate customized custom mint address prefixes and suffixes at no additional charge.',
        },
        {
          title: 'One-Click Authority Revocation',
          description:
            'Revoke mint authority to guarantee fixed supply and revoke freeze authority to enable seamless liquidity pool creation.',
        },
        {
          title: 'Metaplex Metadata Standard',
          description:
            'Includes logo uploads, website links, social media channels, and permanent on-chain metadata registration.',
        },
      ]}
      faqs={[
        {
          question: 'How much SOL do I need in my wallet to create a token?',
          answer:
            'We recommend having at least 0.15 SOL in your wallet: 0.1 SOL covers the creation fee, while the remainder covers Solana network rent and micro-fees.',
        },
        {
          question: 'Which token standard does Token Club use?',
          answer:
            'Token Club uses the official Solana Program Library (SPL) Token standard for universal compatibility across Phantom, Solflare, Raydium, Meteora, and DexScreener.',
        },
        {
          question: 'Can I change token details after creation?',
          answer:
            'Token symbol and decimals are immutable once minted on Solana. Metadata (logo, description) can be modified if update authority is retained.',
        },
      ]}
    >
      <App initialTab="create" initialRoute="/create" />
    </SeoContainer>
  );
}
