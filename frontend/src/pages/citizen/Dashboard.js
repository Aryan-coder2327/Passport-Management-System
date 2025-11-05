import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { dashboardAPI, citizenAPI, applicationAPI } from '../../services/api';
import { Card } from '../../components/Card';
import { StatCard } from '../../components/StatCard';
import { Table } from '../../components/Table';
import { StatusBadge } from '../../components/StatusBadge';

const CitizenDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [recentApplications, setRecentApplications] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [eligibility, setEligibility] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [statsRes, appsRes, alertsRes, eligRes] = await Promise.all([
                dashboardAPI.getCitizenStats(user.citizenID),
                applicationAPI.getCitizenApplications(user.citizenID),
                citizenAPI.getAlerts(user.citizenID),
                citizenAPI.checkEligibility(user.citizenID)
            ]);

            setStats(statsRes.data);
            setRecentApplications(appsRes.data.slice(0, 5));
            setAlerts(alertsRes.data);
            setEligibility(eligRes.data.isEligible);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
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

    const applicationColumns = [
        { header: 'Application ID', accessor: 'ApplicationID' },
        { header: 'Type', accessor: 'ApplicationType' },
        { header: 'Date', accessor: 'ApplicationDate', render: (row) => new Date(row.ApplicationDate).toLocaleDateString() },
        { header: 'Priority', accessor: 'Priority' },
        { header: 'Status', accessor: 'Status', render: (row) => <StatusBadge status={row.Status} /> }
    ];

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">Citizen Dashboard</h1>

                {/* Eligibility Check (Uses Function: fn_IsEligibleForApplication) */}
                {eligibility !== null && (
                    <div className={`mb-6 p-4 rounded-lg ${eligibility ? 'bg-green-100 border border-green-400' : 'bg-yellow-100 border border-yellow-400'}`}>
                        <p className="font-semibold">
                            {eligibility 
                                ? '✅ You are eligible to apply for a new passport!' 
                                : '⚠️ You have pending applications or are blacklisted. Cannot apply for new passport.'}
                        </p>
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <StatCard icon="📝" title="Total Applications" value={stats?.totalApplications || 0} color="blue" />
                    <StatCard icon="🛂" title="Active Passports" value={stats?.activePassports || 0} color="green" />
                    <StatCard icon="✈️" title="Total Travels" value={stats?.totalTravels || 0} color="purple" />
                    <StatCard icon="🔔" title="Unread Alerts" value={stats?.unreadAlerts || 0} color="red" />
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <Link to="/citizen/apply" className="block">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
                            <div className="text-4xl mb-2">📝</div>
                            <h3 className="text-xl font-bold mb-2">Apply for Passport</h3>
                            <p className="text-gray-600">Submit a new passport application</p>
                        </div>
                    </Link>

                    <Link to="/citizen/applications" className="block">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
                            <div className="text-4xl mb-2">📋</div>
                            <h3 className="text-xl font-bold mb-2">My Applications</h3>
                            <p className="text-gray-600">View all your applications</p>
                        </div>
                    </Link>

                    <Link to="/citizen/passports" className="block">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
                            <div className="text-4xl mb-2">🛂</div>
                            <h3 className="text-xl font-bold mb-2">My Passports</h3>
                            <p className="text-gray-600">View your passport details</p>
                        </div>
                    </Link>
                </div>

                {/* Recent Applications */}
                <Card title="Recent Applications" className="mb-8">
                    <Table columns={applicationColumns} data={recentApplications} />
                    <Link to="/citizen/applications" className="text-blue-600 hover:underline mt-4 inline-block">
                        View All Applications →
                    </Link>
                </Card>

                {/* Alerts (Created by Triggers) */}
                <Card title="Recent Alerts">
                    {alerts.length > 0 ? (
                        <div className="space-y-3">
                            {alerts.map((alert) => (
                                <div key={alert.AlertID} className={`p-4 rounded-lg border ${alert.IsRead ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'}`}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="font-semibold text-sm text-gray-600">{alert.AlertType}</span>
                                            <p className="mt-1">{alert.AlertMessage}</p>
                                            <span className="text-xs text-gray-500">{new Date(alert.AlertDate).toLocaleString()}</span>
                                        </div>
                                        {!alert.IsRead && <span className="text-blue-600 text-xs font-semibold">NEW</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No alerts</p>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default CitizenDashboard;