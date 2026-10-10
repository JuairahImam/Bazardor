'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Product, Category } from '@/types';
import ProductCard from './ProductCard';
import { toBnNumber } from '@/lib/utils';
import { ChevronDown, ArrowUpDown, ArrowLeft, AlertCircle } from 'lucide-react';

interface CategoryViewProps {
  category: Category | null;
  products: Product[];
}

export default function CategoryView({ category, products }: CategoryViewProps) {
  const [sortOption, setSortOption] = useState<'default' | 'low-to-high' | 'high-to-low'>('default');

  const sortedProducts = useMemo(() => {
    let list = [...products];

    if (sortOption === 'low-to-high') {
      list.sort((a, b) => a.today - b.today);
    } else if (sortOption === 'high-to-low') {
      list.sort((a, b) => b.today - a.today);
    }

    return list;
  }, [products, sortOption]);

  // Empty state if category not found or has no items
  if (!category || products.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 text-center shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              কোনো পণ্য পাওয়া যায়নি
            </h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য তালিকাভুক্ত নেই অথবা ভুল ক্যাটাগরি অনুসন্ধান করা হয়েছে।
            </p>
          </div>

          <div>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-[#0E8345] hover:bg-[#0B6E39] text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-xs transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>হোম পেজে ফিরে যান</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#0E8345] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>সকল পণ্যে ফিরে যান</span>
        </Link>
      </div>

      {/* Category Header Bar */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#F8FAF9] border border-gray-100 flex items-center justify-center text-3xl shrink-0 shadow-xs">
            {category.icon}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {category.nameBn}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              মোট {toBnNumber(products.length)}টি পণ্য তালিকাভুক্ত আছে
            </p>
          </div>
        </div>

        {/* Sort Control */}
        <div className="relative inline-flex items-center">
          <div className="relative w-full sm:w-auto">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="w-full sm:w-auto appearance-none bg-white border border-gray-200 text-gray-700 text-xs sm:text-sm font-medium rounded-xl pl-8 pr-8 py-2.5 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0E8345]/20 focus:border-[#0E8345] cursor-pointer shadow-xs"
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

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
