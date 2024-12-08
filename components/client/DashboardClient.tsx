'use client';

import { useState, useEffect } from 'react';
import { 
    fetchRegistrations, 
    fetchVolunteers, 
    fetchContacts, 
    updateRegistrationStatus, 
    updateVolunteerStatus, 
    deleteRegistration, 
    deleteVolunteer, 
    deleteContact, 
    batchUpdateStatus, 
    batchDelete 
} from '@/config/database';
import DashboardTable from '../dashboard/DashboardTable';
import type { Registration, Volunteer, Contact, FetchResponse } from '@/config/database';

// Column type from DashboardTable
type Column = {
    key: string;
    label: string | React.ReactNode;
    render?: (item: any) => React.ReactNode;
};

export default function DashboardClient() {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [activeTab, setActiveTab] = useState('registrations');
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

                const results = await Promise.allSettled([
                    fetchRegistrations(),
                    fetchVolunteers(),
                    fetchContacts()
                ]);

                const [registrationsResult, volunteersResult, contactsResult] = results;

                if (registrationsResult.status === 'fulfilled' && registrationsResult.value.success) {
                    setRegistrations(registrationsResult.value.data);
                } else {
                    console.error('Failed to fetch registrations:', 
                        registrationsResult.status === 'rejected' ? registrationsResult.reason : registrationsResult.value.error
                    );
                }

                if (volunteersResult.status === 'fulfilled' && volunteersResult.value.success) {
                    setVolunteers(volunteersResult.value.data);
                } else {
                    console.error('Failed to fetch volunteers:', 
                        volunteersResult.status === 'rejected' ? volunteersResult.reason : volunteersResult.value.error
                    );
                }

                if (contactsResult.status === 'fulfilled' && contactsResult.value.success) {
                    setContacts(contactsResult.value.data);
                } else {
                    console.error('Failed to fetch contacts:', 
                        contactsResult.status === 'rejected' ? contactsResult.reason : contactsResult.value.error
                    );
                }

                const allFailed = results.every(result => 
                    result.status === 'rejected' || 
                    (result.status === 'fulfilled' && !result.value.success)
                );

                if (allFailed) {
                    setError('Failed to fetch data. Please check your connection and try again.');
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleStatusUpdate = async (id: string, status: string) => {
        setProcessing(true);
        try {
            let success = false;
            switch (activeTab) {
                case 'registrations':
                    success = (await updateRegistrationStatus(id, status)).success;
                    if (success) {
                        setRegistrations(prev => prev.map(reg => 
                            reg.id === id ? { ...reg, status } : reg
                        ));
                    }
                    break;
                case 'volunteers':
                    success = (await updateVolunteerStatus(id, status)).success;
                    if (success) {
                        setVolunteers(prev => prev.map(vol => 
                            vol.id === id ? { ...vol, status } : vol
                        ));
                    }
                    break;
            }
            if (!success) throw new Error('Failed to update status');
        } catch (err) {
            console.error('Error updating status:', err);
            setError('Failed to update status');
        } finally {
            setProcessing(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        
        setProcessing(true);
        try {
            let success = false;
            switch (activeTab) {
                case 'registrations':
                    success = (await deleteRegistration(id)).success;
                    if (success) {
                        setRegistrations(prev => prev.filter(reg => reg.id !== id));
                    }
                    break;
                case 'volunteers':
                    success = (await deleteVolunteer(id)).success;
                    if (success) {
                        setVolunteers(prev => prev.filter(vol => vol.id !== id));
                    }
                    break;
                case 'contacts':
                    success = (await deleteContact(id)).success;
                    if (success) {
                        setContacts(prev => prev.filter(contact => contact.id !== id));
                    }
                    break;
            }
            if (!success) throw new Error('Failed to delete item');
        } catch (err) {
            console.error('Error deleting item:', err);
            setError('Failed to delete item');
        } finally {
            setProcessing(false);
        }
    };

    const handleBatchOperation = async (operation: 'approve' | 'reject' | 'delete') => {
        if (selectedItems.length === 0) return;
        if (!confirm(`Are you sure you want to ${operation} ${selectedItems.length} items?`)) return;

        setProcessing(true);
        try {
            let success = false;
            const type = activeTab === 'registrations' ? 'registration' : 
                        activeTab === 'volunteers' ? 'volunteer' : 'contact';

            if (operation === 'delete') {
                success = (await batchDelete(type, selectedItems)).success;
                if (success) {
                    switch (activeTab) {
                        case 'registrations':
                            setRegistrations(prev => prev.filter(reg => !selectedItems.includes(reg.id)));
                            break;
                        case 'volunteers':
                            setVolunteers(prev => prev.filter(vol => !selectedItems.includes(vol.id)));
                            break;
                        case 'contacts':
                            setContacts(prev => prev.filter(contact => !selectedItems.includes(contact.id)));
                            break;
                    }
                }
            } else {
                const status = operation === 'approve' ? 'approved' : 'rejected';
                success = (await batchUpdateStatus(type, selectedItems, status)).success;
                if (success) {
                    switch (activeTab) {
                        case 'registrations':
                            setRegistrations(prev => prev.map(reg => 
                                selectedItems.includes(reg.id) ? { ...reg, status } : reg
                            ));
                            break;
                        case 'volunteers':
                            setVolunteers(prev => prev.map(vol => 
                                selectedItems.includes(vol.id) ? { ...vol, status } : vol
                            ));
                            break;
                    }
                }
            }
            if (!success) throw new Error(`Failed to ${operation} items`);
            setSelectedItems([]);
        } catch (err) {
            console.error(`Error in batch ${operation}:`, err);
            setError(`Failed to ${operation} items`);
        } finally {
            setProcessing(false);
        }
    };

    // Filtered data getter
    const getFilteredData = () => {
        let data = [];
        switch (activeTab) {
            case 'registrations':
                data = registrations;
                break;
            case 'volunteers':
                data = volunteers;
                break;
            case 'contacts':
                data = contacts;
                break;
            default:
                return [];
        }

        return data.filter(item => {
            const searchFields = activeTab === 'registrations' 
                ? [item.fullName, item.email, item.eventTitle]
                : activeTab === 'volunteers'
                ? [item.name, item.email, item.role]
                : [item.name, item.email, item.subject];

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
                ('status' in item && item.status === filters.status);

            return matchesSearch && matchesStartDate && matchesEndDate && matchesStatus;
        });
    };

    const tabs = [
        { id: 'registrations', label: 'Event Registrations', count: registrations.length },
        { id: 'volunteers', label: 'Volunteer Applications', count: volunteers.length },
        { id: 'contacts', label: 'Contact Messages', count: contacts.length }
    ];

    const getActiveData = () => {
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
                                // Select all items that aren't already selected
                                const newSelectedItems = [...new Set([
                                    ...selectedItems,
                                    ...filteredData.map(item => item.id)
                                ])];
                                setSelectedItems(newSelectedItems);
                            } else {
                                // Deselect only the items that are currently visible
                                const filteredIds = new Set(filteredData.map(item => item.id));
                                setSelectedItems(selectedItems.filter(id => !filteredIds.has(id)));
                            }
                        }}
                        className="w-4 h-4"
                    />
                ), 
                render: (item: any) => (
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

        const actionColumn: Column = {
            key: 'actions',
            label: 'Actions',
            render: (item: any) => (
                <div className="flex space-x-2">
                    {activeTab !== 'contacts' && (
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
                        </div>
                    )}
                    <button
                        onClick={() => handleDelete(item.id)}
                        disabled={processing}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
                    >
                        Delete
                    </button>
                </div>
            )
        };

        switch (activeTab) {
            case 'registrations':
                return {
                    data: getFilteredData(),
                    columns: [
                        ...baseColumns,
                        { key: 'fullName', label: 'Name' },
                        { key: 'email', label: 'Email' },
                        { key: 'phone', label: 'Phone' },
                        { key: 'eventTitle', label: 'Event' },
                        { key: 'numberOfGuests', label: 'Guests' },
                        { key: 'status', label: 'Status' },
                        { key: 'timestamp', label: 'Date' },
                        actionColumn
                    ]
                };
            case 'volunteers':
                return {
                    data: getFilteredData(),
                    columns: [
                        ...baseColumns,
                        { key: 'name', label: 'Name' },
                        { key: 'email', label: 'Email' },
                        { key: 'phone', label: 'Phone' },
                        { key: 'role', label: 'Role' },
                        { key: 'interests', label: 'Interests' },
                        { key: 'availability', label: 'Availability' },
                        { key: 'status', label: 'Status' },
                        { key: 'timestamp', label: 'Date' },
                        actionColumn
                    ]
                };
            case 'contacts':
                return {
                    data: getFilteredData(),
                    columns: [
                        ...baseColumns,
                        { key: 'name', label: 'Name' },
                        { key: 'email', label: 'Email' },
                        { key: 'subject', label: 'Subject' },
                        { key: 'message', label: 'Message' },
                        { key: 'timestamp', label: 'Date' },
                        actionColumn
                    ]
                };
            default:
                return { data: [], columns: [] };
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500 text-center">
                    <p className="text-xl font-semibold mb-2">Error</p>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-start justify-center bg-gray-50 px-2 py-4 sm:p-4 sm:py-12">
            <div className="w-full max-w-7xl bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-3 sm:gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Clean4Earth</h1>
                    
                    {selectedItems.length > 0 && (
                        <div className="flex flex-wrap w-full sm:w-auto gap-2">
                            {activeTab !== 'contacts' && (
                                <>
                                    <button
                                        onClick={() => handleBatchOperation('approve')}
                                        disabled={processing}
                                        className="flex-1 sm:flex-none min-w-[120px] px-3 py-2 sm:px-4 sm:py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 transition-colors"
                                    >
                                        Approve Selected
                                    </button>
                                    <button
                                        onClick={() => handleBatchOperation('reject')}
                                        disabled={processing}
                                        className="flex-1 sm:flex-none min-w-[120px] px-3 py-2 sm:px-4 sm:py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 transition-colors"
                                    >
                                        Reject Selected
                                    </button>
                                </>
                            )}
                            <button
                                onClick={() => handleBatchOperation('delete')}
                                disabled={processing}
                                className="flex-1 sm:flex-none min-w-[120px] px-3 py-2 sm:px-4 sm:py-2 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 transition-colors"
                            >
                                Delete Selected
                            </button>
                        </div>
                    )}
                </div>

                {/* Filters */}
                <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Search
                            </label>
                            <input
                                type="text"
                                value={filters.search}
                                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                                placeholder="Search by name, email..."
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
                        {activeTab !== 'contacts' && (
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
                        )}
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
                
                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6 sm:mb-8 overflow-x-auto -mx-3 sm:mx-0 px-3 sm:px-0">
                    <nav className="-mb-px flex space-x-4 sm:space-x-8">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setSelectedItems([]);
                                }}
                                className={`${
                                    activeTab === tab.id
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-sm sm:text-base transition-colors duration-200 flex items-center min-w-[80px] justify-center sm:justify-start`}
                            >
                                <span className="hidden sm:inline">{tab.label}</span>
                                <span className="sm:hidden">
                                    {tab.label.split(' ')[0]}
                                </span>
                                <span className="ml-1.5 sm:ml-2 bg-gray-100 text-gray-600 py-0.5 px-1.5 sm:px-2 rounded-full text-xs sm:text-sm">
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Table */}
                <div className="overflow-x-auto -mx-3 sm:-mx-4 md:mx-0">
                    <div className="inline-block min-w-full align-middle px-3 sm:px-4 md:px-0">
                        <div className="overflow-hidden ring-1 ring-gray-200 sm:rounded-lg">
                            <DashboardTable {...getActiveData()} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
