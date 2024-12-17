'use client';

import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
  type?: 'success' | 'error' | 'info';
}

export default function Toast({ 
  message, 
  duration = 3000, 
  onClose,
  type = 'success' 
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-primary text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'info':
        return 'bg-secondary text-white';
      default:
        return 'bg-primary text-white';
    }
  };

  return (
    <div
      className={`fixed bottom-8 right-8 px-6 py-4 rounded-xl shadow-xl transition-all duration-300 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      } ${getToastStyles()}`}
    >
      <div className="flex items-center gap-2">
        {type === 'success' && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
        {type === 'error' && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        {type === 'info' && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
}
