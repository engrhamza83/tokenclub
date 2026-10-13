export const TUTORIAL_VIDEO_ID = 'v7e6d6s';

export type TutorialChapter = {
  label: string;
  startSeconds: number;
  title: string;
};

export const TUTORIAL_CHAPTERS: readonly TutorialChapter[] = [
  { label: '0:14', startSeconds: 14, title: 'Intro: Token Launch Strategy' },
  { label: '0:40', startSeconds: 40, title: 'Pump.fun vs Meteora / Raydium Comparison' },
  { label: '1:23', startSeconds: 83, title: 'Step 1: Creating the Token on Token Club' },
  { label: '2:15', startSeconds: 135, title: 'Step 2: Authority Revocation & Contract Safety' },
  { label: '3:15', startSeconds: 195, title: 'Step 3: Adding Initial Liquidity' },
  { label: '4:18', startSeconds: 258, title: 'Step 4: Automating Volume & Market Making' },
  { label: '5:20', startSeconds: 320, title: 'Trending on DexScreener & Securing Launch' },
] as const;
