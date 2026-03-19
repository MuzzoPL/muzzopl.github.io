import React, { useState, useEffect } from 'react';
import { useGame, type Player } from '../context/GameContext';
import { motion } from 'framer-motion';
import { Users, Settings, UserPlus, Play } from 'lucide-react';

const Setup: React.FC = () => {
  const { mode, settings, updateSettings, setPlayers, setPhase } = useGame();
  
  const [localPlayers, setLocalPlayers] = useState<string[]>(
    Array(settings.totalPlayers).fill('').map((_, i) => `Jogador ${i + 1}`)
  );

  // Sync settings totalPlayers with names array
  useEffect(() => {
    setLocalPlayers(prev => {
      const newArr = [...prev];
      if (settings.totalPlayers > prev.length) {
        for(let i=prev.length; i<settings.totalPlayers; i++) newArr.push(`Jogador ${i + 1}`);
      } else if (settings.totalPlayers < prev.length) {
        newArr.splice(settings.totalPlayers);
      }
      return newArr;
    });
  }, [settings.totalPlayers]);

  const handleTotalPlayersChange = (change: number) => {
    const newTotal = Math.max(3, Math.min(8, settings.totalPlayers + change));
    // If the new total makes impostors amount invalid, lower it automatically
    const maxImpostorsAllowed = Math.max(1, Math.floor(newTotal / 2));
    const newImpostors = settings.impostors > maxImpostorsAllowed ? maxImpostorsAllowed : settings.impostors;
    
    updateSettings({ totalPlayers: newTotal, impostors: newImpostors });
  };

  const handleImpostorsChange = (change: number) => {
    const maxImpostorsAllowed = Math.max(1, Math.floor(settings.totalPlayers / 2));
    const newImpostors = Math.max(1, Math.min(maxImpostorsAllowed, settings.impostors + change));
    updateSettings({ impostors: newImpostors });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlayers: Player[] = localPlayers.map((name, i) => ({
      id: `p_${i}`,
      name: mode === 'ranked' ? name.trim() || `Jogador ${i+1}` : `Jogador ${i+1}`,
      role: null,
      score: 0
    }));
    
    setPlayers(newPlayers);
    setPhase('theme_selection');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="glass rounded-3xl p-6 flex flex-col gap-6"
    >
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <Settings className="text-blue-400" />
        <h2 className="text-2xl font-bold">Configuração</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-2">
              <Users size={20} className="text-slate-400" />
              <span className="font-medium">Jogadores</span>
            </div>
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => handleTotalPlayersChange(-1)} className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 active:scale-95 transition-all flex items-center justify-center font-bold" disabled={settings.totalPlayers <= 3}>-</button>
              <span className="w-4 text-center font-bold text-lg">{settings.totalPlayers}</span>
              <button type="button" onClick={() => handleTotalPlayersChange(1)} className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 active:scale-95 transition-all flex items-center justify-center font-bold" disabled={settings.totalPlayers >= 8}>+</button>
            </div>
          </div>

          <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-2">
              <UserPlus size={20} className="text-secondary" />
              <div className="flex flex-col">
                <span className="font-medium">Impostores</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wide">Máximo: {Math.max(1, Math.floor(settings.totalPlayers / 2))}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => handleImpostorsChange(-1)} className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 active:scale-95 transition-all flex items-center justify-center font-bold" disabled={settings.impostors <= 1}>-</button>
              <span className="w-4 text-center font-bold text-lg text-secondary">{settings.impostors}</span>
              <button type="button" onClick={() => handleImpostorsChange(1)} className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 active:scale-95 transition-all flex items-center justify-center font-bold" disabled={settings.impostors >= Math.max(1, Math.floor(settings.totalPlayers / 2))}>+</button>
            </div>
          </div>

          {mode === 'ranked' && (
            <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
              <div className="flex items-center gap-2">
                <Play size={20} className="text-amber-400" />
                <span className="font-medium">Rodadas</span>
              </div>
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => updateSettings({ rounds: settings.rounds - 1 })} className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 active:scale-95 transition-all flex items-center justify-center font-bold" disabled={settings.rounds <= 3}>-</button>
                <span className="w-4 text-center font-bold text-lg text-amber-500">{settings.rounds}</span>
                <button type="button" onClick={() => updateSettings({ rounds: settings.rounds + 1 })} className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 active:scale-95 transition-all flex items-center justify-center font-bold" disabled={settings.rounds >= 10}>+</button>
              </div>
            </div>
          )}
        </div>

        {mode === 'ranked' && (
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Nomes dos Jogadores</h3>
            <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2 scrollbar-thin">
              {localPlayers.map((name, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={name}
                  onChange={(e) => {
                    const newArr = [...localPlayers];
                    newArr[idx] = e.target.value;
                    setLocalPlayers(newArr);
                  }}
                  className="bg-slate-900 border border-slate-700/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600"
                  placeholder={`Jogador ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        <button 
          type="submit"
          className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg shadow-lg hover:shadow-blue-500/25 transition-all mt-4"
        >
          Avançar
        </button>
      </form>
    </motion.div>
  );
};

export default Setup;
