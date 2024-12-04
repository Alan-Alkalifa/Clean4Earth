'use client';

import Image from 'next/image';
import ResourceCard from '../components/ResourceCard';
import FadeIn from '../components/animations/FadeIn';
import StaggerChildren from '../components/animations/StaggerChildren';

export default function Resources() {
  const resources = [
    {
      title: "Sustainable Living Guide",
      description: "Comprehensive guide for adopting eco-friendly practices in daily life.",
      type: "Guide",
      image: "https://images.unsplash.com/photo-1472141521881-95d0e87e2e39?ixlib=rb-4.0.3",
      downloadLink: "/resources/sustainable-living-guide.pdf",
      readMoreLink: "/resources/sustainable-living"
    },
    {
      title: "Recycling 101",
      description: "Learn the basics of proper recycling and waste management.",
      type: "Educational",
      image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?ixlib=rb-4.0.3",
      downloadLink: "/resources/recycling-guide.pdf",
      readMoreLink: "/resources/recycling"
    },
    {
      title: "Energy Conservation Tips",
      description: "Simple ways to reduce energy consumption on campus.",
      type: "Tips",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3",
      downloadLink: "/resources/energy-tips.pdf",
      readMoreLink: "/resources/energy"
    },
    {
      title: "Water Conservation Guide",
      description: "Practical tips for reducing water usage.",
      type: "Guide",
      image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?ixlib=rb-4.0.3",
      downloadLink: "/resources/water-guide.pdf",
      readMoreLink: "/resources/water"
    }
  ];

  const sustainabilityTips = [
    "Use reusable water bottles and coffee cups",
    "Turn off lights when leaving a room",
    "Use public transportation or bike when possible",
    "Reduce paper usage by going digital",
    "Properly sort recyclables",
    "Choose energy-efficient appliances"
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3"
            alt="Resources Banner"
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="container relative z-10 text-white">
          <FadeIn>
            <h1 className="mb-6 text-primary">Resources</h1>
            <p className="text-xl md:text-2xl max-w-2xl text-primary">
              Explore our collection of sustainability resources and educational materials.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Educational Materials Section */}
      <section className="py-20 bg-background">
        <div className="container max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Educational Materials</h2>
              <p className="text-text-secondary text-lg">
                Explore our collection of resources designed to help you live more sustainably
                and make a positive impact on the environment.
              </p>
            </div>
          </FadeIn>
          <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {resources.map((resource, index) => (
              <div key={index} className="transform hover:-translate-y-1 transition-transform duration-300">
                <ResourceCard
                  title={resource.title}
                  description={resource.description}
                  image={resource.image}
                  type={resource.type}
                  downloadLink={resource.downloadLink}
                  readMoreLink={resource.readMoreLink}
                />
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Sustainability Tips */}
      <section className="py-20">
        <div className="container">
          <FadeIn>
            <h2 className="text-center mb-12">Quick Sustainability Tips</h2>
          </FadeIn>
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {sustainabilityTips.map((tip, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <p className="text-lg">{tip}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <FadeIn>
            <div className="bg-primary text-white p-12 rounded-lg text-center">
              <h2 className="mb-6">Stay Updated</h2>
              <p className="mb-8 text-lg">
                Subscribe to our newsletter for the latest sustainability tips and updates.
              </p>
              <form className="max-w-md mx-auto">
                <div className="flex gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-md text-text-primary"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-white text-primary px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <FadeIn>
            <h2 className="text-center mb-12">Our Partners</h2>
          </FadeIn>
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-center max-w-4xl mx-auto">
            <div className="p-6 bg-white rounded-lg shadow-md aspect-video relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3"
                alt="Environmental Organization"
                fill
                className="object-contain"
              />
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md aspect-video relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3"
                alt="Research Institute"
                fill
                className="object-contain"
              />
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md aspect-video relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3"
                alt="Educational Partner"
                fill
                className="object-contain"
              />
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md aspect-video relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3"
                alt="Technology Partner"
                fill
                className="object-contain"
              />
            </div>
          </StaggerChildren>
        </div>
      </section>
    </div>
  );
}
