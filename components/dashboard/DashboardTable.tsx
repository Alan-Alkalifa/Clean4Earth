'use client';

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
            return (
                <span className={`px-2 py-1 text-sm rounded-full ${
                    value === 'approved' ? 'bg-green-100 text-green-800' :
                    value === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                }`}>
                    {value || 'pending'}
                </span>
            );
        }

        if (typeof value === 'boolean') {
            return value ? 'Yes' : 'No';
        }

        if (value === null || value === undefined) {
            return '-';
        }

        return value.toString();
    };

    if (!data || data.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No data available
            </div>
        );
    }

    return (
        <div className="overflow-x-auto shadow-sm rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, index) => (
                        <tr key={item.id || index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            {columns.map((column) => (
                                <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {formatValue(item, column)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
