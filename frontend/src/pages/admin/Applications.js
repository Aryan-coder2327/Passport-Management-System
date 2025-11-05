import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { applicationAPI } from '../../services/api';
import { Card } from '../../components/Card';
import { Table } from '../../components/Table';
import { StatusBadge } from '../../components/StatusBadge';
import { Button } from '../../components/Button';
import { Select } from '../../components/Select';

const AdminApplications = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedApp, setSelectedApp] = useState(null);
    const [statusFilter, setStatusFilter] = useState('');
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        fetchApplications();
    }, [statusFilter]);

    const fetchApplications = async () => {
        try {
            const params = statusFilter ? { status: statusFilter } : {};
            const response = await applicationAPI.getAllApplications(params);
            setApplications(response.data);
        } catch (error) {
            console.error('Error fetching applications:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (applicationID) => {
        if (!window.confirm('Are you sure you want to approve this application?')) return;
        
        setActionLoading(true);
        try {
            // Calls STORED PROCEDURE: sp_ApproveAndIssuePassport
            // Which triggers: tr_AfterPassportInsert (auto-completes application)
            await applicationAPI.approve(applicationID, { approvedBy: user.username });
            alert('Application approved and passport issued successfully!');
            setSelectedApp(null);
            fetchApplications();
        } catch (error) {
            alert('Failed to approve application: ' + (error.response?.data?.error || 'Unknown error'));
        } finally {
            setActionLoading(false);
        }
    };

    const handleReject = async (applicationID) => {
        const reason = prompt('Enter rejection reason:');
        if (!reason) return;

        setActionLoading(true);
        try {
            // Calls STORED PROCEDURE: sp_RejectApplication
            // Automatically refunds payment
            await applicationAPI.reject(applicationID, { rejectionReason: reason, rejectedBy: user.username });
            alert('Application rejected successfully!');
            setSelectedApp(null);
            fetchApplications();
        } catch (error) {
            alert('Failed to reject application: ' + (error.response?.data?.error || 'Unknown error'));
        } finally {
            setActionLoading(false);
        }
    };

    const columns = [
        { header: 'App ID', accessor: 'ApplicationID' },
        { header: 'Citizen', accessor: 'CitizenName' },
        { header: 'Type', accessor: 'ApplicationType' },
        { header: 'Date', accessor: 'ApplicationDate', render: (row) => new Date(row.ApplicationDate).toLocaleDateString() },
        { header: 'Priority', accessor: 'Priority' },
        { header: 'Status', accessor: 'Status', render: (row) => <StatusBadge status={row.Status} /> },
        { header: 'Payment', accessor: 'PaymentStatus', render: (row) => row.PaymentStatus ? <StatusBadge status={row.PaymentStatus} /> : 'N/A' }
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
                <h1 className="text-3xl font-bold mb-8">Manage Applications</h1>

                <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800">
                        ✅ <strong>Stored Procedures in Action:</strong> Approving calls <code>sp_ApproveAndIssuePassport</code> and rejecting calls <code>sp_RejectApplication</code>. Triggers automatically update related data!
                    </p>
                </div>

                <Card>
                    <div className="mb-4 flex justify-between items-center">
                        <div className="w-64">
                            <Select
                                label="Filter by Status"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                options={[
                                    { value: '', label: 'All' },
                                    { value: 'Pending', label: 'Pending' },
                                    { value: 'Under Review', label: 'Under Review' },
                                    { value: 'Documents Required', label: 'Documents Required' },
                                    { value: 'Approved', label: 'Approved' },
                                    { value: 'Rejected', label: 'Rejected' }
                                ]}
                            />
                        </div>
                        <div className="text-sm text-gray-600">
                            Total: {applications.length} applications
                        </div>
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
                        <div className="bg-white rounded-lg p-8 max-w-3xl w-full mx-4 max-h-screen overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <h2 className="text-2xl font-bold mb-4">Application Details</h2>
                            
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <p className="text-sm text-gray-600">Application ID</p>
                                    <p className="font-semibold">{selectedApp.ApplicationID}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Status</p>
                                    <StatusBadge status={selectedApp.Status} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Citizen Name</p>
                                    <p className="font-semibold">{selectedApp.CitizenName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Email</p>
                                    <p className="font-semibold">{selectedApp.Email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Phone</p>
                                    <p className="font-semibold">{selectedApp.Phone}</p>
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
                                    <p className="text-sm text-gray-600">Embassy</p>
                                    <p className="font-semibold">{selectedApp.EmbassyName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Application Date</p>
                                    <p className="font-semibold">{new Date(selectedApp.ApplicationDate).toLocaleDateString()}</p>
                                </div>
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

                            {selectedApp.Status === 'Under Review' && (
                                <div className="flex space-x-4 mt-6">
                                    <Button 
                                        variant="success" 
                                        onClick={() => handleApprove(selectedApp.ApplicationID)}
                                        disabled={actionLoading}
                                        className="flex-1"
                                    >
                                        ✅ Approve & Issue Passport
                                    </Button>
                                    <Button 
                                        variant="danger" 
                                        onClick={() => handleReject(selectedApp.ApplicationID)}
                                        disabled={actionLoading}
                                        className="flex-1"
                                    >
                                        ❌ Reject Application
                                    </Button>
                                </div>
                            )}

                            <Button onClick={() => setSelectedApp(null)} variant="secondary" className="w-full mt-4">
                                Close
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminApplications;