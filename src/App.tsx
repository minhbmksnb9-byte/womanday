/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Flower2, Gift, Play, Building2, Car, Sparkles } from 'lucide-react';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * (30 - 10) + 10,
      duration: Math.random() * (10 - 5) + 5,
      delay: Math.random() * 5,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 1, 1, 0] }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'linear',
          }}
          style={{ left: heart.left }}
          className="absolute text-pink-400/40"
        >
          <Heart size={heart.size} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};

const BloomingFlower = () => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
      className="relative w-48 h-48 flex items-center justify-center animate-sway"
    >
      {/* Stem */}
      <div className="absolute bottom-0 w-2 h-24 bg-green-500 rounded-full">
        {/* Leaves */}
        <motion.div
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 -left-6 w-8 h-4 bg-green-600 rounded-full origin-right"
        />
        <motion.div
          animate={{ rotate: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-12 -right-6 w-8 h-4 bg-green-600 rounded-full origin-left"
        />
      </div>
      
      {/* Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, rotate: angle }}
          animate={{ scale: 1, rotate: angle }}
          transition={{ delay: 1.5 + i * 0.1, duration: 0.8 }}
          className="absolute w-16 h-24 bg-pink-500 rounded-full flower-petal opacity-90 shadow-lg"
          style={{ transformOrigin: 'bottom center', bottom: '50%' }}
        />
      ))}
      
      {/* Center */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="absolute w-12 h-12 bg-yellow-400 rounded-full z-10 shadow-inner"
      />
    </motion.div>
  );
};

const PhotoFrame = ({ children, className, delay }: { children: React.ReactNode; className: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.8, type: "spring" }}
    className={`absolute w-24 h-32 md:w-32 md:h-40 bg-white p-2 rounded-2xl shadow-xl border-4 border-pink-200 flex flex-col items-center justify-center overflow-hidden animate-sway ${className}`}
  >
    {children}
  </motion.div>
);

const Cityscape = () => {
  return (
    <div className="absolute bottom-0 w-full h-64 overflow-hidden pointer-events-none">
      {/* Buildings - Positioned above the road */}
      <div className="absolute bottom-12 w-full flex items-end justify-around opacity-60">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="bg-pink-800 w-16 shadow-lg"
            style={{ height: `${40 + Math.random() * 80}px` }}
          >
            <div className="grid grid-cols-2 gap-1 p-1">
              {Array.from({ length: 8 }).map((_, j) => (
                <div key={j} className="w-2 h-2 bg-yellow-200/40" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Road - Black and Opaque */}
      <div className="absolute bottom-0 w-full h-12 bg-neutral-900 border-t-2 border-neutral-700">
        <div className="absolute top-1/2 w-full h-0.5 border-t border-dashed border-white/40" />
      </div>

      {/* Cars */}
      <div className="absolute bottom-4 w-full">
        <div className="animate-car-move absolute">
          <div className="flex items-center text-pink-400">
            <Car size={36} fill="currentColor" />
            <div className="ml-1 text-[10px] font-bold bg-white/80 px-1.5 py-0.5 rounded text-pink-600 shadow-sm">GIFT</div>
          </div>
        </div>
        <div className="animate-car-move-reverse absolute" style={{ bottom: '-15px' }}>
          <div className="flex items-center text-pink-300">
            <Car size={32} fill="currentColor" className="scale-x-[-1]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [stage, setStage] = useState<'loading' | 'intro' | 'main'>('loading');
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStage('intro'), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 font-sans text-pink-900 overflow-hidden relative">
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {stage === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-pink-100"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Flower2 size={48} className="text-pink-500" />
            </motion.div>
            <p className="mt-4 font-medium animate-pulse">Đang chuẩn bị điều bất ngờ...</p>
          </motion.div>
        )}

        {stage === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 flex flex-col items-center justify-center z-40 bg-pink-50/80 backdrop-blur-sm"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setStage('main')}
              className="group relative flex flex-col items-center"
            >
              <div className="w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-pink-200 group-hover:bg-pink-600 transition-colors">
                <Gift size={40} className="text-white animate-bounce" />
              </div>
              <span className="mt-6 text-xl font-bold text-pink-600 tracking-wide">NHẤP VÀO ĐỂ NHẬN QUÀ</span>
              <Sparkles className="absolute -top-4 -right-4 text-yellow-400 animate-pulse" />
            </motion.button>
          </motion.div>
        )}

        {stage === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative h-screen w-full flex flex-col items-center pt-12"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: -20, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center z-20 px-4"
            >
              <h1 className="text-3xl md:text-5xl font-black text-pink-600 drop-shadow-md mb-1">
                Chúc Mừng Ngày Quốc Tế Phụ Nữ
              </h1>
              <h2 className="text-5xl md:text-7xl font-black text-pink-400 drop-shadow-xl">
                8 - 3
              </h2>
            </motion.div>

            {/* Photo Frames Layout */}
            <div className="relative w-full max-w-4xl h-64 md:h-80 flex items-center justify-center z-10">
              {/* Top Pair - Wide apart */}
              <PhotoFrame 
                className="top-0 left-4 md:left-12 -rotate-6" 
                delay={3} 
              >
                <img src="anh/1.jpg" className="w-full h-full object-cover rounded-xl" />
              </PhotoFrame>

              <PhotoFrame 
                className="top-0 right-4 md:right-12 rotate-6" 
                delay={3.2} 
              >
                <img src="anh/2.jpg" className="w-full h-full object-cover rounded-xl" />
              </PhotoFrame>
              
              {/* Bottom Pair - Closer to center */}
              <PhotoFrame 
                className="bottom-0 left-16 md:left-32 -rotate-3" 
                delay={3.4} 
              >
                <img src="anh/3.jpg" className="w-full h-full object-cover rounded-xl" />
              </PhotoFrame>

              <PhotoFrame 
                className="bottom-0 right-16 md:right-32 rotate-3" 
                delay={3.6} 
              >
                <img src="https://picsum.photos/seed/11a_4/300/400" className="w-full h-full object-cover rounded-xl" />
              </PhotoFrame>

              <BloomingFlower />
            </div>

            <Cityscape />

            {/* Video Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5 }}
              className="mt-8 z-30 flex flex-col items-center"
            >
              <button
                onClick={() => setShowVideo(true)}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-pink-200 hover:bg-pink-500 hover:text-white transition-all group cursor-pointer"
              >
                <Play size={20} className="fill-current" />
                <span className="font-bold">BÍ MẬT KHÔNG THỂ TIẾT LỘ</span>
              </button>

              <AnimatePresence>
                {showVideo && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-8"
                  >
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
                    >
                      <button 
                        onClick={() => setShowVideo(false)}
                        className="absolute top-4 right-4 z-[110] bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </button>
                      <video 
                        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" 
                        controls 
                        autoPlay
                        className="w-full h-full object-contain" 
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4 }}
              className="mt-4 text-pink-400 font-medium italic z-20"
            >
              Dành tặng cho các bạn nữ 11A!
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
