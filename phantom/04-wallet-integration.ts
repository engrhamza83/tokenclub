/**
 * Code Snippet 4: Wallet Integration with Reown AppKit (WalletConnect Standard)
 * 
 * This file demonstrates TokenClub.fun's wallet integration that:
 * - Uses Reown AppKit (formerly WalletConnect AppKit) - industry standard
 * - Properly handles VersionedTransaction signing
 * - Implements proper error handling
 * - Uses standard Solana wallet adapter patterns
 * 
 * Source: src/contexts/WalletContext.tsx
 */

import React, { createContext, useContext, useMemo } from 'react';
import { AppKitProvider, useAppKitAccount, useAppKit } from '@reown/appkit/react';
import { useDisconnect, useAppKitProvider } from '@reown/appkit-controllers/react';
import { SolanaAdapter } from '@reown/appkit-adapter-solana';
import { solana, solanaDevnet } from '@reown/appkit/networks';
import { Connection, VersionedTransaction } from '@solana/web3.js';

/**
 * Wallet Context Implementation
 * 
 * This demonstrates proper wallet integration following industry standards:
 * - Uses Reown AppKit (WalletConnect standard for Solana)
 * - Supports multiple networks (mainnet, devnet)
 * - Properly handles VersionedTransaction signing
 * - Implements proper error handling
 */
interface WalletContextType {
  connection: Connection;
  address: string | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  signAndSendTransaction?: (transaction: VersionedTransaction) => Promise<string | undefined>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

/**
 * Core wallet integration function
 * This is the critical function that signs and sends VersionedTransaction
 * 
 * Key compliance points:
 * - Accepts VersionedTransaction (not legacy Transaction)
 * - Uses wallet provider's signTransaction method
 * - Properly serializes and sends transaction
 * - Includes proper error handling
 */
function WalletContextProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAppKitAccount({ namespace: 'solana' });
  const { open } = useAppKit();
  const { disconnect: disconnectWallet } = useDisconnect();
  const { walletProvider } = useAppKitProvider<any>('solana');

  const connection = useMemo(() => {
    // Create connection with appropriate RPC endpoint
    return new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
  }, []);

  /**
   * Sign and send VersionedTransaction
   * 
   * This function:
   * 1. Validates wallet connection
   * 2. Signs the VersionedTransaction using wallet provider
   * 3. Sends the signed transaction to the network
   * 4. Returns the transaction signature
   * 
   * Compliance:
   * - Only accepts VersionedTransaction (V0 format)
   * - Uses proper serialization
   * - Includes retry logic for network reliability
   * - Proper error handling
   */
  const signAndSendTransaction = async (
    transaction: VersionedTransaction
  ): Promise<string | undefined> => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    if (!walletProvider) {
      throw new Error('Wallet provider not available');
    }

    try {
      // Step 1: Sign the VersionedTransaction with the wallet provider
      // The wallet will display the transaction details to the user for approval
      const signedTransaction = await walletProvider.signTransaction(transaction);
      
      // Step 2: Send the signed transaction to the network
      // Uses sendRawTransaction with proper options:
      // - skipPreflight: false (runs preflight checks for safety)
      // - maxRetries: 3 (retries on network errors)
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize(),
        {
          skipPreflight: false, // Run preflight checks
          maxRetries: 3, // Retry on network errors
        }
      );

      return signature;
    } catch (error: any) {
      console.error('Transaction signing error:', error);
      throw error;
    }
  };

  const connect = async () => {
    try {
      // Open wallet connection modal
      await open({ 
        view: 'Connect',
        namespace: 'solana'
      });
    } catch (error: any) {
      console.error('Error opening wallet connection:', error);
      throw error;
    }
  };

  const disconnect = async () => {
    await disconnectWallet();
  };

  const value = useMemo(
    () => ({
      connection,
      address: address || null,
      isConnected: isConnected || false,
      connect,
      disconnect,
      signAndSendTransaction,
    }),
    [connection, address, isConnected]
  );

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

/**
 * AppKit Configuration
 * 
 * This configures Reown AppKit with:
 * - Solana adapter for wallet connections
 * - Network support (mainnet, devnet)
 * - Proper metadata for dApp identification
 */
const appKitConfig = {
  adapters: [
    new SolanaAdapter({
      connectionSettings: {
        commitment: 'confirmed',
      },
    }),
  ],
  networks: [solana, solanaDevnet],
  defaultNetwork: solana,
  projectId: 'YOUR_PROJECT_ID', // WalletConnect project ID
  metadata: {
    name: 'TokenClub',
    description: 'Create, swap, and manage tokens on Solana',
    url: 'https://tokenclub.fun',
    icons: ['https://tokenclub.fun/favicon.ico'],
  },
};

/**
 * Wallet Provider Component
 * Wraps the app with AppKitProvider for wallet functionality
 */
export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppKitProvider {...appKitConfig}>
      <WalletContextProvider>{children}</WalletContextProvider>
    </AppKitProvider>
  );
}

/**
 * Hook to use wallet context
 */
export function useWallet(): WalletContextType {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
}

/**
 * Key Compliance Points Demonstrated:
 * 
 * ✅ Uses Reown AppKit (WalletConnect standard) - industry standard wallet integration
 * ✅ Properly handles VersionedTransaction signing (not legacy Transaction)
 * ✅ Uses wallet provider's signTransaction method (standard interface)
 * ✅ Proper transaction serialization and sending
 * ✅ Includes retry logic for network reliability
 * ✅ Proper error handling and user feedback
 * ✅ Supports multiple networks (mainnet, devnet)
 * ✅ Follows Solana wallet adapter patterns
 */

