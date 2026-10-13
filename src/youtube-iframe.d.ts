/** Minimal typings for YouTube IFrame API (no @types/youtube in project). */
declare namespace YT {
  class Player {
    constructor(elementId: string, options: PlayerOptions);
    seekTo(seconds: number, allowSeekAhead: boolean): void;
    playVideo(): void;
    pauseVideo(): void;
    getCurrentTime(): number;
    getPlayerState(): number;
    destroy(): void;
  }

  interface PlayerOptions {
    height?: string | number;
    width?: string | number;
    videoId: string;
    playerVars?: Record<string, string | number>;
    events?: {
      onReady?: (event: { target: Player }) => void;
      onStateChange?: (event: { data: number; target: Player }) => void;
    };
  }
}

declare const YT: {
  Player: new (elementId: string, options: YT.PlayerOptions) => YT.Player;
  PlayerState: {
    UNSTARTED: number;
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };
};

interface Window {
  onYouTubeIframeAPIReady?: () => void;
}
