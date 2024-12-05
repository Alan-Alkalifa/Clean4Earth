import { resources } from '@/data/resources';
import ResourceDetailClient from '@/components/client/ResourceDetailClient';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface ResourceDetailProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ResourceDetailProps): Promise<Metadata> {
  const resource = resources.find(r => r.slug === params.slug);

  if (!resource) {
    return {
      title: 'Resource Not Found - Clean4Earth',
      description: 'The requested resource could not be found.',
    };
  }

  return {
    title: `${resource.title} - Clean4Earth`,
    description: resource.description,
    openGraph: {
      title: resource.title,
      description: resource.description,
      images: [resource.image],
    },
  };
}

export default function ResourceDetail({ params }: ResourceDetailProps) {
  const resource = resources.find(r => r.slug === params.slug);
  
  if (!resource) {
    notFound();
  }

  return <ResourceDetailClient resource={resource} />;
}
