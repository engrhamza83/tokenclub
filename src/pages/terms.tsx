import dynamic from 'next/dynamic';
import '../polyfills';
import { SeoContainer } from '../components/SeoContainer';

const App = dynamic(() => import('../App'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-black text-blue-400">
      <div className="animate-pulse font-medium">Loading Terms of Service...</div>
    </div>
  ),
});

export default function TermsRoutePage() {
  return (
    <SeoContainer
      title="Terms of Service — Token Club (Official)"
      description="Token Club Terms of Service: Non-custodial software user agreement, fee transparency, and decentralized protocol disclaimers."
      canonicalPath="/terms"
      h1="Token Club Terms of Service"
      leadText="Review the terms governing the use of the Token Club platform at tokenclub.fun. Token Club provides decentralized, non-custodial software tools for interfacing with the Solana blockchain."
      features={[
        {
          title: 'Software as a Tool',
          description:
            'Token Club is a decentralized web interface that helps users construct and broadcast standard transactions to the Solana network.',
        },
        {
          title: 'Irreversible Blockchain Transactions',
          description:
            'All transactions executed on the Solana blockchain are immutable and irreversible. Users are solely responsible for reviewing transaction parameters before signing.',
        },
        {
          title: 'No Financial or Investment Advice',
          description:
            'Token Club does not provide financial, legal, or investment advice. Token creation and liquidity provisioning carry market risk.',
        },
      ]}
      faqs={[
        {
          question: 'Are platform fees refundable?',
          answer:
            'Because blockchain gas and deployment fees are consumed immediately on the Solana network, fees for executed transactions cannot be reversed or refunded.',
        },
        {
          question: 'What is the official domain for Token Club?',
          answer:
            'The only authentic domain is https://tokenclub.fun. We accept no responsibility for interactions with unauthorized clones or third-party mirrors.',
        },
      ]}
    >
      <App initialRoute="/terms" />
    </SeoContainer>
  );
}
