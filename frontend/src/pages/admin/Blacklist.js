import React, { useState, useEffect } from 'react';
import { Card } from '../../components/Card';
import { Table } from '../../components/Table';
import { StatusBadge } from '../../components/StatusBadge';
import { citizenAPI } from '../../services/api';


const AdminBlacklist = () => {
    const [blacklist, setBlacklist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlacklist();
    }, []);

    const fetchBlacklist = async () => {
        try {
            const response = await citizenAPI.getBlacklist();
            console.log("🔍 Raw API response:", response);
    
            // Try both possibilities
            console.log("✅ response.data:", response.data);
            console.log("✅ response.data.data:", response.data?.data);
    
            setBlacklist(response.data); // maybe should be response.data.data
        } catch (error) {
            console.error('Error fetching blacklist:', error);
        } finally {
            setLoading(false);
        }
    };
    

    const columns = [
        { header: 'Blacklist ID', accessor: 'BlacklistID' },
        { header: 'Citizen ID', accessor: 'CitizenID' },
        { header: 'Reason', accessor: 'Reason' },
        {
            header: 'Blacklisted Date',
            accessor: 'BlacklistedDate',
            render: (row) => new Date(row.BlacklistedDate).toLocaleDateString(),
        },
        { header: 'Blacklisted By', accessor: 'BlacklistedBy' },
        {
            header: 'Status',
            accessor: 'Status',
            render: (row) => <StatusBadge status={row.Status} />,
        },
        {
            header: 'Removal Date',
            accessor: 'RemovalDate',
            render: (row) =>
                row.RemovalDate
                    ? new Date(row.RemovalDate).toLocaleDateString()
                    : 'N/A',
        },
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
                <h1 className="text-3xl font-bold mb-8">Blacklist Management</h1>

                <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-sm text-red-800">
                        ⚠️ <strong>Stored Procedure:</strong> sp_AddToBlacklist
                        automatically revokes all passports when a citizen is
                        blacklisted. <strong>Trigger:</strong>{' '}
                        tr_AfterBlacklistInsert fires automatically!
                    </p>
                </div>

                <Card>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">
                            Blacklisted Citizens ({blacklist.length})
                        </h3>
                    </div>
                    <Table columns={columns} data={blacklist} />
                </Card>
            </div>
        </div>
    );
};

export default AdminBlacklist;
