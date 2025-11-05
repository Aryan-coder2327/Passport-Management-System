import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { paymentAPI } from '../../services/api';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { applicationID, amount } = location.state || {};

    const [formData, setFormData] = useState({
        applicationID: applicationID || '',
        amount: amount || '',
        paymentMethod: '',
        transactionID: `TXN${Date.now()}`
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            // This calls STORED PROCEDURE: sp_ProcessPayment
            // Which triggers: tr_AfterPaymentInsert (changes application status to "Under Review")
            const response = await paymentAPI.process(formData);
            setSuccess(`${response.data.message}! Payment ID: ${response.data.paymentID}`);
            
            setTimeout(() => {
                navigate('/citizen/applications');
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.error || 'Payment processing failed');
        } finally {
            setLoading(false);
        }
    };

    if (!applicationID) {
        return (
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="container mx-auto px-4 max-w-2xl">
                    <Card>
                        <div className="text-center py-8">
                            <p className="text-gray-600 mb-4">No application selected for payment</p>
                            <Button onClick={() => navigate('/citizen/apply')}>
                                Apply for Passport
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4 max-w-2xl">
                <h1 className="text-3xl font-bold mb-8">Process Payment</h1>

                <Card>
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                            ℹ️ <strong>Automated Process:</strong> This payment calls <code>sp_ProcessPayment</code> procedure, which automatically triggers <code>tr_AfterPaymentInsert</code> to change your application status to "Under Review".
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                            {success}
                        </div>
                    )}

                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                        <h3 className="font-bold text-lg mb-4">Payment Summary</h3>
                        <div className="flex justify-between mb-2">
                            <span>Application ID:</span>
                            <span className="font-semibold">{applicationID}</span>
                        </div>
                        <div className="flex justify-between text-2xl font-bold text-blue-600">
                            <span>Amount to Pay:</span>
                            <span>₹{amount}</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Application ID"
                            name="applicationID"
                            value={formData.applicationID}
                            disabled
                        />

                        <Input
                            label="Amount"
                            name="amount"
                            value={formData.amount}
                            disabled
                        />

                        <Select
                            label="Payment Method"
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            options={[
                                { value: 'Credit Card', label: 'Credit Card' },
                                { value: 'Debit Card', label: 'Debit Card' },
                                { value: 'Net Banking', label: 'Net Banking' },
                                { value: 'UPI', label: 'UPI' },
                                { value: 'Cash', label: 'Cash' }
                            ]}
                            required
                        />

                        <Input
                            label="Transaction ID"
                            name="transactionID"
                            value={formData.transactionID}
                            disabled
                        />

                        <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                            <p className="text-sm text-yellow-800">
                                <strong>Note:</strong> In a real application, this would integrate with a payment gateway. This is a demo version.
                            </p>
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Processing Payment...' : 'Pay Now'}
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Payment;