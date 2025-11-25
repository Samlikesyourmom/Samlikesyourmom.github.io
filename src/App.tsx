import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { UniverseStage } from './types';
import UniverseFate from './components/UniverseFate';
import UniverseChaos from './components/UniverseChaos';
import UniverseHope from './components/UniverseHope';
import UniverseReal from './components/UniverseReal';
import { Disc, Music2, Minimize2, Maximize2, Play, Pause } from 'lucide-react';

// Music Player Component (MP3 Placeholder)
interface MusicPlayerProps {
  forcePause: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ forcePause }) => {
  const [minimized, setMinimized] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [wasPlayingBeforeForcePause, setWasPlayingBeforeForcePause] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Handle User Toggle
  const togglePlay = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  // Handle Force Pause (Voice Note)
  useEffect(() => {
    if (!audioRef.current) return;

    if (forcePause) {
      // Save current state
      setWasPlayingBeforeForcePause(!audioRef.current.paused);
      audioRef.current.pause();
      setPlaying(false);
    } else {
      // Resume only if it was playing before
      if (wasPlayingBeforeForcePause) {
        audioRef.current.play().catch(() => {});
        setPlaying(true);
      }
    }
  }, [forcePause]);

  useEffect(() => {
    // Attempt auto-play on mount
    if (audioRef.current) {
        audioRef.current.volume = 0.4;
        audioRef.current.play().then(() => setPlaying(true)).catch(() => console.log("Autoplay blocked"));
    }
  }, []);

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`fixed bottom-4 left-4 z-50 bg-rose-950/80 backdrop-blur-md border border-rose-500/30 rounded-full overflow-hidden shadow-2xl transition-all duration-500 flex items-center ${minimized ? 'w-12 h-12 justify-center' : 'w-auto px-4 py-2 gap-3'}`}
    >
        {/* Placeholder for your MP3 file - Removed leading slash for GH Pages support */}
        <audio ref={audioRef} src="assets/music.mp3" loop />

        {minimized ? (
            <button onClick={() => setMinimized(false)} className="text-rose-200">
                <Music2 size={20} className={playing ? "animate-pulse" : ""} />
            </button>
        ) : (
            <>
                <button onClick={togglePlay} className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-white shrink-0 shadow-lg">
                    {playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
                </button>
                <div className="flex flex-col overflow-hidden w-32">
                     <span className="text-xs font-bold text-rose-100 truncate">Our Song</span>
                     <span className="text-[10px] text-rose-300 truncate">Playing from memory...</span>
                </div>
                <button onClick={() => setMinimized(true)} className="text-rose-400 hover:text-white ml-2">
                    <Minimize2 size={14} />
                </button>
            </>
        )}
    </motion.div>
  );
};

// Simple Intro Screen Component
const IntroScreen = ({ onStart }: { onStart: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }}
    className="w-full h-full bg-black flex flex-col items-center justify-center text-white p-6 text-center relative overflow-hidden"
  >
    {/* Mobile optimized background */}
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2894&auto=format&fit=crop')] bg-cover bg-center opacity-40 blur-sm scale-110"></div>
    
    <div className="z-10 flex flex-col items-center w-full max-w-lg">
        <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-rose-200 via-pink-300 to-rose-400 drop-shadow-[0_4px_10px_rgba(255,100,150,0.5)]">
            My Beautiful<br/>
            <span className="italic text-6xl md:text-8xl font-light text-white block mt-2">Ojaswi</span>
        </h1>
        <p className="text-rose-200/80 mb-12 font-serif italic text-lg md:text-xl px-4">
            "Across every timeline, my soul searches for yours..."
        </p>
        <button 
        onClick={onStart}
        className="px-12 py-5 border border-white/30 bg-white/10 backdrop-blur-md rounded-full hover:bg-rose-500 hover:border-rose-500 text-white transition-all duration-500 uppercase tracking-[0.2em] text-sm font-bold shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95"
        >
        Enter Our Universe
        </button>
    </div>
  </motion.div>
);

const App: React.FC = () => {
  const [stage, setStage] = useState<UniverseStage>(UniverseStage.INTRO);
  const [userName, setUserName] = useState('Ojaswi'); 
  const [isGlitching, setIsGlitching] = useState(false);
  const [isVoiceNotePlaying, setIsVoiceNotePlaying] = useState(false);

  const transitionTo = (nextStage: UniverseStage, withGlitch = false) => {
    if (withGlitch) {
      setIsGlitching(true);
      setTimeout(() => {
        setStage(nextStage);
        setTimeout(() => setIsGlitching(false), 500); 
      }, 800); 
    } else {
      setStage(nextStage);
    }
  };

  const renderUniverse = () => {
    switch (stage) {
      case UniverseStage.INTRO:
        return <IntroScreen onStart={() => transitionTo(UniverseStage.FATE)} />;
      case UniverseStage.FATE:
        return (
          <UniverseFate 
            setName={setUserName} 
            onComplete={() => transitionTo(UniverseStage.CHAOS)} 
          />
        );
      case UniverseStage.CHAOS:
        return (
          <UniverseChaos 
            onComplete={() => transitionTo(UniverseStage.HOPE)} 
            onVoiceNotePlay={setIsVoiceNotePlaying}
          />
        );
      case UniverseStage.HOPE:
        return (
          <UniverseHope 
            onComplete={() => transitionTo(UniverseStage.REAL, true)} 
          />
        );
      case UniverseStage.REAL:
        return <UniverseReal userName={userName} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-[100dvh] overflow-hidden bg-black font-sans relative">
      <MusicPlayer forcePause={isVoiceNotePlaying} />

      {/* Glitch Overlay */}
      {isGlitching && (
        <div className="fixed inset-0 z-[60] bg-white pointer-events-none mix-blend-difference animate-pulse flex items-center justify-center">
             <div className="text-black text-6xl md:text-9xl font-black glitch-anim text-center leading-none px-4">
                TIMELINE<br/>COLLAPSE
             </div>
        </div>
      )}

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          className="w-full h-full"
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ duration: 1 }}
        >
          {renderUniverse()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;