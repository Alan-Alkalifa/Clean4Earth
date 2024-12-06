'use client';

import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import RegistrationForm from '../../../components/form/RegistrationForm';
import Link from 'next/link';
import FadeIn from '../../../components/animations/FadeIn';

// This would typically come from your database or API
const getEventBySlug = (slug: string) => {
    const events = {
        'sustainable-workshop': {
            title: "Sustainability Workshop",
            date: "2024-12-15",
            time: "01:00 PM",
            location: "Gedung A Univeritas Pembangunan Jaya",
            description: "Learn practical tips for sustainable living.",
            image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?ixlib=rb-4.0.3"
        },
        'online-campaign': {
            title: "Online Campaign",
            date: "2024-12-01 - 2024-12-23",
            time: "Online",
            location: "Instagram",
            description: "Follow us on Instagram to learn about our Campaign.",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3"
        },
        'open-booth-campaign': {
            title: "Open Booth Campaign",
            date: "2024-12-23",
            time: "07:00 AM - 03.00 PM",
            location: "Aula lt3 Gedung B UPJ",
            description: "Come and learn about our sustainability initiatives.",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3"
        }
    };
    return events[slug as keyof typeof events];
};

export default function EventRegistrationPage() {
  const params = useParams();
  const event = getEventBySlug(params.slug as string);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container max-w-2xl mx-auto px-4">
        <FadeIn>
          <Link 
            href="/events" 
            className="inline-flex items-center text-primary hover:text-primary-dark mb-8 transition-colors"
          >
            ← Back to Events
          </Link>
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="mb-8">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
            <RegistrationForm 
              eventDetails={event}
            />
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
