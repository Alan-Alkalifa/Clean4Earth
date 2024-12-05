'use client';

import Image from 'next/image';
import EventCard from '../card/EventCard';
import FadeIn from '../animations/FadeIn';
import StaggerChildren from '../animations/StaggerChildren';

export default function EventsClient() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Campus Clean-up Day",
      date: "2024-02-15",
      time: "09:00 AM",
      location: "Main Campus Square",
      description: "Join us for our monthly campus clean-up initiative.",
      image: "https://images.unsplash.com/photo-1554265352-d7fd5129be15?ixlib=rb-4.0.3",
      registrationLink: "/events/campus-cleanup"
    },
    {
      id: 2,
      title: "Sustainability Workshop",
      date: "2024-02-20",
      time: "02:00 PM",
      location: "Environmental Science Building",
      description: "Learn practical tips for sustainable living.",
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3",
      registrationLink: "/events/sustainable-workshop"
    }
  ];

  const pastEvents = [
    {
      id: 3,
      title: "Tree Planting Initiative",
      date: "2024-01-10",
      time: "10:00 AM",
      location: "Campus Garden",
      description: "Join us for a day of tree planting to enhance our campus green spaces.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3",
      registrationLink: "/events/tree-planting"
    },
    {
      id: 4,
      title: "Recycling Awareness Day",
      date: "2024-01-05",
      time: "11:00 AM",
      location: "Student Center",
      description: "Learn about proper recycling practices and waste management.",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3",
      registrationLink: "/events/recycling-awareness"
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
                    title={event.title}
                    date={event.date}
                    time={event.time}
                    location={event.location}
                    description={event.description}
                    image={event.image}
                    registrationLink={event.registrationLink}
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
