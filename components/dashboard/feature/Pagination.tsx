'use client';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        // Always show first page
        pages.push(1);

        if (currentPage > 3) {
            pages.push('...');
        }

        // Show pages around current page
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 2) {
            pages.push('...');
        }

        // Always show last page
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 mt-6">
            <div className="flex w-0 flex-1">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
            </div>
            <div className="hidden md:-mt-px md:flex">
                {getPageNumbers().map((page, index) => (
                    typeof page === 'number' ? (
                        <button
                            key={index}
                            onClick={() => onPageChange(page)}
                            className={`
                                inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium
                                ${currentPage === page
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }
                            `}
                        >
                            {page}
                        </button>
                    ) : (
                        <span
                            key={index}
                            className="inline-flex items-center border-transparent px-4 pt-4 text-sm font-medium text-gray-500"
                        >
                            {page}
                        </span>
                    )
                ))}
            </div>
            <div className="flex w-0 flex-1 justify-end">
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </nav>
    );
}
