'use client';

import Image from 'next/image';
import ProgressBar from '../components/ProgressBar';
import FadeIn from '../components/animations/FadeIn';
import StaggerChildren from '../components/animations/StaggerChildren';

export default function Campaign() {
  const campaigns = [
    {
      title: "Campus Recycling Program",
      description: "Implementation of comprehensive recycling stations across campus with clear sorting guidelines.",
      progress: 75,
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3"
    },
    {
      title: "Green Energy Initiative",
      description: "Installation of solar panels and energy-efficient lighting systems in university buildings.",
      progress: 45,
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3"
    },
    {
      title: "Zero Waste Challenge",
      description: "Monthly challenges for students and staff to reduce their waste production.",
      progress: 60,
      image: "https://images.unsplash.com/photo-1530587191325-3db1d0093e5b?ixlib=rb-4.0.3"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Environmental Science Student",
      quote: "Being part of Clean4Earth has shown me how small actions can create big impacts.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3"
    },
    {
      name: "Dr. Michael Chen",
      role: "Faculty Member",
      quote: "The campus recycling program has transformed how our department handles waste.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1534957753291-64d667ce2927?ixlib=rb-4.0.3"
            alt="Clean4Earth Campaign"
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="container relative z-10 text-white">
          <FadeIn>
            <h1 className="mb-6 text-primary">Our Campaigns</h1>
            <p className="text-xl md:text-2xl max-w-2xl text-primary">
              Discover our ongoing initiatives to create a more sustainable campus
              and join us in making a difference.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Campaign Overview */}
      <section className="py-20">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="mb-6">Current Initiatives</h2>
              <p className="max-w-3xl mx-auto text-lg">
                Our campaigns focus on creating lasting change through practical
                solutions and community engagement.
              </p>
            </div>
          </FadeIn>

          <StaggerChildren className="space-y-20">
            {campaigns.map((campaign, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="relative h-[300px] md:h-[400px]">
                  <Image
                    src={campaign.image}
                    alt={campaign.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">{campaign.title}</h3>
                  <p className="mb-6">{campaign.description}</p>
                  <ProgressBar
                    percentage={campaign.progress}
                    label="Campaign Progress"
                  />
                </div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container">
          <FadeIn>
            <h2 className="text-center mb-12">What People Say</h2>
          </FadeIn>
          <StaggerChildren className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-text-secondary">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic">{testimonial.quote}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="container text-center">
          <FadeIn>
            <h2 className="mb-6">Join Our Campaign</h2>
            <p className="mb-8 text-lg max-w-2xl mx-auto">
              Every action counts! Join our campaigns and help create a more
              sustainable future for our campus.
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
