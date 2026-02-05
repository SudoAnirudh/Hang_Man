import { useState } from 'react';
import GameCanvas from './components/GameCanvas';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('menu'); // menu, playing, won, lost

  const handleGameOver = (result) => {
    setGameState(result);
  };

  return (
    <div className="app-container">
      <header className="game-header">
        <h1 className="glitch-text" data-text="MISSION: DEFUSE">MISSION: DEFUSE</h1>
        <div className="status-bar">
          <span className="status-item">CONN__SECURE</span>
          <span className="status-item text-primary">SYS__READY</span>
        </div>
      </header>

      <main className="game-viewport">
        {gameState === 'menu' && (
          <div className="menu-screen">
            <p className="mission-brief">
              TARGET: Decrypt the signal before the timer expires.
              <br />
              STATUS: Awaiting input...
            </p>
            <button className="btn-primary" onClick={() => setGameState('playing')}>
              INITIATE_SEQUENCE
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <GameCanvas
            targetWord="CYBERPUNK"
            hint="High tech, low life."
            onGameOver={handleGameOver}
          />
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
            <button className="btn-primary" style={{ borderColor: 'var(--color-text-muted)', color: 'var(--color-text-muted)' }} onClick={() => setGameState('menu')}>
              RETURN_TO_BASE
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
