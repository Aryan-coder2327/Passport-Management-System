import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { applicationAPI } from '../../services/api';
import { Card } from '../../components/Card';
import { Table } from '../../components/Table';
import { StatusBadge } from '../../components/StatusBadge';
import { Button } from '../../components/Button';

const MyApplications = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedApp, setSelectedApp] = useState(null);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await applicationAPI.getCitizenApplications(user.citizenID);
            setApplications(response.data);
        } catch (error) {
            console.error('Error fetching applications:', error);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { header: 'Application ID', accessor: 'ApplicationID' },
        { 
            header: 'Date', 
            accessor: 'ApplicationDate', 
            render: (row) => new Date(row.ApplicationDate).toLocaleDateString() 
        },
        { header: 'Type', accessor: 'ApplicationType' },
        { header: 'Priority', accessor: 'Priority' },
        { 
            header: 'Status', 
            accessor: 'Status', 
            render: (row) => <StatusBadge status={row.Status} /> 
        },
        { header: 'Embassy', accessor: 'EmbassyName' },
        { 
            header: 'Payment', 
            accessor: 'PaymentStatus',
            render: (row) => row.PaymentStatus ? <StatusBadge status={row.PaymentStatus} /> : <span className="text-gray-400">N/A</span>
        }
    ];

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
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">My Applications</h1>
                    <Button onClick={() => window.location.href = '/citizen/apply'}>
                        + New Application
                    </Button>
                </div>

                <Card>
                    <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                            ℹ️ <strong>Real-time Updates:</strong> Status changes are automatically updated by database triggers when admin approves/rejects applications.
                        </p>
                    </div>

                    <Table 
                        columns={columns} 
                        data={applications}
                        onRowClick={(row) => setSelectedApp(row)}
                    />
                </Card>

                {/* Application Details Modal */}
                {selectedApp && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setSelectedApp(null)}>
                        <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
                            <h2 className="text-2xl font-bold mb-4">Application Details</h2>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <p className="text-sm text-gray-600">Application ID</p>
                                    <p className="font-semibold">{selectedApp.ApplicationID}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Status</p>
                                    <StatusBadge status={selectedApp.Status} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Type</p>
                                    <p className="font-semibold">{selectedApp.ApplicationType}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Priority</p>
                                    <p className="font-semibold">{selectedApp.Priority}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Application Date</p>
                                    <p className="font-semibold">{new Date(selectedApp.ApplicationDate).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Embassy</p>
                                    <p className="font-semibold">{selectedApp.EmbassyName}</p>
                                </div>
                                {selectedApp.Amount && (
                                    <div>
                                        <p className="text-sm text-gray-600">Amount</p>
                                        <p className="font-semibold">₹{selectedApp.Amount}</p>
                                    </div>
                                )}
                                {selectedApp.PaymentStatus && (
                                    <div>
                                        <p className="text-sm text-gray-600">Payment Status</p>
                                        <StatusBadge status={selectedApp.PaymentStatus} />
                                    </div>
                                )}
                            </div>

                            {selectedApp.Remarks && (
                                <div className="mb-4">
                                    <p className="text-sm text-gray-600">Remarks</p>
                                    <p className="bg-gray-50 p-3 rounded">{selectedApp.Remarks}</p>
                                </div>
                            )}

                            {selectedApp.RejectionReason && (
                                <div className="mb-4 bg-red-50 p-4 rounded-lg border border-red-200">
                                    <p className="text-sm text-red-800 font-semibold">Rejection Reason</p>
                                    <p className="text-red-700">{selectedApp.RejectionReason}</p>
                                </div>
                            )}

                            <Button onClick={() => setSelectedApp(null)} variant="secondary" className="w-full">
                                Close
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyApplications;