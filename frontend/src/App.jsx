import { useState } from 'react';
import GameCanvas from './components/GameCanvas';
import ModeSelector from './components/ModeSelector';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('menu'); // menu, setup, playing, won, lost
  const [currentMode, setCurrentMode] = useState(null);

  // Custom data
  const [customWord, setCustomWord] = useState('');
  const [customHint, setCustomHint] = useState('');

  const handleSelectMode = (modeId) => {
    setCurrentMode(modeId);
    if (modeId === 'CREATOR') {
      setGameState('setup');
    } else {
      setGameState('playing');
    }
  };

  const handleCreatorSubmit = (e) => {
    e.preventDefault();
    if (customWord.trim()) {
      setGameState('playing');
    }
  };

  const handleGameOver = (result) => {
    setGameState(result);
  };

  const handleBackToMenu = () => {
    setGameState('menu');
    setCurrentMode(null);
    setCustomWord('');
    setCustomHint('');
  };

  // Determine game parameters
  const getGameParams = () => {
    if (currentMode === 'CREATOR') {
      return { word: customWord.toUpperCase(), hint: customHint || "NO_DATA" };
    }
    return { word: "CYBERPUNK", hint: "High-tech low-life." };
  };

  const gameParams = getGameParams();

  return (
    <div className="app-container">
      <header className="game-header">
        <h1 className="glitch-text" data-text="MISSION: DEFUSE">MISSION: DEFUSE</h1>
        <div className="status-bar">
          <span className="status-item">CONN__SECURE</span>
          <span className="status-item text-primary">SYS__READY</span>
          {currentMode && <span className="status-item" style={{ color: 'var(--color-secondary)' }}>MODE: {currentMode}</span>}
        </div>
      </header>

      <main className="game-viewport">
        {gameState === 'menu' && (
          <ModeSelector onSelectMode={handleSelectMode} />
        )}

        {gameState === 'setup' && (
          <div className="menu-screen">
            <h2>CONFIGURE PAYLOAD</h2>
            <form onSubmit={handleCreatorSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input
                type="text"
                placeholder="ENTER TARGET WORD"
                value={customWord}
                onChange={(e) => setCustomWord(e.target.value)}
                className="cyber-input"
                required
              />
              <input
                type="text"
                placeholder="ENTER HINT (OPTIONAL)"
                value={customHint}
                onChange={(e) => setCustomHint(e.target.value)}
                className="cyber-input"
              />
              <button type="submit" className="btn-primary">UPLOAD_VIRUS</button>
              <button type="button" className="btn-primary"
                style={{ borderColor: 'var(--color-text-muted)', color: 'var(--color-text-muted)' }}
                onClick={handleBackToMenu}>
                CANCEL
              </button>
            </form>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="playing-container" style={{ width: '100%', height: '100%' }}>
            <GameCanvas
              targetWord={gameParams.word}
              hint={gameParams.hint}
              onGameOver={handleGameOver}
              mode={currentMode}
            />
          </div>
        )}

        {(gameState === 'won' || gameState === 'lost') && (
          <div className="menu-screen">
            <h2 className={gameState === 'won' ? 'text-primary' : 'text-danger'}>
              {gameState === 'won' ? 'MISSION SUCCESSFUL' : 'CRITICAL FAILURE'}
            </h2>
            <p className="mission-brief">
              {gameState === 'won'
                ? 'Signal decrypted. System integrity restored.'
                : 'Core overload. Connection terminated.'}
            </p>
            <button className="btn-primary" onClick={() => setGameState('playing')}>
              RETRY_PROTOCOL
            </button>
            <br /><br />
            <button className="btn-primary" style={{ borderColor: 'var(--color-text-muted)', color: 'var(--color-text-muted)' }} onClick={handleBackToMenu}>
              RETURN_TO_BASE
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
