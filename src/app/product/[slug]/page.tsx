import React from 'react';
import { notFound } from 'next/navigation';
import { getProductByIdOrSlug } from '@/lib/api';
import ProductDetailView from '@/components/ProductDetailView';
import mockData from '@/lib/mock-data.json';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = mockData.products.map((p) => ({ slug: p.slug }));
  const ids = mockData.products.map((p) => ({ slug: String(p.id) }));
  return [...slugs, ...ids];
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductByIdOrSlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
