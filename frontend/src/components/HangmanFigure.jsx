import React from 'react';
import './HangmanFigure.css';

const HangmanFigure = ({ stressLevel, maxStress }) => {
    return (
        <div className="hangman-wrapper">
            <div className="hologram-effect">
                {/* Grid background handled in CSS now, but we keep structure if needed */}
                <div className="holo-scanline"></div>

                <svg viewBox="0 0 240 300" className="hangman-svg">
                    <defs>
                        <filter id="neon-glow" height="300%" width="300%" x="-75%" y="-75%">
                            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <linearGradient id="cyber-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00ff41" />
                            <stop offset="100%" stopColor="#00f0ff" />
                        </linearGradient>
                        <mask id="glitch-mask">
                            <rect x="0" y="0" width="100%" height="100%" fill="white" />
                            <rect x="0" y="50" width="100%" height="5" fill="black">
                                <animate attributeName="y" values="0;300;0" dur="2s" repeatCount="indefinite" />
                            </rect>
                        </mask>
                    </defs>

                    {/* Base Platform - Neon Grid Style */}
                    <path
                        d="M20,280 L220,280 M40,280 L200,280"
                        className="structure-base"
                        filter="url(#neon-glow)"
                    />

                    {/* Pole Structure */}
                    {stressLevel >= 1 && (
                        <path
                            d="M60,280 L60,40 L160,40"
                            className="structure-pole"
                            filter="url(#neon-glow)"
                        />
                    )}

                    {/* Rope - Digital Data Stream */}
                    {stressLevel >= 2 && (
                        <line
                            x1="160" y1="40" x2="160" y2="80"
                            className="structure-rope"
                            strokeDasharray="4 2"
                        />
                    )}

                    {/* Victim - The 'Signal' being lost */}
                    <g className="victim-figure" filter="url(#neon-glow)">
                        {stressLevel >= 3 && (
                            <circle cx="160" cy="100" r="20" className="figure-part head" />
                        )}
                        {stressLevel >= 4 && (
                            <line x1="160" y1="120" x2="160" y2="200" className="figure-part body" />
                        )}
                        {stressLevel >= 5 && (
                            <g>
                                <line x1="160" y1="140" x2="130" y2="180" className="figure-part arm-l" />
                                <line x1="160" y1="140" x2="190" y2="180" className="figure-part arm-r" />
                            </g>
                        )}
                        {stressLevel >= 6 && (
                            <g>
                                <line x1="160" y1="200" x2="130" y2="250" className="figure-part leg-l" />
                                <line x1="160" y1="200" x2="190" y2="250" className="figure-part leg-r" />
                            </g>
                        )}
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default HangmanFigure;
