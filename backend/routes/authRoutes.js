const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Citizen routes
router.post('/register/citizen', authController.registerCitizen);
router.post('/login/citizen', authController.loginCitizen);

// Admin routes
router.post('/login/admin', authController.loginAdmin);

module.exports = router;