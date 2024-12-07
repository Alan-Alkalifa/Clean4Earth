'use client';

import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '../animations/FadeIn';
import StaggerChildren from '../animations/StaggerChildren';

export default function HomeClient() {
  const stats = [
    { number: '1000+', label: 'Students Engaged' },
    { number: '50+', label: 'Projects Completed' },
    { number: '100+', label: 'Trees Planted' },
    { number: '5+', label: 'Partner Organizations' }
  ];

  const initiatives = [
    {
      title: 'Campus Recycling',
      description: 'Implementing comprehensive recycling programs across campus facilities.',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3'
    },
    {
      title: 'Energy Conservation',
      description: 'Reducing energy consumption through smart technologies and awareness.',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3'
    },
    {
      title: 'Green Transportation',
      description: 'Promoting sustainable transportation options for students and staff.',
      image: 'https://images.unsplash.com/photo-1519003300449-424ad0405076?ixlib=rb-4.0.3'
    }
  ];

  return (
    <main>
      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center mb-16">Our Future Impact</h2>
          </FadeIn>
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="py-20">
        <div className="container">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center mb-16">Our Initiatives</h2>
          </FadeIn>
          <StaggerChildren className="grid md:grid-cols-3 gap-8">
            {initiatives.map((initiative, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={initiative.image}
                    alt={initiative.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{initiative.title}</h3>
                  <p className="text-text-secondary">{initiative.description}</p>
                </div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container px-4 sm:px-6">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Stay Updated</h2>
              <p className="text-base sm:text-lg text-text-secondary mb-6 sm:mb-8 max-w-xl mx-auto">
                Subscribe to our newsletter for the latest updates on our sustainability
                initiatives and upcoming events.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-base"
                  required
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors duration-300 font-medium min-w-[120px]"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
