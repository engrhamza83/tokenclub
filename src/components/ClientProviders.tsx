import React from 'react';
import { NetworkProvider } from '../contexts/NetworkContext';
import { WalletProvider } from '../contexts/WalletContext';

/** Client-only providers (Reown/Solana). Keep out of _app so OpenNext server bundle stays small. */
export const ClientProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <NetworkProvider>
    <WalletProvider>{children}</WalletProvider>
  </NetworkProvider>
);
