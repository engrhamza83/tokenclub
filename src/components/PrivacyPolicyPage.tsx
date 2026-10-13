import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Lock, Eye, Database, Mail } from 'lucide-react';
import { Logo } from './Logo';

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const sections = [
    {
      icon: Eye,
      title: 'Information We Collect',
      content: [
        'When you connect your wallet (e.g., Phantom, Solflare, or via WalletConnect), we may receive your public wallet address. We do not collect, store, or have access to your private keys or seed phrases.',
        'We use analytics (Google Analytics and Google Ads) to understand how users interact with our platform—including page views, feature usage, and conversion events. This helps us improve the service and measure advertising performance.',
        'We may store minimal data locally in your browser (e.g., token addresses, pool IDs) to improve your experience. This data stays on your device.',
      ],
    },
    {
      icon: Database,
      title: 'How We Use Your Information',
      content: [
        'To provide and improve our Solana token creation, swap, liquidity, and portfolio services.',
        'To analyze usage patterns and improve our platform.',
        'To measure the effectiveness of our advertising and comply with advertising platform requirements.',
        'To respond to support inquiries when you contact us.',
      ],
    },
    {
      icon: Lock,
      title: 'Transparency: User Control',
      content: [
        'All transactions on TokenClub require your explicit approval. You sign each transaction in your own wallet—we never execute transactions on your behalf without your consent.',
        'We are a non-custodial service. We do not hold, store, or control your funds. All assets remain in your wallet until you choose to transact.',
        'You can disconnect your wallet at any time to stop sharing your public address with our application.',
      ],
    },
    {
      icon: Shield,
      title: 'Third-Party Services',
      content: [
        'We integrate with Google Analytics and Google Ads for analytics and conversion tracking. These services have their own privacy policies.',
        'We use wallet providers (e.g., Phantom, Solflare) and RPC providers (e.g., Helius) to power our platform. Their policies apply to their respective services.',
        'We may use IPFS (e.g., Pinata) for metadata and image storage when you create tokens. Uploaded content may be publicly accessible.',
      ],
    },
    {
      icon: Mail,
      title: 'Contact & Questions',
      content: [
        'For privacy-related questions, contact us via Telegram: https://t.me/tokenlab00',
        'We may update this Privacy Policy from time to time. Continued use of TokenClub constitutes acceptance of the updated policy.',
      ],
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#030406] text-white font-sans">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#0A0C0E]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <Logo />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <p className="text-gray-400 text-sm md:text-base mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-blue-500/10 border-l-4 border-teal-400 rounded-lg p-6 mb-10">
          <p className="text-gray-200 leading-relaxed">
            TokenClub is a Solana blockchain service provider. We are committed to transparency: <strong className="text-teal-400">users approve all transactions in their own wallets</strong>, and we do not custody or control user funds. This policy explains what data we collect and how we use it.
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((section) => (
            <section
              key={section.title}
              className="bg-[#0A0C0E]/60 backdrop-blur-xl border border-white/5 rounded-xl p-6 md:p-8 hover:border-teal-500/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <section.icon className="w-6 h-6 text-teal-400 flex-shrink-0" />
                <h2 className="text-xl md:text-2xl font-semibold text-white">{section.title}</h2>
              </div>
              <ul className="space-y-3 text-gray-300 text-sm md:text-base leading-relaxed list-disc list-inside">
                {section.content.map((paragraph, idx) => (
                  <li key={idx}>{paragraph}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </article>
    </div>
  );
};
