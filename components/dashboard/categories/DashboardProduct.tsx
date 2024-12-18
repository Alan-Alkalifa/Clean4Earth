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
} from '@/utils/database';
import { supabase } from '@/utils/supabase';
import DashboardTable from '../DashboardTable';

interface DashboardProductProps {
    itemsPerPage?: number;
}

export default function DashboardProduct({ itemsPerPage = 10 }: DashboardProductProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (isFormOpen || editingProduct) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isFormOpen, editingProduct]);

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
            console.log('Attempting to create product:', data);
            const response = await createProduct(data);
            
            if (response.success && response.data) {
                console.log('Product created successfully:', response.data);
                await loadProducts();
                setIsFormOpen(false);
                setError(null);
            } else {
                console.error('Failed to create product:', response.error);
                throw new Error(response.error || 'Failed to create product');
            }
        } catch (err) {
            console.error('Error in handleCreate:', err);
            setError(err instanceof Error ? err.message : 'An error occurred while creating product');
            // Keep form open to show error
        }
    };

    const handleUpdate = async (id: string, data: Partial<Product>) => {
        try {
            console.log('Attempting to update product:', { id, data });
            const response = await updateProduct(id, data);
            
            if (response.success && response.data) {
                console.log('Product updated successfully:', response.data);
                await loadProducts();
                setEditingProduct(null);
                setError(null);
            } else {
                console.error('Failed to update product:', response.error);
                throw new Error(response.error || 'Failed to update product');
            }
        } catch (err) {
            console.error('Error in handleUpdate:', err);
            setError(err instanceof Error ? err.message : 'An error occurred while updating product');
            // Keep form open to show error
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }

        try {
            console.log('Attempting to delete product:', id);
            const response = await deleteProduct(id);
            
            if (response.success) {
                console.log('Product deleted successfully');
                await loadProducts();
                setError(null);
            } else {
                console.error('Failed to delete product:', response.error);
                throw new Error(response.error || 'Failed to delete product');
            }
        } catch (err) {
            console.error('Error in handleDelete:', err);
            setError(err instanceof Error ? err.message : 'An error occurred while deleting product');
        }
    };

    const handleBatchDelete = async () => {
        if (selectedIds.length === 0) return;
        
        if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} selected products?`)) {
            return;
        }

        try {
            console.log('Attempting to batch delete products:', selectedIds);
            const response = await batchDeleteProducts(selectedIds);
            
            if (response.success) {
                console.log('Products deleted successfully');
                await loadProducts();
                setSelectedIds([]);
                setError(null);
            } else {
                console.error('Failed to delete products:', response.error);
                throw new Error(response.error || 'Failed to delete selected products');
            }
        } catch (err) {
            console.error('Error in handleBatchDelete:', err);
            setError(err instanceof Error ? err.message : 'An error occurred while deleting products');
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
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

    useEffect(() => {
        setTotalPages(Math.ceil(products.length / itemsPerPage));
    }, [products, itemsPerPage]);

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
                        onClick={() => handlePageChange(page + 1)}
                        className={`px-4 py-2 text-sm ${currentPage === page + 1 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'} rounded-md hover:bg-gray-200 transition-colors`}
                    >
                        {page + 1}
                    </button>
                ))}
            </div>

            {/* Add/Edit Product Form Modal */}
            {(isFormOpen || editingProduct) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 overflow-y-auto">
                    <div className="relative bg-white rounded-lg w-full max-w-4xl my-8">
                        <div className="sticky top-0 bg-white px-6 py-4 border-b z-10">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">
                                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                                </h3>
                                <button
                                    onClick={() => {
                                        setIsFormOpen(false);
                                        setEditingProduct(null);
                                    }}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
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

// ProductImage component to handle image URLs
function ProductImage({ image }: { image: string }) {
    const [error, setError] = useState(false);

    if (!image) {
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
            src={image}
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
        
        try {
            setIsSubmitting(true);
            
            // Validate required fields
            if (!formData.name || !formData.category || formData.price < 0 || formData.quantity < 0) {
                setError('Please fill in all required fields with valid values');
                return;
            }

            // Validate image if present
            if (formData.image && !validateImageUrl(formData.image)) {
                setError('Please enter a valid image URL or upload an image');
                return;
            }

            console.log('Submitting form data:', formData);
            await onSubmit(formData);
            
            // Clear form data after successful submission
            setFormData({
                name: '',
                price: 0,
                description: '',
                image: '',
                category: '',
                quantity: 0
            });
            
        } catch (error) {
            console.error('Form submission error:', error);
            setError(error instanceof Error ? error.message : 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-md mb-6">
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
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">IDR.</span>
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
                <label className="block text-sm font-medium text-gray-700">Product Image</label>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="text-sm text-gray-600 mb-3">
                        Upload a product image (max 5MB)
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            // Validate file size (5MB limit)
                            if (file.size > 5 * 1024 * 1024) {
                                setError('Image size must be less than 5MB');
                                return;
                            }

                            try {
                                setIsSubmitting(true);
                                setError(null);
                                console.log('Starting image upload for file:', file.name);
                                
                                const imageUrl = await uploadImage(file);
                                console.log('Upload successful, URL:', imageUrl);
                                
                                setFormData(prev => ({ ...prev, image: imageUrl }));
                            } catch (err) {
                                console.error('Detailed upload error:', {
                                    error: err,
                                    message: err instanceof Error ? err.message : 'Unknown error',
                                    type: err instanceof Error ? err.name : typeof err,
                                    details: JSON.stringify(err, null, 2)
                                });
                                
                                setError(err instanceof Error 
                                    ? `Upload failed: ${err.message}` 
                                    : 'Failed to upload image. Please try again.');
                            } finally {
                                setIsSubmitting(false);
                            }
                        }}
                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-medium
                            file:bg-primary file:text-white
                            hover:file:cursor-pointer hover:file:bg-primary-dark
                            file:disabled:opacity-50 file:disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    />
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

            <div className="flex justify-end space-x-3 pt-4 border-t sticky bottom-0 bg-white z-10 pb-2">
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