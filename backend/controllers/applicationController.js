const db = require('../config/database');

exports.submitApplication = async (req, res) => {
    try {
        const { citizenID, embassyID, applicationType, priority } = req.body;
        await db.query('CALL sp_SubmitApplication(?, ?, ?, ?, @appID, @amount)', [citizenID, embassyID, applicationType, priority]);
        const [output] = await db.query('SELECT @appID as applicationID, @amount as amount');
        res.status(201).json({ message: 'Application submitted successfully', applicationID: output[0].applicationID, amount: output[0].amount });
    } catch (error) {
        console.error('Submit application error:', error);
        res.status(500).json({ error: 'Failed to submit application', details: error.message });
    }
};

exports.getCitizenApplications = async (req, res) => {
    try {
        const { citizenID } = req.params;
        const [applications] = await db.query('SELECT a.*, e.EmbassyName, e.City as EmbassyCity, p.PaymentStatus, p.Amount FROM Application a LEFT JOIN Embassy e ON a.EmbassyID = e.EmbassyID LEFT JOIN Payment p ON a.ApplicationID = p.ApplicationID WHERE a.CitizenID = ? ORDER BY a.ApplicationDate DESC', [citizenID]);
        res.json(applications);
    } catch (error) {
        console.error('Get applications error:', error);
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
};

exports.getAllApplications = async (req, res) => {
    try {
        const { status, fromDate, toDate } = req.query;
        let query = 'SELECT a.*, CONCAT(c.FirstName, " ", c.LastName) as CitizenName, c.Email, c.Phone, e.EmbassyName, p.PaymentStatus FROM Application a JOIN Citizen c ON a.CitizenID = c.CitizenID LEFT JOIN Embassy e ON a.EmbassyID = e.EmbassyID LEFT JOIN Payment p ON a.ApplicationID = p.ApplicationID WHERE 1=1';
        const params = [];
        if (status) {
            query += ' AND a.Status = ?';
            params.push(status);
        }
        if (fromDate && toDate) {
            query += ' AND a.ApplicationDate BETWEEN ? AND ?';
            params.push(fromDate, toDate);
        }
        query += ' ORDER BY a.ApplicationDate DESC';
        const [applications] = await db.query(query, params);
        res.json(applications);
    } catch (error) {
        console.error('Get all applications error:', error);
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
};

exports.approveApplication = async (req, res) => {
    try {
        const { applicationID } = req.params;
        const { approvedBy } = req.body;
        await db.query('CALL sp_ApproveAndIssuePassport(?, ?, @passportID, @passportNumber)', [applicationID, approvedBy]);
        const [output] = await db.query('SELECT @passportID as passportID, @passportNumber as passportNumber');
        res.json({ message: 'Application approved and passport issued', passportID: output[0].passportID, passportNumber: output[0].passportNumber });
    } catch (error) {
        console.error('Approve application error:', error);
        res.status(500).json({ error: 'Failed to approve application', details: error.message });
    }
};

exports.rejectApplication = async (req, res) => {
    try {
        const { applicationID } = req.params;
        const { rejectionReason, rejectedBy } = req.body;
        await db.query('CALL sp_RejectApplication(?, ?, ?)', [applicationID, rejectionReason, rejectedBy]);
        res.json({ message: 'Application rejected successfully' });
    } catch (error) {
        console.error('Reject application error:', error);
        res.status(500).json({ error: 'Failed to reject application' });
    }
};