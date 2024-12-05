'use client';

import Image from 'next/image';
import VolunteerForm from '../form/VolunteerForm';
import FadeIn from '../animations/FadeIn';
import StaggerChildren from '../animations/StaggerChildren';

export default function GetInvolvedClient() {
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
    </div>
  );
}
