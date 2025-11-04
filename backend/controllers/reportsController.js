const db = require('../config/database');

exports.getCityStatistics = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM vw_CityWiseStatistics');
        res.json(results);
    } catch (error) {
        console.error('Get city statistics error:', error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
};

exports.getFrequentTravelers = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM vw_FrequentTravelers');
        res.json(results);
    } catch (error) {
        console.error('Get travelers error:', error);
        res.status(500).json({ error: 'Failed to fetch travelers' });
    }
};

exports.getEmbassyPerformance = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM vw_EmbassyPerformance');
        res.json(results);
    } catch (error) {
        console.error('Get embassy performance error:', error);
        res.status(500).json({ error: 'Failed to fetch performance data' });
    }
};

exports.getDocumentBottlenecks = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM vw_DocumentBottlenecks');
        res.json(results);
    } catch (error) {
        console.error('Get bottlenecks error:', error);
        res.status(500).json({ error: 'Failed to fetch bottlenecks' });
    }
};

exports.getFinancialAnalysis = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM vw_FinancialAnalysis');
        res.json(results);
    } catch (error) {
        console.error('Get financial analysis error:', error);
        res.status(500).json({ error: 'Failed to fetch financial data' });
    }
};

exports.getApplicationReport = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const [results] = await db.query('CALL sp_GetApplicationReport(?, ?)', [startDate, endDate]);
        res.json(results[0]);
    } catch (error) {
        console.error('Get report error:', error);
        res.status(500).json({ error: 'Failed to generate report' });
    }
};

exports.getTotalRevenue = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const [result] = await db.query('SELECT fn_TotalRevenue(?, ?) as totalRevenue', [startDate, endDate]);
        res.json({ totalRevenue: result[0].totalRevenue });
    } catch (error) {
        console.error('Get revenue error:', error);
        res.status(500).json({ error: 'Failed to calculate revenue' });
    }
};