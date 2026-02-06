import React, { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import EmotionMeter from './EmotionMeter';
import HangmanFigure from './HangmanFigure';
import './GameCanvas.css';

const GameCanvas = ({
    targetWord = "PYTHON",
    hint = "A serpent that swallows data whole.",
    onGameOver,
    mode = "STORY"
}) => {
    const [guessedLetters, setGuessedLetters] = useState(new Set());
    const [stressLevel, setStressLevel] = useState(0);
    const [battleMsg, setBattleMsg] = useState('');
    const maxStress = 6; // Standard hangman limit

    // Alphabet for keyboard
    const [displayAlphabet, setDisplayAlphabet] = useState("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));
    const wordSet = new Set(targetWord.toUpperCase().split(""));

    // Socket ref
    const [socket, setSocket] = useState(null);

    // Battle Mode: Socket Connection
    useEffect(() => {
        if (mode === 'BATTLE') {
            const newSocket = io('http://localhost:3000');
            setSocket(newSocket);

            newSocket.on('connect', () => {
                console.log("Connected to Battle Server");
                newSocket.emit('join_room', 'arena_1'); // Default room
                setBattleMsg('LINK ESTABLISHED');
            });

            newSocket.on('player_joined', () => {
                setBattleMsg('OPPONENT DETECTED');
            });

            newSocket.on('receive_attack', ({ attackType }) => {
                setBattleMsg(`WARNING: ${attackType} RECEIVED`);
                // Visual glitch effect could trigger here
                // For now, let's just increase stress slightly as a penalty
                setStressLevel(prev => Math.min(prev + 1, maxStress));
            });

            return () => newSocket.disconnect();
        }
    }, [mode, maxStress]);

    // Chaos Mode: Shuffle keys periodically
    useEffect(() => {
        if (mode === 'CHAOS') {
            const interval = setInterval(() => {
                setDisplayAlphabet(prev => [...prev].sort(() => Math.random() - 0.5));
            }, 5000); // Shuffle every 5 seconds
            return () => clearInterval(interval);
        } else {
            // Reset to standard order if not chaos
            setDisplayAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));
        }
    }, [mode]);

    const handleGuess = useCallback((letter) => {
        if (guessedLetters.has(letter) || stressLevel >= maxStress) return;

        const newGuessed = new Set(guessedLetters);
        newGuessed.add(letter);
        setGuessedLetters(newGuessed);

        if (!wordSet.has(letter)) {
            setStressLevel(prev => {
                const newStress = prev + 1;
                if (newStress >= maxStress) {
                    onGameOver('lost');
                }
                return newStress;
            });
        } else {
            // Check win condition
            const isWon = targetWord.split("").every(l => newGuessed.has(l));
            if (isWon) {
                // Battle Mode: Sent Attack!
                if (mode === 'BATTLE' && socket) {
                    socket.emit('attack_opponent', { roomId: 'arena_1', attackType: 'GLITCH_BOMB' });
                }
                onGameOver('won');
            }
        }
    }, [guessedLetters, stressLevel, targetWord, onGameOver, wordSet, mode, socket, maxStress]);

    // Keyboard support - Always standard A-Z mapping even if visuals shuffle
    useEffect(() => {
        const handleKeyDown = (e) => {
            const char = e.key.toUpperCase();
            if ("ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(char)) {
                handleGuess(char);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleGuess]);

    return (
        <div className="game-canvas">
            <div className="crt-screen">
                <div className="hint-display">
                    <span className="hint-label">DECRYPTION_HINT [{mode}_PROTOCOL]:</span>
                    <span className="hint-text">"{hint}"</span>
                    {battleMsg && <div className="battle-alert">{battleMsg}</div>}
                </div>

                <div className="visuals-container">
                    <HangmanFigure stressLevel={stressLevel} maxStress={maxStress} />
                    <EmotionMeter stressLevel={stressLevel} maxStress={maxStress} />
                </div>

                <div className="word-display">
                    {targetWord.split("").map((letter, idx) => (
                        <span key={idx} className={`letter-slot ${guessedLetters.has(letter) ? 'revealed' : ''}`}>
                            {guessedLetters.has(letter) ? letter : ''}
                        </span>
                    ))}
                </div>

                <div className="virtual-keyboard">
                    {displayAlphabet.map((letter) => {
                        const isGuessed = guessedLetters.has(letter);
                        const isCorrect = wordSet.has(letter);
                        let btnClass = "key-btn";
                        if (isGuessed) {
                            btnClass += isCorrect ? " correct" : " wrong";
                        }

                        return (
                            <button
                                key={letter}
                                className={btnClass}
                                onClick={() => handleGuess(letter)}
                                disabled={isGuessed || stressLevel >= maxStress}
                            >
                                {letter}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default GameCanvas;
