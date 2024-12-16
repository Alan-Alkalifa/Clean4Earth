'use client';

import { useState, useEffect } from 'react';
import { 
    fetchVolunteers, 
    updateVolunteerStatus, 
    deleteVolunteer, 
    batchUpdateStatus, 
    batchDelete,
    type Volunteer 
} from '@/config/database';
import DashboardTable from '../DashboardTable';

type Column = {
    key: string;
    label: string | React.ReactNode;
    render?: (item: any) => React.ReactNode;
};

export default function DashboardVolunteerApplication() {
    const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [processing, setProcessing] = useState(false);

    // Filter states
    const [filters, setFilters] = useState({
        search: '',
        status: 'all'
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const result = await fetchVolunteers();

                if (result.success) {
                    setVolunteers(result.data);
                } else {
                    console.error('Failed to fetch volunteers:', result.error);
                    setError('Failed to fetch volunteers');
                }
            } catch (err) {
                console.error('Error fetching volunteers:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch volunteers');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleStatusUpdate = async (id: string, status: string) => {
        setProcessing(true);
        try {
            const result = await updateVolunteerStatus(id, status);
            if (result.success) {
                setVolunteers(prev => prev.map(vol => 
                    vol.id === id ? { ...vol, status } : vol
                ));
            } else {
                throw new Error('Failed to update status');
            }
        } catch (err) {
            console.error('Error updating status:', err);
            setError('Failed to update status');
        } finally {
            setProcessing(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this volunteer application?')) return;
        
        setProcessing(true);
        try {
            const result = await deleteVolunteer(id);
            if (result.success) {
                setVolunteers(prev => prev.filter(vol => vol.id !== id));
            } else {
                throw new Error('Failed to delete volunteer');
            }
        } catch (err) {
            console.error('Error deleting volunteer:', err);
            setError('Failed to delete volunteer');
        } finally {
            setProcessing(false);
        }
    };

    const handleBatchOperation = async (operation: 'approve' | 'reject' | 'delete') => {
        if (selectedItems.length === 0) return;
        if (!confirm(`Are you sure you want to ${operation} ${selectedItems.length} volunteers?`)) return;

        setProcessing(true);
        try {
            if (operation === 'delete') {
                const result = await batchDelete('volunteer', selectedItems);
                if (result.success) {
                    setVolunteers(prev => prev.filter(vol => !selectedItems.includes(vol.id)));
                    setSelectedItems([]);
                } else {
                    throw new Error('Failed to delete volunteers');
                }
            } else {
                const status = operation === 'approve' ? 'approved' : 'rejected';
                const result = await batchUpdateStatus('volunteer', selectedItems, status);
                if (result.success) {
                    setVolunteers(prev => prev.map(vol => 
                        selectedItems.includes(vol.id) ? { ...vol, status } : vol
                    ));
                    setSelectedItems([]);
                } else {
                    throw new Error(`Failed to ${operation} volunteers`);
                }
            }
        } catch (err) {
            console.error(`Error in batch ${operation}:`, err);
            setError(`Failed to ${operation} volunteers`);
        } finally {
            setProcessing(false);
        }
    };

    // Filtered data getter
    const getFilteredData = () => {
        return volunteers.filter(item => {
            const searchFields = [
                item.name,
                item.email,
                item.phone,
                item.role,
                ...item.interests
            ];

            const matchesSearch = filters.search === '' || 
                searchFields.some(field => 
                    field?.toLowerCase().includes(filters.search.toLowerCase())
                );
            
            const matchesStatus = filters.status === 'all' || 
                item.status === filters.status;

            return matchesSearch && matchesStatus;
        });
    };

    const getTableData = () => {
        const baseColumns: Column[] = [
            { 
                key: 'select',
                label: (
                    <input
                        type="checkbox"
                        checked={selectedItems.length > 0 && getFilteredData().every(item => selectedItems.includes(item.id))}
                        onChange={(e) => {
                            const filteredData = getFilteredData();
                            if (e.target.checked) {
                                const newSelectedItems = [...new Set([
                                    ...selectedItems,
                                    ...filteredData.map(item => item.id)
                                ])];
                                setSelectedItems(newSelectedItems);
                            } else {
                                const filteredIds = new Set(filteredData.map(item => item.id));
                                setSelectedItems(selectedItems.filter(id => !filteredIds.has(id)));
                            }
                        }}
                        className="w-4 h-4"
                    />
                ), 
                render: (item: Volunteer) => (
                    <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={(e) => {
                            setSelectedItems(prev => 
                                e.target.checked
                                    ? [...prev, item.id]
                                    : prev.filter(id => id !== item.id)
                            );
                        }}
                        className="w-4 h-4"
                    />
                )
            }
        ];

        return {
            data: getFilteredData(),
            columns: [
                ...baseColumns,
                { key: 'name', label: 'Name' },
                { key: 'email', label: 'Email' },
                { key: 'phone', label: 'Phone' },
                { key: 'role', label: 'Role' },
                { 
                    key: 'interests',
                    label: 'Interests',
                    render: (item: Volunteer) => (
                        <div className="flex flex-wrap gap-1">
                            {item.interests.map((interest, idx) => (
                                <span 
                                    key={idx}
                                    className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full"
                                >
                                    {interest}
                                </span>
                            ))}
                        </div>
                    )
                },
                { key: 'availability', label: 'Availability' },
                {
                    key: 'status',
                    label: 'Status',
                    render: (item: Volunteer) => (
                        <span className={`px-2 py-1 text-sm rounded-full ${
                            item.status === 'approved' ? 'bg-green-100 text-green-800' :
                            item.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                        }`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                    )
                },
                {
                    key: 'actions',
                    label: 'Actions',
                    render: (item: Volunteer) => (
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => handleStatusUpdate(item.id, 'approved')}
                                disabled={processing}
                                className="px-3 py-1.5 text-sm bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleStatusUpdate(item.id, 'rejected')}
                                disabled={processing}
                                className="px-3 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                            >
                                Reject
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                disabled={processing}
                                className="px-3 py-1.5 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
                            >
                                Delete
                            </button>
                        </div>
                    )
                }
            ]
        };
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <div className="text-red-500 text-center">
                    <p className="text-xl font-semibold mb-2">Error</p>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header with actions */}
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Volunteer Applications</h2>
                {selectedItems.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => handleBatchOperation('approve')}
                            disabled={processing}
                            className="px-4 py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 transition-colors"
                        >
                            Approve Selected
                        </button>
                        <button
                            onClick={() => handleBatchOperation('reject')}
                            disabled={processing}
                            className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 transition-colors"
                        >
                            Reject Selected
                        </button>
                        <button
                            onClick={() => handleBatchOperation('delete')}
                            disabled={processing}
                            className="px-4 py-2 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 transition-colors"
                        >
                            Delete Selected
                        </button>
                    </div>
                )}
            </div>

            {/* Filters */}
            <div className="p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Search
                        </label>
                        <input
                            type="text"
                            value={filters.search}
                            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                            placeholder="Search by name, email, role..."
                            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Status
                        </label>
                        <select
                            value={filters.status}
                            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={() => setFilters({
                            search: '',
                            status: 'all'
                        })}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden ring-1 ring-gray-200 sm:rounded-lg">
                <DashboardTable {...getTableData()} />
            </div>
        </div>
    );
}