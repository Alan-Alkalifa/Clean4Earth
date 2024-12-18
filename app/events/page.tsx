import Image from 'next/image';
import EventsClient from '../../components/client/EventsClient';
import EventCard from '../../components/card/EventCard';
import FadeIn from '../../components/animations/FadeIn';
import StaggerChildren from '../../components/animations/StaggerChildren';

export default function Events() {

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3"
            alt="Events Banner"
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="container relative z-10 text-white">
          <FadeIn>
            <h1 className="mb-6 text-primary">Events & Activities</h1>
            <p className="text-xl md:text-2xl max-w-2xl text-white">
              Join our sustainability events and be part of the change.
            </p>
          </FadeIn>
        </div>
      </section>

     <EventsClient />

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="container text-center">
          <FadeIn>
            <h2 className="mb-6 ">Want to Host an Event?</h2>
            <p className="mb-8 text-lg max-w-2xl mx-auto">
              Have an idea for a sustainability event? We'd love to hear from you!
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-white text-primary rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Contact Us
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
