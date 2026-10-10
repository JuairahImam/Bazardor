'use client';

import React, { useState, useMemo } from 'react';
import { Product, Category } from '@/types';
import ProductCard from './ProductCard';
import { toBnNumber } from '@/lib/utils';
import { ChevronDown, ArrowUpDown, TrendingUp, TrendingDown, LayoutGrid } from 'lucide-react';

interface HomeProductSectionsProps {
  products: Product[];
  categories: Category[];
}

export default function HomeProductSections({ products, categories }: HomeProductSectionsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<'default' | 'low-to-high' | 'high-to-low'>('default');

  // Section A: Top 6 Risers (দাম বেড়েছে)
  const risers = useMemo(() => {
    return [...products]
      .filter((p) => p.change?.dir === 'up')
      .sort((a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0))
      .slice(0, 6);
  }, [products]);

  // Section B: Top 6 Fallers (দাম কমেছে)
  const fallers = useMemo(() => {
    return [...products]
      .filter((p) => p.change?.dir === 'down')
      .sort((a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0))
      .slice(0, 6);
  }, [products]);

  // Section C: Filtered & Sorted All Products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== 'all') {
      list = list.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase() || p.slug.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (sortOption === 'low-to-high') {
      list.sort((a, b) => a.today - b.today);
    } else if (sortOption === 'high-to-low') {
      list.sort((a, b) => b.today - a.today);
    }

    return list;
  }, [products, selectedCategory, sortOption]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 sm:space-y-16">
      {/* Section A: Risers */}
      {risers.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-center gap-2">
            <span className="text-red-500 font-bold text-lg">▲</span>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              আজ দাম বেড়েছে
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {risers.map((product) => (
              <ProductCard key={`riser-${product.id}`} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Section B: Fallers */}
      {fallers.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-center gap-2">
            <span className="text-emerald-500 font-bold text-lg">▼</span>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              আজ দাম কমেছে
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {fallers.map((product) => (
              <ProductCard key={`faller-${product.id}`} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Section C: All Products (সব পণ্য) */}
      <section id="সব-পণ্য" className="space-y-6 pt-4 scroll-mt-24">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
              <LayoutGrid className="w-6 h-6 text-[#0E8345]" />
              সব পণ্য
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              মোট {toBnNumber(filteredProducts.length)}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Sort Dropdown (Challenge C1) */}
            <div className="relative inline-flex items-center">
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as any)}
                  className="appearance-none bg-white border border-gray-200 text-gray-700 text-xs sm:text-sm font-medium rounded-xl pl-8 pr-8 py-2.5 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0E8345]/20 focus:border-[#0E8345] cursor-pointer shadow-xs"
                >
                  <option value="default">সাজান: ডিফল্ট</option>
                  <option value="low-to-high">দাম: কম থেকে বেশি</option>
                  <option value="high-to-low">দাম: বেশি থেকে কম</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#0E8345] text-white shadow-xs'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            সব ({toBnNumber(products.length)})
          </button>
          {categories.map((cat) => {
            const count = products.filter(
              (p) => p.category.toLowerCase() === cat.slug.toLowerCase() || p.slug.toLowerCase() === cat.slug.toLowerCase()
            ).length;
            const isSelected = selectedCategory.toLowerCase() === cat.slug.toLowerCase();

            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#0E8345] text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
                <span className={`text-[11px] ${isSelected ? 'text-emerald-100' : 'text-gray-400'}`}>
                  ({toBnNumber(count)})
                </span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center">
            <p className="text-gray-500 text-sm sm:text-base">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।</p>
          </div>
        )}
      </section>
    </div>
  );
}
