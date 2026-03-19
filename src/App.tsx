import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import Home from './components/Home';
import Setup from './components/Setup';
import ThemeSelection from './components/ThemeSelection';
import PassPlay from './components/PassPlay';
import EndRound from './components/EndRound';

const GameOrchestrator: React.FC = () => {
  const { phase } = useGame();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {phase === 'home' && <Home />}
        {phase === 'setup' && <Setup />}
        {phase === 'theme_selection' && <ThemeSelection />}
        {phase === 'pass_play' && <PassPlay />}
        {(phase === 'end_round' || phase === 'end_game') && <EndRound />}
      </div>
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <GameOrchestrator />
    </GameProvider>
  );
}

export default App;
