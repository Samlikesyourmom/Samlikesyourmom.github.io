import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { MailOpen, Heart, Star } from 'lucide-react';

interface UniverseRealProps {
  userName: string;
}

const UniverseReal: React.FC<UniverseRealProps> = ({ userName }) => {
  const [showLetter, setShowLetter] = useState(false);

  useEffect(() => {
    // Confetti Explosion
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    // Delay letter reveal slightly for effect
    setTimeout(() => setShowLetter(true), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full h-full bg-[#fdfbf7] flex flex-col items-center justify-center overflow-y-auto custom-scrollbar"
    >
      {/* Background Texture & Floating Hearts */}
      <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none fixed"></div>
      
      {/* Floating Animated Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         {[...Array(15)].map((_, i) => (
             <motion.div
                key={i}
                initial={{ y: '100vh', x: Math.random() * 100 + 'vw', opacity: 0, scale: 0.5 }}
                animate={{ y: '-20vh', opacity: [0, 0.8, 0], scale: 1 }}
                transition={{ 
                    duration: Math.random() * 10 + 10, 
                    repeat: Infinity, 
                    delay: Math.random() * 5 
                }}
                className="absolute text-rose-200/40"
             >
                 <Heart size={Math.random() * 40 + 20} fill="currentColor" />
             </motion.div>
         ))}
      </div>

      <motion.div 
        initial={{ scale: 0.9, y: 50, opacity: 0 }}
        animate={showLetter ? { scale: 1, y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 max-w-2xl w-full mx-4 my-8 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 md:p-16 border-2 border-slate-100 relative mb-20"
      >
        {/* Decorative Stamps/Icons */}
        <div className="absolute -top-6 -right-6 md:-right-8 bg-rose-500 text-white p-4 rounded-full shadow-lg transform rotate-12">
            <Heart fill="white" size={32} />
        </div>
        <div className="absolute -top-4 -left-4 text-slate-200 transform -rotate-6">
            <MailOpen size={80} />
        </div>

        <h3 className="text-center text-slate-400 text-xs tracking-[0.3em] uppercase mb-10 border-b border-slate-100 pb-4">
          Universe: ORIGINAL TIMELINE // EST. FEB 4, 2025
        </h3>
        
        <div className="prose prose-slate prose-lg mx-auto font-serif text-slate-700 leading-loose">
          <p className="text-3xl font-bold text-slate-900 mb-6">
            My Dearest {userName || "Ojaswi"},
          </p>
          
          <p>
            We traveled through the quiet stars of Fate, we fought through the glitching Chaos, and we found the warmth of Hope. But none of those universes compare to this one.
          </p>
          
          <p>
            Because this is the universe where <strong>Feb 4, 2025</strong> happened.
          </p>

          <p>
            I don't need a simulation to know you are "The One."
            You are my <strong>Puntuu</strong> when we laugh, my <strong>Babyy</strong> when I hold you, and my <strong>Prabhu</strong> when I need guidance.
          </p>

          <div className="my-8 pl-6 border-l-4 border-rose-200 italic text-slate-500">
            "In a world of infinite variables, you are my only constant."
          </div>

          <p>
            To my Matuu, my Goddess, and my Love...<br/>
            Thank you for choosing me in this timeline.
          </p>

          <p className="mt-12 text-right font-bold text-xl text-slate-900">
            - Your batman, Samriddha
          </p>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col items-center gap-2">
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
            </div>
            <p className="text-[10px] text-slate-300 uppercase tracking-widest">Simulation Rated: Infinite Love</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UniverseReal;