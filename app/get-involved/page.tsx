'use client';

import Image from 'next/image';
import VolunteerForm from '../components/VolunteerForm';
import FadeIn from '../components/animations/FadeIn';
import StaggerChildren from '../components/animations/StaggerChildren';

export default function GetInvolved() {
  const opportunities = [
    {
      title: "Campus Ambassador",
      description: "Lead sustainability initiatives and inspire others to join the movement.",
      commitment: "5-10 hours/week",
      icon: "🎓"
    },
    {
      title: "Event Coordinator",
      description: "Help organize and manage sustainability events on campus.",
      commitment: "3-5 hours/week",
      icon: "📅"
    },
    {
      title: "Recycling Champion",
      description: "Monitor and improve recycling practices in your building.",
      commitment: "2-4 hours/week",
      icon: "♻️"
    },
    {
      title: "Education Volunteer",
      description: "Conduct workshops and create educational materials.",
      commitment: "4-6 hours/week",
      icon: "📚"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3"
            alt="Get Involved Banner"
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="container relative z-10 text-white">
          <FadeIn>
            <h1 className="mb-6 text-primary">Get Involved</h1>
            <p className="text-xl md:text-2xl max-w-2xl text-primary">
              Join our community of change-makers and help create a more sustainable campus.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="py-20">
        <div className="container">
          <FadeIn>
            <h2 className="text-center mb-12">Volunteer Opportunities</h2>
          </FadeIn>
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {opportunities.map((opportunity, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">{opportunity.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{opportunity.title}</h3>
                <p className="text-text-secondary mb-4">{opportunity.description}</p>
                <p className="text-sm text-primary font-medium">
                  Time Commitment: {opportunity.commitment}
                </p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="mb-12">Why Volunteer With Us?</h2>
              <StaggerChildren className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl mb-4">🌱</div>
                  <h3 className="text-lg font-semibold mb-2">Make an Impact</h3>
                  <p className="text-text-secondary">
                    Create real change in our campus community
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-4">🤝</div>
                  <h3 className="text-lg font-semibold mb-2">Build Connections</h3>
                  <p className="text-text-secondary">
                    Meet like-minded individuals and expand your network
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-4">📈</div>
                  <h3 className="text-lg font-semibold mb-2">Gain Experience</h3>
                  <p className="text-text-secondary">
                    Develop valuable skills and leadership experience
                  </p>
                </div>
              </StaggerChildren>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20">
        <div className="container">
          <FadeIn>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-center mb-12">Volunteer Application</h2>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <VolunteerForm />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <FadeIn>
            <h2 className="text-center mb-12">Frequently Asked Questions</h2>
          </FadeIn>
          <StaggerChildren className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">What is the time commitment?</h3>
              <p className="text-text-secondary">
                Time commitments vary by role, typically ranging from 2-10 hours per week.
                We're flexible and can work with your schedule.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Do I need prior experience?</h3>
              <p className="text-text-secondary">
                No prior experience is required! We provide training and support for all
                volunteer positions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Can I switch roles?</h3>
              <p className="text-text-secondary">
                Yes! We encourage volunteers to explore different roles and find what
                best suits their interests and skills.
              </p>
            </div>
          </StaggerChildren>
        </div>
      </section>
    </div>
  );
}
