'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaClock } from 'react-icons/fa';
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
          <span className="absolute bottom-4 left-4 text-white text-sm px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full">
            {resource.category}
          </span>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors text-xl text-gray-900">
            {resource.title}
          </h3>
          <p className="text-text-secondary flex-1 text-sm line-clamp-2 mb-6">
            {resource.description}
          </p>
          <div className="flex items-center gap-4 mt-auto text-sm text-text-secondary">
            <span className="flex items-center gap-1">
              <FaClock className="text-primary" />
              {resource.readTime}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
