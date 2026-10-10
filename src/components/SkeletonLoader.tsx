'use strict';
import React from 'react';

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse flex flex-col justify-between gap-5">
      <div className="flex items-start gap-3.5">
        <div className="w-12 h-12 rounded-xl bg-gray-200 shrink-0"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="flex items-end justify-between pt-2 border-t border-gray-50">
        <div className="space-y-1.5">
          <div className="h-2.5 bg-gray-200 rounded w-12"></div>
          <div className="h-5 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded-lg w-16"></div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
