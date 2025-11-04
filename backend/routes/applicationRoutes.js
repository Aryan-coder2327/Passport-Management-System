const express = require('express');
const router = express.Router();
const applicationController = 
require('../controllers/applicationController');
const { authenticateToken, authenticateAdmin } = 
require('../middleware/auth');

// Citizen routes
router.post('/submit', authenticateToken, 
applicationController.submitApplication);
router.get('/citizen/:citizenID', authenticateToken, 
applicationController.getCitizenApplications);

// Admin routes
router.get('/all', authenticateAdmin, 
applicationController.getAllApplications);
router.put('/:applicationID/approve', authenticateAdmin, 
applicationController.approveApplication);
router.put('/:applicationID/reject', authenticateAdmin, 
applicationController.rejectApplication);

module.exports = router;
