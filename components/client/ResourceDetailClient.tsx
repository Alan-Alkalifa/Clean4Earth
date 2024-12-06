'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaShare, FaClock, FaUser, FaCalendar, FaTag, FaExternalLinkAlt, FaEye, FaHeart } from 'react-icons/fa';
import FadeIn from '../animations/FadeIn';
import StaggerChildren from '../animations/StaggerChildren';
import { Resource, resources } from '@/data/resources';

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
      console.log('Native sharing not supported');
    }
  };

  const relatedResources = resources
    .filter(item => item.slug !== resource.slug && item.category === resource.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen space-y-8">
      {/* Hero Section */}
      <section className="relative min-h-[75vh] md:h-[60vh] flex items-center py-12 sm:py-16 md:py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src={resource.image}
            alt={resource.title}
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container relative z-10 text-white px-4 md:px-6">
          <FadeIn>
            <Link 
              href="/resources" 
              className="inline-flex items-center text-white/90 hover:text-white mb-6 transition-colors group"
            >
              <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Resources
            </Link>
            <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4">
              <span className="inline-flex items-center px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full text-xs md:text-sm">
                <FaTag className="mr-2" />
                {resource.category}
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full text-xs md:text-sm">
                Difficulty: {resource.difficulty}
              </span>
              {resource.estimatedImpact && (
                <span className="inline-flex items-center px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full text-xs md:text-sm">
                  Impact: {resource.estimatedImpact}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 text-primary">{resource.title}</h1>
            <p className="text-lg md:text-2xl max-w-2xl text-white/90 mb-6 md:mb-8">{resource.description}</p>
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 text-sm text-white/80">
              <div className="flex items-center gap-4">
                {resource.authorImage && (
                  <Image
                    src={resource.authorImage}
                    alt={resource.author}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div>
                  <div className="font-semibold">{resource.author}</div>
                  {resource.authorRole && (
                    <div className="text-white/60 text-xs md:text-sm">{resource.authorRole}</div>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-4 md:gap-6">
                <div className="flex items-center gap-2">
                  <FaCalendar className="text-primary" />
                  <span>{resource.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-primary" />
                  <span>{resource.readTime}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <FaEye className="text-primary" />
                    {resource.views?.toLocaleString()} views
                  </span>
                  <span className="flex items-center gap-1">
                    <FaHeart className="text-primary" />
                    {resource.likes?.toLocaleString()} likes
                  </span>
                </div>
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
            <div className="flex flex-wrap gap-2 mb-8">
              {resource.tags.map((tag) => (
                <span key={tag} className="text-sm px-3 py-1 bg-gray-100 rounded-full text-text-secondary">
                  {tag}
                </span>
              ))}
            </div>
            <article className="prose prose-lg max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: resource.content }}
                className="bg-white p-8 md:p-12 rounded-xl shadow-sm prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary hover:prose-a:text-primary/80"
              />
            </article>
            {resource.relatedLinks && resource.relatedLinks.length > 0 && (
              <div className="mt-12 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Related Resources</h3>
                <div className="space-y-3">
                  {resource.relatedLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                    >
                      <FaExternalLinkAlt className="text-sm" />
                      {link.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
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
                      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                        <span className="text-white text-sm px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full">
                          {item.category}
                        </span>
                        <span className="text-white text-sm px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full">
                          {item.difficulty}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-text-secondary text-sm line-clamp-2 mb-4">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-text-secondary">
                        <span className="flex items-center gap-1">
                          <FaClock className="text-primary" />
                          {item.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaEye className="text-primary" />
                          {item.views?.toLocaleString()}
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
