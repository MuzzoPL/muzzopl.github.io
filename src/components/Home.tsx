import React from 'react';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';
import { User, Trophy } from 'lucide-react';

const Home: React.FC = () => {
  const { setMode, setPhase } = useGame();

  const handleSelectMode = (mode: 'free' | 'ranked') => {
    setMode(mode);
    setPhase('setup');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass rounded-3xl p-8 flex flex-col items-center gap-6"
    >
      <div className="text-center space-y-2">
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          O Impostor
        </h1>
        <p className="text-slate-300 text-sm">Descubra quem é o intruso entre vocês.</p>
      </div>

      <div className="w-full space-y-4 mt-4">
        <button 
          onClick={() => handleSelectMode('free')}
          className="w-full relative group overflow-hidden rounded-2xl p-6 bg-slate-800 hover:bg-slate-700 transition-all border border-slate-600 hover:border-blue-400 shadow-lg"
        >
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
              <User size={24} />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold text-white">Modo Livre</h3>
              <p className="text-xs text-slate-400">Jogue direto, sem pontuação, apenas diversão rápida.</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        <button 
          onClick={() => handleSelectMode('ranked')}
          className="w-full relative group overflow-hidden rounded-2xl p-6 bg-slate-800 hover:bg-slate-700 transition-all border border-slate-600 hover:border-amber-400 shadow-lg"
        >
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400">
              <Trophy size={24} />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold text-white">Modo Ranqueado</h3>
              <p className="text-xs text-slate-400">Partidas por rodadas com pontuação acumulativa.</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/5 to-amber-600/0 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </motion.div>
  );
};

export default Home;
