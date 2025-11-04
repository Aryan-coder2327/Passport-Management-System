const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', async (req, res) => {
    try {
        const [embassies] = await db.query('SELECT * FROM Embassy ORDER BY City');
        res.json(embassies);
    } catch (error) {
        console.error('Get embassies error:', error);
        res.status(500).json({ error: 'Failed to fetch embassies' });
    }
});

router.get('/:embassyID', async (req, res) => {
    try {
        const { embassyID } = req.params;
        const [embassy] = await db.query('SELECT * FROM Embassy WHERE EmbassyID = ?', [embassyID]);
        if (embassy.length === 0) {
            return res.status(404).json({ error: 'Embassy not found' });
        }
        res.json(embassy[0]);
    } catch (error) {
        console.error('Get embassy error:', error);
        res.status(500).json({ error: 'Failed to fetch embassy' });
    }
});

module.exports = router;