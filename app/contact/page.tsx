import { Metadata } from 'next';
import Image from 'next/image';
import FadeIn from '@/components/animations/FadeIn';
import ContactClient from '@/components/client/ContactClient';

export const metadata: Metadata = {
  title: 'Contact - Clean4Earth',
  description: 'Get in touch with Clean4Earth. We\'re here to answer your questions about our sustainability initiatives.',
};

export default function Contact() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-4.0.3"
            alt="Contact Banner"
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="container relative z-10 text-white">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Contact Us</h1>
            <p className="text-xl md:text-2xl max-w-2xl text-white">
              Have questions about our sustainability initiatives? We're here to help!
            </p>
          </FadeIn>
        </div>
      </section>

      <ContactClient />
    </div>
  );
}
