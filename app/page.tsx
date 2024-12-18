import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';
import HomeClient from '@/components/client/HomeClient';

export const metadata: Metadata = {
  title: 'Clean4Earth - Creating a Sustainable Future',
  description: "Join UPJ's movement towards environmental sustainability and make a real impact on our campus and community.",
};

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3"
            alt="Hero Image"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container relative z-10 text-white">
          <FadeIn>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary">
              Creating a Sustainable Future
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl text-white">
              Join UPJ's movement towards environmental sustainability and make a real impact
              on our campus and community.
            </p>
            <Link
              href="/get-involved"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg text-lg transition-colors duration-300 inline-block"
            >
              Get Involved
            </Link>
          </FadeIn>
        </div>
      </section>

      <HomeClient />

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-primary text-white">
        <div className="container px-4 md:px-6">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Ready to Make a Difference?</h2>
              <p className="text-base md:text-lg mb-6 md:mb-8 text-white/90">
                Join our community of environmental champions and help create a more
                sustainable future for UPJ.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:space-x-4">
                <Link
                  href="/get-involved"
                  className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg inline-block transition-colors duration-300"
                >
                  Join Now
                </Link>
                <Link
                  href="/about"
                  className="w-full sm:w-auto border-2 border-white hover:bg-white hover:text-primary px-8 py-3 rounded-lg inline-block transition-colors duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  
  );
}
