import Image from 'next/image';
import ResourcesClient from '../../components/client/ResourcesClient';
import FadeIn from '../../components/animations/FadeIn';
import StaggerChildren from '../../components/animations/StaggerChildren';

export default function Resources() {
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
      <ResourcesClient />

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
          <StaggerChildren className="flex justify-center items-center">
            <div className="p-6 bg-white rounded-lg shadow-md aspect-video relative overflow-hidden w-full max-w-sm">
              <Image
                src="/logoupjPNG.png"
                alt="Logo UPJ"
                fill
                className="object-contain p-4"
              />
            </div>
          </StaggerChildren>
        </div>
      </section>
    </div>
  );
}
