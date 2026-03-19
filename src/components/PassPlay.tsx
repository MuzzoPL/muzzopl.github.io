import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Shuffle } from 'lucide-react';

type PlayPhase = 'standby' | 'countdown' | 'reveal';

const PassPlay: React.FC = () => {
  const { players, currentPlayerIndex, currentTheme, selectedWord, changeWord, nextPlayerReveal } = useGame();
  
  const [playPhase, setPlayPhase] = useState<PlayPhase>('standby');
  const [countdown, setCountdown] = useState(5);
  
  const currentPlayer = players[currentPlayerIndex];
  const isFirstPlayer = currentPlayerIndex === 0;

  const startCountdown = () => {
    setPlayPhase('countdown');
    setCountdown(5);
    
    let time = 5;
    const interval = setInterval(() => {
      time -= 1;
      setCountdown(time);
      if (time <= 0) {
        clearInterval(interval);
        setPlayPhase('reveal');
      }
    }, 1000);
  };

  const handleNext = () => {
    setPlayPhase('standby');
    nextPlayerReveal();
  };

  const handleChangeWord = () => {
    if (confirm("Tem certeza que deseja trocar a palavra para todos?")) {
      changeWord();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {playPhase === 'standby' && (
        <motion.div 
          key="standby"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="glass rounded-3xl p-8 text-center flex flex-col items-center gap-8"
        >
          <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 mb-2">
            <EyeOff size={40} />
          </div>
          
          <div className="space-y-2">
            <p className="text-slate-400 uppercase tracking-widest text-sm font-bold">Passe o dispositivo para</p>
            <h2 className="text-4xl font-extrabold text-white">{currentPlayer.name}</h2>
          </div>

          <button 
            onClick={startCountdown}
            className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg shadow-lg shadow-blue-500/25 transition-all mt-4"
          >
            Estou com o celular
          </button>
        </motion.div>
      )}

      {playPhase === 'countdown' && (
        <motion.div 
          key="countdown"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.5, opacity: 0 }}
          className="flex items-center justify-center h-64"
        >
          <div className="relative flex items-center justify-center">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle cx="96" cy="96" r="88" className="stroke-slate-800" strokeWidth="12" fill="none" />
              <circle 
                cx="96" cy="96" r="88" 
                className="stroke-blue-500 transition-all duration-1000 linear" 
                strokeWidth="12" fill="none" 
                strokeDasharray="553" 
                strokeDashoffset={553 - (553 * countdown) / 5} 
              />
            </svg>
            <span className="absolute text-6xl font-black text-white">{countdown}</span>
          </div>
        </motion.div>
      )}

      {playPhase === 'reveal' && (
        <motion.div 
          key="reveal"
          initial={{ opacity: 0, rotateX: 90 }}
          animate={{ opacity: 1, rotateX: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4 }}
          className="glass rounded-3xl p-8 flex flex-col items-center gap-6"
        >
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
            <Eye size={32} />
          </div>

          <div className="text-center space-y-4 w-full">
            <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider">Sua Identidade</h3>
            
            {currentPlayer.role === 'impostor' ? (
              <div className="bg-secondary/20 border border-secondary/50 rounded-2xl p-6 shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                <h2 className="text-4xl font-extrabold text-secondary mb-2">IMPOSTOR</h2>
                <p className="text-slate-300">Você não sabe a palavra.</p>
                <div className="mt-4 pt-4 border-t border-secondary/30">
                  <span className="text-xs text-secondary/70 uppercase">O Tema é</span>
                  <p className="text-xl font-bold text-white">{currentTheme?.name}</p>
                </div>
              </div>
            ) : (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-blue-400 mb-2">Você é Normal</h2>
                <div className="mt-4 pt-4 border-t border-blue-500/20">
                  <span className="text-xs text-blue-400/70 uppercase">A Palavra é</span>
                  <p className="text-3xl font-extrabold text-white mt-1">{selectedWord}</p>
                </div>
              </div>
            )}
          </div>

          <div className="w-full flex flex-col gap-3 mt-4">
            {isFirstPlayer && (
              <button 
                onClick={handleChangeWord}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium flex items-center justify-center gap-2 transition-colors border border-slate-700"
              >
                <Shuffle size={18} />
                Trocar Palavra
              </button>
            )}
            
            <button 
              onClick={handleNext}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg shadow-lg shadow-emerald-500/25 transition-all"
            >
              {currentPlayerIndex < players.length - 1 ? 'Próximo Jogador' : 'Iniciar Discussão'}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PassPlay;
