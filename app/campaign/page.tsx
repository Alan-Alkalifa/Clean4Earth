
import { Metadata } from 'next';
import CampaignClient from '@/components/client/CampaignClient';
import Image from 'next/image';
import FadeIn from '../../components/animations/FadeIn';

export const metadata: Metadata = {
  title: 'Campaigns - Clean4Earth',
  description: 'Join our sustainability campaigns and initiatives to create a more sustainable campus environment.',
};

export default function Campaign() {

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1534957753291-64d667ce2927?ixlib=rb-4.0.3"
            alt="Clean4Earth Campaign"
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="container relative z-10 text-white">
          <FadeIn>
            <h1 className="mb-6 text-primary">Our Campaigns</h1>
            <p className="text-xl md:text-2xl max-w-2xl text-primary">
              Discover our ongoing initiatives to create a more sustainable campus
              and join us in making a difference.
            </p>
          </FadeIn>
        </div>
      </section>

     <CampaignClient />

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="container text-center">
          <FadeIn>
            <h2 className="mb-6">Join Our Campaign</h2>
            <p className="mb-8 text-lg max-w-2xl mx-auto">
              Every action counts! Join our campaigns and help create a more
              sustainable future for our campus.
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
