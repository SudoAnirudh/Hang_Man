import React from 'react';
import './ModeSelector.css';

const MODES = [
    { id: 'STORY', label: 'STORY PROTOCOL', desc: 'Campaign Mode. Decrypt the narrative.' },
    { id: 'CHAOS', label: 'CHAOS ENGINE', desc: 'Unstable keys. Glitch events. Survival.' },
    { id: 'CREATOR', label: 'CREATOR NODE', desc: 'Inject custom payloads to challenge agents.' },
    { id: 'BATTLE', label: 'NET BATTLE', desc: 'PVP. 1v1 Real-time decryption race.' }
];

const ModeSelector = ({ onSelectMode }) => {
    return (
        <div className="mode-selector-container">
            <h1 className="main-title">MISSION DEFUSE <span className="version">v2.0</span></h1>
            <div className="mode-grid">
                {MODES.map((mode) => (
                    <button
                        key={mode.id}
                        className="mode-card"
                        onClick={() => onSelectMode(mode.id)}
                    >
                        <div className="mode-icon">
                            {/* Simple SVG icon placeholders suitable for cyberpunk theme */}
                            <div className={`icon-shape ${mode.id.toLowerCase()}`}></div>
                        </div>
                        <div className="mode-info">
                            <span className="mode-label">{mode.label}</span>
                            <span className="mode-desc">{mode.desc}</span>
                        </div>
                        <div className="scan-line"></div>
                    </button>
                ))}
            </div>
            <div className="status-bar">
                <span>SYSTEM: ONLINE</span>
                <span>SECURE_CONNECTION: ESTABLISHED</span>
            </div>
        </div>
    );
};

export default ModeSelector;
