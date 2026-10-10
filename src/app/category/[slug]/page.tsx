import React from 'react';
import { getProducts, getCategories } from '@/lib/api';
import CategoryView from '@/components/CategoryView';
import mockData from '@/lib/mock-data.json';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return mockData.categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(slug)
  ]);

  const category = categories.find(
    (c) => c.slug.toLowerCase() === slug.toLowerCase() || c.id.toLowerCase() === slug.toLowerCase()
  ) || null;

  return <CategoryView category={category} products={products} />;
}
