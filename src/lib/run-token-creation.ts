import { Connection, PublicKey } from '@solana/web3.js';
import { FullTokenCreator } from './token-creation-full';
import { createBatchedTransaction, confirmTransactionWithTimeout } from './transactions';
import { saveTokenData } from './token-memory';
import type { Network } from './config';

export function sanitizeTokenName(raw: string): string {
  return raw.trim().slice(0, 32);
}

export function sanitizeTokenSymbol(raw: string): string {
  return raw.replace(/^\$/, '').replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 10);
}

export interface TokenCreationInput {
  name: string;
  symbol: string;
  description: string;
  decimals: number;
  totalSupply: number;
  website?: string;
  twitter?: string;
  telegram?: string;
  revokeMintAuthority: boolean;
  revokeFreezeAuthority: boolean;
  creatorWebsite?: string;
  creatorName?: string;
  imageFile?: File | null;
  imageUrl?: string;
}

export interface TokenCreationRuntime {
  connection: Connection;
  address: string;
  network: Network;
  signAndSendTransaction: (transaction: unknown) => Promise<string | undefined>;
  onStep?: (step: number) => void;
}

export interface TokenCreationSuccess {
  mintAddress: string;
  feeSignature: string;
  tokenSignature: string;
  imageUri: string;
  totalCost: number;
  name: string;
  symbol: string;
  description: string;
  revokeMintAuthority: boolean;
  revokeFreezeAuthority: boolean;
  hasAdvancedFeatures: boolean;
}

async function pinRemoteImage(imageUrl: string): Promise<string | null> {
  try {
    const response = await fetch('/api/pinata/from-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: imageUrl }),
    });
    if (!response.ok) return null;
    const data = (await response.json()) as { gatewayUrl?: string };
    return data.gatewayUrl || null;
  } catch {
    return null;
  }
}

export async function runTokenCreation(
  input: TokenCreationInput,
  runtime: TokenCreationRuntime
): Promise<TokenCreationSuccess> {
  const name = sanitizeTokenName(input.name);
  const symbol = sanitizeTokenSymbol(input.symbol);
  const description = (input.description || '').slice(0, 500);
  const decimals = input.decimals;
  const totalSupply = input.totalSupply;
  const website = input.website || '';
  const twitter = input.twitter || '';
  const telegram = input.telegram || '';
  const revokeMintAuthority = input.revokeMintAuthority;
  const revokeFreezeAuthority = input.revokeFreezeAuthority;
  const creatorWebsite = input.creatorWebsite?.trim() || undefined;
  const creatorName = input.creatorName?.trim() || undefined;

  if (!name || !symbol) {
    throw new Error('Token name and symbol are required');
  }
  if (name.length > 32) {
    throw new Error('Token name must be 32 characters or less');
  }
  if (symbol.length > 10) {
    throw new Error('Token symbol must be 10 characters or less');
  }
  if (decimals < 0 || decimals > 15) {
    throw new Error('Decimals must be between 0 and 15');
  }
  if (totalSupply <= 0) {
    throw new Error('Supply must be greater than 0');
  }
  if (!runtime.signAndSendTransaction) {
    throw new Error('Wallet not connected');
  }

  const setStep = (step: number) => runtime.onStep?.(step);
  setStep(1);

  const creator = new FullTokenCreator(runtime.connection);
  const payer = new PublicKey(runtime.address);

  const params = {
    name,
    symbol,
    description,
    decimals,
    totalSupply,
    revokeMintAuthority,
    revokeFreezeAuthority,
    website,
    twitter,
    telegram,
    creatorWebsite,
    creatorName,
  };

  const baseCost = creator.calculateCost(params);
  const balance = await runtime.connection.getBalance(payer);
  const requiredBalance = baseCost * 1e9;
  const estimatedTxFee = 0.01 * 1e9;
  const totalRequired = requiredBalance + estimatedTxFee + 0.001 * 1e9;

  if (balance < totalRequired) {
    const requiredSol = (totalRequired / 1e9).toFixed(3);
    const currentSol = (balance / 1e9).toFixed(3);
    const baseCostSol = baseCost.toFixed(3);
    throw new Error(
      `Insufficient balance. Required: ${requiredSol} SOL (Base: ${baseCostSol} SOL + Fees: 0.01 SOL + Buffer: 0.001 SOL), Current: ${currentSol} SOL`
    );
  }

  setStep(2);
  let imageUri = '';
  if (input.imageFile) {
    const uploadedUri = await creator.uploadImage(input.imageFile);
    imageUri = uploadedUri || '';
    if (!imageUri) {
      throw new Error('Failed to upload image');
    }
  } else if (input.imageUrl) {
    imageUri = (await pinRemoteImage(input.imageUrl)) || input.imageUrl;
  }

  setStep(3);
  const metadataUri = await creator.uploadMetadata(
    { ...params, imageUri },
    imageUri
  );
  if (!metadataUri) {
    throw new Error('Failed to upload metadata');
  }

  setStep(4);
  const result = await creator.createTokenWithMetadata(
    { ...params, imageUri },
    payer,
    metadataUri
  );
  if (!result) {
    throw new Error('Failed to create token instructions');
  }

  setStep(5);
  const feeTransaction = await createBatchedTransaction(
    runtime.connection,
    [result.feeInstruction],
    payer,
    undefined,
    runtime.network
  );
  const feeSignature = await runtime.signAndSendTransaction(feeTransaction);
  if (!feeSignature) {
    throw new Error('Fee transaction signature not received');
  }

  const feeConfirmation = await confirmTransactionWithTimeout(
    runtime.connection,
    feeSignature,
    runtime.network
  );
  if (feeConfirmation.value.err) {
    throw new Error(`Fee transaction failed: ${JSON.stringify(feeConfirmation.value.err)}`);
  }

  setStep(6);
  const tokenTransaction = await createBatchedTransaction(
    runtime.connection,
    result.instructions,
    payer,
    undefined,
    runtime.network
  );
  tokenTransaction.sign([result.mintKeypair]);

  setStep(7);
  const tokenSignature = await runtime.signAndSendTransaction(tokenTransaction);
  if (!tokenSignature) {
    throw new Error('Token creation transaction signature not received');
  }

  const mintAddress = result.mintKeypair.publicKey.toBase58();
  saveTokenData({
    mintAddress,
    image: imageUri || undefined,
    name,
    symbol,
    description,
    createdAt: Date.now(),
  });

  setStep(8);
  const tokenConfirmation = await confirmTransactionWithTimeout(
    runtime.connection,
    tokenSignature,
    runtime.network
  );
  if (tokenConfirmation.value.err) {
    throw new Error(
      `Token creation transaction failed: ${JSON.stringify(tokenConfirmation.value.err)}`
    );
  }

  return {
    mintAddress,
    feeSignature,
    tokenSignature,
    imageUri,
    totalCost: baseCost,
    name,
    symbol,
    description,
    revokeMintAuthority,
    revokeFreezeAuthority,
    hasAdvancedFeatures: Boolean(creatorWebsite || creatorName),
  };
}

export const TOKEN_CREATE_STEPS = [
  { title: 'Validating inputs', description: 'Checking token parameters...' },
  { title: 'Uploading image', description: 'Storing image on IPFS...' },
  { title: 'Uploading metadata', description: 'Storing metadata on IPFS...' },
  { title: 'Building instructions', description: 'Preparing mint and metadata instructions...' },
  { title: 'Fee transaction', description: 'Confirming platform fee transfer...' },
  { title: 'Token transaction', description: 'Approve token creation transaction...' },
  { title: 'Saving token data', description: 'Persisting token details for later modules...' },
  { title: 'Finalizing on-chain', description: 'Waiting for token confirmation...' },
];
