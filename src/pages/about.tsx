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

export default function AboutPage() {
  return (
    <SeoContainer
      title="About Token Club — Official Non-Custodial Solana Platform"
      description="Learn about Token Club (tokenclub.fun), the official non-custodial Solana workspace for SPL token creation, swaps, and liquidity management."
      canonicalPath="/about"
      h1="About Token Club"
      leadText="Token Club is the premier non-custodial developer toolkit for the Solana blockchain. We empower creators, traders, and Web3 communities to deploy tokens, execute decentralized swaps, and manage liquidity without intermediaries."
      features={[
        {
          title: 'Non-Custodial Architecture',
          description:
            'Token Club never holds your private keys, seed phrases, or funds. Every interaction is simulated and signed directly inside your external browser wallet.',
        },
        {
          title: 'Economical Web3 Tooling',
          description:
            'We believe launching on Solana should be accessible to all. We charge a flat fee of 0.1 SOL for token creation with no hidden upcharges for vanity addresses or authority revocation.',
        },
        {
          title: 'Brand Authenticity & Safety',
          description:
            'Token Club operates exclusively on https://tokenclub.fun. We strongly advise users to verify the browser URL before connecting a wallet and to avoid unauthorized clones and third-party mirrors.',
        },
        {
          title: 'Solana Ecosystem Native',
          description:
            'Built from the ground up for the high throughput, sub-second settlement, and low fees of the Solana blockchain.',
        },
      ]}
      faqs={[
        {
          question: 'What is Token Club?',
          answer:
            'Token Club is a browser-based suite of non-custodial tools designed for creating and managing SPL tokens on the Solana network, accessible at https://tokenclub.fun.',
        },
        {
          question: 'Is Token Club affiliated with the legacy TCT token on Ethereum?',
          answer:
            'No. Token Club (tokenclub.fun) is an independent Solana decentralized software workspace and has no association with the older 2018 ERC-20 project known as TCT.',
        },
        {
          question: 'How do I know I am on the genuine Token Club website?',
          answer:
            'Always verify that your browser URL reads https://tokenclub.fun. Token Club does not operate on third-party domains or unofficial mirrors.',
        },
        {
          question: 'Where can I find official support?',
          answer:
            'Official community support is provided exclusively via our verified Telegram channel: https://t.me/tokenlab00.',
        },
      ]}
    >
      <App initialTab="create" initialRoute="/" />
    </SeoContainer>
  );
}
