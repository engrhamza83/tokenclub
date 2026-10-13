import dynamic from 'next/dynamic';
import '../polyfills';
import { SeoContainer } from '../components/SeoContainer';

const App = dynamic(() => import('../App'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-black text-blue-400">
      <div className="animate-pulse font-medium">Loading Remove & Burn Module...</div>
    </div>
  ),
});

export default function RemovePage() {
  return (
    <SeoContainer
      title="Remove Liquidity & Burn Tokens — Token Club"
      description="Remove liquidity from Solana pools, burn LP tokens, and manage cleanup operations securely with Token Club at tokenclub.fun."
      canonicalPath="/remove"
      h1="Remove Solana Liquidity & Burn Supply"
      leadText="Easily withdraw liquidity from active Solana pools or permanently burn LP tokens to secure your project. Transparent wallet signing and zero hidden protocol fees."
      features={[
        {
          title: 'Direct Pool Withdrawal',
          description:
            'Withdraw your underlying SOL and token reserves from Raydium or Meteora liquidity pools with one click.',
        },
        {
          title: 'Permanent LP Token Burning',
          description:
            'Burn liquidity provider (LP) tokens to verifiably lock liquidity forever and prove 100% security to your community.',
        },
        {
          title: 'Clean Wallet Accounting',
          description:
            'Automatically close associated token accounts upon liquidity removal to recover locked Solana rent fees.',
        },
      ]}
      faqs={[
        {
          question: 'Can I remove liquidity if I have already burned the LP tokens?',
          answer:
            'No. Burning LP tokens permanently locks the liquidity on the blockchain, making it impossible for anyone—including the creator—to withdraw it.',
        },
        {
          question: 'How do I access this tool?',
          answer:
            'Connect your creator wallet on https://tokenclub.fun/remove and select the pool you wish to manage.',
        },
      ]}
    >
      <App initialTab="remove" initialRoute="/remove" />
    </SeoContainer>
  );
}
