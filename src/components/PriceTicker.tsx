'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { toBnNumber, formatUnit } from '@/lib/utils';

interface PriceTickerProps {
  products: Product[];
}

export default function PriceTicker({ products }: PriceTickerProps) {
  if (!products || products.length === 0) return null;

  // Duplicate the list so it loops seamlessly
  const tickerItems = [...products, ...products];

  return (
    <div className="w-full bg-[#FAFBFA] border-y border-gray-200/80 overflow-hidden py-2 select-none">
      <div className="animate-marquee flex items-center gap-8 text-xs sm:text-sm">
        {tickerItems.map((item, idx) => {
          const isUp = item.change?.dir === 'up';
          const isDown = item.change?.dir === 'down';
          const changePct = toBnNumber(item.change?.pct ?? 0);
          const priceBn = toBnNumber(item.today);
          const unitBn = item.unit === 'kg' ? 'কেজি' : item.unit === 'litre' ? 'লিটার' : item.unit;

          return (
            <Link
              key={`${item.id}-${idx}`}
              href={`/product/${item.slug}`}
              className="inline-flex items-center gap-2 whitespace-nowrap text-gray-700 hover:text-[#0E8345] transition-colors"
            >
              <span>{item.image || '🛒'}</span>
              <span className="font-medium">{item.nameBn}</span>
              <span className="font-semibold">{priceBn} টাকা/{unitBn}</span>
              
              {isUp && (
                <span className="inline-flex items-center text-red-600 font-medium font-mono text-[11px] sm:text-xs">
                  ▲ {changePct}%
                </span>
              )}
              {isDown && (
                <span className="inline-flex items-center text-emerald-600 font-medium font-mono text-[11px] sm:text-xs">
                  ▼ {changePct}%
                </span>
              )}
              {!isUp && !isDown && (
                <span className="inline-flex items-center text-gray-500 font-medium font-mono text-[11px] sm:text-xs">
                  — 0.0%
                </span>
              )}

              <span className="text-gray-300 ml-4 font-light">•</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
