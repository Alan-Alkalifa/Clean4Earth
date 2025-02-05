'use client';

import { useState } from 'react';
import EventCard from '../card/EventCard';
import FadeIn from '../animations/FadeIn';
import StaggerChildren from '../animations/StaggerChildren';
import RegistrationForm from '../form/RegistrationForm';

export default function EventsClient() {
    const upcomingEvents = [
        {
            id: 4,
            title: "Exhibition Clean4Earth",
            date: "2024-12-23",
            time: "07:00 AM - 03.00 PM",
            location: "Aula Lantai 3 Gedung B UPJ",
            description: "Come and learn about our sustainability initiatives.",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3",
            registrationLink: "/events/Exhibition-Clean4Earth"
        }
    ];

    const pastEvents = [
        {
            id: 1,
            title: "Clean4Earth Sustainability Workshop",
            date: "2024-12-12",
            time: "10:00 AM - 12:00 AM",
            location: "Gedung B Lantai 1 - B104",
            description: "Learn practical tips for sustainable living.",
            image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?ixlib=rb-4.0.3",
            registrationLink: "/events/sustainable-workshop"
        },
        {
            id: 2,
            title: "Online Campaign",
            date: "2024-12-01 - 2024-12-23",
            time: "Online",
            location: "Instagram",
            description: "Follow us on Instagram to learn about our Campaign.",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3",
            registrationLink: "/events/online-campaign"
        },
        {
            id: 3,
            title: "Clean4Earth Introducer",
            date: "2024-11-23",
            time: "09:00 AM",
            location: "Online",
            description: "Online Information to introduce Clean4Earth.",
            image: "https://images.unsplash.com/photo-1560523159-6b681a1e1852?ixlib=rb-4.0.3",
            registrationLink: "/events/clean4earth-introducer"
        }
    ];

    return (
        <div className="pt-16">
            {/* Upcoming Events */}
            <section className="py-20">
                <div className="container">
                    <FadeIn>
                        <h2 className="text-center mb-12">Upcoming Events</h2>
                    </FadeIn>
                    <StaggerChildren className="grid md:grid-cols-2 gap-8">
                        {upcomingEvents.map((event) => (
                            <FadeIn key={event.id} direction={upcomingEvents.indexOf(event) % 2 === 0 ? 'right' : 'left'}>
                                <div key={event.id} className="w-full">
                                    <EventCard 
                                        {...event}
                                    />
                                </div>
                            </FadeIn>
                        ))}
                    </StaggerChildren>
                </div>
            </section>

            {/* Past Events */}
            <section className="py-20 bg-background">
                <div className="container">
                    <FadeIn>
                        <h2 className="text-center mb-12">Past Events</h2>
                    </FadeIn>
                    <StaggerChildren className="grid md:grid-cols-2 gap-8">
                        {pastEvents.map((event) => (
                            <FadeIn key={event.id} direction={pastEvents.indexOf(event) % 2 === 0 ? 'right' : 'left'}>
                                <div key={event.id} className="w-full">
                                    <EventCard 
                                        {...event}
                                        isPast={true}
                                    />
                                </div>
                            </FadeIn>
                        ))}
                    </StaggerChildren>
                </div>
            </section>
        </div>
    );
}
