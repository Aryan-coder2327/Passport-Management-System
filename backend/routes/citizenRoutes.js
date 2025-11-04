const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

router.get('/:citizenID', authenticateToken, async (req, res) => {
    try {
        const { citizenID } = req.params;
        const [citizen] = await db.query('SELECT CitizenID, FirstName, MiddleName, LastName, DOB, Gender, Phone, Email, Address, City, State, PostalCode, Nationality, AadharNumber, PanNumber, CreatedAt FROM Citizen WHERE CitizenID = ?', [citizenID]);
        if (citizen.length === 0) {
            return res.status(404).json({ error: 'Citizen not found' });
        }
        res.json(citizen[0]);
    } catch (error) {
        console.error('Get citizen error:', error);
        res.status(500).json({ error: 'Failed to fetch citizen profile' });
    }
});

router.get('/:citizenID/eligibility', authenticateToken, async (req, res) => {
    try {
        const { citizenID } = req.params;
        const [result] = await db.query('SELECT fn_IsEligibleForApplication(?) as isEligible', [citizenID]);
        res.json({ isEligible: result[0].isEligible === 1 });
    } catch (error) {
        console.error('Check eligibility error:', error);
        res.status(500).json({ error: 'Failed to check eligibility' });
    }
});

router.get('/:citizenID/alerts', authenticateToken, async (req, res) => {
    try {
        const { citizenID } = req.params;
        const [alerts] = await db.query('SELECT * FROM Alert WHERE CitizenID = ? ORDER BY AlertDate DESC LIMIT 10', [citizenID]);
        res.json(alerts);
    } catch (error) {
        console.error('Get alerts error:', error);
        res.status(500).json({ error: 'Failed to fetch alerts' });
    }
});

module.exports = router;