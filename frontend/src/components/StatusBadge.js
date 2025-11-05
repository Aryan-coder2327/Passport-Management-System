import React from 'react';

export const StatusBadge = ({ status }) => {
    const statusStyles = {
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Under Review': 'bg-blue-100 text-blue-800',
        'Documents Required': 'bg-orange-100 text-orange-800',
        'Approved': 'bg-green-100 text-green-800',
        'Rejected': 'bg-red-100 text-red-800',
        'Completed': 'bg-purple-100 text-purple-800',
        'Active': 'bg-green-100 text-green-800',
        'Expired': 'bg-gray-100 text-gray-800',
        'Revoked': 'bg-red-100 text-red-800'
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
            {status}
        </span>
    );
};