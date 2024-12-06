'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import RegistrationForm from '../form/RegistrationForm';

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventDetails?: {
        title: string;
        date: string;
        time: string;
        location: string;
        description: string;
        image?: string;
    };
}

const CalendarIcon = () => (
  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="black">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function RegistrationModal({ isOpen, onClose, eventDetails }: RegistrationModalProps) {
    const handleSuccess = () => {
        // Close the modal after a short delay to allow the success message to be seen
        setTimeout(onClose, 1500);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                {/* Backdrop */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" />
                </Transition.Child>

                {/* Modal */}
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                                {/* Header with gradient background */}
                                <div className="relative bg-gradient-to-r from-primary to-primary-dark px-8 py-6">
                                    <Dialog.Title as="h3" className="text-2xl font-bold text-white">
                                        {eventDetails ? `Register for ${eventDetails.title}` : 'Event Registration'}
                                    </Dialog.Title>
                                    <button
                                        onClick={onClose}
                                        className="absolute right-6 top-6 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60 transition-all"
                                    >
                                        <span className="sr-only">Close</span>
                                        <CloseIcon />
                                    </button>
                                </div>

                                {/* Event Details */}
                                {eventDetails && (
                                    <div className="bg-gray-50 px-8 py-6">
                                        {/* Event description */}
                                        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                                            {eventDetails.description}
                                        </p>
                                        
                                        {/* Event info cards */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex-shrink-0">
                                                        <CalendarIcon />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">Date</p>
                                                        <p className="text-sm text-gray-600">{eventDetails.date}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex-shrink-0">
                                                        <ClockIcon />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">Time</p>
                                                        <p className="text-sm text-gray-600">{eventDetails.time}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex-shrink-0">
                                                        <LocationIcon />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">Location</p>
                                                        <p className="text-sm text-gray-600">{eventDetails.location}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Registration Form */}
                                <div className="px-8 py-6">
                                    <div className="mb-6">
                                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                            Registration Details
                                        </h4>
                                        <p className="text-gray-600">
                                            Please fill in your details below to register for this event.
                                        </p>
                                    </div>
                                    <RegistrationForm onSuccess={handleSuccess} />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
