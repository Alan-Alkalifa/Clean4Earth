import { Metadata } from 'next';
import CampaignClient from '@/components/client/CampaignClient';
import Image from 'next/image';
import FadeIn from '../../components/animations/FadeIn';
import { FaLeaf, FaUsers, FaHandsHelping } from 'react-icons/fa';
import CountUpServer from '@/components/animations/CountUpServer';

export const metadata: Metadata = {
  title: 'Campaigns - Clean4Earth',
  description: 'Join our sustainability campaigns and initiatives to create a more sustainable campus environment.',
};

export default function Campaign() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1534957753291-64d667ce2927?ixlib=rb-4.0.3"
            alt="Clean4Earth Campaign"
            fill
            className="object-cover brightness-[0.35]"
            priority
          />
        </div>
        <div className="container relative z-10 text-white px-4 sm:px-6 md:px-8 max-w-6xl mx-auto text-center">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-primary leading-tight">
              Join Our Movement<br />for a Greener Campus
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-white/90 leading-relaxed">
              Discover our ongoing initiatives to create a more sustainable campus
              and be part of the change we want to see.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#campaigns"
                className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full transition-all transform hover:scale-105"
              >
                View Campaigns
              </a>
              <a
                href="/get-involved"
                className="inline-flex items-center bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full transition-all transform hover:scale-105"
              >
                Get Involved
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn className="text-center p-6">
              <FaLeaf className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">
                <CountUpServer end={2} suffix="+" />
              </h3>
              <p className="text-gray-600">Our Active Campaigns</p>
            </FadeIn> 
            <FadeIn className="text-center p-6">
              <FaUsers className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">
                <CountUpServer end={1000} suffix="+" />
              </h3>
              <p className="text-gray-600">Our Target Student Participants</p>
            </FadeIn>
            <FadeIn className="text-center p-6">
              <FaHandsHelping className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">
                <CountUpServer end={1} suffix="+" />
              </h3>
              <p className="text-gray-600">Partner Organizations</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Campaigns List */}
      <section id="campaigns" className="py-16">
        <CampaignClient />
      </section>

      {/* Call to Action */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-primary/95 z-0" />
        <div className="container relative z-10 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto text-center text-white">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/90">
              Every action counts! Join our campaigns and help create a more
              sustainable future for our campus community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/get-involved"
                className="inline-flex items-center bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105"
              >
                Get Started Today
              </a>
              <a
                href="/resources"
                className="inline-flex items-center bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105"
              >
                Learn More
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
