import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { themes } from '../data/themes';
import type { Theme } from '../data/themes';
import { motion } from 'framer-motion';
import { CheckCircle2, LayoutGrid } from 'lucide-react';

const ThemeSelection: React.FC = () => {
  const { mode, settings, setSelectedThemes, startGame } = useGame();
  const [localSelection, setLocalSelection] = useState<Theme[]>([]);

  const requiredThemes = mode === 'ranked' ? settings.rounds : 1;

  const toggleTheme = (theme: Theme) => {
    if (localSelection.find(t => t.id === theme.id)) {
      setLocalSelection(localSelection.filter(t => t.id !== theme.id));
    } else {
      if (localSelection.length < requiredThemes) {
        setLocalSelection([...localSelection, theme]);
      }
    }
  };

  const handleStart = () => {
    if (localSelection.length === requiredThemes) {
      setSelectedThemes(localSelection);
      startGame();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass rounded-3xl p-6 flex flex-col gap-6 max-h-[90vh] overflow-hidden"
    >
      <div className="flex flex-col gap-1 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <LayoutGrid className="text-purple-400" />
          <h2 className="text-2xl font-bold">Escolha os Temas</h2>
        </div>
        <p className="text-slate-400 text-sm">
          Selecione {requiredThemes} {requiredThemes === 1 ? 'tema' : 'temas'}. 
          ({localSelection.length}/{requiredThemes})
        </p>
      </div>

      <div className="overflow-y-auto pr-2 grid grid-cols-2 gap-3 pb-4 scrollbar-thin">
        {themes.map(theme => {
          const isSelected = localSelection.some(t => t.id === theme.id);
          const isDisabled = !isSelected && localSelection.length >= requiredThemes;

          return (
            <button
              key={theme.id}
              onClick={() => toggleTheme(theme)}
              disabled={isDisabled}
              className={`
                relative p-4 rounded-2xl border text-left transition-all overflow-hidden group
                ${isSelected 
                  ? 'bg-purple-600/20 border-purple-500 shadow-lg shadow-purple-500/20' 
                  : 'bg-slate-800/50 border-slate-700 hover:border-slate-500'}
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <span className={`font-bold ${isSelected ? 'text-purple-300' : 'text-slate-300'}`}>
                {theme.name}
              </span>
              
              {isSelected && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 text-purple-400"
                >
                  <CheckCircle2 size={16} />
                </motion.div>
              )}
            </button>
          );
        })}
      </div>

      <button 
        onClick={handleStart}
        disabled={localSelection.length < requiredThemes}
        className={`
          w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all
          ${localSelection.length === requiredThemes 
            ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/25' 
            : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
        `}
      >
        Iniciar Jogo
      </button>
    </motion.div>
  );
};

export default ThemeSelection;
