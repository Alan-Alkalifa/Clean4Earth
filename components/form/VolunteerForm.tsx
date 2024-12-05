'use client';

import { useState } from 'react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'student',
      interests: [],
      availability: '',
      message: ''
    });
  };

  const handleInterestChange = (interest: string) => {
    if (!interest) return;
    
    setFormData((prev) => {
      const currentInterests = new Set<string>(prev.interests);
      
      if (currentInterests.has(interest)) {
        currentInterests.delete(interest);
      } else {
        currentInterests.add(interest);
      }
      
      return {
        ...prev,
        interests: Array.from(currentInterests)
      };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
      >
        Submit Application
      </button>
    </form>
  );
}
