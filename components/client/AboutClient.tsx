'use client';

import Image from 'next/image';
import FadeIn from '../animations/FadeIn';
import StaggerChildren from '../animations/StaggerChildren';

export default function AboutClient() {
  const objectives = [
    "To create and share educational content (images or videos) about the impact of unclean living habits and the importance of environmental cleanliness, in order to increase public knowledge and awareness.",
    
  ];

  const targetAudience = [
    "Students passionate about environmental change",
    "Faculty members and staff",
    "Local community members",
    "Environmental organizations",
  ];

  return (
    <div className="pt-16">
      {/* Mission Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn direction="right">
    <div className="relative h-[400px]">
        <Image
src="https://images.unsplash.com/photo-1552664730-d307ca884978"
            alt="Our Mission"
            fill
            className="object-cover rounded-lg"
        />
    </div>
</FadeIn>
            <FadeIn direction="left" delay={0.3}>
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="mb-4 text-text-secondary">
                "The 'Clean4Earth' campaign aims to create a clean and sustainable environment
                for future generations. This campaign promotes awareness and concrete actions in maintaining environmental cleanliness. With a focus on responsible waste management, reducing plastic usage, and enhancing recycling habits, this campaign strives to achieve a greener and cleaner future for everyone."
                </p>
                <p className="text-text-secondary">
                  Through education, action, and collaboration, we aim to make
                  lasting positive changes in our campus and beyond.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

{/* Objectives Section */}
<section className="py-20 bg-background">
    <div className="container">
        <FadeIn>
            <h2 className="text-3xl font-bold text-center mb-12">Our Objectives</h2>
        </FadeIn>
        <StaggerChildren className="max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-lg text-text-secondary text-center">{objectives[0]}</p>
            </div>
        </StaggerChildren>
    </div>
</section>

      {/* Target Audience */}
      <section className="py-20">
        <div className="container">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center mb-12">Who We Serve</h2>
          </FadeIn>
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetAudience.map((audience, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <p className="text-text-secondary">{audience}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </div>
  );
}
