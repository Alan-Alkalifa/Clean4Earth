'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { submitRegistrationForm } from '@/config/database';

interface RegistrationFormData {
    fullName: string;
    email: string;
    phone: string;
    organization?: string;
    numberOfGuests: number;
    specialRequirements?: string;
    attendanceDate: string;
}

interface RegistrationFormProps {
    onSuccess?: () => void;
}

export default function RegistrationForm({ onSuccess }: RegistrationFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ success: boolean; error: string | null }>({
        success: false,
        error: null
    });
    const { register, handleSubmit, formState: { errors } } = useForm<RegistrationFormData>();

    const onSubmit = async (data: RegistrationFormData) => {
        setIsSubmitting(true);
        setSubmitStatus({ success: false, error: null });
        try {
            const result = await submitRegistrationForm(data);
            
            if (result.success) {
                setSubmitStatus({ success: true, error: null });
                toast.success('Registration successful!');
                onSuccess?.();
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setSubmitStatus({ 
                success: false, 
                error: 'Registration failed. Please try again or contact support if the problem persists.' 
            });
            toast.error('Registration failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information Group */}
                <div className="space-y-6 md:col-span-2">
                    <div className="border-b border-gray-200 pb-2">
                        <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                    </div>
                    
                    {/* Full Name */}
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            {...register('fullName', { required: 'Full name is required' })}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm transition-colors"
                            placeholder="John Doe"
                        />
                        {errors.fullName && (
                            <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                        )}
                    </div>

                    {/* Email and Phone in grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address'
                                    }
                                })}
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm transition-colors"
                                placeholder="john@example.com"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                {...register('phone', {
                                    required: 'Phone number is required',
                                    pattern: {
                                        value: /^[0-9+\-\s()]*$/,
                                        message: 'Invalid phone number'
                                    }
                                })}
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm transition-colors"
                                placeholder="+1 (555) 000-0000"
                            />
                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Organization */}
                    <div>
                        <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
                            Organization <span className="text-gray-400">(Optional)</span>
                        </label>
                        <input
                            type="text"
                            id="organization"
                            {...register('organization')}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm transition-colors"
                            placeholder="Company or Organization"
                        />
                    </div>
                </div>

                {/* Event Details Group */}
                <div className="space-y-6 md:col-span-2">
                    <div className="border-b border-gray-200 pb-2">
                        <h3 className="text-lg font-semibold text-gray-900">Event Details</h3>
                    </div>

                    {/* Attendance Date and Guests in grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Attendance Date */}
                        <div>
                            <label htmlFor="attendanceDate" className="block text-sm font-medium text-gray-700">
                                Attendance Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                id="attendanceDate"
                                {...register('attendanceDate', { required: 'Please select attendance date' })}
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm transition-colors"
                                min={new Date().toISOString().split('T')[0]}
                            />
                            {errors.attendanceDate && (
                                <p className="mt-1 text-sm text-red-600">{errors.attendanceDate.message}</p>
                            )}
                        </div>

                        {/* Number of Guests */}
                        <div>
                            <label htmlFor="numberOfGuests" className="block text-sm font-medium text-gray-700">
                                Number of Guests <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="numberOfGuests"
                                {...register('numberOfGuests', { required: 'Please select number of guests' })}
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm transition-colors"
                            >
                                <option value="">Select number of guests</option>
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <option key={num} value={num}>
                                        {num} {num === 1 ? 'Guest' : 'Guests'}
                                    </option>
                                ))}
                            </select>
                            {errors.numberOfGuests && (
                                <p className="mt-1 text-sm text-red-600">{errors.numberOfGuests.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Special Requirements */}
                    <div>
                        <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700">
                            Messages <span className="text-gray-400">(Optional)</span>
                        </label>
                        <textarea
                            id="specialRequirements"
                            {...register('specialRequirements')}
                            rows={3}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm transition-colors"
                            placeholder="Any dietary restrictions or accessibility requirements?"
                        />
                    </div>
                </div>
            </div>

            {/* Status Messages */}
            {(submitStatus.success || submitStatus.error) && (
                <div className="my-6">
                    {submitStatus.success && (
                        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center shadow-sm">
                            <svg className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm">Thank you for your interest! Your registration has been submitted successfully.</span>
                        </div>
                    )}
                    
                    {submitStatus.error && (
                        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center shadow-sm">
                            <svg className="w-5 h-5 mr-3 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm">{submitStatus.error}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Submit Button */}
            <div className="pt-6">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Registering...
                        </>
                    ) : (
                        'Complete Registration'
                    )}
                </button>
            </div>
        </form>
    );
}
