'use client';

import { useState, useEffect } from 'react';
import { 
    fetchProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct, 
    batchDeleteProducts,
    uploadImage,
    type Product 
} from '@/config/database';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/database';
import DashboardTable from '../DashboardTable';

interface DashboardProductProps {
    currentPage: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    totalPages: number;
}

export default function DashboardProduct({ currentPage, itemsPerPage, onPageChange, totalPages }: DashboardProductProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const loadProducts = async () => {
        setIsLoading(true);
        try {
            const response = await fetchProducts();
            if (response.success) {
                setProducts(response.data);
            } else {
                setError('Failed to load products');
            }
        } catch (err) {
            setError('An error occurred while loading products');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleCreate = async (data: Omit<Product, 'id'>) => {
        try {
            const response = await createProduct(data);
            if (response.success) {
                await loadProducts();
                setIsFormOpen(false);
            } else {
                throw new Error(response.error || 'Failed to create product');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while creating product');
            // Don't close the form if there's an error
        }
    };

    const handleUpdate = async (id: string, data: Partial<Product>) => {
        try {
            const response = await updateProduct(id, data);
            if (response.success) {
                loadProducts();
                setEditingProduct(null);
            } else {
                setError('Failed to update product');
            }
        } catch (err) {
            setError('An error occurred while updating product');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await deleteProduct(id);
            if (response.success) {
                loadProducts();
            } else {
                setError('Failed to delete product');
            }
        } catch (err) {
            setError('An error occurred while deleting product');
        }
    };

    const handleBatchDelete = async () => {
        if (selectedIds.length === 0) return;
        try {
            const response = await batchDeleteProducts(selectedIds);
            if (response.success) {
                loadProducts();
                setSelectedIds([]);
            } else {
                setError('Failed to delete selected products');
            }
        } catch (err) {
            setError('An error occurred while deleting products');
        }
    };

    const columns = [
        {
            key: 'image',
            label: 'Image',
            render: (item: Product) => (
                <div className="w-16 h-16">
                    {item.image && <ProductImage image={item.image} />}
                </div>
            )
        },
        {
            key: 'name',
            label: 'Product Name',
        },
        {
            key: 'price',
            label: 'Price',
            render: (item: Product) => `$${item.price.toFixed(2)}`
        },
        {
            key: 'category',
            label: 'Category'
        },
        {
            key: 'quantity',
            label: 'Stock'
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (item: Product) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => setEditingProduct(item)}
                        className="px-3 py-1.5 text-sm bg-primary text-white rounded hover:bg-primary-dark"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(item.id.toString())}
                        className="px-3 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            )
        }
    ];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="text-red-500 text-center">
                    <p className="text-xl font-semibold mb-2">Error</p>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="space-y-6">
            {/* Header with actions */}
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Products</h2>
                <div className="space-x-4">
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                    >
                        Add Product
                    </button>
                    {selectedIds.length > 0 && (
                        <button
                            onClick={handleBatchDelete}
                            className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                        >
                            Delete Selected ({selectedIds.length})
                        </button>
                    )}
                </div>
            </div>

            {/* Product Table */}
            <DashboardTable
                data={paginatedProducts}
                columns={columns}
            />

            {/* Pagination */}
            <div className="flex justify-center space-x-2">
                {[...Array(totalPages).keys()].map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page + 1)}
                        className={`px-4 py-2 text-sm ${currentPage === page + 1 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'} rounded-md hover:bg-gray-200 transition-colors`}
                    >
                        {page + 1}
                    </button>
                ))}
            </div>

            {/* Add/Edit Product Form Modal */}
            {(isFormOpen || editingProduct) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </h3>
                        <ProductForm
                            initialData={editingProduct}
                            onSubmit={(data) => editingProduct 
                                ? handleUpdate(editingProduct.id.toString(), data)
                                : handleCreate(data)
                            }
                            onCancel={() => {
                                setIsFormOpen(false);
                                setEditingProduct(null);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

// ProductImage component to handle both Firestore IDs and direct URLs
function ProductImage({ image }: { image: string }) {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                // Check if the image is a URL
                const isUrl = image.startsWith('http') || image.startsWith('https');
                if (isUrl) {
                    setImageUrl(image);
                } else {
                    // Treat as Firestore ID
                    const imageDoc = await getDoc(doc(db, 'images', image));
                    if (imageDoc.exists()) {
                        setImageUrl(imageDoc.data().data);
                    }
                }
            } catch (error) {
                console.error('Error loading image:', error);
                setError(true);
            }
        };

        if (image) {
            fetchImage();
        }
    }, [image]);

    if (error || !imageUrl) {
        return (
            <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
        );
    }

    return (
        <img
            src={imageUrl}
            alt="Product"
            className="w-full h-full object-cover rounded-md"
            onError={() => setError(true)}
        />
    );
}

interface ProductFormProps {
    initialData?: Product | null;
    onSubmit: (data: Omit<Product, "id">) => Promise<void>;
    onCancel: () => void;
}

function ProductForm({ initialData, onSubmit, onCancel }: ProductFormProps) {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        price: initialData?.price || 0,
        description: initialData?.description || '',
        image: initialData?.image || '',
        category: initialData?.category || '',
        quantity: initialData?.quantity || 0
    });
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = [
        'Electronics',
        'Clothing',
        'Home & Garden',
        'Books',
        'Sports & Outdoors',
        'Toys & Games',
        'Health & Beauty',
        'Automotive',
        'Other'
    ];

    const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setFormData(prev => ({ ...prev, image: url }));
        setError(null);
    };

    const validateImageUrl = (url: string) => {
        if (!url) return true; // Allow empty URL
        try {
            const parsedUrl = new URL(url);
            // Check if it's an Unsplash URL
            if (parsedUrl.hostname.includes('unsplash.com')) {
                return true;
            }
            // Also allow direct image URLs
            if (url.match(/\.(jpg|jpeg|png|gif)$/i)) {
                return true;
            }
            return false;
        } catch {
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        
        if (formData.image && !validateImageUrl(formData.image)) {
            setError('Please enter a valid Unsplash URL or direct image URL (ending in .jpg, .jpeg, .png, or .gif)');
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(formData);
        } catch (error) {
            console.error('Error submitting form:', error);
            setError(error instanceof Error ? error.message : 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-md">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm transition-colors"
                        required
                    />
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={e => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                            className="mt-1 block w-full pl-8 rounded-md p-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm transition-colors"
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    value={formData.description}
                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm transition-colors"
                    rows={4}
                    required
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="text-sm text-gray-600 mb-3">
                        Find a free image on <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark font-medium">Unsplash</a>
                    </div>
                    <input
                        type="url"
                        placeholder="Enter Unsplash URL (e.g., https://images.unsplash.com/photo-...)"
                        value={formData.image}
                        onChange={handleImageUrlChange}
                        className="block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm transition-colors"
                    />
                    <div className="mt-2 text-xs text-gray-500 flex items-center">
                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Click on any image on Unsplash, then click the download button and copy the URL
                    </div>
                    {formData.image && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                            <div className="relative w-40 h-40 border-2 border-gray-200 rounded-lg overflow-hidden hover:border-primary transition-colors">
                                <ProductImage image={formData.image} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        value={formData.category}
                        onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm transition-colors"
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                        type="number"
                        value={formData.quantity}
                        onChange={e => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                        className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm transition-colors"
                        required
                        min="0"
                    />
                </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                        </>
                    ) : (
                        initialData ? 'Update Product' : 'Create Product'
                    )}
                </button>
            </div>
        </form>
    );
}