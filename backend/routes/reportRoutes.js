const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');
const { authenticateAdmin } = require('../middleware/auth');

// Complex Query Routes (Views)
router.get('/city-statistics', authenticateAdmin, 
reportsController.getCityStatistics);
router.get('/frequent-travelers', authenticateAdmin, 
reportsController.getFrequentTravelers);
router.get('/embassy-performance', authenticateAdmin, 
reportsController.getEmbassyPerformance);
router.get('/document-bottlenecks', authenticateAdmin, 
reportsController.getDocumentBottlenecks);
router.get('/financial-analysis', authenticateAdmin, 
reportsController.getFinancialAnalysis);

// Stored Procedure & Function Routes
router.get('/application-report', authenticateAdmin, 
reportsController.getApplicationReport);
router.get('/total-revenue', authenticateAdmin, 
reportsController.getTotalRevenue);

module.exports = router;
