import { resources, Resource } from '@/data/resources';
import ResourceDetailClient from '@/components/client/ResourceDetailClient';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ResourceDetail({
  params,
}: Props) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const resource = resources.find((r): r is Resource => 
    r.slug === slug
  );

  if (!resource) {
    notFound();
  }

  return <ResourceDetailClient resource={resource} />;
}

// Generate static params for all resources
export async function generateStaticParams() {
  return resources.map((resource) => ({
    slug: resource.slug,
  }));
}