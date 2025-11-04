const db = require('../config/database');

exports.getCitizenPassports = async (req, res) => {
    try {
        const { citizenID } = req.params;
        const [passports] = await db.query('SELECT p.*, fn_PassportValidityDays(p.PassportID) as DaysRemaining FROM Passport p WHERE p.CitizenID = ? ORDER BY p.IssueDate DESC', [citizenID]);
        res.json(passports);
    } catch (error) {
        console.error('Get passports error:', error);
        res.status(500).json({ error: 'Failed to fetch passports' });
    }
};

exports.getPassportDetails = async (req, res) => {
    try {
        const { passportID } = req.params;
        const [passport] = await db.query('SELECT p.*, CONCAT(c.FirstName, " ", c.LastName) as CitizenName, c.DOB, c.Gender, c.Nationality, fn_PassportValidityDays(p.PassportID) as DaysRemaining FROM Passport p JOIN Citizen c ON p.CitizenID = c.CitizenID WHERE p.PassportID = ?', [passportID]);
        if (passport.length === 0) {
            return res.status(404).json({ error: 'Passport not found' });
        }
        res.json(passport[0]);
    } catch (error) {
        console.error('Get passport details error:', error);
        res.status(500).json({ error: 'Failed to fetch passport details' });
    }
};