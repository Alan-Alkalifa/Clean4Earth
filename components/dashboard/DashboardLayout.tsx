'use client';

import { useState, useEffect } from 'react';
import { fetchProducts } from '@/config/database';
import DashboardVolunteerApplication from './categories/DashboardVolunteerApplication';
import DashboardEventRegistration from './categories/DashboardEventRegistrarion';
import DashboardContactMessage from './categories/DashboardContactMassage';
import DashboardProduct from './categories/DashboardProduct';
import Pagination from '@/components/dashboard/feature/Pagination';

type TabType = 'volunteers' | 'events' | 'contacts' | 'products';

interface PaginationState {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
}

export default function DashboardLayout() {
    const [activeTab, setActiveTab] = useState<TabType>('volunteers');
    const [pagination, setPagination] = useState<PaginationState>({
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        // Calculate total pages based on data length
        const calculateTotalPages = async () => {
            const response = await fetchProducts();
            if (response.success) {
                setTotalPages(Math.ceil(response.data.length / itemsPerPage));
            }
        };
        calculateTotalPages();
    }, []);

    const tabs = [
        { id: 'volunteers', label: 'Volunteer Applications' },
        { id: 'events', label: 'Event Registrations' },
        { id: 'contacts', label: 'Contact Messages' },
        { id: 'products', label: 'Products' }
    ];

    const handlePageChange = (newPage: number) => {
        setPagination(prev => ({
            ...prev,
            currentPage: newPage
        }));
    };

    const handleTotalItemsChange = (total: number) => {
        setPagination(prev => ({
            ...prev,
            totalItems: total,
            currentPage: prev.currentPage > Math.ceil(total / prev.itemsPerPage) 
                ? 1 
                : prev.currentPage
        }));
    };

    const getPaginationProps = () => {
        const totalPages = Math.ceil(pagination.totalItems / pagination.itemsPerPage);
        return {
            currentPage: pagination.currentPage,
            totalPages,
            onPageChange: handlePageChange
        };
    };

    return (
        <div className="container mx-auto mt-10 sm:mt-6 md:mt-10 px-2 sm:px-4 py-4 sm:py-6 md:py-8">
            {/* Tabs */}
            <div className="border-b border-gray-200 overflow-x-auto">
                <nav className="-mb-px flex space-x-4 sm:space-x-8 min-w-full sm:min-w-0 px-1" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id as TabType);
                                setPagination(prev => ({ ...prev, currentPage: 1 }));
                            }}
                            className={`
                                whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm
                                ${activeTab === tab.id
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }
                                flex-shrink-0
                            `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content */}
            <div className="mt-4 sm:mt-6">
                {activeTab === 'volunteers' && (
                    <>
                        <DashboardVolunteerApplication />
                        <Pagination
                            {...getPaginationProps()}
                        />
                    </>
                )}
                {activeTab === 'events' && (
                    <>
                        <DashboardEventRegistration />
                        <Pagination
                            {...getPaginationProps()}
                        />
                    </>
                )}
                {activeTab === 'contacts' && (
                    <>
                        <DashboardContactMessage />
                        <Pagination
                            {...getPaginationProps()}
                        />
                    </>
                )}
                {activeTab === 'products' && (
                    <>
                        <DashboardProduct 
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                            onPageChange={setCurrentPage}
                            totalPages={totalPages}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
