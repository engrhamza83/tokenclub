import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, Play, Volume2 } from 'lucide-react';
import { Logo } from './Logo';
import { TUTORIAL_CHAPTERS } from '../content/tutorial-chapters';

interface TutorialPageProps {
  onBack: () => void;
}

declare global {
  interface Window {
    _Rumble?: any;
    Rumble?: any;
  }
}

function activeChapterIndex(currentSeconds: number): number {
  let idx = 0;
  for (let i = 0; i < TUTORIAL_CHAPTERS.length; i++) {
    if (TUTORIAL_CHAPTERS[i].startSeconds <= currentSeconds) idx = i;
    else break;
  }
  return idx;
}

export const TutorialPage: React.FC<TutorialPageProps> = ({ onBack }) => {
  const containerId = 'rumble_v7e6d6s';
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Pre-set Rumble volume preference to 50% in storage
    try {
      localStorage.setItem('RumPV', '50');
      localStorage.setItem('RumPM', 'false');
      localStorage.setItem('RumPA', '1');
    } catch {
      /* ignore */
    }

    // Embed Rumble script
    const scriptId = 'rumble-embed-script';
    if (!document.getElementById(scriptId)) {
      (function (r: any, u: any, m: any, b: any, l?: any, e?: any) {
        r._Rumble = b;
        r[b] ||
          (r[b] = function () {
            (r[b]._ = r[b]._ || []).push(arguments);
            if (r[b]._.length === 1) {
              l = u.createElement(m);
              l.id = scriptId;
              e = u.getElementsByTagName(m)[0];
              l.async = 1;
              l.src =
                'https://rumble.com/embedJS/u4qobdo' +
                (arguments[1]?.video ? '.' + arguments[1].video : '') +
                '/?url=' +
                encodeURIComponent(window.location.href) +
                '&args=' +
                encodeURIComponent(JSON.stringify([].slice.apply(arguments)));
              e.parentNode?.insertBefore(l, e);
            }
          });
      })(window, document, 'script', 'Rumble');
    }

    // Call Rumble play on container
    if (typeof window.Rumble === 'function') {
      window.Rumble('play', {
        video: 'v7e6d6s',
        div: containerId,
        startTime: 14,
        autoplay: 1,
      });
    }

    let isCleanedUp = false;
    let cleanupListeners: (() => void) | undefined;

    // Detect when Rumble injects the HTML5 <video> tag into #rumble_v7e6d6s
    const setupVideo = (video: HTMLVideoElement) => {
      videoRef.current = video;
      setPlayerReady(true);

      // Configure 50% voice volume
      video.volume = 0.5;
      video.muted = false;

      // Play video with 50% sound
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            video.volume = 0.5;
            video.muted = false;
          })
          .catch(() => {
            // If browser autoplay policy requires user interaction before sound,
            // play muted initially so the video immediately rolls,
            // then unmute at 50% volume on the first user interaction.
            video.muted = true;
            video.play().catch(() => {});

            const restoreAudio = () => {
              if (videoRef.current) {
                videoRef.current.muted = false;
                videoRef.current.volume = 0.5;
              }
              window.removeEventListener('click', restoreAudio);
              window.removeEventListener('touchstart', restoreAudio);
              window.removeEventListener('keydown', restoreAudio);
            };

            window.addEventListener('click', restoreAudio, { once: true });
            window.addEventListener('touchstart', restoreAudio, { once: true });
            window.addEventListener('keydown', restoreAudio, { once: true });
          });
      }

      const handleTimeUpdate = () => {
        if (!isCleanedUp) {
          setActiveIdx(activeChapterIndex(video.currentTime));
        }
      };

      const handlePlay = () => {
        video.volume = 0.5;
      };

      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('play', handlePlay);

      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('play', handlePlay);
      };
    };

    const checkVideo = () => {
      const container = document.getElementById(containerId);
      const video = container?.querySelector('video') as HTMLVideoElement | null;
      if (video) {
        cleanupListeners = setupVideo(video);
        return true;
      }
      return false;
    };

    if (!checkVideo()) {
      const poll = setInterval(() => {
        if (checkVideo()) {
          clearInterval(poll);
        }
      }, 100);

      const observer = new MutationObserver(() => {
        if (checkVideo()) {
          clearInterval(poll);
          observer.disconnect();
        }
      });

      const container = document.getElementById(containerId);
      if (container) {
        observer.observe(container, { childList: true, subtree: true });
      }

      setTimeout(() => {
        clearInterval(poll);
        observer.disconnect();
      }, 15000);
    }

    return () => {
      isCleanedUp = true;
      cleanupListeners?.();
      if (videoRef.current) {
        try {
          videoRef.current.pause();
        } catch {
          /* ignore */
        }
        videoRef.current = null;
      }
    };
  }, [containerId]);

  const onChapterClick = useCallback((startSeconds: number) => {
    const video = videoRef.current || (document.querySelector('#rumble_v7e6d6s video') as HTMLVideoElement | null);
    if (video) {
      video.currentTime = startSeconds;
      video.volume = 0.5;
      video.muted = false;
      video.play().catch(() => {});
      setActiveIdx(activeChapterIndex(startSeconds));
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#030406] text-white font-sans">
      <div className="border-b border-white/5 bg-[#0A0C0E]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <button
              type="button"
              onClick={onBack}
              className="flex-shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <Logo />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-10">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
            TokenClub video tutorial
          </h1>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-medium">
            <Volume2 className="w-3.5 h-3.5 text-teal-400" />
            <span>Voice preset: 50%</span>
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-6 md:mb-8 max-w-2xl">
          Step through chapters on the left (desktop) or below the player (mobile). Tap a chapter to jump to any segment.
        </p>

        <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8 lg:gap-10">
          {/* Desktop: chapters left */}
          <aside className="hidden md:flex md:w-[min(100%,320px)] md:flex-shrink-0 flex-col gap-2 order-2 md:order-1">
            <p className="text-[10px] uppercase tracking-widest text-teal-400/90 mb-1">Chapters</p>
            <nav
              className="rounded-2xl border border-white/10 bg-[#0A0C0E]/60 p-3 max-h-[min(70vh,520px)] overflow-y-auto custom-scrollbar-tutorial space-y-1"
              aria-label="Video chapters"
            >
              {TUTORIAL_CHAPTERS.map((ch, i) => (
                <button
                  key={ch.startSeconds}
                  type="button"
                  onClick={() => onChapterClick(ch.startSeconds)}
                  className={`w-full text-left rounded-xl px-3 py-2.5 transition-colors flex gap-3 items-start ${
                    activeIdx === i
                      ? 'bg-teal-500/20 border border-teal-500/40 text-white'
                      : 'hover:bg-white/5 border border-transparent text-gray-300'
                  }`}
                >
                  <span className="text-xs font-mono text-teal-400/90 flex-shrink-0 tabular-nums pt-0.5">
                    {ch.label}
                  </span>
                  <span className="text-sm leading-snug">{ch.title}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Video */}
          <div className="w-full md:flex-1 min-w-0 order-1 md:order-2">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl shadow-teal-950/30">
              <div id={containerId} className="w-full h-full flex items-center justify-center" />
              {!playerReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-gray-400 text-sm">
                  Loading Rumble Player…
                </div>
              )}
            </div>
          </div>

          {/* Mobile: chapters below */}
          <div className="md:hidden order-3 w-full">
            <p className="text-[10px] uppercase tracking-widest text-teal-400/90 mb-2">Chapters</p>
            <nav
              className="rounded-2xl border border-white/10 bg-[#0A0C0E]/60 p-3 max-h-[40vh] sm:max-h-[50vh] overflow-y-auto custom-scrollbar-tutorial space-y-1"
              aria-label="Video chapters"
            >
              {TUTORIAL_CHAPTERS.map((ch, i) => (
                <button
                  key={ch.startSeconds}
                  type="button"
                  onClick={() => onChapterClick(ch.startSeconds)}
                  className={`w-full text-left rounded-xl px-3 py-2.5 transition-colors flex gap-3 items-start ${
                    activeIdx === i
                      ? 'bg-teal-500/20 border border-teal-500/40 text-white'
                      : 'hover:bg-white/5 border border-transparent text-gray-300'
                  }`}
                >
                  <span className="text-xs font-mono text-teal-400/90 flex-shrink-0 tabular-nums pt-0.5">
                    {ch.label}
                  </span>
                  <span className="text-sm leading-snug flex items-start gap-1.5">
                    <Play className="w-3.5 h-3.5 text-teal-500/80 mt-0.5 flex-shrink-0" aria-hidden />
                    {ch.title}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar-tutorial::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar-tutorial::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        .custom-scrollbar-tutorial::-webkit-scrollbar-thumb { background: rgba(6,182,212,0.35); border-radius: 10px; }
        .custom-scrollbar-tutorial::-webkit-scrollbar-thumb:hover { background: rgba(6,182,212,0.55); }
        #rumble_v7e6d6s { width: 100% !important; height: 100% !important; }
        #rumble_v7e6d6s > div { width: 100% !important; height: 100% !important; }
      `}</style>
    </div>
  );
};
