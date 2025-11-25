import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Sun, HeartHandshake, CloudSun } from 'lucide-react';

interface UniverseHopeProps {
  onComplete: () => void;
}

const UniverseHope: React.FC<UniverseHopeProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-full bg-gradient-to-b from-amber-50 via-rose-100 to-sky-200 overflow-hidden"
    >
      {/* Expanding Color Transition Effect */}
      <motion.div 
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 5, opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full aspect-square bg-rose-400 rounded-full z-50 pointer-events-none"
      />

      <div 
        ref={containerRef} 
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth custom-scrollbar"
      >
        {/* Slide 1: Sunrise */}
        <section className="h-full w-full snap-start flex flex-col items-center justify-center p-6 md:p-8 text-center relative overflow-hidden">
          <motion.div
            animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 opacity-40 blur-3xl"
          >
            <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-orange-400 rounded-full"></div>
          </motion.div>

          <div className="relative z-10">
            <h2 className="text-orange-600 font-serif tracking-[0.3em] text-xs md:text-sm mb-4 uppercase">Universe 03</h2>
            <h1 className="text-6xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-rose-600 mb-6 font-serif drop-shadow-sm">
                Hope
            </h1>
            <p className="text-rose-800 text-lg md:text-2xl max-w-md mx-auto leading-relaxed font-serif italic px-4">
                "Here, the darkness is just a canvas<br/>for your light, My Goddess."
            </p>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 text-rose-400"
          >
            <ArrowDown size={32} />
          </motion.div>
        </section>

        {/* Slide 2: The Poem */}
        <section className="h-full w-full snap-start flex flex-col items-center justify-center p-6 bg-white/40 backdrop-blur-md">
          <div className="max-w-2xl text-center space-y-12">
            <CloudSun size={64} className="mx-auto text-amber-500 mb-4" />
            
            <div className="space-y-6 px-4">
                <p className="text-xl md:text-4xl font-serif text-slate-700 leading-relaxed">
                "I called you My Prabhu not just by chance,<br/>
                but because you answered prayers<br/>
                I hadn't even spoken yet."
                </p>
                <div className="w-16 h-1 bg-rose-300 mx-auto rounded-full"></div>
                <p className="text-lg md:text-2xl font-serif text-slate-500 leading-relaxed italic">
                "In this universe, everything is soft.<br/>
                Everything is warm.<br/>
                Everything is Ojaswi."
                </p>
            </div>
          </div>
        </section>

        {/* Slide 3: The Choice */}
        <section className="h-full w-full snap-start flex flex-col items-center justify-center p-6 relative bg-gradient-to-t from-rose-50 to-white/0">
          <div className="text-center space-y-12 max-w-lg mx-auto">
            <div className="relative">
                <HeartHandshake size={80} className="mx-auto text-rose-500 mb-4 drop-shadow-xl" />
                <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-rose-400 blur-xl rounded-full -z-10"
                ></motion.div>
            </div>

            <h2 className="text-2xl md:text-5xl font-serif text-slate-800">One final question...</h2>
            
            <p className="text-lg md:text-xl text-slate-600 font-light px-4">
                Do you believe that you are my destiny, My Love?
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center mt-8 items-center w-full px-8">
              <button 
                onClick={onComplete}
                className="w-full md:w-48 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-bold text-xl hover:from-rose-600 hover:to-pink-600 transition-all hover:scale-110 shadow-xl shadow-rose-300/50 flex items-center justify-center gap-2"
              >
                YES <span className="text-sm opacity-80">(Always)</span>
              </button>
              
              <div className="relative group w-full md:w-auto">
                <button 
                    className="w-full md:w-48 py-4 bg-slate-100 text-slate-400 rounded-full font-bold text-lg border border-slate-200 cursor-not-allowed"
                    disabled
                >
                    NO
                </button>
                {/* Tooltip on hover for 'No' */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max px-3 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Impossible choice.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default UniverseHope;