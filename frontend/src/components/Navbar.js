import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-blue-600 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-xl font-bold flex items-center">
                        <span className="mr-2">🛂</span>
                        Passport Management System
                    </Link>
                    
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <span className="text-sm">
                                    Welcome, {user.name || user.username}
                                </span>
                                <Link 
                                    to={isAdmin() ? '/admin/dashboard' : '/citizen/dashboard'}
                                    className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-800 transition"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-800 transition"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;