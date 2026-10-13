import dynamic from 'next/dynamic';
import '../polyfills';
import { SeoContainer } from '../components/SeoContainer';

const App = dynamic(() => import('../App'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-black text-blue-400">
      <div className="animate-pulse font-medium">Loading Privacy Policy...</div>
    </div>
  ),
});

export default function PrivacyRoutePage() {
  return (
    <SeoContainer
      title="Privacy Policy — Token Club (Official)"
      description="Token Club Privacy Policy: Learn how we protect user privacy with a strictly non-custodial architecture on the Solana blockchain."
      canonicalPath="/privacy"
      h1="Token Club Privacy Policy"
      leadText="Token Club is committed to protecting user privacy. As a non-custodial decentralized application, we do not collect personal identities, seed phrases, private keys, or custody of user assets."
      features={[
        {
          title: 'Non-Custodial Architecture',
          description:
            'We never store, log, or have access to your private cryptographic keys, seed phrases, or wallet credentials.',
        },
        {
          title: 'No Personal Identification Required',
          description:
            'You do not need to register an account, provide an email address, or submit KYC documents to use Token Club.',
        },
        {
          title: 'Transparent Public Ledger Operations',
          description:
            'All transactions are processed transparently on the public Solana blockchain according to decentralized protocol rules.',
        },
      ]}
      faqs={[
        {
          question: 'Does Token Club track my IP address?',
          answer:
            'Token Club does not log or sell your personal browsing activity. Standard CDN request headers may be processed temporarily for DDoS mitigation and performance routing.',
        },
        {
          question: 'How do I protect my wallet security?',
          answer:
            'Always verify that you are connecting to https://tokenclub.fun, never share your recovery seed phrase with anyone, and verify all transaction signatures inside your wallet.',
        },
      ]}
    >
      <App initialRoute="/privacy" />
    </SeoContainer>
  );
}
