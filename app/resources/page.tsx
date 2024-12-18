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
            <p className="text-xl md:text-2xl max-w-2xl text-white">
              Explore our collection of sustainability resources and educational materials.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Educational Materials Section */}
      <ResourcesClient />

 {/* Newsletter Section */}
<section className="py-10 sm:py-16 lg:py-20 bg-background">
  <div className="container max-w-4xl px-4 sm:px-6 lg:px-8">
    <FadeIn>
      <div className="bg-primary text-white p-6 sm:p-8 lg:p-12 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Stay Updated</h2>
        <p className="mb-6 sm:mb-8 text-base sm:text-lg text-white/90">
          Subscribe to our newsletter for the latest sustainability tips and updates.
        </p>
        <form className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full flex-1 px-4 py-3 rounded-lg text-text-primary bg-white/95 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              required
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-white text-primary px-6 py-3 rounded-lg hover:bg-white/90 transition-all duration-300 font-medium min-w-[120px] hover:shadow-lg"
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
<section className="py-16 sm:py-20 bg-background">
  <div className="container px-4 sm:px-6 lg:px-8">
    <FadeIn>
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Our Partners</h2>
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
