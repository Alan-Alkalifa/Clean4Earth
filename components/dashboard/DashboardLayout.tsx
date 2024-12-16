'use client';

import { useState } from 'react';
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

    const tabs = [
        { id: 'volunteers', label: 'Volunteer Applications' },
        { id: 'events', label: 'Event Registrations' },
        { id: 'contacts', label: 'Contact Messages' },
        { id: 'products', label: 'Products' }
    ];

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
                            currentPage={1}
                            totalPages={1}
                            onPageChange={() => {}}
                        />
                    </>
                )}
                {activeTab === 'events' && (
                    <>
                        <DashboardEventRegistration />
                        <Pagination
                            currentPage={1}
                            totalPages={1}
                            onPageChange={() => {}}
                        />
                    </>
                )}
                {activeTab === 'contacts' && (
                    <>
                        <DashboardContactMessage />
                        <Pagination
                            currentPage={1}
                            totalPages={1}
                            onPageChange={() => {}}
                        />
                    </>
                )}
                {activeTab === 'products' && (
                    <>
                        <DashboardProduct />
                    </>
                )}
            </div>
        </div>
    );
}
