import React from 'react';
import Hero from '@/components/Hero';
import HomeProductSections from '@/components/HomeProductSections';
import { getProducts, getCategories } from '@/lib/api';

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  return (
    <div className="space-y-4 pb-12">
      <Hero />
      <HomeProductSections products={products} categories={categories} />
    </div>
  );
}
