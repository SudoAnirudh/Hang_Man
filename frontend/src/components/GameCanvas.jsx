import React, { useState, useEffect, useCallback } from 'react';
import EmotionMeter from './EmotionMeter';
import './GameCanvas.css';

const GameCanvas = ({
    targetWord = "PYTHON",
    hint = "A serpent that swallows data whole.",
    onGameOver
}) => {
    const [guessedLetters, setGuessedLetters] = useState(new Set());
    const [stressLevel, setStressLevel] = useState(0);
    const maxStress = 6; // Standard hangman limit

    // Alphabet for keyboard
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const wordSet = new Set(targetWord.toUpperCase().split(""));

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
                onGameOver('won');
            }
        }
    }, [guessedLetters, stressLevel, targetWord, onGameOver, wordSet]);

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e) => {
            const char = e.key.toUpperCase();
            if (alphabet.includes(char)) {
                handleGuess(char);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleGuess, alphabet]);

    return (
        <div className="game-canvas">
            <div className="hint-display">
                <span className="hint-label">DECRYPTION_HINT:</span>
                <span className="hint-text">"{hint}"</span>
            </div>

            <EmotionMeter stressLevel={stressLevel} maxStress={maxStress} />

            <div className="word-display">
                {targetWord.split("").map((letter, idx) => (
                    <span key={idx} className={`letter-slot ${guessedLetters.has(letter) ? 'revealed' : ''}`}>
                        {guessedLetters.has(letter) ? letter : ''}
                    </span>
                ))}
            </div>

            <div className="virtual-keyboard">
                {alphabet.map((letter) => {
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
    );
};

export default GameCanvas;
