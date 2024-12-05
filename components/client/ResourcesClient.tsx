'use client';

import Image from 'next/image';
import { resources } from '../../data/resources';
import ResourceCard from '../card/ResourceCard';
import FadeIn from '../animations/FadeIn';
import StaggerChildren from '../animations/StaggerChildren';

export default function ResourcesClient() {
  return (
    <div className="pt-16">

      {/* Resources Section */}
      <section className="py-20">
        <div className="container">
          <FadeIn>
            <p className="text-xl text-text-secondary text-center max-w-2xl mx-auto mb-16">
              Discover guides, articles, and tools to help you live more sustainably
              and make a positive impact on the environment.
            </p>
          </FadeIn>

          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => (
              <ResourceCard key={resource.slug} resource={resource} />
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Sustainability Tips Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center mb-12">Quick Sustainability Tips</h2>
          </FadeIn>
          <StaggerChildren className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Reduce Single-Use Plastics",
                description: "Switch to reusable water bottles, shopping bags, and food containers to minimize plastic waste."
              },
              {
                title: "Save Energy Daily",
                description: "Turn off lights when leaving rooms and unplug electronics not in use to reduce energy consumption."
              },
              {
                title: "Start Composting",
                description: "Convert kitchen scraps and yard waste into nutrient-rich soil for your garden."
              }
            ].map((tip, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold mb-2">{tip.title}</h3>
                <p className="text-text-secondary">{tip.description}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </div>
  );
}
