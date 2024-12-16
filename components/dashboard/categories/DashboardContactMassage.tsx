'use client';

import { useState, useEffect } from 'react';
import { 
    fetchContacts,
    deleteContact,
    batchDelete,
    type Contact
} from '@/config/database';
import DashboardTable from '../DashboardTable';

type Column = {
    key: string;
    label: string | React.ReactNode;
    render?: (item: any) => React.ReactNode;
};

export default function DashboardContactMessage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [processing, setProcessing] = useState(false);
    
    // Filter states
    const [filters, setFilters] = useState({
        search: '',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const result = await fetchContacts();

                if (result.success) {
                    setContacts(result.data);
                } else {
                    console.error('Failed to fetch contacts:', result.error);
                    setError('Failed to fetch contacts');
                }
            } catch (err) {
                console.error('Error fetching contacts:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch contacts');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;
        
        setProcessing(true);
        try {
            const result = await deleteContact(id);
            if (result.success) {
                setContacts(prev => prev.filter(contact => contact.id !== id));
            } else {
                throw new Error('Failed to delete message');
            }
        } catch (err) {
            console.error('Error deleting message:', err);
            setError('Failed to delete message');
        } finally {
            setProcessing(false);
        }
    };

    const handleBatchDelete = async () => {
        if (selectedItems.length === 0) return;
        if (!confirm(`Are you sure you want to delete ${selectedItems.length} messages?`)) return;

        setProcessing(true);
        try {
            const result = await batchDelete('contact', selectedItems);
            if (result.success) {
                setContacts(prev => prev.filter(contact => !selectedItems.includes(contact.id)));
                setSelectedItems([]);
            } else {
                throw new Error('Failed to delete messages');
            }
        } catch (err) {
            console.error('Error in batch delete:', err);
            setError('Failed to delete messages');
        } finally {
            setProcessing(false);
        }
    };

    // Filtered data getter
    const getFilteredData = () => {
        return contacts.filter(item => {
            const searchFields = [item.name, item.email, item.subject, item.message];

            const matchesSearch = filters.search === '' || 
                searchFields.some(field => 
                    field?.toLowerCase().includes(filters.search.toLowerCase())
                );

            const itemDate = new Date(item.timestamp);
            const matchesStartDate = !filters.startDate || 
                itemDate >= new Date(filters.startDate);
            const matchesEndDate = !filters.endDate || 
                itemDate <= new Date(filters.endDate);

            return matchesSearch && matchesStartDate && matchesEndDate;
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
                render: (item: Contact) => (
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
                { key: 'subject', label: 'Subject' },
                { key: 'message', label: 'Message' },
                { key: 'timestamp', label: 'Date' },
                {
                    key: 'actions',
                    label: 'Actions',
                    render: (item: Contact) => (
                        <button
                            onClick={() => handleDelete(item.id)}
                            disabled={processing}
                            className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 transition-colors"
                        >
                            Delete
                        </button>
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
                <h2 className="text-xl font-semibold text-gray-900">Contact Messages</h2>
                {selectedItems.length > 0 && (
                    <button
                        onClick={handleBatchDelete}
                        disabled={processing}
                        className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 transition-colors"
                    >
                        Delete Selected
                    </button>
                )}
            </div>

            {/* Filters */}
            <div className="p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Search
                        </label>
                        <input
                            type="text"
                            value={filters.search}
                            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                            placeholder="Search by name, email, subject..."
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
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={() => setFilters({
                            search: '',
                            startDate: '',
                            endDate: ''
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