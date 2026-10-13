import React, { useState, useRef, useCallback, useEffect, Suspense, lazy } from 'react';
import { 
  Rocket, 
  Droplets, 
  Flame, 
  Wallet, 
  ArrowLeftRight,
  LayoutGrid,
  MessageCircle,
  Github,
  FileText,
  X,
  Menu,
  BookOpen,
  GitCompare,
  Shield,
  AlertTriangle,
  PlayCircle,
  TrendingUp,
} from 'lucide-react';
// Menu is imported but not used - keeping for potential future use
import { ClientProviders } from './components/ClientProviders';
import { Logo } from './components/Logo';
import { Header } from './components/Header';
import { NavItem } from './components/NavItem';
import { WalletButton } from './components/WalletButton';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Schema } from './components/Schema';
import { SeoHead } from './components/SeoHead';
import { ComparisonPage } from './components/ComparisonPage';
import { BlogPost } from './components/BlogPost';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/TermsOfServicePage';
import { TutorialPage } from './components/TutorialPage';
import { useNetwork } from './contexts/NetworkContext';
import { getBlogPost } from './content/blog';
import { trackTabChange, trackPageView } from './lib/analytics';
import { clearAllClientMemory } from './lib/admin-utils';
import { TAB_NAMES, TAB_TO_PATH, type TabId } from './lib/tabs';

const WELCOME_DISMISSED_KEY = 'tokenclub_welcome_dismissed';

const CreatorModule = lazy(() => import('./modules/CreatorModule'));
const CopyTrendModule = lazy(() => import('./modules/CopyTrendModule'));
const SwapModule = lazy(() => import('./modules/SwapModule'));
const LiquidityModule = lazy(() => import('./modules/LiquidityModule'));
const SecurityModule = lazy(() => import('./modules/SecurityModule'));
const RemoveModule = lazy(() => import('./modules/RemoveModule'));
const PortfolioModule = lazy(() => import('./modules/PortfolioModule'));
const MoreToolsModule = lazy(() => import('./modules/MoreToolsModule'));

// Loading fallback component
const ModuleLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-pulse text-blue-400">Loading...</div>
  </div>
);

// Throttle function for mouse move optimization
function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T {
  let inThrottle: boolean;
  return ((...args: any[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  }) as T;
}

export interface AppContentProps {
  initialTab?: TabId;
  initialRoute?: string;
}

const AppContent: React.FC<AppContentProps> = ({ initialTab, initialRoute }) => {
  const [activeTab, setActiveTab] = useState<TabId>(initialTab || 'create');
  const [showComparison, setShowComparison] = useState(initialRoute === '/comparison');
  const [showBlog, setShowBlog] = useState(Boolean(initialRoute?.startsWith('/blog/')));
  const [showPrivacy, setShowPrivacy] = useState(initialRoute === '/privacy');
  const [showTerms, setShowTerms] = useState(initialRoute === '/terms');
  const [showTutorial, setShowTutorial] = useState(initialRoute === '/tutorial');
  const [blogSlug, setBlogSlug] = useState<string>('how-to-create-solana-meme-coin');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const { isDevnet, toggleNetwork } = useNetwork();

  const tabToPath = TAB_TO_PATH;

  const syncRouteFromLocation = useCallback(() => {
    if (typeof window === 'undefined') return;
    // Check both hash-based routing and clean pathname routing
    const hash = window.location.hash.replace('#', '');
    const pathname = hash ? (hash.startsWith('/') ? hash : '/' + hash) : window.location.pathname;

    if (pathname === '/privacy') {
      setShowBlog(false);
      setShowComparison(false);
      setShowTerms(false);
      setShowTutorial(false);
      setShowPrivacy(true);
      trackPageView('/privacy', 'Privacy Policy');
      return;
    }

    if (pathname === '/terms') {
      setShowBlog(false);
      setShowComparison(false);
      setShowPrivacy(false);
      setShowTutorial(false);
      setShowTerms(true);
      trackPageView('/terms', 'Terms of Service');
      return;
    }

    if (pathname === '/comparison') {
      setShowBlog(false);
      setShowPrivacy(false);
      setShowTerms(false);
      setShowTutorial(false);
      setShowComparison(true);
      trackPageView('/comparison', 'Comparison - TokenClub vs Competitors');
      return;
    }

    if (pathname === '/tutorial') {
      setShowBlog(false);
      setShowComparison(false);
      setShowPrivacy(false);
      setShowTerms(false);
      setShowTutorial(true);
      trackPageView('/tutorial', 'Tutorial');
      return;
    }

    if (pathname.startsWith('/blog/')) {
      const slug = pathname.replace('/blog/', '').split('?')[0].split('#')[0] || 'how-to-create-solana-meme-coin';
      setShowComparison(false);
      setShowTutorial(false);
      setShowBlog(true);
      setBlogSlug(slug);
      trackPageView(`/blog/${slug}`, `Blog - ${slug}`);
      return;
    }

    const tab = (Object.keys(tabToPath) as TabId[]).find((t) => tabToPath[t] === pathname);
    setShowComparison(false);
    setShowBlog(false);
    setShowPrivacy(false);
    setShowTerms(false);
    setShowTutorial(false);
    if (tab) {
      setActiveTab(tab);
      const tabNames = TAB_NAMES;
      trackTabChange(tabNames[tab]);
      trackPageView(pathname, tabNames[tab]);
    } else if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, tabToPath]);

  const navigate = useCallback(
    (path: string) => {
      if (typeof window !== 'undefined') {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        try {
          window.history.pushState(null, '', cleanPath);
        } catch {
          window.location.hash = cleanPath;
        }
        syncRouteFromLocation();
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    },
    [syncRouteFromLocation]
  );
  
  // Scroll to top on page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab, showComparison, showBlog, showPrivacy, showTerms, showTutorial]);

  // One-time welcome modal (skip on /tutorial deep link)
  useEffect(() => {
    try {
      if (localStorage.getItem(WELCOME_DISMISSED_KEY)) return;
      const hash = window.location.hash.replace('#', '') || '/';
      const pathname = hash.startsWith('/') ? hash : `/${hash}`;
      if (pathname === '/tutorial') return;
      setShowWelcome(true);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!showWelcome) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showWelcome]);

  const dismissWelcome = useCallback(() => {
    try {
      localStorage.setItem(WELCOME_DISMISSED_KEY, '1');
    } catch {
      /* ignore */
    }
    setShowWelcome(false);
  }, []);

  const goToTutorialFromWelcome = useCallback(() => {
    dismissWelcome();
    navigate('/tutorial');
  }, [dismissWelcome, navigate]);

  // Admin shortcut: Ctrl+Shift+C to clear all client-side memory
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        if (confirm('⚠️ Admin Action: Clear all TokenClub client-side memory?\n\nThis will remove:\n- Token memory\n- Pool memory\n- Cache data\n\nThis action cannot be undone. Continue?')) {
          clearAllClientMemory();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync initial URL + back/forward navigation
  useEffect(() => {
    syncRouteFromLocation();
    const onHashChange = () => syncRouteFromLocation();
    const onPopState = () => syncRouteFromLocation();
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('popstate', onPopState);
    };
  }, [syncRouteFromLocation]);
  
  // --- CURSOR SPOTLIGHT LOGIC (Optimized with throttling) ---
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    throttle((e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
      
      containerRef.current.style.setProperty('--mouse-x', `${x}px`);
      containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    }, 16), // ~60fps
    []
  );

  // Handle navigation to liquidity with token address
  const handleNavigateToLiquidity = useCallback((_tokenMint: string) => {
    navigate('/liquidity');
    // Token address is stored in localStorage, LiquidityModule will pick it up
  }, [navigate]);

  // Render active module
  const renderActiveModule = () => {
    switch (activeTab) {
      case 'create':
        return <CreatorModule onNavigateToLiquidity={handleNavigateToLiquidity} />;
      case 'copytrend':
        return <CopyTrendModule onNavigateToLiquidity={handleNavigateToLiquidity} />;
      case 'swap':
        return <SwapModule />;
      case 'liquidity':
        return <LiquidityModule />;
      case 'management':
        return <SecurityModule />;
      case 'remove':
        return <RemoveModule />;
      case 'portfolio':
        return <PortfolioModule onNavigateToLiquidity={handleNavigateToLiquidity} />;
      case 'more':
        return <MoreToolsModule />;
      default: {
        const _exhaustive: never = activeTab;
        void _exhaustive;
        return <CreatorModule onNavigateToLiquidity={handleNavigateToLiquidity} />;
      }
    }
  };

  // Show blog page if active
  if (showBlog) {
    const post = getBlogPost(blogSlug);
    const seoRoute = { kind: 'blog' as const, slug: blogSlug, post };
    return (
      <>
        <SeoHead route={seoRoute} />
        <Schema route={seoRoute} />
        <BlogPost slug={blogSlug} onBack={() => {
          navigate('/');
        }} />
      </>
    );
  }

  // Show comparison page if active
  if (showComparison) {
    const seoRoute = { kind: 'comparison' as const };
    return (
      <>
        <SeoHead route={seoRoute} />
        <Schema route={seoRoute} />
        <ComparisonPage onBack={() => {
          navigate('/');
        }} />
      </>
    );
  }

  // Show privacy policy page if active
  if (showPrivacy) {
    const seoRoute = { kind: 'privacy' as const };
    return (
      <>
        <SeoHead route={seoRoute} />
        <Schema route={seoRoute} />
        <PrivacyPolicyPage onBack={() => navigate('/')} />
      </>
    );
  }

  // Show terms of service page if active
  if (showTerms) {
    const seoRoute = { kind: 'terms' as const };
    return (
      <>
        <SeoHead route={seoRoute} />
        <Schema route={seoRoute} />
        <TermsOfServicePage onBack={() => navigate('/')} />
      </>
    );
  }

  if (showTutorial) {
    const seoRoute = { kind: 'tutorial' as const };
    return (
      <>
        <SeoHead route={seoRoute} />
        <Schema route={seoRoute} />
        <TutorialPage onBack={() => navigate('/')} />
      </>
    );
  }

  return (
    <>
      <SeoHead route={{ kind: 'app' as const, tab: activeTab }} />
      <Schema route={{ kind: 'app' as const, tab: activeTab }} />
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="min-h-screen w-full bg-[#030406] text-white font-sans selection:bg-cyan-500/30 overflow-hidden relative flex flex-col md:flex-row group/app"
      >
      
      {/* --- 1. AMBIENT ENVIRONMENT (Teal + Blue Glows) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        
        {/* LEFT: Deep Teal Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vh] bg-teal-600/10 blur-[150px] rounded-full mix-blend-screen opacity-60" />
        
        {/* RIGHT: "Club" Blue Glow (Behind Content) */}
        <div className="absolute top-[20%] right-[10%] w-[50vw] h-[70vh] bg-blue-600/15 blur-[120px] rounded-full mix-blend-screen opacity-80" />
        
        {/* BOTTOM: Deep Indigo Base */}
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[50vh] bg-indigo-900/20 blur-[150px] rounded-full mix-blend-screen" />

        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.04]" />
        
        {/* Interactive Grid */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]"
          style={{
            maskImage: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
            WebkitMaskImage: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          }}
        />
      </div>

      {/* --- 2. SIDEBAR DOCK (Rigid Layout) --- */}
      <aside className="hidden md:flex flex-col w-72 h-screen p-6 relative z-20">
        <div className="
          flex-1 flex flex-col bg-[#0A0C0E]/60 backdrop-blur-2xl 
          border border-white/5 rounded-[32px] shadow-2xl overflow-hidden
          relative
        ">
          {/* Sidebar Hover Glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />

          {/* Branding Area */}
          <div className="p-8 pb-4 relative z-10">
            <Logo isNetworkSwitched={isDevnet} />
            <button 
              onClick={toggleNetwork}
              className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 w-fit hover:bg-white/10 transition-colors cursor-pointer"
              title="Click to switch network (or press Ctrl+Shift+E)"
            >
                <div className={`w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_8px] ${
                  isDevnet 
                    ? 'bg-white shadow-white' 
                    : 'bg-teal-400 shadow-[0_0_8px_#2dd4bf]'
                }`}></div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Mainnet
                </span>
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar py-4 relative z-10">
            <NavItem id="create" icon={Rocket} label="Token Creator" active={activeTab} set={(id) => navigate(tabToPath[id])} />
            <NavItem id="copytrend" icon={TrendingUp} label="Copy Trend" active={activeTab} set={(id) => navigate(tabToPath[id])} />
            <NavItem id="swap" icon={ArrowLeftRight} label="Swap Tokens" active={activeTab} set={(id) => navigate(tabToPath[id])} />
            <NavItem id="liquidity" icon={Droplets} label="Liquidity Manager" active={activeTab} set={(id) => navigate(tabToPath[id])} />
            <NavItem id="management" icon={Flame} label="Security & Burn" active={activeTab} set={(id) => navigate(tabToPath[id])} />
            <NavItem id="portfolio" icon={Wallet} label="My Portfolio" active={activeTab} set={(id) => navigate(tabToPath[id])} />
            <NavItem id="more" icon={LayoutGrid} label="More Tools" active={activeTab} set={(id) => navigate(tabToPath[id])} />
          </nav>

          {/* Bottom Wallet Area */}
          <div className="p-6 border-t border-white/5 relative z-10">
            <WalletButton />
          </div>
        </div>
      </aside>

      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#030406]/95 backdrop-blur-xl border-b border-white/10 z-50 flex items-center justify-between px-4 safe-area-inset-top">
         <div className="flex items-center gap-3">
           <Logo />
           <div className={`w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_5px] ${
             isDevnet 
               ? 'bg-gray-400 shadow-gray-400' 
               : 'bg-teal-400 shadow-[0_0_5px_#2dd4bf]'
           }`}></div>
         </div>
         <div className="flex-shrink-0">
           <WalletButton />
         </div>
      </div>

      {/* --- 3. MAIN COMMAND CENTER --- */}
      <main className="flex-1 h-screen p-0 md:p-6 relative z-10 pt-16 md:pt-6 pb-20 md:pb-0 overflow-hidden flex flex-col">
        
        {/* Phantom security warning - above glass container */}
        <div className="flex items-center gap-1.5 px-3 py-1 mx-3 md:mx-7 lg:mx-9 mb-1.5 rounded border-l-2 border-teal-500/50 text-white text-[10px] flex-shrink-0">
          <AlertTriangle className="w-2.5 h-2.5 flex-shrink-0 text-teal-400" />
          <span>Phantom security warnings are expected – We&apos;re working with Phantom to resolve this</span>
        </div>

        {/* The Glass Container */}
        <div className="flex-1 min-h-0 w-full bg-[#0A0C0E]/40 backdrop-blur-xl border border-white/5 md:rounded-[32px] shadow-2xl flex flex-col relative overflow-hidden">
            
            {/* Back Glow (Dynamic) */}
            <div 
              className="absolute pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(34, 211, 238, 0.06), transparent 40%)`,
                inset: 0,
                zIndex: 0
              }}
            />

            {/* Top Blue Light Bar */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-50 z-10" />

            {/* Content Scroll Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-10 lg:p-12 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <Header activeTab={activeTab} />
                    
                    <div className="mt-6 md:mt-10">
                        <Suspense fallback={<ModuleLoader />}>
                            {renderActiveModule()}
                        </Suspense>
                    </div>
                </div>
            </div>

            {/* Footer - Hidden on mobile; single row, no wrap (icons + tooltips for compact actions) */}
            <div className="hidden md:flex h-12 min-h-12 border-t border-white/5 items-center justify-between px-4 lg:px-8 text-[10px] text-gray-500 uppercase tracking-widest bg-[#0A0C0E]/80 relative z-10 gap-4 flex-nowrap overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex items-center gap-6 flex-nowrap min-w-0 shrink-0">
                    <div className="relative group flex items-center shrink-0">
                      <button
                        type="button"
                        onClick={() => navigate('/tutorial')}
                        className="flex items-center justify-center w-7 h-7 rounded-full text-white bg-gradient-to-br from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 shadow-md shadow-teal-500/30 hover:shadow-teal-400/40 transition-all cursor-pointer"
                        aria-label="Open video tutorial"
                      >
                        <PlayCircle className="w-3.5 h-3.5" aria-hidden />
                      </button>
                      <span
                        className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded-md bg-[#0A0C0E] border border-white/10 text-[10px] font-semibold uppercase tracking-widest text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-30 shadow-lg"
                        role="tooltip"
                      >
                        Tutorial
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate('/comparison')}
                      className="hover:text-teal-400 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Comparison
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setBlogSlug('how-to-create-solana-meme-coin');
                        navigate('/blog/how-to-create-solana-meme-coin');
                      }}
                      className="hover:text-teal-400 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Blog
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/privacy')}
                      className="hover:text-teal-400 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Privacy
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/terms')}
                      className="hover:text-teal-400 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Terms
                    </button>
                </div>
                <div className="flex items-center gap-2 flex-nowrap shrink-0 min-w-0">
                    <div className="relative group flex items-center shrink-0">
                      <a
                        href="/sitemap.xml"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white hover:text-teal-400"
                        aria-label="Sitemap"
                      >
                        <FileText className="w-3 h-3" />
                      </a>
                      <span
                        className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded-md bg-[#0A0C0E] border border-white/10 text-[10px] font-semibold uppercase tracking-widest text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-30 shadow-lg"
                        role="tooltip"
                      >
                        Sitemap
                      </span>
                    </div>
                    <div className="relative group flex items-center shrink-0">
                      <a
                        href="https://github.com/coinlaunch033/TokenClub-V3/blob/main/README.md"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white hover:text-teal-400"
                        aria-label="GitHub repository"
                      >
                        <Github className="w-3 h-3" />
                      </a>
                      <span
                        className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded-md bg-[#0A0C0E] border border-white/10 text-[10px] font-semibold uppercase tracking-widest text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-30 shadow-lg"
                        role="tooltip"
                      >
                        GitHub
                      </span>
                    </div>
                    <div className="relative group flex items-center shrink-0">
                      <a
                        href="https://t.me/tokenlab00"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white hover:text-teal-400"
                        aria-label="Contact us on Telegram"
                      >
                        <MessageCircle className="w-3 h-3" />
                      </a>
                      <span
                        className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded-md bg-[#0A0C0E] border border-white/10 text-[10px] font-semibold uppercase tracking-widest text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-30 shadow-lg"
                        role="tooltip"
                      >
                        Contact
                      </span>
                    </div>
                    <span className="ml-1 pl-2 border-l border-white/10 whitespace-nowrap text-gray-500">
                      Gas: <span className="text-white">0.00002 SOL</span>
                    </span>
                    <span className="whitespace-nowrap text-gray-500">
                      TPS: <span className="text-blue-400 font-bold">3,102</span>
                    </span>
                </div>
            </div>

        </div>
      </main>

      {/* --- MOBILE BOTTOM NAVIGATION --- */}
      <MobileBottomNav activeTab={activeTab} setActiveTab={(id) => navigate(tabToPath[id])} />

      {/* --- MOBILE FLOATING MENU (Contact, GitHub, Comparison, Blog) --- */}
      <div className="md:hidden fixed bottom-20 right-4 z-50">
        {/* Menu Items */}
        {showMobileMenu && (
          <>
            {/* Backdrop to close menu on outside click */}
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
              onClick={() => setShowMobileMenu(false)}
            />
            <div className="absolute bottom-16 right-0 flex flex-col gap-2 mb-2 animate-in slide-in-from-bottom-4 duration-300">
            {/* Tutorial */}
            <button
              type="button"
              onClick={() => {
                navigate('/tutorial');
                setShowMobileMenu(false);
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 border border-teal-400/40 text-white shadow-lg shadow-teal-500/30 hover:shadow-teal-400/40 transition-all"
            >
              <PlayCircle className="w-4 h-4" />
              <span className="text-sm font-semibold">Tutorial</span>
            </button>
            {/* Comparison Button */}
            <button
              onClick={() => {
                navigate('/comparison');
                setShowMobileMenu(false);
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#0A0C0E]/95 backdrop-blur-xl border border-white/10 hover:border-teal-500/50 transition-all shadow-lg hover:shadow-teal-500/20"
            >
              <GitCompare className="w-4 h-4 text-teal-400" />
              <span className="text-sm font-medium text-white">Comparison</span>
            </button>
            
            {/* Blog Button */}
            <button
              onClick={() => {
                setBlogSlug('how-to-create-solana-meme-coin');
                navigate('/blog/how-to-create-solana-meme-coin');
                setShowMobileMenu(false);
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#0A0C0E]/95 backdrop-blur-xl border border-white/10 hover:border-teal-500/50 transition-all shadow-lg hover:shadow-teal-500/20"
            >
              <BookOpen className="w-4 h-4 text-teal-400" />
              <span className="text-sm font-medium text-white">Blog</span>
            </button>
            
            {/* GitHub Link */}
            <a
              href="https://github.com/coinlaunch033/TokenClub-V3/blob/main/README.md"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowMobileMenu(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#0A0C0E]/95 backdrop-blur-xl border border-white/10 hover:border-teal-500/50 transition-all shadow-lg hover:shadow-teal-500/20"
            >
              <Github className="w-4 h-4 text-teal-400" />
              <span className="text-sm font-medium text-white">GitHub</span>
            </a>
            
            {/* Contact Us Link */}
            <a
              href="https://t.me/tokenlab00"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowMobileMenu(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#0A0C0E]/95 backdrop-blur-xl border border-white/10 hover:border-teal-500/50 transition-all shadow-lg hover:shadow-teal-500/20"
            >
              <MessageCircle className="w-4 h-4 text-teal-400" />
              <span className="text-sm font-medium text-white">Contact Us</span>
            </a>
            
            {/* Privacy Policy */}
            <button
              onClick={() => {
                navigate('/privacy');
                setShowMobileMenu(false);
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#0A0C0E]/95 backdrop-blur-xl border border-white/10 hover:border-teal-500/50 transition-all shadow-lg hover:shadow-teal-500/20 text-left w-full"
            >
              <Shield className="w-4 h-4 text-teal-400" />
              <span className="text-sm font-medium text-white">Privacy Policy</span>
            </button>
            
            {/* Terms of Service */}
            <button
              onClick={() => {
                navigate('/terms');
                setShowMobileMenu(false);
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#0A0C0E]/95 backdrop-blur-xl border border-white/10 hover:border-teal-500/50 transition-all shadow-lg hover:shadow-teal-500/20 text-left w-full"
            >
              <FileText className="w-4 h-4 text-teal-400" />
              <span className="text-sm font-medium text-white">Terms of Service</span>
            </button>
            </div>
          </>
        )}
        
        {/* Floating Action Button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 shadow-lg hover:shadow-teal-500/50 transition-all flex items-center justify-center text-white z-50 relative"
          aria-label="Open menu"
        >
          {showMobileMenu ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {showWelcome && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0A0C0E]/95 backdrop-blur-xl shadow-2xl shadow-teal-950/40 p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-500" />
            <h2 id="welcome-title" className="text-xl sm:text-2xl font-semibold text-white">
              Welcome to TokenClub
            </h2>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              Create and launch on Solana with guided tools. New here? Watch the quick walkthrough or jump in.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={dismissWelcome}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors w-full sm:w-auto order-2 sm:order-1"
              >
                Continue
              </button>
              <button
                type="button"
                onClick={goToTutorialFromWelcome}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 shadow-lg shadow-teal-500/25 transition-all w-full sm:w-auto order-1 sm:order-2 inline-flex items-center justify-center gap-2"
              >
                <PlayCircle className="w-4 h-4" aria-hidden />
                Watch tutorial
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(6,182,212,0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(6,182,212,0.6); }
        
        .spotlight-card:hover::before { opacity: 1; }
        .spotlight-card::before {
          content: "";
          position: absolute;
          inset: 0px;
          border-radius: inherit;
          padding: 1px;
          background: radial-gradient(
            800px circle at var(--mouse-x) var(--mouse-y), 
            rgba(34, 211, 238, 0.4), 
            transparent 40%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s;
        }
      `}</style>
      </div>
    </>
  );
};

const App: React.FC<AppContentProps> = ({ initialTab, initialRoute }) => (
  <ClientProviders>
    <AppContent initialTab={initialTab} initialRoute={initialRoute} />
  </ClientProviders>
);

export default App;
