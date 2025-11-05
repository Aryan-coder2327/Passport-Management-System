import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Button } from '../components/Button';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '', middleName: '', lastName: '', dob: '', gender: '', phone: '', email: '',
        address: '', city: '', state: '', postalCode: '', aadharNumber: '', panNumber: '', password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await authAPI.registerCitizen(formData);
            login({ citizenID: response.data.citizenID, email: formData.email, name: `${formData.firstName} ${formData.lastName}`, type: 'citizen' }, response.data.token);
            navigate('/citizen/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
                    <p className="text-gray-600 mt-2">Register for passport services</p>
                </div>

                <Card>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 gap-4">
                            <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
                            <Input label="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange} />
                            <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
                            <Input label="Date of Birth" type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                            <Select 
                                label="Gender" 
                                name="gender" 
                                value={formData.gender} 
                                onChange={handleChange}
                                options={[
                                    { value: 'Male', label: 'Male' },
                                    { value: 'Female', label: 'Female' },
                                    { value: 'Other', label: 'Other' }
                                ]}
                                required 
                            />
                            <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} required />
                            <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
                            <Input label="Aadhar Number" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} maxLength="12" required />
                            <Input label="PAN Number" name="panNumber" value={formData.panNumber} onChange={handleChange} maxLength="10" required />
                        </div>

                        <Input label="Address" name="address" value={formData.address} onChange={handleChange} required />
                        
                        <div className="grid md:grid-cols-3 gap-4">
                            <Input label="City" name="city" value={formData.city} onChange={handleChange} required />
                            <Input label="State" name="state" value={formData.state} onChange={handleChange} required />
                            <Input label="Postal Code" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
                        </div>

                        <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </Button>
                    </form>

                    <p className="mt-4 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 hover:underline font-semibold">
                            Login here
                        </Link>
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default Register;