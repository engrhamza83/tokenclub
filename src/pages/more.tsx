import dynamic from 'next/dynamic';
import '../polyfills';
import { SeoContainer } from '../components/SeoContainer';

const App = dynamic(() => import('../App'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-black text-blue-400">
      <div className="animate-pulse font-medium">Loading Token Club Tools...</div>
    </div>
  ),
});

export default function MoreToolsPage() {
  return (
    <SeoContainer
      title="More Solana Tools & Volume Engine — Token Club"
      description="Explore additional Solana token utilities by Token Club including the Volume Engine, marketing boosters, and DexScreener visibility resources."
      canonicalPath="/more"
      h1="More Solana Launch & Promotion Tools"
      leadText="Accelerate your token launch with advanced promotion utilities, trading volume bots, and ecosystem visibility tools designed to help Solana projects stand out."
      features={[
        {
          title: 'Volume Engine',
          description:
            'Generate active trading volume to increase token liquidity and organic visibility on Solana DEX charts.',
        },
        {
          title: 'DexScreener & BirdEye Integration',
          description:
            'Resources and formatting guidelines to get your token properly indexed with accurate price data and community links.',
        },
        {
          title: 'Promotional Boosters',
          description:
            'Ecosystem outreach tools to promote your token across community channels and decentralized aggregators.',
        },
        {
          title: 'OpenBook Market Utilities',
          description:
            'Guidance on OpenBook market ID creation and cost-optimized liquidity pair bootstrapping.',
        },
      ]}
      faqs={[
        {
          question: 'What is the Volume Engine on Token Club?',
          answer:
            'The Volume Engine is a tool that assists token creators in establishing baseline trading volume to improve chart ranking and liquidity pool activity.',
        },
        {
          question: 'Are these tools compatible with any SPL token?',
          answer:
            'Yes. All Token Club tools work with standard SPL tokens deployed on the Solana network.',
        },
      ]}
    >
      <App initialTab="more" initialRoute="/more" />
    </SeoContainer>
  );
}
