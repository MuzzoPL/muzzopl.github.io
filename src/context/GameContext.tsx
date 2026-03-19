import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { themes } from '../data/themes';
import type { Theme } from '../data/themes';

export type GameMode = 'free' | 'ranked' | null;
export type GamePhase = 'home' | 'setup' | 'theme_selection' | 'pass_play' | 'end_round' | 'end_game';
export type Role = 'normal' | 'impostor' | null;

export interface Player {
  id: string;
  name: string;
  role: Role;
  score: number;
  lastGained?: number;
}

export interface GameSettings {
  totalPlayers: number;
  impostors: number;
  rounds: number;
}

interface GameContextProps {
  mode: GameMode;
  phase: GamePhase;
  players: Player[];
  settings: GameSettings;
  currentRound: number;
  selectedThemes: Theme[];
  currentTheme: Theme | null;
  selectedWord: string | null;
  currentPlayerIndex: number;
  setMode: (mode: GameMode) => void;
  setPhase: (phase: GamePhase) => void;
  setPlayers: (players: Player[]) => void;
  updateSettings: (settings: Partial<GameSettings>) => void;
  setSelectedThemes: (themes: Theme[]) => void;
  startGame: () => void;
  startNextRound: () => void;
  changeWord: () => void;
  awardPoints: (winner: 'normals' | 'impostors') => void;
  resetGame: () => void;
  nextPlayerReveal: () => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<GameMode>(null);
  const [phase, setPhase] = useState<GamePhase>('home');
  const [players, setPlayers] = useState<Player[]>([]);
  const [settings, setSettings] = useState<GameSettings>({ totalPlayers: 4, impostors: 1, rounds: 3 });
  const [currentRound, setCurrentRound] = useState(1);
  const [selectedThemes, setSelectedThemes] = useState<Theme[]>([]);
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const updateSettings = (newSettings: Partial<GameSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const assignRolesAndWord = (roundTheme: Theme, currentPlayers: Player[]) => {
    const randomWord = roundTheme.words[Math.floor(Math.random() * roundTheme.words.length)];
    setSelectedWord(randomWord);

    const shuffledPlayers = [...currentPlayers].sort(() => Math.random() - 0.5);
    const newPlayers = currentPlayers.map(p => ({ ...p, role: 'normal' as Role, lastGained: 0 }));
    
    for (let i = 0; i < settings.impostors; i++) {
      const targetPlayer = newPlayers.find(p => p.id === shuffledPlayers[i].id);
      if (targetPlayer) targetPlayer.role = 'impostor';
    }

    const rotation = (currentRound - 1) % newPlayers.length;
    const rotatedPlayers = [...newPlayers.slice(rotation), ...newPlayers.slice(0, rotation)];

    setPlayers(rotatedPlayers);
    setCurrentPlayerIndex(0);
  };

  const changeWord = () => {
    if (currentTheme) {
      const availableWords = currentTheme.words.filter(w => w !== selectedWord);
      const newWord = availableWords[Math.floor(Math.random() * availableWords.length)];
      setSelectedWord(newWord);
    }
  };

  const startGame = () => {
    setCurrentRound(1);
    const initialTheme = selectedThemes[0] || themes[0];
    setCurrentTheme(initialTheme);
    assignRolesAndWord(initialTheme, players);
    setPhase('pass_play');
  };

  const startNextRound = () => {
    const nextRound = currentRound + 1;
    if (nextRound > settings.rounds || mode === 'free') {
      setPhase('end_game');
      return;
    }
    setCurrentRound(nextRound);
    const nextTheme = selectedThemes[nextRound - 1] || themes[0];
    setCurrentTheme(nextTheme);
    assignRolesAndWord(nextTheme, players);
    setPhase('pass_play');
  };

  const awardPoints = (winner: 'normals' | 'impostors') => {
    setPlayers(prev => prev.map(p => {
      let gained = 0;
      if (winner === 'normals' && p.role === 'normal') gained = 1;
      if (winner === 'impostors' && p.role === 'impostor') gained = 3;
      return { ...p, score: p.score + gained, lastGained: gained };
    }));
    
    if (mode === 'free') {
      setPhase('end_game');
    } else {
      setPhase('end_round');
    }
  };

  const resetGame = () => {
    setPhase('home');
    setMode(null);
    setPlayers([]);
    setCurrentRound(1);
    setSelectedThemes([]);
    setCurrentTheme(null);
    setSelectedWord(null);
  };

  const nextPlayerReveal = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(prev => prev + 1);
    } else {
      setPhase('end_round');
    }
  };

  return (
    <GameContext.Provider value={{
      mode, phase, players, settings, currentRound, selectedThemes, currentTheme, selectedWord,
      currentPlayerIndex, setMode, setPhase, setPlayers, updateSettings, setSelectedThemes,
      startGame, startNextRound, changeWord, awardPoints, resetGame, nextPlayerReveal
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};
