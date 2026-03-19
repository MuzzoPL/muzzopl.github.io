import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';
import { Trophy, RefreshCw, Settings, LayoutGrid, Users, Eye } from 'lucide-react';

const EndRound: React.FC = () => {
  const { mode, phase, players, currentRound, awardPoints, startNextRound, resetGame, setPhase } = useGame();
  
  const [revealed, setRevealed] = useState(false);
  const [awarded, setAwarded] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
  };

  const handleAward = (winner: 'normals' | 'impostors') => {
    awardPoints(winner);
    setAwarded(true);
  };

  const handleRestart = () => {
    resetGame();
  };

  const handleRedefine = () => {
    setPhase('setup');
  };

  const handleBackToThemes = () => {
    setPhase('theme_selection');
  };

  const impostorsList = players.filter(p => p.role === 'impostor');
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const isGameOver = phase === 'end_game';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-3xl p-8 flex flex-col gap-6"
    >
      <div className="text-center space-y-2 border-b border-white/10 pb-6">
        {mode === 'ranked' && !awarded && !isGameOver ? (
          <>
            <h2 className="text-3xl font-extrabold text-white">Fim da Rodada {currentRound}</h2>
            <p className="text-slate-400">Hora de descobrir a verdade.</p>
          </>
        ) : (
          <>
            <Trophy className="mx-auto text-amber-500 mb-4" size={48} />
            <h2 className="text-3xl font-extrabold text-white">
              {isGameOver ? 'Fim de Jogo!' : `Rodada ${currentRound} Finalizada`}
            </h2>
          </>
        )}
      </div>

      {mode === 'ranked' && !isGameOver && !awarded && !revealed && (
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          <Eye size={48} className="text-slate-500" />
          <h3 className="text-xl font-bold text-center text-slate-300">Tempo de discussão encerrado!</h3>
          <p className="text-center text-slate-500 text-sm mb-4">Já decidiram quem vocês acham que é o impostor?</p>
          
          <button 
            onClick={handleReveal}
            className="w-full py-4 rounded-2xl bg-secondary/20 border border-secondary hover:bg-secondary hover:text-white transition-all group flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.2)] font-bold text-lg"
          >
            Revelar Impostor
          </button>
        </div>
      )}

      {mode === 'ranked' && !isGameOver && !awarded && revealed && (
        <div className="space-y-6">
          <div className="bg-secondary/10 border border-secondary/30 rounded-2xl p-6 text-center shadow-inner">
            <h3 className="text-sm uppercase tracking-wider text-secondary/80 font-bold mb-2">Quem era o Impostor?</h3>
            <div className="flex flex-col gap-2">
              {impostorsList.map((imp, i) => (
                <span key={i} className="text-3xl font-extrabold text-white">{imp.name}</span>
              ))}
            </div>
          </div>

          <div className="text-center space-y-3">
             <h3 className="text-slate-300 font-medium">Quem pontuou nesta rodada?</h3>
             <div className="grid grid-cols-2 gap-4">
               <button 
                 onClick={() => handleAward('normals')}
                 className="p-4 rounded-2xl bg-blue-600/20 border border-blue-500 hover:bg-blue-600 hover:text-white transition-all group flex flex-col items-center gap-2"
               >
                 <Users size={28} className="text-blue-400 group-hover:text-white" />
                 <span className="font-bold text-sm">Normais Venceram</span>
                 <span className="text-xs opacity-70">Todos ganham +1</span>
               </button>
               
               <button 
                 onClick={() => handleAward('impostors')}
                 className="p-4 rounded-2xl bg-secondary/20 border border-secondary hover:bg-secondary hover:text-white transition-all group flex flex-col items-center gap-2"
               >
                 <User size={28} className="text-secondary group-hover:text-white" />
                 <span className="font-bold text-sm">Impostor Venceu</span>
                 <span className="text-xs opacity-70">Ganha +3</span>
               </button>
             </div>
          </div>
        </div>
      )}

      {(mode === 'free' || (mode === 'ranked' && (awarded || isGameOver))) && (
        <div className="space-y-6">
          {mode === 'ranked' && (
            <div className="bg-slate-900/50 rounded-2xl p-4 space-y-3">
              <h3 className="text-sm font-bold text-slate-400 uppercase text-center mb-2">Placar da Rodada</h3>
              {sortedPlayers.map((p, idx) => {
                const gained = p.lastGained && p.lastGained > 0;
                return (
                  <div key={p.id} className="relative flex items-center justify-between p-3 rounded-xl bg-slate-800/80 overflow-hidden">
                    {/* Visual Bar Background */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 bg-blue-500/10 z-0" 
                      style={{ width: `${Math.min(100, (p.score / (currentRound * 3)) * 100)}%` }} 
                    />
                    
                    <div className="flex items-center gap-3 relative z-10">
                      <span className={`font-black ${idx === 0 && p.score > 0 ? 'text-amber-400' : 'text-slate-500'}`}>
                        {idx + 1}º
                      </span>
                      <span className="font-medium text-white">{p.name} {p.role === 'impostor' && <span className="text-secondary/50 text-xs ml-1">(Impostor)</span>}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 relative z-10">
                      {awarded && gained && (
                        <motion.span 
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-emerald-400 font-bold text-sm mr-2"
                        >
                          +{p.lastGained}
                        </motion.span>
                      )}
                      <span className="text-xl font-bold">{p.score}</span>
                      <span className="text-xs text-slate-400">pts</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {mode === 'ranked' && !isGameOver && awarded && (
            <button 
              onClick={() => { setRevealed(false); setAwarded(false); startNextRound(); }}
              className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg shadow-lg flex justify-center items-center gap-2"
            >
              <RefreshCw size={20} />
              Próxima Rodada
            </button>
          )}

          {(mode === 'free' || isGameOver) && (
            <div className="space-y-3 pt-4 border-t border-white/10">
               {isGameOver && mode === 'ranked' && (
                 <div className="bg-amber-500/20 border border-amber-500/50 p-4 rounded-xl text-center mb-6">
                    <h3 className="text-amber-400 font-extrabold text-2xl uppercase">Campeão!</h3>
                    <p className="text-white text-3xl font-black mt-1">{sortedPlayers[0]?.name}</p>
                 </div>
               )}
              <button 
                onClick={handleRestart}
                className="w-full py-4 rounded-2xl bg-slate-700 hover:bg-slate-600 text-white font-bold shadow-lg flex justify-center items-center gap-2"
              >
                <RefreshCw size={20} />
                Reiniciar (Início do App)
              </button>
              
              <button 
                onClick={handleRedefine}
                className="w-full py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold border border-slate-700 flex justify-center items-center gap-2"
              >
                <Settings size={20} />
                Mudar Jogadores
              </button>

              <button 
                onClick={handleBackToThemes}
                className="w-full py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold border border-slate-700 flex justify-center items-center gap-2"
              >
                <LayoutGrid size={20} />
                Voltar aos Temas
              </button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

import { User } from 'lucide-react';

export default EndRound;
