import React, { useState, useEffect } from 'react';
import { reportsAPI } from '../../services/api';
import { Card } from '../../components/Card';
import { Table } from '../../components/Table';
import { Button } from '../../components/Button';

const AdminReports = () => {
    const [activeTab, setActiveTab] = useState('city');
    const [cityStats, setCityStats] = useState([]);
    const [travelers, setTravelers] = useState([]);
    const [embassyPerf, setEmbassyPerf] = useState([]);
    const [bottlenecks, setBottlenecks] = useState([]);
    const [financial, setFinancial] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllReports();
    }, []);

    const fetchAllReports = async () => {
        try {
            const [city, travel, embassy, doc, finance] = await Promise.all([
                reportsAPI.getCityStatistics(),
                reportsAPI.getFrequentTravelers(),
                reportsAPI.getEmbassyPerformance(),
                reportsAPI.getDocumentBottlenecks(),
                reportsAPI.getFinancialAnalysis()
            ]);

            setCityStats(city.data);
            setTravelers(travel.data);
            setEmbassyPerf(embassy.data);
            setBottlenecks(doc.data);
            setFinancial(finance.data);
        } catch (error) {
            console.error('Error fetching reports:', error);
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

    const tabs = [
        { id: 'city', label: 'City Statistics', badge: '1' },
        { id: 'travelers', label: 'Frequent Travelers', badge: '2' },
        { id: 'embassy', label: 'Embassy Performance', badge: '3' },
        { id: 'bottlenecks', label: 'Document Bottlenecks', badge: '4' },
        { id: 'financial', label: 'Financial Analysis', badge: '5' }
    ];

    // ✅ FIXED here — uses parseFloat and isNaN check
    const cityColumns = [
        { header: 'City', accessor: 'City' },
        { header: 'State', accessor: 'State' },
        { header: 'Total Apps', accessor: 'TotalApplications' },
        { header: 'Approved', accessor: 'ApprovedApplications' },
        { header: 'Approval Rate', accessor: 'ApprovalRate', render: (row) => `${row.ApprovalRate}%` },
        { header: 'Revenue', accessor: 'TotalRevenue', render: (row) => `₹${row.TotalRevenue}` },
        {
            header: 'Avg Days',
            accessor: 'AvgProcessingDays',
            render: (row) => {
                const value = parseFloat(row.AvgProcessingDays);
                return isNaN(value) ? 'N/A' : value.toFixed(1);
            }
        },
        { header: 'Active Passports', accessor: 'ActivePassports' }
    ];

    const travelerColumns = [
        { header: 'Citizen ID', accessor: 'CitizenID' },
        { header: 'Name', accessor: 'CitizenName' },
        { header: 'Email', accessor: 'Email' },
        { header: 'Passports', accessor: 'PassportCount' },
        { header: 'Total Trips', accessor: 'TotalTrips' },
        { header: 'Countries Visited', accessor: 'CountriesVisited' },
        { header: 'Days Abroad', accessor: 'TotalDaysAbroad' }
    ];

    // ✅ FIXED here too
    const embassyColumns = [
        { header: 'Embassy', accessor: 'EmbassyName' },
        { header: 'City', accessor: 'EmbassyCity' },
        { header: 'Total', accessor: 'TotalApplications' },
        { header: 'Approved', accessor: 'ApprovedCount' },
        { header: 'Rejected', accessor: 'RejectedCount' },
        { header: 'Pending', accessor: 'PendingCount' },
        {
            header: 'Avg Days',
            accessor: 'AvgProcessingDays',
            render: (row) => {
                const value = parseFloat(row.AvgProcessingDays);
                return isNaN(value) ? 'N/A' : value.toFixed(1);
            }
        },
        { header: 'Success Rate', accessor: 'SuccessRate', render: (row) => `${row.SuccessRate}%` }
    ];

    const bottleneckColumns = [
        { header: 'App ID', accessor: 'ApplicationID' },
        { header: 'Days Waiting', accessor: 'DaysSinceApplication' },
        { header: 'Citizen', accessor: 'CitizenName' },
        { header: 'Email', accessor: 'Email' },
        { header: 'Type', accessor: 'ApplicationType' },
        { header: 'Priority', accessor: 'Priority' },
        { header: 'Total Docs', accessor: 'TotalDocuments' },
        { header: 'Verified', accessor: 'VerifiedDocs' },
        { header: 'Pending', accessor: 'PendingDocs' },
        { header: 'Rejected', accessor: 'RejectedDocs' },
        { header: 'Missing Docs', accessor: 'MissingDocuments' }
    ];

    const financialColumns = [
        { header: 'Month', accessor: 'PaymentMonth' },
        { header: 'Transactions', accessor: 'TotalTransactions' },
        { header: 'Revenue', accessor: 'TotalRevenue', render: (row) => `₹${row.TotalRevenue}` },
        { header: 'Refunds', accessor: 'TotalRefunds', render: (row) => `₹${row.TotalRefunds}` },
        { header: 'Net Revenue', accessor: 'NetRevenue', render: (row) => `₹${row.NetRevenue}` },
        { header: 'UPI', accessor: 'UPI_Revenue', render: (row) => `₹${row.UPI_Revenue}` },
        { header: 'Net Banking', accessor: 'NetBanking_Revenue', render: (row) => `₹${row.NetBanking_Revenue}` },
        { header: 'Cards', accessor: 'Card_Revenue', render: (row) => `₹${row.Card_Revenue}` },
        { header: 'Avg Value', accessor: 'AvgTransactionValue', render: (row) => `₹${row.AvgTransactionValue}` }
    ];

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
                    <p className="text-gray-600">All 5 Complex Queries from Database Views</p>
                </div>

                <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-800">
                        🎯 <strong>Complex Queries Active:</strong> This page displays all 5 complex queries (database views) that analyze data across multiple tables using JOINs, aggregations, and calculations.
                    </p>
                </div>

                {/* Tabs */}
                <div className="mb-6 flex flex-wrap gap-2 bg-white p-2 rounded-lg shadow">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-lg font-semibold transition ${
                                activeTab === tab.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <span className="mr-2 bg-white text-blue-600 px-2 py-1 rounded text-xs">Query {tab.badge}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Query Cards */}
                {activeTab === 'city' && (
                    <Card>
                        <h2 className="text-2xl font-bold mb-2">📍 Complex Query 1: City-wise Statistics</h2>
                        <p className="text-sm text-gray-600 mb-4">View: <code className="bg-gray-100 px-2 py-1 rounded">vw_CityWiseStatistics</code></p>
                        <Table columns={cityColumns} data={cityStats} />
                        {cityStats.length === 0 && <p className="text-center py-4 text-gray-500">No data available</p>}
                    </Card>
                )}

                {activeTab === 'travelers' && (
                    <Card>
                        <h2 className="text-2xl font-bold mb-2">✈️ Complex Query 2: Frequent Travelers</h2>
                        <p className="text-sm text-gray-600 mb-4">View: <code className="bg-gray-100 px-2 py-1 rounded">vw_FrequentTravelers</code></p>
                        <Table columns={travelerColumns} data={travelers} />
                    </Card>
                )}

                {activeTab === 'embassy' && (
                    <Card>
                        <h2 className="text-2xl font-bold mb-2">🏛️ Complex Query 3: Embassy Performance</h2>
                        <p className="text-sm text-gray-600 mb-4">View: <code className="bg-gray-100 px-2 py-1 rounded">vw_EmbassyPerformance</code></p>
                        <Table columns={embassyColumns} data={embassyPerf} />
                    </Card>
                )}

                {activeTab === 'bottlenecks' && (
                    <Card>
                        <h2 className="text-2xl font-bold mb-2">📄 Complex Query 4: Document Bottlenecks</h2>
                        <p className="text-sm text-gray-600 mb-4">View: <code className="bg-gray-100 px-2 py-1 rounded">vw_DocumentBottlenecks</code></p>
                        <Table columns={bottleneckColumns} data={bottlenecks} />
                    </Card>
                )}

                {activeTab === 'financial' && (
                    <Card>
                        <h2 className="text-2xl font-bold mb-2">💰 Complex Query 5: Financial Analysis</h2>
                        <p className="text-sm text-gray-600 mb-4">View: <code className="bg-gray-100 px-2 py-1 rounded">vw_FinancialAnalysis</code></p>
                        <Table columns={financialColumns} data={financial} />
                    </Card>
                )}
            </div>
        </div>
    );
};

export default AdminReports;
