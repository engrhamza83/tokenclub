import dynamic from 'next/dynamic';
import '../polyfills';
import { SeoContainer } from '../components/SeoContainer';

const App = dynamic(() => import('../App'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-black text-blue-400">
      <div className="animate-pulse font-medium">Loading Security & Burn Tools...</div>
    </div>
  ),
});

export default function SecurityPage() {
  return (
    <SeoContainer
      title="Security, Authority Revocation & Burn — Token Club"
      description="Revoke mint and freeze authorities, burn token supply, and clean up empty Solana token accounts to reclaim SOL rent with Token Club."
      canonicalPath="/security"
      h1="Solana Token Security & Authority Suite"
      leadText="Harden your token launch and audit your wallet security on Solana. Revoke mint and freeze authorities, permanently burn excess token supply, and recover locked rent from closed accounts."
      features={[
        {
          title: 'Revoke Freeze Authority',
          description:
            'Disable the ability to freeze holder token accounts, an essential prerequisite for listing tokens on Raydium and decentralized DEX pools.',
        },
        {
          title: 'Revoke Mint Authority',
          description:
            'Permanently cap token supply to guarantee no additional tokens can ever be minted, establishing verifiable trust with buyers.',
        },
        {
          title: 'Supply Burning',
          description:
            'Permanently burn tokens from circulation to adjust circulating supply or execute deflationary burns.',
        },
        {
          title: 'SOL Rent Recovery',
          description:
            'Scan your wallet for zero-balance or abandoned SPL token accounts and close them to reclaim approximately 0.002 SOL per account.',
        },
      ]}
      faqs={[
        {
          question: 'Why should I revoke freeze authority?',
          answer:
            'DEX liquidity pools like Raydium require freeze authority to be revoked so that liquidity can be freely traded without the risk of tokens being locked by the creator.',
        },
        {
          question: 'Can mint authority be regained after revoking it?',
          answer:
            'No. Once mint authority is revoked on the Solana blockchain, it is mathematically and permanently impossible to mint new tokens.',
        },
        {
          question: 'Is it safe to connect my wallet to Token Club Security?',
          answer:
            'Yes. Token Club is completely non-custodial. Every transaction requires explicit review and approval in your wallet software.',
        },
      ]}
    >
      <App initialTab="management" initialRoute="/security" />
    </SeoContainer>
  );
}
