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
            title: "Clean4Earth Sustainability Workshop",
            date: "2024-12-12",
            time: "10:00 AM - 12:00 AM",
            location: "Gedung B Lantai 1 - B104",
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
            title: "Exhibition Clean4Earth",
            date: "2024-12-23",
            time: "07:00 AM - 03.00 PM",
            location: "Aula Lantai 3 Gedung B UPJ",
            description: "Come and learn about our sustainability initiatives.",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3"
        },
        'clean4earth-introducer': {
            title: "Clean4Earth Introducer",
            date: "2024-11-23",
            time: "09:00 AM",
            location: "Online",
            description: "Online Information to introduce Clean4Earth.",
            image: "https://images.unsplash.com/photo-1560523159-6b681a1e1852?ixlib=rb-4.0.3"
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
