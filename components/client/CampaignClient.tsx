'use client';

import Image from 'next/image';
import ProgressBar from '../animations/ProgressBar';
import FadeIn from '../animations/FadeIn';
import StaggerChildren from '../animations/StaggerChildren';

export default function CampaignClient() {
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

      {/* Campaign Overview */}
      <section className="py-20">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Current Initiatives</h2>
              <p className="max-w-3xl mx-auto text-lg text-text-secondary">
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
                  <p className="mb-6 text-text-secondary">{campaign.description}</p>
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
            <h2 className="text-3xl font-bold text-center mb-12">What People Say</h2>
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
                <p className="italic text-text-secondary">{testimonial.quote}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

    </div>
  );
}
