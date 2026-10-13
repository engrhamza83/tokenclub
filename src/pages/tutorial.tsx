import dynamic from 'next/dynamic';
import '../polyfills';
import { SeoContainer } from '../components/SeoContainer';

const App = dynamic(() => import('../App'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-black text-blue-400">
      <div className="animate-pulse font-medium">Loading Video Tutorial...</div>
    </div>
  ),
});

export default function TutorialRoutePage() {
  return (
    <SeoContainer
      title="Video Tutorials & Walkthroughs — Token Club"
      description="Watch step-by-step video tutorials on creating Solana tokens, adding liquidity, revoking authorities, and promoting tokens with Token Club."
      canonicalPath="/tutorial"
      h1="Token Club Video Tutorials & Guides"
      leadText="Master the Solana token launch process with comprehensive video guides and walkthroughs. Learn how to mint SPL tokens, initialize Raydium liquidity pools, burn supply, and promote your project."
      features={[
        {
          title: 'Complete Token Creation Guide',
          description:
            'Step-by-step walkthrough covering token parameters, logo uploads, vanity address generation, and wallet signing.',
        },
        {
          title: 'Liquidity Provisioning Walkthrough',
          description:
            'Learn how to establish initial Raydium and Meteora CP-AMM liquidity pools with optimal pricing ratios.',
        },
        {
          title: 'Security Hardening Tutorial',
          description:
            'Best practices on revoking freeze and mint authorities, locking LP tokens, and verifying safety on RugCheck.',
        },
        {
          title: 'Marketing & Volume Strategies',
          description:
            'Tips on trending token replication, DexScreener verification, and using the Volume Engine for initial visibility.',
        },
      ]}
      faqs={[
        {
          question: 'Do I need prior coding knowledge to follow the tutorials?',
          answer:
            'No. All tutorials are designed for beginners with no coding experience. Token Club handles all smart contract mechanics behind the scenes.',
        },
        {
          question: 'Where can I ask questions if I get stuck?',
          answer:
            'Join our official Telegram community at https://t.me/tokenlab00 where our team and community provide 24/7 support.',
        },
      ]}
    >
      <App initialRoute="/tutorial" />
    </SeoContainer>
  );
}
