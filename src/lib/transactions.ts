import {
  Connection,
  PublicKey,
  Transaction,
  VersionedTransaction,
  AddressLookupTableAccount,
  TransactionMessage,
  TransactionInstruction,
} from '@solana/web3.js';

/**
 * Address Lookup Table (ALT) utilities for transaction batching
 */

export class TransactionBatcher {
  private connection: Connection;
  private lookupTables: Map<string, AddressLookupTableAccount> = new Map();

  constructor(connection: Connection) {
    this.connection = connection;
  }

  /**
   * Fetch and cache an Address Lookup Table
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
   * Create a versioned transaction with Address Lookup Tables
   * This allows batching multiple instructions into a single transaction
   */
  async createVersionedTransaction(
    instructions: TransactionInstruction[],
    payer: PublicKey,
    lookupTableAddresses?: PublicKey[]
  ): Promise<VersionedTransaction> {
    const lookupTables: AddressLookupTableAccount[] = [];

    if (lookupTableAddresses) {
      for (const address of lookupTableAddresses) {
        const table = await this.fetchLookupTable(address);
        if (table) {
          lookupTables.push(table);
        }
      }
    }

    const messageV0 = new TransactionMessage({
      payerKey: payer,
      recentBlockhash: (await this.connection.getLatestBlockhash()).blockhash,
      instructions,
    }).compileToV0Message(lookupTables);

    return new VersionedTransaction(messageV0);
  }

  /**
   * Batch multiple transactions into a single versioned transaction
   * This is useful for operations that need multiple instructions
   * (e.g., token creation + metadata + fee payment in one transaction)
   */
  async batchInstructions(
    instructions: TransactionInstruction[],
    payer: PublicKey,
    lookupTableAddresses?: PublicKey[]
  ): Promise<VersionedTransaction> {
    return this.createVersionedTransaction(instructions, payer, lookupTableAddresses);
  }

  /**
   * Get or create a common lookup table for the network
   * Many Solana programs use shared lookup tables
   */
  async getCommonLookupTables(network: 'mainnet-beta' | 'devnet' = 'mainnet-beta'): Promise<PublicKey[]> {
    const commonTables: PublicKey[] = [];

    try {
      // Common Address Lookup Tables for Solana programs
      // These are well-known lookup tables that reduce transaction size
      
      if (network === 'mainnet-beta') {
        // Mainnet lookup tables
        // Token Program lookup table (if available)
        // Metaplex Token Metadata lookup table
        // Jupiter common lookup tables (fetched from Jupiter API if needed)
        
        // Note: These addresses should be fetched dynamically or from a registry
        // For now, we'll try to fetch from known sources or use empty array
        // Jupiter provides lookup tables in their swap response, which we already use
        
        // Metaplex Token Metadata program doesn't have a standard public lookup table
        // But we can still use ALTs for token operations if available
      } else {
        // Devnet lookup tables (if any)
        // Devnet typically has fewer public lookup tables
      }
    } catch (error) {
      console.error('Error fetching common lookup tables:', error);
    }

    return commonTables;
  }
}

/**
 * Helper to create a single transaction with multiple instructions
 * Uses Address Lookup Tables when available for better efficiency
 * Automatically fetches common lookup tables if not provided
 */
export async function createBatchedTransaction(
  connection: Connection,
  instructions: TransactionInstruction[],
  payer: PublicKey,
  lookupTableAddresses?: PublicKey[],
  network?: 'mainnet-beta' | 'devnet'
): Promise<VersionedTransaction> {
  const batcher = new TransactionBatcher(connection);
  
  // If no lookup tables provided, try to get common ones
  let tables = lookupTableAddresses;
  if (!tables || tables.length === 0) {
    tables = await batcher.getCommonLookupTables(network || 'mainnet-beta');
  }
  
  return batcher.batchInstructions(instructions, payer, tables);
}

/**
 * Confirm a transaction with network-appropriate timeout handling
 * Mainnet transactions can take longer due to network congestion
 * If confirmation times out, checks transaction status to see if it actually succeeded
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
      // For mainnet, give more time and check multiple times (transactions can take longer)
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
            // Check if it's confirmed or finalized
            if (status.value.confirmationStatus === 'confirmed' || 
                status.value.confirmationStatus === 'finalized' ||
                (status.value.confirmations !== null && status.value.confirmations > 0)) {
              return { value: { err: null } };
            }
          }
        } catch (statusError) {
          // Continue to next retry
          if (i === maxRetries - 1) {
            // Last retry failed, throw original timeout error
            throw error;
          }
        }
      }
      
      // Transaction status still unknown after retries, but provide helpful error message
      throw new Error(
        `Transaction confirmation timeout on ${network}. ` +
        `The transaction may have succeeded. Please check: https://solscan.io/tx/${signature}${network === 'devnet' ? '?cluster=devnet' : ''}`
      );
    }
    
    // Re-throw non-timeout errors
    throw error;
  }
}

