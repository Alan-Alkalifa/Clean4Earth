'use client';

import Image from 'next/image';
import FadeIn from '../animations/FadeIn';
import StaggerChildren from '../animations/StaggerChildren';

export default function AboutClient() {
  const objectives = [
    "Promote environmental awareness and education",
    "Implement sustainable practices across campus",
    "Reduce waste and energy consumption",
    "Foster community engagement in sustainability",
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
                  src="https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-4.0.3"
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
                  We strive to create a sustainable future by implementing
                  eco-friendly practices, raising awareness about environmental
                  issues, and fostering a community of environmentally conscious
                  individuals.
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
          <StaggerChildren className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {objectives.map((objective, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <p className="text-lg text-text-secondary">{objective}</p>
              </div>
            ))}
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
