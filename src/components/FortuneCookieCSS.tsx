'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { fortunes } from '@/data/fortunes';
import html2canvas from 'html2canvas';

interface FortuneCookieCSSProps {
  onShare: (message: string) => void;
}

export default function FortuneCookieCSS({ onShare }: FortuneCookieCSSProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [currentFortune, setCurrentFortune] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCookieClick = () => {
    if (!isOpened) {
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      setCurrentFortune(randomFortune);
      
      // Immediately start breaking animation
      setIsOpened(true);
      
      // Show share button after animation completes
      setTimeout(() => {
        setShowButtons(true);
      }, 1200);
    }
  };

  const handleAreaClick = () => {
    // Click anywhere in the cookie area to get new fortune
    if (isOpened) {
      // Reset everything for new cookie
      setIsOpened(false);
      setShowButtons(false);
      setCurrentFortune('');
      
      // Small delay then allow new click
      setTimeout(() => {
        // Ready for new fortune
      }, 200);
    }
  };

  const handleScreenshotShare = async () => {
    if (!containerRef.current) return;
    
    try {
      const canvas = await html2canvas(containerRef.current, {
        logging: false,
        useCORS: true,
      });
      
      // Convert to blob
      canvas.toBlob((blob) => {
        if (blob) {
          // Create a temporary URL for the image
          const url = URL.createObjectURL(blob);
          
          // Create a download link
          const a = document.createElement('a');
          a.href = url;
          a.download = 'fortune-caster-screenshot.png';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          
          // Also share to Farcaster with text
          onShare(currentFortune);
        }
      }, 'image/png');
    } catch (error) {
      console.error('Screenshot failed:', error);
      // Fallback to regular text share
      onShare(currentFortune);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden" 
      style={{ marginTop: '-15vh' }}
    >
      {/* Fortune Cookie Area - Clickable */}
      <div 
        className="absolute inset-0 flex items-center justify-center cursor-pointer"
        onClick={isOpened ? handleAreaClick : handleCookieClick}
      >
        <motion.div
          className={`fc ${isOpened ? 'opened' : ''}`}
          animate={!isOpened ? {
            y: [0, -8, 0],
            rotate: [0, 1, -1, 0]
          } : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={!isOpened ? { scale: 1.05 } : {}}
          whileTap={{ scale: 0.95 }}
        >
          {/* Left part of cookie */}
          <div className="fc-part left"></div>
          
          {/* Right part of cookie */}
          <div className="fc-part right"></div>
          
          {/* Cookie crumbs */}
          <div className="fc-crumbs">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="fc-crumb"></div>
            ))}
          </div>

          {/* Fortune message */}
          <div className="fc-fortune">
            <p className="fc-fortune-text">{currentFortune}</p>
          </div>
        </motion.div>
      </div>

      {/* Instructions */}
      {!isOpened ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-24 sm:bottom-30 left-1/2 transform -translate-x-1/2 text-center text-cyan-300/90 z-20 px-4"
        >
          <p className="text-lg sm:text-xl mb-2 font-semibold drop-shadow-lg">Click the fortune cookie</p>
          <p className="text-xs sm:text-sm opacity-80">🥠 Discover your cosmic destiny 🥠</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-24 sm:bottom-30 left-1/2 transform -translate-x-1/2 text-center text-cyan-300/90 z-20 px-4"
        >
          <p className="text-xs sm:text-sm opacity-80">✨ Click anywhere for a new fortune ✨</p>
        </motion.div>
      )}

      {/* Bottom buttons - appear after fortune opens */}
      <AnimatePresence>
        {showButtons && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-xs sm:max-w-sm px-4 z-30"
          >
            <div className="flex justify-center">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleScreenshotShare}
                className="group relative flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl font-semibold shadow-xl border border-purple-400/30 transition-all duration-200 text-sm sm:text-base w-full sm:w-auto justify-center"
              >
                {/* Farcaster-style icon */}
                <Share2 size={18} className="sm:w-5 sm:h-5" />
                
                {/* Simple, clean text */}
                <span className="font-medium">
                  Share on Farcaster
                </span>
                
                {/* Subtle hover effect */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl"></div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      <style jsx global>{`
        * {
          border: 0;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        /* Cookie - Mobile Responsive */
        .fc {
          background: transparent;
          display: block;
          margin: 4.5em auto 0 auto;
          position: relative;
          width: 20em;
          height: 17em;
          border: none;
          cursor: pointer;
        }
        
        @media (max-width: 640px) {
          .fc {
            width: 16em;
            height: 14em;
            margin: 3em auto 0 auto;
          }
        }
        
        @media (max-width: 480px) {
          .fc {
            width: 14em;
            height: 12em;
            margin: 2em auto 0 auto;
          }
        }

        .fc:focus {
          outline: transparent;
        }

        .fc:disabled {
          cursor: default;
        }

        .fc-part, .fc-crumbs, .fc-crumb, .fc-fortune {
          position: absolute;
          top: 0;
        }

        .fc-part, .fc-crumb {
          background: currentColor;
          color: #FFD700;
        }

        .fc-part {
          width: 8em;
          height: 18em;
          z-index: 2;
        }

        .left {
          border-radius: 7em 1em 1em 7em / 50%;
          box-shadow:
            0.5em 0 0 inset,
            0.5em 0.2em 0 inset,
            1em 0.2em 0 #fff6 inset,
            -0.75em 0 0 #0002 inset,
            0 0 20px rgba(255, 215, 0, 0.5);
          clip-path: polygon(0% 0%, 68% 0%, 100% 30%, 100% 100%, 0% 100%);
          -webkit-clip-path: polygon(0% 0%, 68% 0%, 100% 30%, 100% 100%, 0% 100%);
          left: calc(50% - 5.4em);
          transform: rotate(25deg);
          transform-origin: 68% 0;
        }

        .right {
          border-radius: 1em 7em 7em 1em / 50%;
          box-shadow:
            -0.5em 0 0 inset,
            -0.5em 0.2em 0 inset,
            -1em 0.2em 0 #fff6 inset,
            0.75em 0 0 #0002 inset,
            0 0 20px rgba(255, 215, 0, 0.5);
          clip-path: polygon(0% 30%, 32% 0%, 100% 0, 100% 100%, 0% 100%);
          -webkit-clip-path: polygon(0% 30%, 32% 0%, 100% 0, 100% 100%, 0% 100%);
          right: calc(50% - 5.4em);
          transform: rotate(-25deg);
          transform-origin: 32% 0;
        }

        .fc-crumbs {
          left: calc(50% - 0.4em);
          width: 0.8em;
          height: 6em;
          z-index: 1;
        }

        .fc-crumb {
          border-radius: 50%;
          width: 0.5em;
          height: 0.5em;
        }

        .fc-crumb:nth-child(1) { top: 4%; left: 15%; }
        .fc-crumb:nth-child(2) { top: 20%; right: 15%; }
        .fc-crumb:nth-child(3) { top: 30%; left: 25%; }
        .fc-crumb:nth-child(4) { top: 45%; right: 25%; }
        .fc-crumb:nth-child(5) { top: 55%; left: 5%; }
        .fc-crumb:nth-child(6) { top: 65%; right: 5%; }
        .fc-crumb:nth-child(7) { top: 75%; left: 30%; }
        .fc-crumb:nth-child(8) { top: 90%; right: 35%; }

        /* Fortune - White Paper Background - Mobile Responsive */
        .fc-fortune {
          background: 
            linear-gradient(rgba(255, 255, 255, 0) .75em, rgba(255, 255, 255, 0.98) 0 5.25em, rgba(255, 255, 255, 0) 0),
            linear-gradient(90deg, #FFD700 3em, rgba(255, 255, 255, 0.98) 0 25.25em, #FFD700 0);
          color: #333;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0.75em 1.5em 0.75em 3.75em;
          text-align: center;
          width: 26em;
          height: 6em;
          left: 0;
          transform: scale(0,0);
          transform-origin: 50% 32%;
          border-radius: 0.5em;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 0 20px rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 215, 0, 0.3);
          opacity: 0;
        }
        
        @media (max-width: 640px) {
          .fc-fortune {
            width: 22em;
            height: 5.5em;
            padding: 0.5em 1em 0.5em 3em;
          }
        }
        
        @media (max-width: 480px) {
          .fc-fortune {
            width: 18em;
            height: 5em;
            padding: 0.5em 0.8em 0.5em 2.5em;
          }
        }

        .fc-fortune-text {
          font-family: 'Georgia', serif;
          font-weight: normal;
          font-size: 0.9em;
          line-height: 1.4;
          color: #2c3e50;
          text-shadow: none;
        }
        
        @media (max-width: 480px) {
          .fc-fortune-text {
            font-size: 0.8em;
            line-height: 1.3;
          }
        }

        .fc-lucky-numbers {
          font-family: 'Arial', sans-serif;
          font-size: 0.8em;
          margin-top: 0.5em;
          opacity: 0.7;
          color: #7f8c8d;
        }

        /* Animation States */
        .opened {
          width: 26em;
          height: 6em;
        }

        .opened .left {
          animation: breakLeft 0.7s ease-in forwards;
        }

        .opened .right {
          animation: breakRight 0.7s ease-in forwards;
        }

        .opened .fc-crumbs {
          animation: fallOut 0.7s ease-in forwards;
        }

        .opened .fc-fortune {
          animation: foldOut 0.7s ease-in forwards;
        }

        /* Animations */
        @keyframes breakLeft {
          from {
            transform: translateX(0) rotate(25deg);
          }
          30%, 40% {
            transform: translateX(0) rotate(55deg);
          }
          70% {
            opacity: 1;
            transform: translateX(-14em) rotate(50deg);
          }
          to {
            opacity: 0.7;
            transform: translateX(-14em) rotate(50deg);
          }
        }

        @keyframes breakRight {
          from {
            transform: translateX(0) rotate(-25deg);
          }
          30%, 40% {
            transform: translateX(0) rotate(-55deg);
          }
          70% {
            opacity: 1;
            transform: translateX(14em) rotate(-50deg);
          }
          to {
            opacity: 0.7;
            transform: translateX(14em) rotate(-50deg);
          }
        }

        @keyframes fallOut {
          from {
            left: calc(50% - 0.4em);
            width: 0.8em;
            transform: translateY(0);
          }
          30% {
            opacity: 1;
          }
          60%, to {
            opacity: 0;
            left: calc(50% - 3em);
            width: 6em;
            transform: translateY(24em);
          }
        }

        @keyframes foldOut {
          from {
            transform: scale(0,0);
            opacity: 0;
          }
          20% {
            transform: scale(0.2,0.1);
            opacity: 0.3;
          }
          40% {
            transform: scale(0.6,0.4);
            opacity: 0.7;
          }
          60% {
            transform: scale(0.9,0.7);
            opacity: 0.9;
          }
          to {
            transform: scale(1,1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}