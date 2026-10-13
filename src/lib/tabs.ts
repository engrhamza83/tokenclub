export type TabId =
  | 'create'
  | 'copytrend'
  | 'swap'
  | 'liquidity'
  | 'management'
  | 'remove'
  | 'portfolio'
  | 'more';

export const TAB_TO_PATH: Record<TabId, string> = {
  create: '/',
  copytrend: '/copy-trend',
  swap: '/swap',
  liquidity: '/liquidity',
  management: '/security',
  remove: '/remove',
  portfolio: '/portfolio',
  more: '/more',
};

export const TAB_NAMES: Record<TabId, string> = {
  create: 'Token Creator',
  copytrend: 'Copy Trend',
  swap: 'Swap',
  liquidity: 'Liquidity Manager',
  management: 'Security',
  remove: 'Remove Liquidity',
  portfolio: 'Portfolio',
  more: 'More Tools',
};

export function getTabSeo(tab: TabId): { title: string; description: string; path: string } {
  switch (tab) {
    case 'create':
      return {
        title: 'TokenClub — Solana Token Creator (0.1 SOL)',
        description:
          'Create fully compliant SPL tokens on Solana for just 0.1 SOL. Fast, economical, and packed with launch tools.',
        path: '/',
      };
    case 'copytrend':
      return {
        title: 'Copy Trending Coins — TokenClub',
        description:
          'Clone trending Solana meme coins in one click, then launch them with TokenClub Liquidity Manager.',
        path: '/copy-trend',
      };
    case 'swap':
      return {
        title: 'TokenClub Swap — TokenClub',
        description:
          'Swap tokens on Solana with TokenClub Swap. Fast routing, transparent fees, and a clean interface built for Solana traders.',
        path: '/swap',
      };
    case 'liquidity':
      return {
        title: 'Liquidity Manager — TokenClub',
        description:
          'Create, add, remove, lock, and claim fees on Solana liquidity pools with TokenClub Liquidity Manager.',
        path: '/liquidity',
      };
    case 'management':
      return {
        title: 'Security & Burn — TokenClub',
        description:
          'Revoke authorities, clean up wallet accounts, and manage security operations on Solana with TokenClub.',
        path: '/security',
      };
    case 'portfolio':
      return {
        title: 'My Portfolio — TokenClub',
        description: 'View balances and holdings across Solana tokens with TokenClub Portfolio.',
        path: '/portfolio',
      };
    case 'more':
      return {
        title: 'More Tools — TokenClub',
        description:
          'Explore additional Solana tools by TokenClub including volume and promotion utilities (and more coming soon).',
        path: '/more',
      };
    case 'remove':
      return {
        title: 'Remove/Burn — TokenClub',
        description: 'Burn tokens and perform cleanup operations on Solana with TokenClub.',
        path: '/remove',
      };
    default: {
      const _exhaustive: never = tab;
      return _exhaustive;
    }
  }
}
