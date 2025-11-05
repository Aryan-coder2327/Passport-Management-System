import React from 'react';

export const StatCard = ({ icon, title, value, color = 'blue' }) => {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        yellow: 'bg-yellow-100 text-yellow-600',
        red: 'bg-red-100 text-red-600',
        purple: 'bg-purple-100 text-purple-600'
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
                <div className={`p-3 rounded-full ${colorClasses[color]}`}>
                    {icon}
                </div>
                <div className="ml-4">
                    <p className="text-gray-600 text-sm">{title}</p>
                    <p className="text-2xl font-bold">{value}</p>
                </div>
            </div>
        </div>
    );
};