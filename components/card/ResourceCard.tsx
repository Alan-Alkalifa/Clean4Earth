'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaClock, FaEye, FaHeart, FaTag, FaUser } from 'react-icons/fa';
import { Resource } from '../../data/resources';

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Link href={`/resources/detail/${resource.slug}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-lg h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={resource.image}
            alt={resource.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            <span className="text-white text-sm px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full">
              {resource.category}
            </span>
            <span className="text-white text-sm px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full">
              {resource.difficulty}
            </span>
          </div>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors text-xl text-gray-900">
            {resource.title}
          </h3>
          <p className="text-text-secondary flex-1 text-sm line-clamp-2 mb-4">
            {resource.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {resource.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-text-secondary">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-auto text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <FaUser className="text-primary" />
              <span>{resource.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-primary" />
              <span>{resource.readTime}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2 text-sm text-text-secondary">
            <span className="flex items-center gap-1">
              <FaEye className="text-primary" />
              {resource.views?.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <FaHeart className="text-primary" />
              {resource.likes?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
