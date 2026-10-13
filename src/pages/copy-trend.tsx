import dynamic from 'next/dynamic';
import '../polyfills';
import { SeoContainer } from '../components/SeoContainer';

const App = dynamic(() => import('../App'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-black text-blue-400">
      <div className="animate-pulse font-medium">Loading Copy Trend Engine...</div>
    </div>
  ),
});

export default function CopyTrendPage() {
  return (
    <SeoContainer
      title="Copy Trending Coins — Token Club Solana Launchpad"
      description="Clone trending Solana meme coins in one click and deploy them with Token Club. Monitor market trends and launch SPL tokens effortlessly."
      canonicalPath="/copy-trend"
      h1="Copy Trending Solana Coins"
      leadText="Track trending Solana tokens in real-time and clone token parameters for swift community launches. Token Club makes it easy to analyze top-performing meme coins and deploy SPL tokens with proven configurations."
      features={[
        {
          title: 'Live Market Trend Discovery',
          description:
            'Monitor hot, trending Solana tokens with live volume, price changes, and supply configurations.',
        },
        {
          title: 'One-Click Parameter Cloning',
          description:
            'Automatically populate token creation forms with matching supply, decimals, and metadata patterns.',
        },
        {
          title: 'Rapid Community Deployment',
          description:
            'Launch your cloned SPL token for just 0.1 SOL and immediately initialize liquidity pools.',
        },
        {
          title: 'Automated Metadata Setup',
          description:
            'Easily customize your token identity while retaining the proven technical parameters of viral trends.',
        },
      ]}
      faqs={[
        {
          question: 'What is Copy Trend on Token Club?',
          answer:
            'Copy Trend is a tool that allows you to inspect parameters of popular tokens on Solana and pre-populate your own token creation form for quick deployment.',
        },
        {
          question: 'Does Copy Trend copy the original token contract?',
          answer:
            'No. It creates a brand-new, independent SPL token under your own wallet authority with customized parameters.',
        },
      ]}
    >
      <App initialTab="copytrend" initialRoute="/copy-trend" />
    </SeoContainer>
  );
}
