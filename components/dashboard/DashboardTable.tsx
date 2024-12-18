'use client';

import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

interface Column {
    key: string;
    label: string | React.ReactNode;
    render?: (item: any) => React.ReactNode;
}

interface DashboardTableProps {
    data: any[];
    columns: Column[];
}

export default function DashboardTable({ data, columns }: DashboardTableProps) {
    const formatValue = (item: any, column: Column) => {
        if (column.render) {
            return column.render(item);
        }

        const value = item[column.key];

        if (column.key === 'timestamp' && value) {
            return new Date(value).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        if (Array.isArray(value)) {
            return value.join(', ');
        }

        if (column.key === 'status') {
            const statusStyles = {
                approved: 'bg-green-100 text-green-800 border border-green-200',
                rejected: 'bg-red-100 text-red-800 border border-red-200',
                pending: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
                completed: 'bg-blue-100 text-blue-800 border border-blue-200',
                default: 'bg-gray-100 text-gray-800 border border-gray-200'
            };

            const status = value?.toLowerCase() || 'pending';
            const style = statusStyles[status as keyof typeof statusStyles] || statusStyles.default;

            return (
                <span className={`px-3 py-1 text-xs font-medium rounded-full inline-flex items-center ${style}`}>
                    <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                        status === 'approved' ? 'bg-green-500' :
                        status === 'rejected' ? 'bg-red-500' :
                        status === 'completed' ? 'bg-blue-500' :
                        status === 'pending' ? 'bg-yellow-500' :
                        'bg-gray-500'
                    }`} />
                    {value?.charAt(0).toUpperCase() + value?.slice(1) || 'Pending'}
                </span>
            );
        }

        if (typeof value === 'boolean') {
            return (
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    value ? 'bg-green-100 text-green-800 border border-green-200' : 
                    'bg-red-100 text-red-800 border border-red-200'
                }`}>
                    {value ? 'Yes' : 'No'}
                </span>
            );
        }

        if (value === null || value === undefined) {
            return <span className="text-gray-400">-</span>;
        }

        return value.toString();
    };

    if (!data || data.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="text-center">
                    <div className="text-gray-400 mb-2">No data available</div>
                    <p className="text-sm text-gray-500">
                        There are no items to display at this time.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden shadow-sm rounded-lg border border-gray-200">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr className="bg-gray-50">
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    scope="col"
                                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                >
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((item, index) => (
                            <tr 
                                key={item.id || index}
                                className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                            >
                                {columns.map((column) => (
                                    <td 
                                        key={column.key} 
                                        className="px-6 py-4 text-sm text-gray-900"
                                    >
                                        <div className="flex items-center">
                                            {formatValue(item, column)}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
