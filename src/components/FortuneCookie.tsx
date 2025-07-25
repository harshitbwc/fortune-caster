'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Share2 } from 'lucide-react';
import { fortunes } from '@/data/fortunes';

interface FortuneCookieProps {
  onShare: (message: string) => void;
}

export default function FortuneCookie({ onShare }: FortuneCookieProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFortune, setCurrentFortune] = useState('');
  const [showNewCookie, setShowNewCookie] = useState(true);

  const handleCookieClick = () => {
    if (!isOpen) {
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      setCurrentFortune(randomFortune);
      setIsOpen(true);
    }
  };

  const handleNewCookie = () => {
    setIsOpen(false);
    setShowNewCookie(false);
    
    setTimeout(() => {
      setShowNewCookie(true);
    }, 500);
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <AnimatePresence mode="wait">
        {showNewCookie && !isOpen && (
          <motion.div
            key="cookie"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: 1,
              y: [-10, 10, -10],
              rotate: [-2, 2, -2]
            }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ 
              duration: 0.5,
              y: {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              },
              rotate: {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }
            }}
            className="cursor-pointer"
            onClick={handleCookieClick}
          >
            <div className="relative">
              <motion.div
                className="w-48 h-32 bg-gradient-to-br from-amber-200 via-yellow-300 to-amber-400 rounded-full shadow-2xl border-4 border-amber-600"
                style={{
                  clipPath: 'ellipse(50% 40% at 50% 50%)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-2 bg-gradient-to-br from-amber-100 via-yellow-200 to-amber-300 rounded-full opacity-60" />
                <div className="absolute top-4 left-8 w-2 h-2 bg-amber-600 rounded-full opacity-40" />
                <div className="absolute bottom-6 right-12 w-1.5 h-1.5 bg-amber-700 rounded-full opacity-30" />
                <div className="absolute top-8 right-6 w-1 h-1 bg-amber-800 rounded-full opacity-25" />
              </motion.div>
            </div>
          </motion.div>
        )}

        {isOpen && (
          <motion.div
            key="broken-cookie"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative flex flex-col items-center"
          >
            <div className="flex items-center gap-8 mb-8">
              <motion.div
                initial={{ x: 0, rotate: 0 }}
                animate={{ x: -50, rotate: -15 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-24 h-16 bg-gradient-to-br from-amber-200 via-yellow-300 to-amber-400 shadow-xl border-2 border-amber-600"
                style={{
                  clipPath: 'polygon(0% 0%, 80% 0%, 100% 100%, 0% 100%)',
                }}
              >
                <div className="absolute inset-1 bg-gradient-to-br from-amber-100 via-yellow-200 to-amber-300 opacity-60" />
              </motion.div>

              <motion.div
                initial={{ x: 0, rotate: 0 }}
                animate={{ x: 50, rotate: 15 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-24 h-16 bg-gradient-to-br from-amber-200 via-yellow-300 to-amber-400 shadow-xl border-2 border-amber-600"
                style={{
                  clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)',
                }}
              >
                <div className="absolute inset-1 bg-gradient-to-br from-amber-100 via-yellow-200 to-amber-300 opacity-60" />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-amber-200 max-w-md mx-auto"
            >
              <p className="text-gray-800 text-lg leading-relaxed font-medium text-center mb-6">
                {currentFortune};
              </p>
              
              <div className="flex gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onShare(currentFortune)}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-medium transition-colors shadow-lg"
                >
                  <Share2 size={18} />
                  Share on Farcaster
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNewCookie}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-medium transition-colors shadow-lg"
                >
                  New Fortune
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}