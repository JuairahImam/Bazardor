'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { toBnNumber, formatUnit, formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';
  const changePct = toBnNumber(product.change?.pct ?? 0);
  const formattedUnit = formatUnit(product.unit);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:border-[#0E8345]/30 transition-all duration-200 flex flex-col justify-between gap-5 relative overflow-hidden"
    >
      {/* Top Header */}
      <div className="flex items-start gap-3.5">
        <div className="w-12 h-12 rounded-xl bg-[#F8FAF9] border border-gray-100 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
          {product.image || product.categoryIcon || '🛒'}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug truncate group-hover:text-[#0E8345] transition-colors">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            {formattedUnit}
          </p>
        </div>
      </div>

      {/* Bottom Price & Badge Row */}
      <div className="flex items-end justify-between pt-2 border-t border-gray-50">
        <div>
          <span className="text-[11px] text-gray-400 font-medium block">
            আজকের দাম
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight">
            {formatPrice(product.today)}
          </span>
        </div>

        <div>
          {isUp && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 text-red-600 text-xs font-semibold">
              ▲ {changePct}%
            </span>
          )}
          {isDown && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-semibold">
              ▼ {changePct}%
            </span>
          )}
          {!isUp && !isDown && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-50 text-gray-500 text-xs font-semibold">
              — 0.0%
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
