const express = require('express');
const { generateRandomData } = require('../services/userService');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Hello World!!!');
});

router.post('/generate', (req, res) => {
    const { region, errors, seed, page } = req.body;

    try {
        const combinedSeed = parseInt(seed, 10) + page;  
        const data = generateRandomData(region, errors, combinedSeed, page);
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/random-seed', (req, res) => {
    const randomSeed = Math.floor(Math.random() * 10000); 
    res.json({ seed: randomSeed });
});

module.exports = router;