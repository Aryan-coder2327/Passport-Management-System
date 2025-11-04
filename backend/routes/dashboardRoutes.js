const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authenticateToken, authenticateAdmin } = require('../middleware/auth');

router.get('/citizen/:citizenID', authenticateToken, async (req, res) => {
    try {
        const { citizenID } = req.params;
        const [applications] = await db.query('SELECT COUNT(*) as count FROM Application WHERE CitizenID = ?', [citizenID]);
        const [passports] = await db.query('SELECT COUNT(*) as count FROM Passport WHERE CitizenID = ? AND Status = "Active"', [citizenID]);
        const [travels] = await db.query('SELECT fn_TravelCount(?) as count', [citizenID]);
        const [alerts] = await db.query('SELECT COUNT(*) as count FROM Alert WHERE CitizenID = ? AND IsRead = FALSE', [citizenID]);
        res.json({ totalApplications: applications[0].count, activePassports: passports[0].count, totalTravels: travels[0].count, unreadAlerts: alerts[0].count });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
});

router.get('/admin/stats', authenticateAdmin, async (req, res) => {
    try {
        const [totalApps] = await db.query('SELECT COUNT(*) as count FROM Application');
        const [pendingApps] = await db.query('SELECT COUNT(*) as count FROM Application WHERE Status IN ("Pending", "Under Review")');
        const [activePassports] = await db.query('SELECT COUNT(*) as count FROM Passport WHERE Status = "Active"');
        const [totalCitizens] = await db.query('SELECT COUNT(*) as count FROM Citizen');
        const [todayRevenue] = await db.query('SELECT COALESCE(SUM(Amount), 0) as revenue FROM Payment WHERE DATE(PaymentDate) = CURDATE() AND PaymentStatus = "Completed"');
        const [blacklisted] = await db.query('SELECT COUNT(*) as count FROM Blacklist WHERE Status = "Active"');
        res.json({ totalApplications: totalApps[0].count, pendingApplications: pendingApps[0].count, activePassports: activePassports[0].count, totalCitizens: totalCitizens[0].count, todayRevenue: todayRevenue[0].revenue, blacklistedCitizens: blacklisted[0].count });
    } catch (error) {
        console.error('Admin dashboard stats error:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
});

module.exports = router;