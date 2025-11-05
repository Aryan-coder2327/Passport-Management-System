import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/Card';
import { Table } from '../../components/Table';
import api from '../../services/api';

const TravelHistory = () => {
    const { user } = useAuth();
    const [travels, setTravels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTravelHistory();
    }, []);

    const fetchTravelHistory = async () => {
        try {
            const response = await api.get(`/citizens/${user.citizenID}/travel-history`);
            setTravels(response.data);
        } catch (error) {
            console.error('Error fetching travel history:', error);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { header: 'Passport Number', accessor: 'PassportNumber' },
        { header: 'Country', accessor: 'CountryVisited' },
        { header: 'Entry Date', accessor: 'EntryDate', render: (row) => new Date(row.EntryDate).toLocaleDateString() },
        { header: 'Exit Date', accessor: 'ExitDate', render: (row) => row.ExitDate ? new Date(row.ExitDate).toLocaleDateString() : 'Still There' },
        { header: 'Purpose', accessor: 'PurposeOfVisit' },
        { header: 'Duration (Days)', accessor: 'Duration', render: (row) => row.Duration || 'Ongoing' }
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
                <h1 className="text-3xl font-bold mb-8">My Travel History</h1>

                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                        ℹ️ <strong>Database Feature:</strong> Travel_History is a <strong>weak entity</strong> dependent on Passport. Duration is auto-calculated using a stored computed column!
                    </p>
                </div>

                <Card>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Your International Travels ({travels.length})</h3>
                    </div>
                    {travels.length > 0 ? (
                        <Table columns={columns} data={travels} />
                    ) : (
                        <p className="text-center py-8 text-gray-500">No travel history found</p>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default TravelHistory;