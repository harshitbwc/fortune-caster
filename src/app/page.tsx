'use client';

import FortuneCookieCSS from '@/components/FortuneCookieCSS';
import ParticleBackground from '@/components/ParticleBackground';
import { shareToFarcaster } from '@/utils/farcaster';

export default function Home() {
  const handleShare = (fortune: string) => {
    shareToFarcaster(fortune);
  };

  return (
    <div className="min-h-screen overflow-hidden relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Space Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0ic3RhcnMiIHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjgiLz48Y2lyY2xlIGN4PSI4MCIgY3k9IjgwIiByPSIwLjUiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjQwIiBjeT0iNjAiIHI9IjAuOCIgZmlsbD0iIzAwZmZmZiIgb3BhY2l0eT0iMC43Ii8+PGNpcmNsZSBjeD0iNzAiIGN5PSIzMCIgcj0iMC42IiBmaWxsPSIjZmY2NmZmIiBvcGFjaXR5PSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ1cmwoI3N0YXJzKSIvPjwvc3ZnPg==')] opacity-30"></div>
      
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Cosmic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-indigo-900/20 pointer-events-none"></div>
      
      {/* Nebula Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-purple-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-cyan-500/10 via-teal-500/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      {/* Main Content with header */}
      <div className="relative z-10 h-screen">
        <header className="text-center pt-6 sm:pt-8 pb-4 sm:pb-6 relative z-20 px-4" style={{marginTop: '6vh'}}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-3 sm:mb-4 drop-shadow-2xl">
            🥠 Fortune Caster
          </h1>
          <p className="text-cyan-300/90 text-lg sm:text-xl font-light tracking-wide drop-shadow-lg">
            Discover your cosmic destiny with our fortune cookie!
          </p>
          <div className="mt-3 sm:mt-4 w-24 sm:w-32 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full shadow-lg shadow-cyan-400/50"></div>
        </header>

        <FortuneCookieCSS onShare={handleShare} />
      </div>
      
      {/* Floating Space Elements */}
      <div className="absolute top-16 left-16 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
      <div className="absolute top-32 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-70"></div>
      <div className="absolute bottom-40 left-12 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-50"></div>
      <div className="absolute bottom-20 right-16 w-1.5 h-1.5 bg-teal-400 rounded-full animate-ping opacity-60"></div>
      <div className="absolute top-1/2 left-8 w-1 h-1 bg-pink-400 rounded-full animate-pulse opacity-50"></div>
      <div className="absolute top-1/3 right-8 w-2 h-2 bg-indigo-400 rounded-full animate-bounce opacity-40"></div>
      
      {/* Shooting Stars */}
      <div className="absolute top-20 left-1/4 w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent animate-pulse opacity-60 rotate-45"></div>
      <div className="absolute bottom-1/3 right-1/3 w-12 h-0.5 bg-gradient-to-r from-purple-400 to-transparent animate-pulse opacity-50 rotate-12" style={{ animationDelay: '3s' }}></div>
    </div>
  );
}
