'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  registrationLink: string;
}

const CalendarIcon = () => (
  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default function EventCard({
  title,
  date,
  time,
  location,
  description,
  image,
  registrationLink,
}: EventCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="group bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl">
        <div className="relative h-48">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-3 mb-4">
            <div className="flex items-center text-gray-600">
              <CalendarIcon />
              <span className="ml-3">{date}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <ClockIcon />
              <span className="ml-3">{time}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <LocationIcon />
              <span className="ml-3">{location}</span>
            </div>
          </div>
          <p className="mb-6 text-gray-600 line-clamp-3">{description}</p>
          <Link
            href={registrationLink}
            className="block w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-center"
          >
            Register Now
          </Link>
        </div>
      </div>
    </>
  );
}
