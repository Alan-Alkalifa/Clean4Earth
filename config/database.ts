import { supabase, handleSupabaseResponse } from './supabase';
import { SupabaseClient } from '@supabase/supabase-js';

export interface FormData {
    id: string;
    timestamp: string;
    [key: string]: any;
}

export interface Registration extends FormData {
    fullname: string;
    email: string;
    phone: string;
    organization?: string;
    eventtitle: string;
    eventdate: string;
    eventtime: string;
    attendancedate: string;
    numberofguests: number;
    specialrequirements?: string;
    status: string;
}

export interface Volunteer {
    id: string;
    created_at: string;
    fullname: string;
    email: string;
    phone: string | null;
    role: 'student' | 'faculty' | 'staff' | 'other';
    interests: string[];
    availability: 'weekdays' | 'weekends' | 'both' | 'flexible' | null;
    message: string | null;
    status: 'pending' | 'approved' | 'rejected';
}

export interface Contact {
    id: string;
    created_at: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    quantity: number;
    upload_at?: string;
}

export interface FetchResponse<T> {
    success: boolean;
    data: T[];
    error?: any;
}

export interface OperationResponse<T = any> {
    success: boolean;
    error?: any;
    id?: string;
    data?: T;
}

// Authentication
export const initializeAuth = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error('Authentication error:', error);
        return { success: false, error };
    }

    return { success: true, user: data.user };
};

// Volunteer operations
export const submitVolunteerForm = async (formData: Omit<Volunteer, 'status' | 'id' | 'created_at'>): Promise<OperationResponse> => {
    const { data, error } = await supabase
        .from('volunteer_form')
        .insert([{ ...formData, status: 'pending' }])
        .select()
        .single();

    return handleSupabaseResponse({ data, error }, 'Failed to submit volunteer form');
};

export const fetchVolunteers = async (): Promise<FetchResponse<Volunteer>> => {
    try {
        const response = await supabase
            .from('volunteer_form')
            .select('*')
            .order('created_at', { ascending: false });

        const result = handleSupabaseResponse<Volunteer[]>(response, 'Failed to fetch volunteers');
        return {
            ...result,
            data: result.data || [] // Ensure we always return an array, even if empty
        };
    } catch (error) {
        console.error('Error in fetchVolunteers:', error);
        return { success: false, error: 'Failed to fetch volunteers', data: [] };
    }
};

export const updateVolunteer = async (id: string, data: Partial<Volunteer>): Promise<OperationResponse> => {
    const response = await supabase
        .from('volunteer_form')
        .update(data)
        .eq('id', id)
        .select()
        .single();

    return handleSupabaseResponse(response, 'Failed to update volunteer');
};

export const deleteVolunteer = async (id: string): Promise<OperationResponse> => {
    try {
        const response = await supabase
            .from('volunteer_form')
            .delete()
            .eq('id', id);

        return handleSupabaseResponse(response, 'Failed to delete volunteer');
    } catch (error) {
        console.error('Error in deleteVolunteer:', error);
        return { success: false, error: 'Failed to delete volunteer' };
    }
};

export const updateVolunteerStatus = async (id: string, status: 'pending' | 'approved' | 'rejected'): Promise<OperationResponse> => {
    try {
        const response = await supabase
            .from('volunteer_form')
            .update({ status })
            .eq('id', id)
            .select()
            .single();

        return handleSupabaseResponse<Volunteer>(response, 'Failed to update volunteer status');
    } catch (error) {
        console.error('Error in updateVolunteerStatus:', error);
        return { success: false, error: 'Failed to update status' };
    }
};

// Contact operations
export const submitContactForm = async (formData: Contact): Promise<OperationResponse> => {
    const { data, error } = await supabase
        .from('contact_form')
        .insert([formData])
        .select()
        .single();

    return handleSupabaseResponse({ data, error }, 'Failed to submit contact form');
};

export const fetchContacts = async (): Promise<FetchResponse<Contact>> => {
    const { data, error } = await supabase
        .from('contact_form')
        .select('*')
        .order('created_at', { ascending: false });

    return {
        success: !error,
        data: data || [],
        ...(error && { error })
    };
};

export const updateContact = async (id: string, data: Partial<Contact>): Promise<OperationResponse> => {
    const response = await supabase
        .from('contact_form')
        .update(data)
        .eq('id', id);

    return handleSupabaseResponse(response, 'Failed to update contact');
};

export const deleteContact = async (id: string): Promise<OperationResponse> => {
    const response = await supabase
        .from('contact_form')
        .delete()
        .eq('id', id);

    return handleSupabaseResponse(response, 'Failed to delete contact');
};

// Registration operations
export const submitRegistrationForm = async (formData: Omit<Registration, 'status' | 'id' | 'timestamp'>): Promise<OperationResponse> => {
    const { data, error } = await supabase
        .from('registration_form')
        .insert([{
            ...formData,
            status: 'pending',
            timestamp: new Date().toISOString()
        }])
        .select()
        .single();

    return handleSupabaseResponse({ data, error }, 'Failed to submit registration');
};

export const fetchRegistrations = async (): Promise<FetchResponse<Registration>> => {
    try {
        const { data, error } = await supabase
            .from('registration_form')
            .select('*')
            .order('timestamp', { ascending: false });

        if (error) {
            console.error('Supabase error in fetchRegistrations:', error);
            return {
                success: false,
                data: [],
                error: error.message || 'Failed to fetch registrations'
            };
        }

        return {
            success: true,
            data: data || [],
        };
    } catch (err) {
        console.error('Unexpected error in fetchRegistrations:', err);
        return {
            success: false,
            data: [],
            error: err instanceof Error ? err.message : 'An unexpected error occurred'
        };
    }
};

export const updateRegistration = async (id: string, data: Partial<Registration>): Promise<OperationResponse> => {
    const response = await supabase
        .from('registration_form')
        .update(data)
        .eq('id', id)
        .select()
        .single();

    return handleSupabaseResponse(response, 'Failed to update registration');
};

export const deleteRegistration = async (id: string): Promise<OperationResponse> => {
    const response = await supabase
        .from('registration_form')
        .delete()
        .eq('id', id);

    return handleSupabaseResponse(response, 'Failed to delete registration');
};

export const updateRegistrationStatus = async (id: string, status: string): Promise<OperationResponse> => {
    return updateRegistration(id, { status });
};

// Batch operations
export const batchUpdateStatus = async (
    type: 'registration' | 'volunteer' | 'contact',
    ids: string[],
    status: string
): Promise<OperationResponse> => {
    try {
        const table = type === 'registration' 
            ? 'registration_form' 
            : type === 'volunteer' 
                ? 'volunteer_form' 
                : 'contact_form';

        const { data, error } = await supabase
            .from(table)
            .update({ status })
            .in('id', ids);

        return handleSupabaseResponse({ data, error }, `Failed to update ${type} statuses`);
    } catch (error) {
        return { success: false, error };
    }
};

export const batchDelete = async (
    type: 'registration' | 'volunteer' | 'contact',
    ids: string[]
): Promise<OperationResponse> => {
    try {
        const table = type === 'registration' 
            ? 'registration_form' 
            : type === 'volunteer' 
                ? 'volunteer_form' 
                : 'contact_form';

        const { data, error } = await supabase
            .from(table)
            .delete()
            .in('id', ids);

        return handleSupabaseResponse({ data, error }, `Failed to delete ${type}s`);
    } catch (error) {
        return { success: false, error };
    }
};

// Search operations
export const searchRecords = async <T extends FormData>(
    type: 'registration' | 'volunteer' | 'contact',
    searchTerm: string,
    field: keyof T
): Promise<FetchResponse<T>> => {
    let table = `${type}s`;
    if (type === 'volunteer') table = 'volunteer_form';
    if (type === 'registration') table = 'registration_form';

    const { data, error } = await supabase
        .from(table)
        .select('*')
        .ilike(field as string, `%${searchTerm}%`);

    return {
        success: !error,
        data: data || [],
        ...(error && { error })
    };
};

// Product operations
export const createProduct = async (data: Omit<Product, 'id' | 'upload_at'>): Promise<OperationResponse<Product>> => {
    try {
        const timestamp = new Date().toISOString();
        const productData = {
            ...data,
            upload_at: timestamp
        };

        const { data: newProduct, error } = await supabase
            .from('products')
            .insert([productData])
            .select()
            .single();

        if (error) {
            console.error('Product creation error:', error);
            return {
                success: false,
                error: error.message || 'Failed to create product'
            };
        }

        if (!newProduct) {
            return {
                success: false,
                error: 'No data returned after product creation'
            };
        }

        return {
            success: true,
            data: newProduct
        };
    } catch (err) {
        console.error('Unexpected error during product creation:', err);
        return {
            success: false,
            error: err instanceof Error ? err.message : 'An unexpected error occurred'
        };
    }
};

export const fetchProducts = async (): Promise<FetchResponse<Product>> => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('upload_at', { ascending: false });

    return {
        success: !error,
        data: data ?? [],
        ...(error && { error })
    };
};

export const updateProduct = async (id: string, data: Partial<Product>): Promise<OperationResponse> => {
    try {
        console.log('Updating product:', { id, data });

        // Update the timestamp
        const updateData = {
            ...data,
            upload_at: new Date().toISOString()
        };

        const { data: updatedProduct, error } = await supabase
            .from('products')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Product update error:', error);
            return {
                success: false,
                error: error.message || 'Failed to update product'
            };
        }

        if (!updatedProduct) {
            console.error('No product data returned after update');
            return {
                success: false,
                error: 'Product not found or update failed'
            };
        }

        console.log('Product updated successfully:', updatedProduct);
        return {
            success: true,
            data: updatedProduct
        };
    } catch (err) {
        console.error('Unexpected error during product update:', err);
        return {
            success: false,
            error: err instanceof Error ? err.message : 'An unexpected error occurred'
        };
    }
};

export const deleteProduct = async (id: string): Promise<OperationResponse> => {
    try {
        console.log('Attempting to delete product:', id);

        // First, get the product to check if it exists and get its image URL
        const { data: product, error: fetchError } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchError) {
            console.error('Error fetching product:', fetchError);
            return {
                success: false,
                error: 'Failed to find product'
            };
        }

        if (!product) {
            return {
                success: false,
                error: 'Product not found'
            };
        }

        // Delete the product from the database
        const { error: deleteError } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (deleteError) {
            console.error('Error deleting product:', deleteError);
            return {
                success: false,
                error: deleteError.message || 'Failed to delete product'
            };
        }

        // If there was an image associated with the product, delete it from storage
        if (product.image) {
            try {
                const imageUrl = new URL(product.image);
                const pathParts = imageUrl.pathname.split('/');
                const fileName = pathParts[pathParts.length - 1];
                
                if (fileName) {
                    const { error: storageError } = await supabase.storage
                        .from('products')
                        .remove([`products/${fileName}`]);

                    if (storageError) {
                        console.warn('Failed to delete product image:', storageError);
                        // Don't return error here as the product was already deleted
                    }
                }
            } catch (err) {
                console.warn('Error parsing image URL:', err);
                // Don't return error as the product was already deleted
            }
        }

        console.log('Product deleted successfully:', id);
        return {
            success: true
        };
    } catch (err) {
        console.error('Unexpected error during product deletion:', err);
        return {
            success: false,
            error: err instanceof Error ? err.message : 'An unexpected error occurred'
        };
    }
};

export const batchDeleteProducts = async (ids: string[]): Promise<OperationResponse> => {
    try {
        console.log('Attempting to batch delete products:', ids);

        // First, get all products to get their image URLs
        const { data: products, error: fetchError } = await supabase
            .from('products')
            .select('*')
            .in('id', ids);

        if (fetchError) {
            console.error('Error fetching products:', fetchError);
            return {
                success: false,
                error: 'Failed to find products'
            };
        }

        // Delete products from the database
        const { error: deleteError } = await supabase
            .from('products')
            .delete()
            .in('id', ids);

        if (deleteError) {
            console.error('Error batch deleting products:', deleteError);
            return {
                success: false,
                error: deleteError.message || 'Failed to delete products'
            };
        }

        // Delete associated images from storage
        if (products) {
            const imageDeletePromises = products
                .filter(product => product.image)
                .map(async (product) => {
                    try {
                        const imageUrl = new URL(product.image);
                        const pathParts = imageUrl.pathname.split('/');
                        const fileName = pathParts[pathParts.length - 1];
                        
                        if (fileName) {
                            return supabase.storage
                                .from('products')
                                .remove([`products/${fileName}`]);
                        }
                    } catch (err) {
                        console.warn('Error parsing image URL:', err);
                        return null;
                    }
                });

            // Wait for all image deletions to complete
            await Promise.all(imageDeletePromises);
        }

        console.log('Products batch deleted successfully:', ids);
        return {
            success: true
        };
    } catch (err) {
        console.error('Unexpected error during batch product deletion:', err);
        return {
            success: false,
            error: err instanceof Error ? err.message : 'An unexpected error occurred'
        };
    }
};

export const getUniqueCategories = async (): Promise<string[]> => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('category')
            .not('category', 'is', null);

        if (error) {
            console.error('Error fetching categories:', error);
            return ['all'];
        }

        // Get unique categories and sort them
        const uniqueCategories = ['all', ...new Set(data.map(item => item.category))].filter(Boolean);
        return uniqueCategories.sort();
    } catch (err) {
        console.error('Unexpected error fetching categories:', err);
        return ['all'];
    }
};

// Image upload
export const uploadImage = async (file: File): Promise<string> => {
    try {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            throw new Error('File must be an image');
        }

        // Validate file size (5MB)
        const MAX_SIZE = 5 * 1024 * 1024; // 5MB
        if (file.size > MAX_SIZE) {
            throw new Error('File size must be less than 5MB');
        }

        // Create a unique file name
        const fileExt = file.name.split('.').pop()?.toLowerCase();
        if (!fileExt) {
            throw new Error('Invalid file extension');
        }

        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `products/${fileName}`;

        // Upload the file to Supabase storage
        const { data, error: uploadError } = await supabase.storage
            .from('products')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: true,
                contentType: file.type
            });

        if (uploadError) {
            // Log detailed error information
            console.error('Upload error details:', {
                message: uploadError.message,
                name: uploadError.name,
                cause: uploadError.cause,
                stack: uploadError.stack,
                details: JSON.stringify(uploadError, null, 2)
            });
            throw new Error(`Upload failed: ${uploadError.message || 'Unknown error occurred'}`);
        }

        if (!data) {
            throw new Error('No upload data returned from Supabase');
        }

        // Get the public URL
        const { data: urlData } = supabase.storage
            .from('products')
            .getPublicUrl(filePath);

        if (!urlData?.publicUrl) {
            throw new Error('Failed to get public URL for uploaded file');
        }

        return urlData.publicUrl;
    } catch (error) {
        // Enhanced error logging
        console.error('Image upload error:', {
            error: error,
            message: error instanceof Error ? error.message : 'Unknown error',
            type: error instanceof Error ? error.name : typeof error,
            details: JSON.stringify(error, null, 2)
        });
        
        // Rethrow with more specific message
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Failed to upload image: Unknown error occurred');
    }
};