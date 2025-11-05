import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dashboardAPI } from '../../services/api';
import { Card } from '../../components/Card';
import { StatCard } from '../../components/StatCard';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await dashboardAPI.getAdminStats();
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                        ℹ️ <strong>Database Integration:</strong> This dashboard pulls data using complex queries, functions, and procedures. Navigate to Reports to see all 5 complex query results!
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard 
                        icon="📝" 
                        title="Total Applications" 
                        value={stats?.totalApplications || 0} 
                        color="blue" 
                    />
                    <StatCard 
                        icon="⏳" 
                        title="Pending Applications" 
                        value={stats?.pendingApplications || 0} 
                        color="yellow" 
                    />
                    <StatCard 
                        icon="🛂" 
                        title="Active Passports" 
                        value={stats?.activePassports || 0} 
                        color="green" 
                    />
                    <StatCard 
                        icon="👥" 
                        title="Total Citizens" 
                        value={stats?.totalCitizens || 0} 
                        color="purple" 
                    />
                    <StatCard 
                        icon="💰" 
                        title="Today's Revenue" 
                        value={`₹${stats?.todayRevenue || 0}`} 
                        color="green" 
                    />
                    <StatCard 
                        icon="⚠️" 
                        title="Blacklisted" 
                        value={stats?.blacklistedCitizens || 0} 
                        color="red" 
                    />
                </div>

                {/* Quick Actions */}
                <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <Link to="/admin/applications" className="block">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
                            <div className="text-4xl mb-2">📋</div>
                            <h3 className="text-xl font-bold mb-2">Manage Applications</h3>
                            <p className="text-gray-600">Approve or reject passport applications</p>
                            <p className="text-sm text-blue-600 mt-2">Uses: sp_ApproveAndIssuePassport, sp_RejectApplication</p>
                        </div>
                    </Link>

                    <Link to="/admin/reports" className="block">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
                            <div className="text-4xl mb-2">📊</div>
                            <h3 className="text-xl font-bold mb-2">View Reports</h3>
                            <p className="text-gray-600">Access all 5 complex queries and analytics</p>
                            <p className="text-sm text-blue-600 mt-2">Shows: All Complex Queries/Views</p>
                        </div>
                    </Link>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-4xl mb-2">🔍</div>
                        <h3 className="text-xl font-bold mb-2">Database Objects Active</h3>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>✅ 6 Stored Procedures</li>
                            <li>✅ 4 Functions</li>
                            <li>✅ 7 Triggers (Auto-firing)</li>
                            <li>✅ 5 Complex Queries</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;