import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { applicationAPI, embassyAPI } from '../../services/api';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';

const ApplyPassport = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [embassies, setEmbassies] = useState([]);
    const [formData, setFormData] = useState({
        citizenID: user.citizenID,
        embassyID: '',
        applicationType: '',
        priority: 'Normal'
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchEmbassies();
    }, []);

    const fetchEmbassies = async () => {
        try {
            const response = await embassyAPI.getAll();
            setEmbassies(response.data);
        } catch (error) {
            console.error('Error fetching embassies:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            // This calls STORED PROCEDURE: sp_SubmitApplication
            const response = await applicationAPI.submit(formData);
            setSuccess(`Application submitted successfully! Application ID: ${response.data.applicationID}. Amount: ₹${response.data.amount}`);
            
            setTimeout(() => {
                navigate('/citizen/payment', { state: { applicationID: response.data.applicationID, amount: response.data.amount } });
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to submit application');
        } finally {
            setLoading(false);
        }
    };

    const embassyOptions = embassies.map(e => ({ value: e.EmbassyID, label: `${e.EmbassyName} - ${e.City}` }));

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4 max-w-2xl">
                <h1 className="text-3xl font-bold mb-8">Apply for Passport</h1>

                <Card>
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                            ℹ️ <strong>Note:</strong> This form calls the stored procedure <code>sp_SubmitApplication</code> which automatically generates your Application ID and calculates fees based on priority.
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

                    <form onSubmit={handleSubmit}>
                        <Select
                            label="Application Type"
                            name="applicationType"
                            value={formData.applicationType}
                            onChange={handleChange}
                            options={[
                                { value: 'New', label: 'New Passport' },
                                { value: 'Renewal', label: 'Renewal' },
                                { value: 'Reissue', label: 'Reissue' },
                                { value: 'Damaged', label: 'Damaged' },
                                { value: 'Lost', label: 'Lost' }
                            ]}
                            required
                        />

                        <Select
                            label="Priority"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            options={[
                                { value: 'Normal', label: 'Normal (₹1,500)' },
                                { value: 'Tatkal', label: 'Tatkal (₹3,500)' },
                                { value: 'Emergency', label: 'Emergency (₹5,000)' }
                            ]}
                            required
                        />

                        <Select
                            label="Passport Office"
                            name="embassyID"
                            value={formData.embassyID}
                            onChange={handleChange}
                            options={embassyOptions}
                            required
                        />

                        <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                            <p className="text-sm text-yellow-800">
                                <strong>Fee Calculation:</strong>
                                <br />Normal: ₹1,500 | Tatkal: ₹3,500 | Emergency: ₹5,000
                            </p>
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Submitting Application...' : 'Submit Application'}
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default ApplyPassport;