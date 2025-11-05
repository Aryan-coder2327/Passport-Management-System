const express = require('express');
const router = express.Router();
const passportController = require('../controllers/passportController');
const { authenticateToken } = require('../middleware/auth');

router.get('/citizen/:citizenID', authenticateToken, passportController.getCitizenPassports);
router.get('/:passportID', authenticateToken, passportController.getPassportDetails);

module.exports = router;