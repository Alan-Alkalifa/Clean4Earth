'use client';

import { useState } from 'react';
import StaggerChildren from '../animations/StaggerChildren';
import { supabase } from '@/config/supabase';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    status: 'pending'
  });

  const [submitStatus, setSubmitStatus] = useState<{
    loading: boolean;
    success?: boolean;
    error?: string;
  }>({
    loading: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ loading: true });

    try {
      // First, check if Supabase is properly initialized
      if (!supabase) {
        throw new Error('Supabase client is not initialized');
      }

      const { data, error } = await supabase
        .from('contact_form')
        .insert([{
          ...formData,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Supabase error details:', {
          code: error.code,
          message: error.message,
          details: error.details
        });
        throw error;
      }

      setSubmitStatus({ loading: false, success: true });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        status: 'pending'
      });
    } catch (error: any) {
      console.error('Contact form submission error:', {
        message: error.message,
        details: error.details,
        code: error.code
      });
      setSubmitStatus({ 
        loading: false, 
        success: false, 
        error: error.message || 'Failed to submit message. Please try again.' 
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <StaggerChildren className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              required
              disabled={submitStatus.loading}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              required
              disabled={submitStatus.loading}
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              required
              disabled={submitStatus.loading}
            >
              <option value="">Select a subject</option>
              <option value="general">General Inquiry</option>
              <option value="volunteer">Volunteering</option>
              <option value="partnership">Partnership</option>
              <option value="feedback">Feedback</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              required
              disabled={submitStatus.loading}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={submitStatus.loading}
          >
            {submitStatus.loading ? 'Sending...' : 'Send Message'}
          </button>
        </StaggerChildren>
      </form>

      {submitStatus.success && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
          Thank you for your message! We'll get back to you soon.
        </div>
      )}
      
      {submitStatus.error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {submitStatus.error}
        </div>
      )}
    </div>
  );
}
