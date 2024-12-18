'use client';

import { useState } from 'react';

type CustomerInfo = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

interface CheckoutFormProps {
  onSubmitData: string; // Serializable identifier for the submission action
  onCancelData: string; // Serializable identifier for the cancel action
}

export default function CheckoutForm({ onSubmitData, onCancelData }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const validateEmail = (email: string): boolean => {
    // RFC 5322 compliant email regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Enhanced email validation
    const email = formData.email.trim();
    if (!validateEmail(email)) {
      alert('Please enter a valid email address. Example: user@example.com');
      return;
    }
    
    // Use window.postMessage or other client-side communication method
    window.dispatchEvent(new CustomEvent('checkoutSubmit', { 
      detail: { 
        action: onSubmitData,
        data: formData 
      }
    }));
  };

  const handleCancel = () => {
    window.dispatchEvent(new CustomEvent('checkoutCancel', { 
      detail: { action: onCancelData }
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <h2 className="text-2xl font-semibold mb-6">Customer Information</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              required
              inputMode="numeric"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="e.g., 08123456789"
              maxLength={15}
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Shipping Address *
            </label>
            <textarea
              id="address"
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Continue to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
