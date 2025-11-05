import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { isAuthenticated, isAdmin } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">
                        🛂 Passport Management System
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Your gateway to seamless passport services
                    </p>
                    
                    {!isAuthenticated() ? (
                        <div className="flex justify-center space-x-4">
                            <Link to="/register" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-semibold">
                                Get Started
                            </Link>
                            <Link to="/login" className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition text-lg font-semibold">
                                Login
                            </Link>
                        </div>
                    ) : (
                        <Link 
                            to={isAdmin() ? '/admin/dashboard' : '/citizen/dashboard'}
                            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-semibold inline-block"
                        >
                            Go to Dashboard
                        </Link>
                    )}
                </div>

                <div className="grid md:grid-cols-3 gap-8 mt-16">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-4xl mb-4">📝</div>
                        <h3 className="text-xl font-bold mb-2">Easy Application</h3>
                        <p className="text-gray-600">Submit passport applications online with our streamlined process</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-4xl mb-4">⚡</div>
                        <h3 className="text-xl font-bold mb-2">Fast Processing</h3>
                        <p className="text-gray-600">Track your application status in real-time with instant updates</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-4xl mb-4">🔒</div>
                        <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
                        <p className="text-gray-600">Your data is protected with advanced security measures</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;