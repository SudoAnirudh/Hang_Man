/**
 * Mini AI Service Stub
 * Simulates a "smart" hint generator.
 * In a real app, this would call an LLM API.
 */

const generateHint = async (word) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const wordUpper = word.toUpperCase();
    const len = word.length;
    const firstChar = wordUpper[0];
    const lastChar = wordUpper[len - 1];

    // Simple rule-based "AI" hints
    const hints = [
        `It starts with process '${firstChar}'...`,
        `Analyzing... Pattern ends with '${lastChar}'.`,
        `Detected ${len} bits of data in this sequence.`,
        `Decryption suggests a relation to technology.`,
        `Part of the standard protocol starting with '${firstChar}'.`
    ];

    const randomHint = hints[Math.floor(Math.random() * hints.length)];
    return `[AI_ANALYSIS]: ${randomHint}`;
};

module.exports = {
    generateHint
};
