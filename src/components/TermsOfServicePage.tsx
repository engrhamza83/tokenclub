import React, { useEffect } from 'react';
import { ArrowLeft, FileText, AlertTriangle, CheckCircle, Shield } from 'lucide-react';
import { Logo } from './Logo';

interface TermsOfServicePageProps {
  onBack: () => void;
}

export const TermsOfServicePage: React.FC<TermsOfServicePageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const sections = [
    {
      icon: FileText,
      title: 'Service Description',
      content: [
        'TokenClub is a Solana blockchain service provider. We offer token creation, swapping, liquidity management, portfolio tracking, and related tools. Users interact directly with the Solana blockchain through their own wallets—we facilitate the interface and instructions only.',
        'We are a non-custodial platform. We do not hold, store, or control your funds. All transactions are signed by you in your own wallet and broadcast to the Solana network.',
      ],
    },
    {
      icon: CheckCircle,
      title: 'User Responsibility & Approval',
      content: [
        'All transactions on TokenClub require your explicit approval. You sign each transaction in your wallet before it is submitted to the blockchain. You are responsible for reviewing and confirming each transaction.',
        'By using TokenClub, you agree to comply with all applicable laws in your jurisdiction. You are solely responsible for ensuring your use of our services is legal.',
        'You are responsible for the security of your wallet and private keys. TokenClub never requests or stores your private keys or seed phrases.',
      ],
    },
    {
      icon: FileText,
      title: 'Fee Transparency',
      content: [
        'TokenClub charges platform fees for certain services (e.g., token creation). All fees are disclosed before you confirm a transaction. You will see the total cost in SOL before signing.',
        'Additional blockchain fees (network fees, rent) may apply and are set by the Solana network—not by TokenClub. These are shown during transaction confirmation.',
      ],
    },
    {
      icon: AlertTriangle,
      title: 'Disclaimers & Risks',
      content: [
        'Cryptocurrency and blockchain activities involve risk. Token values can fluctuate. We do not provide investment, financial, or legal advice.',
        'Our services are provided "as is" without warranties of any kind. We do not guarantee uptime, accuracy, or outcomes.',
        'We are not responsible for third-party services (wallets, RPCs, DEXs) or for losses resulting from user error, network conditions, or external factors.',
      ],
    },
    {
      icon: Shield,
      title: 'Limitation of Liability',
      content: [
        'To the fullest extent permitted by law, TokenClub and its operators shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.',
        'By using TokenClub, you acknowledge these terms and agree to use our services at your own risk.',
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
          Terms of Service
        </h1>
        <p className="text-gray-400 text-sm md:text-base mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-blue-500/10 border-l-4 border-teal-400 rounded-lg p-6 mb-10">
          <p className="text-gray-200 leading-relaxed mb-3">
            Welcome to TokenClub. By using our services, you agree to these Terms of Service.
          </p>
          <p className="text-gray-200 leading-relaxed">
            <strong className="text-teal-400">Key points:</strong> Users approve all transactions in their own wallets. We do not custody funds. All fees are disclosed before confirmation.
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

        <div className="mt-10 text-center text-gray-500 text-sm">
          For questions, contact us via Telegram:{' '}
          <a
            href="https://t.me/tokenlab00"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:text-teal-300 transition-colors"
          >
            t.me/tokenlab00
          </a>
        </div>
      </article>
    </div>
  );
};
