'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaShare, FaClock, FaUser, FaCalendar, FaTag } from 'react-icons/fa';
import FadeIn from '../animations/FadeIn';
import StaggerChildren from '../animations/StaggerChildren';
import { Resource } from '../../data/resources';
import { resources } from '../../data/resources';

interface ResourceDetailClientProps {
  resource: Resource;
}

export default function ResourceDetailClient({ resource }: ResourceDetailClientProps) {
  const handleShare = async () => {
    try {
      await navigator.share({
        title: resource.title,
        text: resource.description,
        url: window.location.href,
      });
    } catch (error) {
      // Fallback for browsers that don't support native sharing
      console.log('Native sharing not supported');
      // You could implement a custom share modal here
    }
  };

  // Get related resources based on category
  const relatedResources = resources
    .filter(item => item.slug !== resource.slug && item.category === resource.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={resource.image}
            alt={resource.title}
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container relative z-10 text-white">
          <FadeIn>
            <Link 
              href="/resources" 
              className="inline-flex items-center text-white/90 hover:text-white mb-8 transition-colors group"
            >
              <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Resources
            </Link>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="inline-flex items-center px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full text-sm">
                <FaTag className="mr-2" />
                {resource.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">{resource.title}</h1>
            <p className="text-xl md:text-2xl max-w-2xl text-white/90 mb-8">{resource.description}</p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <FaUser className="text-primary" />
                <span>{resource.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendar className="text-primary" />
                <span>{resource.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-primary" />
                <span>{resource.readTime}</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="sticky top-20 flex justify-end gap-4 mb-12 z-10">
            <button 
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              onClick={handleShare}
              aria-label="Share this resource"
            >
              <FaShare className="mr-2" />
              Share
            </button>
          </div>
          <FadeIn>
            <article className="prose prose-lg max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: resource.content }}
                className="bg-white p-8 md:p-12 rounded-xl shadow-sm prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary hover:prose-a:text-primary/80"
              />
            </article>
          </FadeIn>
        </div>
      </section>

      {/* Related Resources */}
      {relatedResources.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-8 text-center">More {resource.category} Resources</h2>
            </FadeIn>
            <StaggerChildren className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {relatedResources.map(item => (
                <Link 
                  key={item.slug} 
                  href={`/resources/detail/${item.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                    <div className="relative h-48">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <span className="absolute bottom-4 left-4 text-white text-sm px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-text-secondary text-sm line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-4 mt-4 text-sm text-text-secondary">
                        <span className="flex items-center gap-1">
                          <FaClock className="text-primary" />
                          {item.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </StaggerChildren>
          </div>
        </section>
      )}
    </div>
  );
}
