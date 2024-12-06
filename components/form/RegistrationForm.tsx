'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

interface FormData {
    fullName: string;
    email: string;
    phone: string;
    organization: string;
    numberOfGuests: number;
    specialRequirements: string;
    attendanceDate: string;
}

interface EventDetails {
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    image: string;
}

interface Props {
    onSuccess?: () => void;
    eventDetails: EventDetails;
}

export default function RegistrationForm({ onSuccess, eventDetails }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [form, setForm] = useState<FormData>({
        fullName: '',
        email: '',
        phone: '',
        organization: '',
        numberOfGuests: 1,
        specialRequirements: '',
        attendanceDate: ''
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const validate = (data: FormData) => {
        const errors: Partial<FormData> = {};
        if (!data.fullName.trim()) errors.fullName = 'Name is required';
        if (!data.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.email = 'Invalid email format';
        }
        if (!data.phone.trim()) errors.phone = 'Phone is required';
        if (!data.attendanceDate) errors.attendanceDate = 'Date is required';
        return errors;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        if (message.text) {
            setMessage({ type: '', text: '' });
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const newErrors = validate(form);
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    eventTitle: eventDetails.title,
                    eventDate: eventDetails.date,
                    eventTime: eventDetails.time
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            setMessage({ type: 'success', text: data.message });
            setForm({
                fullName: '',
                email: '',
                phone: '',
                organization: '',
                numberOfGuests: 1,
                specialRequirements: '',
                attendanceDate: ''
            });
            // Remove onSuccess call to stay on the page
        } catch (error) {
            console.error('Registration error:', error);
            setMessage({ 
                type: 'error', 
                text: error instanceof Error ? error.message : 'Registration failed. Please try again.' 
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">{eventDetails.title}</h2>
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <div className="flex items-center gap-2 text-gray-600">
                        <span className="font-medium">Date:</span>
                        <span>{eventDetails.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <span className="font-medium">Time:</span>
                        <span>{eventDetails.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <span className="font-medium">Location:</span>
                        <span>{eventDetails.location}</span>
                    </div>
                    <p className="text-gray-600">{eventDetails.description}</p>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 py-8">

                <div className="space-y-4">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-lg border ${
                                errors.fullName ? 'border-red-500' : 'border-gray-300'
                            } px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent`}
                        />
                        {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-lg border ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                } px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent`}
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone *
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-lg border ${
                                    errors.phone ? 'border-red-500' : 'border-gray-300'
                                } px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent`}
                            />
                            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
                            Organization (Optional)
                        </label>
                        <input
                            type="text"
                            id="organization"
                            name="organization"
                            value={form.organization}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="attendanceDate" className="block text-sm font-medium text-gray-700">
                                Attendance Date *
                            </label>
                            <input
                                type="date"
                                id="attendanceDate"
                                name="attendanceDate"
                                value={form.attendanceDate}
                                onChange={handleChange}
                                min={new Date().toISOString().split('T')[0]}
                                className={`mt-1 block w-full rounded-lg border ${
                                    errors.attendanceDate ? 'border-red-500' : 'border-gray-300'
                                } px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent`}
                            />
                            {errors.attendanceDate && <p className="mt-1 text-sm text-red-500">{errors.attendanceDate}</p>}
                        </div>

                        <div>
                            <label htmlFor="numberOfGuests" className="block text-sm font-medium text-gray-700">
                                Number of Guests *
                            </label>
                            <select
                                id="numberOfGuests"
                                name="numberOfGuests"
                                value={form.numberOfGuests}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                {[1, 2, 3, 4, 5].map(num => (
                                    <option key={num} value={num}>
                                        {num} {num === 1 ? 'Guest' : 'Guests'}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700">
                            Special Requirements (Optional)
                        </label>
                        <textarea
                            id="specialRequirements"
                            name="specialRequirements"
                            value={form.specialRequirements}
                            onChange={handleChange}
                            rows={3}
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-lg bg-primary px-4 py-3 text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 transition-colors"
                >
                    {isLoading ? 'Submitting...' : 'Register'}
                </button>
            </form>
            {message.text && (
                    <div className={`p-4 rounded ${
                        message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                    }`}>
                        {message.text}
                    </div>
                )}
        </div>
    );
}
