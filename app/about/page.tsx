import { Metadata } from 'next';
import AboutClient from '@/components/client/AboutClient';
import Image from 'next/image';
import FadeIn from '@/components/animations/FadeIn';

export const metadata: Metadata = {
  title: 'About - Clean4Earth',
  description: 'Learn about Clean4Earth, a student-led movement at Universitas Pembangunan Jaya working towards a greener and more sustainable future.',
};

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80"
            alt="Nature and sustainability"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container relative z-10 text-white">
          <FadeIn>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary">About Clean4Earth</h1>
            <p className="text-xl md:text-2xl max-w-2xl text-white">
              A student-led movement at Universitas Pembangunan Jaya, 
              working towards a greener and more sustainable future.
            </p>
          </FadeIn>
        </div>
      </section>

      <AboutClient />

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="container text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-6">Our Goals</h2>
            <p className="mb-8 text-lg max-w-2xl mx-auto text-white/90">
             "Fostering and enhancing clean living habits in the community through the implementation of clean living behavior in daily environments."
            </p>
            <a
              href="/get-involved"
              className="inline-block bg-white text-primary px-8 py-3 rounded-md hover:bg-gray-100 transition-colors"
            >
              Get Involved
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
