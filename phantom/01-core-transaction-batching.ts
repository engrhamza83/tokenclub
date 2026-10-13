/**
 * Code Snippet 1: Core Transaction Batching with VersionedTransaction (V0) and Address Lookup Tables
 * 
 * This file demonstrates TokenClub.fun's core transaction implementation that:
 * - Uses VersionedTransaction (V0) format exclusively (no legacy transactions)
 * - Implements Address Lookup Tables (ALTs) for transaction size optimization
 * - Batches multiple instructions into single transactions
 * - Uses latest blockhash for transaction freshness
 * - Implements robust confirmation handling with timeout management
 * 
 * Source: src/lib/transactions.ts
 */

import {
  Connection,
  PublicKey,
  VersionedTransaction,
  AddressLookupTableAccount,
  TransactionMessage,
  TransactionInstruction,
} from '@solana/web3.js';

/**
 * TransactionBatcher class handles creation of VersionedTransaction (V0) with Address Lookup Tables
 * This follows Solana Foundation best practices for transaction optimization
 */
export class TransactionBatcher {
  private connection: Connection;
  private lookupTables: Map<string, AddressLookupTableAccount> = new Map();

  constructor(connection: Connection) {
    this.connection = connection;
  }

  /**
   * Fetch and cache an Address Lookup Table
   * ALTs reduce transaction size by allowing address references instead of full addresses
   */
  async fetchLookupTable(address: PublicKey): Promise<AddressLookupTableAccount | null> {
    const addressStr = address.toBase58();
    
    if (this.lookupTables.has(addressStr)) {
      return this.lookupTables.get(addressStr)!;
    }

    try {
      const lookupTableAccount = await this.connection.getAddressLookupTable(address);
      
      if (lookupTableAccount.value) {
        this.lookupTables.set(addressStr, lookupTableAccount.value);
        return lookupTableAccount.value;
      }
    } catch (error) {
      console.error('Error fetching lookup table:', error);
    }

    return null;
  }

  /**
   * Create a VersionedTransaction (V0) with Address Lookup Tables
   * This is the recommended transaction format per Solana Foundation guidelines
   * 
   * Key compliance points:
   * - Uses VersionedTransaction (not legacy Transaction)
   * - Uses compileToV0Message() for V0 format
   * - Includes Address Lookup Tables when available
   * - Always fetches latest blockhash for freshness
   */
  async createVersionedTransaction(
    instructions: TransactionInstruction[],
    payer: PublicKey,
    lookupTableAddresses?: PublicKey[]
  ): Promise<VersionedTransaction> {
    const lookupTables: AddressLookupTableAccount[] = [];

    // Resolve Address Lookup Tables if provided
    if (lookupTableAddresses) {
      for (const address of lookupTableAddresses) {
        const table = await this.fetchLookupTable(address);
        if (table) {
          lookupTables.push(table);
        }
      }
    }

    // Create V0 message with ALTs
    // This is the recommended approach per Solana Foundation documentation
    const messageV0 = new TransactionMessage({
      payerKey: payer,
      recentBlockhash: (await this.connection.getLatestBlockhash()).blockhash, // Always use latest blockhash
      instructions,
    }).compileToV0Message(lookupTables); // V0 format with ALTs

    return new VersionedTransaction(messageV0);
  }

  /**
   * Batch multiple instructions into a single VersionedTransaction
   * This reduces transaction costs and improves user experience
   */
  async batchInstructions(
    instructions: TransactionInstruction[],
    payer: PublicKey,
    lookupTableAddresses?: PublicKey[]
  ): Promise<VersionedTransaction> {
    return this.createVersionedTransaction(instructions, payer, lookupTableAddresses);
  }
}

/**
 * Helper function to create batched transactions with ALTs
 * This is used throughout TokenClub.fun for all transaction operations
 */
export async function createBatchedTransaction(
  connection: Connection,
  instructions: TransactionInstruction[],
  payer: PublicKey,
  lookupTableAddresses?: PublicKey[],
  network?: 'mainnet-beta' | 'devnet'
): Promise<VersionedTransaction> {
  const batcher = new TransactionBatcher(connection);
  return batcher.batchInstructions(instructions, payer, lookupTableAddresses);
}

/**
 * Confirm transaction with network-appropriate timeout handling
 * Mainnet transactions can take longer due to network congestion
 * This implementation handles timeouts gracefully and verifies transaction status
 */
export async function confirmTransactionWithTimeout(
  connection: Connection,
  signature: string,
  network: 'mainnet-beta' | 'devnet' = 'mainnet-beta'
): Promise<any> {
  try {
    // Try standard confirmation (default timeout is 30s)
    return await connection.confirmTransaction(signature, 'confirmed');
  } catch (error: any) {
    // If timeout error, check if transaction actually succeeded
    if (error.name === 'TransactionExpiredTimeoutError' || error.message?.includes('timeout')) {
      // For mainnet, give more time and check multiple times
      const maxRetries = network === 'mainnet-beta' ? 5 : 2;
      const retryDelay = 2000;
      
      for (let i = 0; i < maxRetries; i++) {
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        
        try {
          const status = await connection.getSignatureStatus(signature);
          
          if (status.value) {
            if (status.value.err) {
              // Transaction actually failed
              return { value: { err: status.value.err } };
            }
            
            // Transaction succeeded - return success
            if (status.value.confirmationStatus === 'confirmed' || 
                status.value.confirmationStatus === 'finalized' ||
                (status.value.confirmations !== null && status.value.confirmations > 0)) {
              return { value: { err: null } };
            }
          }
        } catch (statusError) {
          if (i === maxRetries - 1) {
            throw error;
          }
        }
      }
      
      throw new Error(
        `Transaction confirmation timeout on ${network}. ` +
        `The transaction may have succeeded. Please check: https://solscan.io/tx/${signature}${network === 'devnet' ? '?cluster=devnet' : ''}`
      );
    }
    
    throw error;
  }
}

