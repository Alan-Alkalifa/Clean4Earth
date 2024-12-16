'use client';

import { useState, useEffect } from 'react';
import { 
    fetchRegistrations,
    updateRegistrationStatus,
    deleteRegistration,
    batchUpdateStatus,
    batchDelete,
    type Registration
} from '@/config/database';
import DashboardTable from '../DashboardTable';

type Column = {
    key: string;
    label: string | React.ReactNode;
    render?: (item: any) => React.ReactNode;
};

export default function DashboardEventRegistration() {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [processing, setProcessing] = useState(false);
    
    // Filter states
    const [filters, setFilters] = useState({
        search: '',
        startDate: '',
        endDate: '',
        status: 'all'
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const result = await fetchRegistrations();

                if (result.success) {
                    setRegistrations(result.data);
                } else {
                    console.error('Failed to fetch registrations:', result.error);
                    setError('Failed to fetch registrations');
                }
            } catch (err) {
                console.error('Error fetching registrations:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch registrations');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleStatusUpdate = async (id: string, status: string) => {
        setProcessing(true);
        try {
            const result = await updateRegistrationStatus(id, status);
            if (result.success) {
                setRegistrations(prev => prev.map(reg => 
                    reg.id === id ? { ...reg, status } : reg
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
        if (!confirm('Are you sure you want to delete this registration?')) return;
        
        setProcessing(true);
        try {
            const result = await deleteRegistration(id);
            if (result.success) {
                setRegistrations(prev => prev.filter(reg => reg.id !== id));
            } else {
                throw new Error('Failed to delete registration');
            }
        } catch (err) {
            console.error('Error deleting registration:', err);
            setError('Failed to delete registration');
        } finally {
            setProcessing(false);
        }
    };

    const handleBatchOperation = async (operation: 'approve' | 'reject' | 'delete') => {
        if (selectedItems.length === 0) return;
        if (!confirm(`Are you sure you want to ${operation} ${selectedItems.length} registrations?`)) return;

        setProcessing(true);
        try {
            if (operation === 'delete') {
                const result = await batchDelete('registration', selectedItems);
                if (result.success) {
                    setRegistrations(prev => prev.filter(reg => !selectedItems.includes(reg.id)));
                    setSelectedItems([]);
                } else {
                    throw new Error('Failed to delete registrations');
                }
            } else {
                const status = operation === 'approve' ? 'approved' : 'rejected';
                const result = await batchUpdateStatus('registration', selectedItems, status);
                if (result.success) {
                    setRegistrations(prev => prev.map(reg => 
                        selectedItems.includes(reg.id) ? { ...reg, status } : reg
                    ));
                    setSelectedItems([]);
                } else {
                    throw new Error(`Failed to ${operation} registrations`);
                }
            }
        } catch (err) {
            console.error(`Error in batch ${operation}:`, err);
            setError(`Failed to ${operation} registrations`);
        } finally {
            setProcessing(false);
        }
    };

    // Filtered data getter
    const getFilteredData = () => {
        return registrations.filter(item => {
            const searchFields = [
                item.fullName,
                item.email,
                item.phone,
                item.organization,
                item.eventTitle
            ];

            const matchesSearch = filters.search === '' || 
                searchFields.some(field => 
                    field?.toLowerCase().includes(filters.search.toLowerCase())
                );

            const itemDate = new Date(item.timestamp);
            const matchesStartDate = !filters.startDate || 
                itemDate >= new Date(filters.startDate);
            const matchesEndDate = !filters.endDate || 
                itemDate <= new Date(filters.endDate);
            
            const matchesStatus = filters.status === 'all' || 
                item.status === filters.status;

            return matchesSearch && matchesStartDate && matchesEndDate && matchesStatus;
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
                render: (item: Registration) => (
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
                { key: 'fullName', label: 'Name' },
                { key: 'email', label: 'Email' },
                { key: 'phone', label: 'Phone' },
                { key: 'organization', label: 'Organization' },
                { key: 'eventTitle', label: 'Event' },
                { key: 'eventDate', label: 'Event Date' },
                { key: 'eventTime', label: 'Event Time' },
                { key: 'numberOfGuests', label: 'Guests' },
                { key: 'status', label: 'Status' },
                { key: 'timestamp', label: 'Registration Date' },
                {
                    key: 'actions',
                    label: 'Actions',
                    render: (item: Registration) => (
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => handleStatusUpdate(item.id, 'approved')}
                                disabled={processing}
                                className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleStatusUpdate(item.id, 'rejected')}
                                disabled={processing}
                                className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                            >
                                Reject
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                disabled={processing}
                                className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
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
                <h2 className="text-xl font-semibold text-gray-900">Event Registrations</h2>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Search
                        </label>
                        <input
                            type="text"
                            value={filters.search}
                            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                            placeholder="Search by name, email, event..."
                            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Start Date
                        </label>
                        <input
                            type="date"
                            value={filters.startDate}
                            onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
                            className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            End Date
                        </label>
                        <input
                            type="date"
                            value={filters.endDate}
                            onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
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
                            startDate: '',
                            endDate: '',
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