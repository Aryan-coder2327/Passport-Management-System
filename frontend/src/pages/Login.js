import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

const Login = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [formData, setFormData] = useState({ email: '', aadharNumber: '', username: '', password: '' });
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
            let response;
            if (isAdmin) {
                response = await authAPI.loginAdmin({ username: formData.username, password: formData.password });
                // ✅ Add "type": "admin"
                const adminUser = { ...response.data.admin, type: 'admin' };
                login(adminUser, response.data.token);
                navigate('/admin/dashboard');
            } else {
                response = await authAPI.loginCitizen({ email: formData.email, aadharNumber: formData.aadharNumber });
                // ✅ Add "type": "citizen"
                const citizenUser = { ...response.data.citizen, type: 'citizen' };
                login(citizenUser, response.data.token);
                navigate('/citizen/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
                    <p className="text-gray-600 mt-2">Sign in to your account</p>
                </div>

                <Card>
                    <div className="flex mb-6 border-b">
                        <button
                            onClick={() => setIsAdmin(false)}
                            className={`flex-1 py-2 font-semibold ${!isAdmin ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                        >
                            Citizen Login
                        </button>
                        <button
                            onClick={() => setIsAdmin(true)}
                            className={`flex-1 py-2 font-semibold ${isAdmin ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                        >
                            Admin Login
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {isAdmin ? (
                            <>
                                <Input
                                    label="Username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </>
                        ) : (
                            <>
                                <Input
                                    label="Email or Aadhar Number"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email or Aadhar number"
                                    required
                                />
                            </>
                        )}

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </form>

                    {!isAdmin && (
                        <p className="mt-4 text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-blue-600 hover:underline font-semibold">
                                Register here
                            </Link>
                        </p>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default Login;