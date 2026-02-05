const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/words.json');

// Helper to read data
const getWordData = () => {
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading word data:", err);
        return { packs: [] };
    }
};

// GET /api/packs - List all available word packs
router.get('/packs', (req, res) => {
    const data = getWordData();
    const packsSummary = data.packs.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        wordCount: p.words.length
    }));
    res.json(packsSummary);
});

// GET /api/packs/:id/random - Get a random word from a specific pack
router.get('/packs/:id/random', (req, res) => {
    const { id } = req.params;
    const data = getWordData();
    const pack = data.packs.find(p => p.id === id);

    if (!pack) {
        return res.status(404).json({ error: "Pack not found" });
    }

    const randomWord = pack.words[Math.floor(Math.random() * pack.words.length)];

    // Return word and hint (masked word logic could be here if we wanted server-side validation only)
    res.json(randomWord);
});

module.exports = router;
