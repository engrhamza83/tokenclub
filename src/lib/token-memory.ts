// Client-side token memory system using localStorage
// Stores token data (image, mint address, metadata) for auto-fetching across the app

export interface TokenData {
  mintAddress: string;
  image?: string;
  name?: string;
  symbol?: string;
  description?: string;
  createdAt: number;
}

export const MANAGE_TOKEN_KEY = 'tokenclub_manage_token';
export const PENDING_LAUNCH_KEY = 'tokenclub_pending_launch';

export interface PendingLaunch {
  mintAddress: string;
  name?: string;
  symbol?: string;
  createdAt: number;
}

const TOKEN_MEMORY_KEY = 'tokenclub_token_memory';
const LAST_CREATED_MINT_KEY = 'tokenclub_last_created_mint';

/**
 * Save token data to localStorage
 */
export const saveTokenData = (data: TokenData): void => {
  try {
    const existing = getTokenMemory();
    const updated = {
      ...existing,
      [data.mintAddress]: {
        ...data,
        createdAt: data.createdAt || Date.now(),
      },
    };
    localStorage.setItem(TOKEN_MEMORY_KEY, JSON.stringify(updated));
    
    // Also save as last created mint for quick access
    localStorage.setItem(LAST_CREATED_MINT_KEY, data.mintAddress);
  } catch (error) {
    console.error('Error saving token data to localStorage:', error);
  }
};

/**
 * Get token data by mint address
 */
export const getTokenData = (mintAddress: string): TokenData | null => {
  try {
    const memory = getTokenMemory();
    return memory[mintAddress] || null;
  } catch (error) {
    console.error('Error getting token data from localStorage:', error);
    return null;
  }
};

/**
 * Get all token data
 */
export const getTokenMemory = (): Record<string, TokenData> => {
  try {
    const stored = localStorage.getItem(TOKEN_MEMORY_KEY);
    if (!stored) return {};
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error reading token memory from localStorage:', error);
    return {};
  }
};

/**
 * Get the last created mint address
 */
export const getLastCreatedMint = (): string | null => {
  try {
    return localStorage.getItem(LAST_CREATED_MINT_KEY);
  } catch (error) {
    console.error('Error getting last created mint:', error);
    return null;
  }
};

/**
 * Update token data (e.g., when image is uploaded)
 */
export const updateTokenData = (mintAddress: string, updates: Partial<TokenData>): void => {
  try {
    const existing = getTokenData(mintAddress);
    if (existing) {
      saveTokenData({
        ...existing,
        ...updates,
        mintAddress, // Ensure mintAddress is preserved
      });
    }
  } catch (error) {
    console.error('Error updating token data:', error);
  }
};

/**
 * Clear all token memory
 */
export const clearTokenMemory = (): void => {
  try {
    localStorage.removeItem(TOKEN_MEMORY_KEY);
    localStorage.removeItem(LAST_CREATED_MINT_KEY);
    localStorage.removeItem(PENDING_LAUNCH_KEY);
    localStorage.removeItem(MANAGE_TOKEN_KEY);
  } catch (error) {
    console.error('Error clearing token memory:', error);
  }
};

export const setPendingLaunch = (data: PendingLaunch): void => {
  try {
    localStorage.setItem(PENDING_LAUNCH_KEY, JSON.stringify(data));
    localStorage.setItem(MANAGE_TOKEN_KEY, data.mintAddress);
    localStorage.setItem(LAST_CREATED_MINT_KEY, data.mintAddress);
  } catch (error) {
    console.error('Error saving pending launch:', error);
  }
};

export const getPendingLaunch = (): PendingLaunch | null => {
  try {
    const stored = localStorage.getItem(PENDING_LAUNCH_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as PendingLaunch;
  } catch {
    return null;
  }
};

export const clearPendingLaunch = (): void => {
  try {
    localStorage.removeItem(PENDING_LAUNCH_KEY);
  } catch {
    /* ignore */
  }
};

/**
 * Remove specific token from memory
 */
export const removeTokenData = (mintAddress: string): void => {
  try {
    const memory = getTokenMemory();
    delete memory[mintAddress];
    localStorage.setItem(TOKEN_MEMORY_KEY, JSON.stringify(memory));
    
    // If this was the last created mint, clear it
    if (getLastCreatedMint() === mintAddress) {
      localStorage.removeItem(LAST_CREATED_MINT_KEY);
    }
  } catch (error) {
    console.error('Error removing token data:', error);
  }
};

