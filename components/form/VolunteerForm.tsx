'use client';

import { useState } from 'react';
import { supabase, handleSupabaseResponse } from '@/utils/supabase';

interface FormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  interests: string[];
  availability: string;
  message: string;
}

export default function VolunteerForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    role: 'student',
    interests: [],
    availability: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState<{
    loading: boolean;
    success?: boolean;
    error?: string;
  }>({
    loading: false
  });

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ loading: true });
    
    try {
      if (!supabase) {
        throw new Error('Supabase client is not initialized');
      }

      // Validate interests array is not empty
      if (formData.interests.length === 0) {
        throw new Error('Please select at least one area of interest');
      }

      // Prepare the form data matching Supabase column names
      const supabaseData = {
        fullname: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        role: formData.role,
        interests: formData.interests,
        availability: formData.availability || null,
        message: formData.message.trim() || null,
        status: 'pending'
      };

      console.log('Submitting volunteer application:', supabaseData);

      const response = await supabase
        .from('volunteer_form')
        .insert([supabaseData])
        .select()
        .single();

      const result = handleSupabaseResponse(response, 'Failed to submit volunteer application');

      if (!result.success) {
        throw new Error(result.error?.message || 'Failed to submit application');
      }

      setSubmitStatus({ loading: false, success: true });
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'student',
        interests: [],
        availability: '',
        message: ''
      });
    } catch (error: any) {
      console.error('Submission error:', error);
      setSubmitStatus({ 
        loading: false, 
        success: false, 
        error: error.message || 'An unexpected error occurred. Please try again.' 
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6 pb-8">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-text-primary mb-1">
            Role at UPJ *
          </label>
          <select
            id="role"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty Member</option>
            <option value="staff">Staff</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Areas of Interest *
          </label>
          <div className="space-y-2">
            {['Recycling Programs', 'Tree Planting', 'Energy Conservation', 'Education & Workshops', 'Event Planning'].map((interest) => (
              <label key={interest} className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                  checked={formData.interests.includes(interest)}
                  onChange={() => handleInterestChange(interest)}
                />
                <span className="ml-2">{interest}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="availability" className="block text-sm font-medium text-text-primary mb-1">
            Availability
          </label>
          <select
            id="availability"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            value={formData.availability}
            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
          >
            <option value="">Select availability</option>
            <option value="weekdays">Weekdays</option>
            <option value="weekends">Weekends</option>
            <option value="both">Both Weekdays and Weekends</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-1">
            Why do you want to volunteer?
          </label>
          <textarea
            id="message"
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full btn-primary py-3"
          disabled={submitStatus.loading}
        >
          {submitStatus.loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
      {submitStatus.success && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
          Thank you for your interest! Your application has been submitted successfully.
        </div>
      )}
      
      {submitStatus.error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {submitStatus.error}
        </div>
      )}
    </div>
  );
}
