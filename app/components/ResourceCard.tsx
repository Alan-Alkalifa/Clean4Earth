'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ResourceCardProps {
  title: string;
  description: string;
  image: string;
  type: string;
  downloadLink?: string;
  readMoreLink?: string;
}

export default function ResourceCard({
  title,
  description,
  image,
  type,
  downloadLink,
  readMoreLink,
}: ResourceCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {type}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
        <p className="mb-6 text-text-secondary flex-1">{description}</p>
        <div className="flex gap-3 mt-auto">
          {downloadLink && (
            <Link
              href={downloadLink}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300 text-center text-sm font-medium"
            >
              Download PDF
            </Link>
          )}
          {readMoreLink && (
            <Link
              href={readMoreLink}
              className="flex-1 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-300 text-center text-sm font-medium"
            >
              Read More
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
