const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { authenticateToken } = require('../middleware/auth');

router.post('/process', authenticateToken, paymentController.processPayment);
router.get('/:applicationID', authenticateToken, paymentController.getPaymentDetails);

module.exports = router;