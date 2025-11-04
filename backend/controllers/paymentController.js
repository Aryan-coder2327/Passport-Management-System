const db = require('../config/database');

exports.processPayment = async (req, res) => {
    try {
        const { applicationID, amount, paymentMethod, transactionID } = req.body;
        await db.query('CALL sp_ProcessPayment(?, ?, ?, ?, @paymentID, @status)', [applicationID, amount, paymentMethod, transactionID]);
        const [output] = await db.query('SELECT @paymentID as paymentID, @status as status');
        res.json({ message: output[0].status, paymentID: output[0].paymentID });
    } catch (error) {
        console.error('Payment error:', error);
        res.status(500).json({ error: 'Payment processing failed', details: error.message });
    }
};

exports.getPaymentDetails = async (req, res) => {
    try {
        const { applicationID } = req.params;
        const [payment] = await db.query('SELECT * FROM Payment WHERE ApplicationID = ?', [applicationID]);
        if (payment.length === 0) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.json(payment[0]);
    } catch (error) {
        console.error('Get payment error:', error);
        res.status(500).json({ error: 'Failed to fetch payment details' });
    }
};