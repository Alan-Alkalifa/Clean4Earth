'use client';

import Image from 'next/image';
import FadeIn from '../components/animations/FadeIn';
import StaggerChildren from '../components/animations/StaggerChildren';

export default function About() {
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
      {/* Hero Section */}
      <section className="bg-primary/10 py-20">
        <div className="container">
          <FadeIn>
            <h1 className="text-center mb-6 text-primary">About Clean4Earth</h1>
            <p className="text-center text-lg md:text-xl max-w-3xl mx-auto text-primary">
              Clean4Earth is a student-led sustainability initiative at Universitas
              Pembangunan Jaya, dedicated to creating a more environmentally
              conscious campus community.
            </p>
          </FadeIn>
        </div>
      </section>

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
                <h2 className="mb-6">Our Mission</h2>
                <p className="mb-4">
                  We strive to create a sustainable future by implementing
                  eco-friendly practices, raising awareness about environmental
                  issues, and fostering a community of environmentally conscious
                  individuals.
                </p>
                <p>
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
            <h2 className="text-center mb-12">Our Objectives</h2>
          </FadeIn>
          <StaggerChildren className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {objectives.map((objective, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <p className="text-lg">{objective}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20">
        <div className="container">
          <FadeIn>
            <h2 className="text-center mb-12">Who We Serve</h2>
          </FadeIn>
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetAudience.map((audience, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <p>{audience}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="container text-center">
          <FadeIn>
            <h2 className="mb-6">Join Our Mission</h2>
            <p className="mb-8 text-lg max-w-2xl mx-auto">
              Be part of the change! Join Clean4Earth and help us create a more
              sustainable future for our campus and community.
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
