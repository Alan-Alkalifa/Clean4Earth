'use client';

import Image from 'next/image';
import Link from 'next/link';
import FadeIn from './components/animations/FadeIn';
import StaggerChildren from './components/animations/StaggerChildren';

export default function Home() {
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
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3"
            alt="Hero Image"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container relative z-10 text-white">
          <FadeIn>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary">
              Creating a Sustainable Future
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl text-primary">
              Join UPJ's movement towards environmental sustainability and make a real impact
              on our campus and community.
            </p>
            <Link
              href="/get-involved"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg text-lg transition-colors duration-300 inline-block"
            >
              Get Involved
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <FadeIn>
            <h2 className="text-center mb-16">Our Impact</h2>
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
            <h2 className="text-center mb-16">Our Initiatives</h2>
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

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="mb-6">Ready to Make a Difference?</h2>
              <p className="text-lg mb-8">
                Join our community of environmental champions and help create a more
                sustainable future for UPJ.
              </p>
              <div className="space-x-4">
                <Link
                  href="/get-involved"
                  className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg inline-block transition-colors duration-300"
                >
                  Join Now
                </Link>
                <Link
                  href="/about"
                  className="border-2 border-white hover:bg-white hover:text-primary px-8 py-3 rounded-lg inline-block transition-colors duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="mb-6">Stay Updated</h2>
              <p className="text-text-secondary mb-8">
                Subscribe to our newsletter for the latest updates on our sustainability
                initiatives and upcoming events.
              </p>
              <form className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors duration-300"
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
