import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateLovePoem } from '../services/geminiService';
import { Loader2, Sparkles, Heart, Star } from 'lucide-react';

interface UniverseFateProps {
  onComplete: () => void;
  setName: (name: string) => void;
}

const MEMORIES = [
  { id: 1, text: "Feb 4, 2025", x: 20, y: 30 },
  { id: 2, text: "Your Laughter", x: 70, y: 20 },
  { id: 3, text: "My Goddess", x: 40, y: 60 },
  { id: 4, text: "Every I Love You", x: 80, y: 70 },
  { id: 5, text: "Puntuu's Smile", x: 10, y: 80 },
];

const UniverseFate: React.FC<UniverseFateProps> = ({ onComplete, setName }) => {
  const [inputName, setInputName] = useState('');
  const [poem, setPoem] = useState('');
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isZooming, setIsZooming] = useState(false); // New state for zoom effect
  const [zoomComplete, setZoomComplete] = useState(false);
  
  // Calculate days since Feb 4, 2025
  const startDate = new Date('2025-02-04');
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

  // Complex Typewriter Monologue
  useEffect(() => {
    const sequence = async () => {
      const type = (text: string, speed = 100) => {
        return new Promise<void>(resolve => {
          let i = 0;
          const interval = setInterval(() => {
            setInputName(text.slice(0, i + 1));
            i++;
            if (i === text.length) {
              clearInterval(interval);
              resolve();
            }
          }, speed);
        });
      };

      const clear = () => {
         setInputName('');
         return new Promise<void>(resolve => setTimeout(resolve, 500));
      }

      // 1. Initial prompt
      await type("Enter your name...");
      await new Promise(r => setTimeout(r, 800));
      
      // 2. Realization (The "Talking to self" part)
      setInputName(""); // Instant clear for effect
      await type("Oh wait... you are the love of my life, my baby...", 50);
      await new Promise(r => setTimeout(r, 1500)); // Pause to let her read
      
      // 3. Correction
      await clear();
      await type("Ojaswi", 150); // Type the real name slowly and lovingly
    };

    sequence();
  }, []);

  const handleGenerate = async () => {
    if (!inputName.trim()) return;
    setLoading(true);
    setName(inputName);
    
    const generatedPoem = await generateLovePoem(inputName);
    setPoem(generatedPoem);
    
    // Trigger Zoom Animation
    setLoading(false);
    setIsZooming(true);
    
    // After zoom, show content
    setTimeout(() => {
        setZoomComplete(true);
        setShowButton(true);
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className={`relative w-full h-full overflow-hidden flex flex-col items-center justify-center text-white p-6 transition-colors duration-1000 ${zoomComplete ? 'bg-pink-900' : 'bg-[#0a0f1e]'}`}
    >
      {/* Background Stars (Always visible initially) */}
      {!zoomComplete && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            {[...Array(60)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-blue-100 star-anim shadow-[0_0_5px_#fff]"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  animationDelay: `${Math.random() * 5}s`,
                  opacity: Math.random(),
                }}
              />
            ))}
          </div>
      )}

      {/* Floating Info */}
      <div className="absolute top-6 left-6 text-[10px] md:text-xs text-blue-300/50 font-serif tracking-widest z-10">
        STAR DATE: 04.02.2025
      </div>
      <div className="absolute bottom-6 right-6 text-[10px] md:text-xs text-blue-300/50 font-serif tracking-widest z-10">
        {diffDays} DAYS OF ORBITING YOU
      </div>

      {/* Draggable Memories - Hide during zoom */}
      <AnimatePresence>
        {!isZooming && !zoomComplete && MEMORIES.map((m) => (
            <motion.div
            key={m.id}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            initial={{ x: 0, y: 0 }}
            className="absolute z-10 cursor-pointer group"
            style={{ top: `${m.y}%`, left: `${m.x}%` }}
            >
            <div className="bg-white/5 backdrop-blur-md p-3 rounded-full border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:bg-white/20 group-hover:shadow-[0_0_25px_rgba(100,200,255,0.6)] transition-all duration-500">
                <Sparkles size={14} className="text-blue-200" />
            </div>
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-3 text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity text-blue-200 font-light">
                {m.text}
            </span>
            </motion.div>
        ))}
      </AnimatePresence>

      {/* The Zooming Star Effect */}
      {isZooming && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 150, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute z-30 w-10 h-10 bg-pink-900 rounded-full shadow-[0_0_100px_rgba(255,100,150,1)]"
          />
      )}

      {/* Initial Input Container */}
      <AnimatePresence>
        {!isZooming && !zoomComplete && (
            <motion.div 
                exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                className="z-20 max-w-md w-full p-8 bg-slate-900/30 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl text-center relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
                
                <div className="mb-8">
                    <h2 className="text-xs font-serif tracking-[0.4em] text-blue-300 mb-2 uppercase">Universe 01</h2>
                    <h1 className="text-5xl md:text-6xl font-thin font-serif mb-4 text-white drop-shadow-lg">Fate</h1>
                    <p className="text-slate-300 italic font-light text-sm">"The stars aligned the moment I saw you..."</p>
                </div>

                <div className="space-y-6">
                    <div className="relative group">
                    <input
                        type="text"
                        value={inputName}
                        readOnly // Controlled by effect
                        className={`w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-4 text-center text-blue-100 font-serif focus:outline-none focus:border-blue-400 transition-all placeholder:text-slate-600 ${inputName.length > 30 ? 'text-sm md:text-base' : 'text-lg md:text-xl'}`}
                    />
                    </div>
                    
                    <button
                    onClick={handleGenerate}
                    disabled={loading || inputName !== "Ojaswi"} // Only enable when correct name is typed
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg px-4 py-3 transition-all flex items-center justify-center gap-2 font-serif tracking-widest text-xs md:text-sm shadow-lg"
                    >
                    {loading ? <Loader2 className="animate-spin" size={16} /> : <> <Sparkles size={16}/> ALIGN THE STARS </>}
                    </button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* The Poem Reveal (Post Zoom) */}
      {zoomComplete && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-40 w-full h-full flex flex-col items-center justify-center"
          >
              {/* Extra Falling Stars for Poem View */}
              <div className="absolute inset-0 pointer-events-none">
                 {[...Array(20)].map((_, i) => (
                     <motion.div
                        key={i}
                        initial={{ y: -100, x: Math.random() * window.innerWidth, opacity: 0 }}
                        animate={{ y: window.innerHeight + 100, opacity: [0, 1, 0] }}
                        transition={{ 
                            duration: Math.random() * 3 + 2, 
                            repeat: Infinity, 
                            delay: Math.random() * 2 
                        }}
                        className="absolute text-yellow-200"
                     >
                         <Star size={Math.random() * 10 + 5} fill="currentColor" />
                     </motion.div>
                 ))}
              </div>

              <div className="max-w-xl w-full p-8 md:p-12 relative">
                   <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl md:rounded-[3rem] shadow-[0_0_50px_rgba(255,255,255,0.2)]"></div>
                   
                   <div className="relative z-10 text-center space-y-8">
                       <Heart className="mx-auto text-rose-300 fill-rose-300/20" size={40} />
                       
                       <p className="font-serif text-xl md:text-3xl leading-relaxed text-white whitespace-pre-line italic drop-shadow-md">
                        {poem}
                       </p>

                       <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto"></div>

                       <p className="text-sm md:text-base font-serif text-rose-200 opacity-90 text-right pr-4">
                        - Your batman, Samriddha
                       </p>

                        <button
                            onClick={onComplete}
                            className="mt-8 group relative px-8 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-all border border-white/20 mx-auto block"
                        >
                            <span className="relative z-10 font-serif italic text-base flex items-center gap-2 justify-center text-white">
                                Drift to the next reality <Heart size={14} className="group-hover:text-red-400 transition-colors" />
                            </span>
                        </button>
                   </div>
              </div>
          </motion.div>
      )}
    </motion.div>
  );
};

export default UniverseFate;