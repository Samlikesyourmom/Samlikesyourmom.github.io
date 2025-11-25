import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, AlertTriangle, RefreshCcw, Video } from 'lucide-react';

interface UniverseChaosProps {
  onComplete: () => void;
  onVoiceNotePlay: (playing: boolean) => void;
}

// ----------------------------------------------------------------------
// CUSTOMIZE PHOTOS HERE
// Put your photos in public/assets/ folder and name them photo1.jpg, etc.
// ----------------------------------------------------------------------
const PHOTOS = [
  { id: 1, url: 'assets/photo1.JPG' }, 
  { id: 2, url: 'assets/photo2.JPG' }, 
  { id: 3, url: 'assets/photo3.JPG' }, 
  { id: 4, url: 'assets/photo4.JPG' }, 
];

// Create pairs for the game
const CARDS = [...PHOTOS, ...PHOTOS].map((photo, index) => ({
  uniqueId: index,
  photoId: photo.id,
  url: photo.url,
  matched: false,
}));

// Shuffle helper
const shuffle = (array: typeof CARDS) => array.sort(() => Math.random() - 0.5);

const UniverseChaos: React.FC<UniverseChaosProps> = ({ onComplete, onVoiceNotePlay }) => {
  const [cards, setCards] = useState(shuffle([...CARDS]));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [isPlayingNote, setIsPlayingNote] = useState(false);
  
  const voiceNoteRef = useRef<HTMLAudioElement>(null);

  // Game Logic
  useEffect(() => {
    if (flipped.length === 2) {
      const [firstIndex, secondIndex] = flipped;
      if (cards[firstIndex].photoId === cards[secondIndex].photoId) {
        setSolved((prev) => [...prev, firstIndex, secondIndex]);
        setFlipped([]);
      } else {
        const timer = setTimeout(() => setFlipped([]), 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (solved.length === cards.length) {
      setTimeout(() => setGameWon(true), 500);
    }
  }, [solved, cards]);

  const handleCardClick = (index: number) => {
    if (flipped.length < 2 && !flipped.includes(index) && !solved.includes(index)) {
      setFlipped((prev) => [...prev, index]);
    }
  };

  const toggleVoiceNote = () => {
    if (!voiceNoteRef.current) return;

    if (isPlayingNote) {
        voiceNoteRef.current.pause();
        setIsPlayingNote(false);
        onVoiceNotePlay(false); // Tell App to resume bg music
    } else {
        voiceNoteRef.current.play();
        setIsPlayingNote(true);
        onVoiceNotePlay(true); // Tell App to pause bg music
    }
  };

  const handleVoiceNoteEnded = () => {
      setIsPlayingNote(false);
      onVoiceNotePlay(false); // Resume bg music when done
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-full bg-black text-green-500 font-mono overflow-y-auto custom-scrollbar"
    >
      {/* Hidden Audio Element for the Voice Note / Song */}
      <audio 
        ref={voiceNoteRef} 
        src="assets/voice-note.mp3" 
        onEnded={handleVoiceNoteEnded}
      />

      {/* Glitch Background Effect - Replaced by Video on Win */}
      {!gameWon ? (
        <>
            <div className="fixed inset-0 opacity-10 pointer-events-none z-0 glitch-anim bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] bg-cover bg-center mix-blend-screen"></div>
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/Noise_tv_static.gif')] bg-repeat"></div>
        </>
      ) : (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="fixed inset-0 z-0"
        >
            {/* Background Video Placeholder */}
            <video 
                className="w-full h-full object-cover" 
                autoPlay 
                loop 
                muted 
                playsInline
                src="assets/memory-video.mp4" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
        </motion.div>
      )}

      <div className="relative z-10 min-h-full flex flex-col items-center p-4 md:p-8">
        <h2 className="text-sm md:text-xl tracking-[0.5em] text-red-500 mb-2 uppercase">Universe 02</h2>
        <h1 className="text-5xl md:text-8xl font-bold mb-8 glitch-anim text-white shadow-[2px_2px_0px_#ff0000,-2px_-2px_0px_#00ff00]">CHAOS</h1>

        <div className="max-w-3xl w-full space-y-12 pb-20">
          {/* Section 1: The Story */}
          <section className={`border-l-4 ${gameWon ? 'border-green-500' : 'border-red-800'} pl-6 space-y-6 bg-black/50 p-6 backdrop-blur-sm rounded-r-lg transition-colors duration-500`}>
            {!gameWon ? (
                <>
                    <div className="flex items-center gap-2 text-red-500 font-bold mb-2">
                        <AlertTriangle size={20} />
                        <span>CRITICAL ERROR: HEARTBREAK_DETECTED</span>
                    </div>
                    <p className="opacity-80 text-sm md:text-lg leading-relaxed font-serif text-slate-300">
                    &gt; Timeline analysis: <span className="text-red-500">Separation.</span><br/>
                    &gt; In this reality, I never called you Babyy.<br/>
                    &gt; I never held Maya in my arms.<br/>
                    &gt; The world is grey. The silence is loud.
                    </p>
                    <p className="opacity-80 text-sm md:text-lg leading-relaxed font-serif text-slate-300">
                    &gt; I am searching for your face in the crowd, but you are not there.
                    </p>
                </>
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                >
                    <div className="flex items-center gap-2 text-green-500 font-bold mb-2">
                        <RefreshCcw size={20} />
                        <span>CRITICAL ERROR SOLVED</span>
                    </div>
                    <p className="opacity-80 text-sm md:text-lg leading-relaxed font-serif text-green-300">
                        &gt; Timeline saved.
                    </p>
                    
                    {/* Voice Log UI (Moved from bottom) */}
                    <div className="w-full max-w-md bg-red-950/80 backdrop-blur-md border border-red-500/50 p-6 rounded-lg flex flex-col gap-4 shadow-[0_0_30px_rgba(255,0,0,0.1)] z-10">
                        <div className="flex items-center justify-between">
                             <span className="text-xs text-red-400 uppercase tracking-widest">Voice Log: "Missing Matuu"</span>
                             <Volume2 size={16} className="text-red-500 animate-pulse" />
                        </div>
                      
                      <div className="flex items-center gap-4">
                        <button
                            onClick={toggleVoiceNote}
                            className="w-12 h-12 shrink-0 flex items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-500 transition-colors shadow-lg"
                        >
                            {isPlayingNote ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                        </button>
                        <div className="h-10 flex-1 flex items-center gap-1">
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-1 bg-red-500/50 rounded-full"
                                    animate={isPlayingNote ? { 
                                        height: [10, Math.random() * 30 + 10, 10],
                                        opacity: [0.5, 1, 0.5] 
                                    } : { height: 4 }}
                                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                                />
                            ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                        <button
                          onClick={onComplete}
                          className="px-8 py-3 bg-green-500 text-black font-bold uppercase tracking-widest hover:bg-green-400 transition-all shadow-[0_0_20px_rgba(0,255,0,0.4)] rounded"
                        >
                          Restore Our Reality
                        </button>
                    </div>
                </motion.div>
            )}
          </section>

          {/* Section 2: The Photo Puzzle */}
          <section className="bg-slate-900/50 p-4 md:p-8 border border-green-500/30 rounded-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2 text-[10px] text-green-700 border border-green-900 m-2">SYSTEM: RECOVER_IMAGES</div>
            
            <h3 className="text-center mb-8 text-green-400 text-lg md:text-xl tracking-widest uppercase">
                {gameWon ? "MEMORIES RESTORED" : "MATCH TO COLORIZE MEMORIES"}
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto perspective-1000">
              {cards.map((card, index) => {
                const isFlipped = flipped.includes(index) || solved.includes(index);
                const isSolved = solved.includes(index);
                
                return (
                  <motion.div
                    key={`${card.uniqueId}-${index}`}
                    onClick={() => handleCardClick(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="aspect-square relative cursor-pointer"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Front (Hidden) */}
                    <div 
                        className="absolute inset-0 bg-slate-800 border-2 border-green-900 flex items-center justify-center rounded-lg backface-hidden"
                        style={{ backfaceVisibility: 'hidden' }}
                    >
                         <RefreshCcw className="text-green-800 animate-spin-slow opacity-50" size={32} />
                    </div>

                    {/* Back (Photo) */}
                    <div 
                        className={`absolute inset-0 bg-white p-2 rounded-lg shadow-xl transform rotate-180 flex items-center justify-center overflow-hidden border-2 transition-colors duration-1000 ${isSolved ? 'border-white' : 'border-green-500'}`}
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                         <img 
                            src={card.url} 
                            alt="Memory" 
                            className={`w-full h-full object-cover rounded transition-all duration-1000 ${isSolved ? 'grayscale-0' : 'grayscale opacity-60'}`}
                         />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Section 3: Reward - REMOVED (Moved to Section 1) */}
        </div>
      </div>
    </motion.div>
  );
};

export default UniverseChaos;