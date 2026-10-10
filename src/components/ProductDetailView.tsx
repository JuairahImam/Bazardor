'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { toBnNumber, formatUnit, formatPrice } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, Store, MapPin, TrendingUp, TrendingDown, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProductDetailViewProps {
  product: Product;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const { user, loading } = useAuth();

  // If user is not logged in (Protected Route requirement)
  if (!loading && !user) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 text-center shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              বিস্তারিত দেখতে সাইন ইন করুন
            </h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              বাজারভিত্তিক বিস্তারিত দাম, সর্বনিম্ন, গড় ও সর্বোচ্চ দামের বিশ্লেষণ দেখতে অনুগ্রহ করে আপনার অ্যাকাউন্টে সাইন ইন করুন।
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/signin"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0E8345] hover:bg-[#0B6E39] text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-xs transition-colors"
            >
              <span>সাইন ইন করুন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>হোম পেজে ফিরে যান</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';
  const changePct = toBnNumber(product.change?.pct ?? 0);
  const formattedUnit = formatUnit(product.unit);

  // Calculate stats from markets if available
  const markets = product.markets || [];
  let minPrice = product.today;
  let maxPrice = product.today;
  let avgPrice = product.today;

  if (markets.length > 0) {
    minPrice = Math.min(...markets.map((m) => m.min));
    maxPrice = Math.max(...markets.map((m) => m.max));
    const sumAvg = markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0);
    avgPrice = Math.round(sumAvg / markets.length);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#0E8345] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>সকল পণ্যে ফিরে যান</span>
        </Link>
      </div>

      {/* Top Summary Card */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#F8FAF9] border border-gray-100 flex items-center justify-center text-3xl sm:text-4xl shrink-0 shadow-xs">
              {product.image || product.categoryIcon || '🛒'}
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-[#0E8345] text-xs font-semibold border border-emerald-100">
                  {product.categoryNameBn || product.category}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                  {formattedUnit}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {product.nameBn}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500">
                আজকের বাজার দর ও বিভিন্ন বিভাগের প্রধান বাজারের নির্ভরযোগ্য তথ্য।
              </p>
            </div>
          </div>

          {/* Today's Price Highlight */}
          <div className="bg-[#F8FAF9] border border-gray-100 rounded-2xl p-4 sm:p-5 flex items-center justify-between md:flex-col md:items-end md:justify-center gap-2 shrink-0">
            <div className="text-left md:text-right">
              <span className="text-xs text-gray-400 font-medium block">আজকের জাতীয় গড় দাম</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0E8345]">
                {formatPrice(product.today)}
              </span>
            </div>
            <div>
              {isUp && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-red-50 text-red-600 text-xs font-bold">
                  ▲ {changePct}% বৃদ্ধি
                </span>
              )}
              {isDown && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold">
                  ▼ {changePct}% হ্রাস
                </span>
              )}
              {!isUp && !isDown && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold">
                  — অপরিবর্তিত
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Price Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
            ৳
          </div>
          <div>
            <span className="text-xs text-gray-400 font-medium block">সর্বনিম্ন দাম</span>
            <span className="text-xl sm:text-2xl font-extrabold text-gray-900">
              {formatPrice(minPrice)}
            </span>
            <span className="text-[11px] text-gray-400 block mt-0.5">বিভিন্ন বাজারের সর্বনিম্ন</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">
            ৳
          </div>
          <div>
            <span className="text-xs text-gray-400 font-medium block">গড় দাম</span>
            <span className="text-xl sm:text-2xl font-extrabold text-gray-900">
              {formatPrice(avgPrice)}
            </span>
            <span className="text-[11px] text-gray-400 block mt-0.5">সব বাজার মিলিয়ে গড়</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg">
            ৳
          </div>
          <div>
            <span className="text-xs text-gray-400 font-medium block">সর্বোচ্চ দাম</span>
            <span className="text-xl sm:text-2xl font-extrabold text-gray-900">
              {formatPrice(maxPrice)}
            </span>
            <span className="text-[11px] text-gray-400 block mt-0.5">বিভিন্ন বাজারের সর্বোচ্চ</span>
          </div>
        </div>
      </div>

      {/* Market-wise Price Section */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <Store className="w-5 h-5 text-[#0E8345]" />
              বাজারভিত্তিক আজকের দাম
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              বাংলাদেশের প্রধান প্রধান বাজারের আজকের খুচরা ও পাইকারি মূল্য তালিকা।
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600 w-fit">
            {toBnNumber(markets.length)}টি বাজার তালিকাভুক্ত
          </span>
        </div>

        {markets.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700">
              <thead className="bg-[#F8FAF9] text-gray-600 text-xs font-semibold uppercase tracking-wider rounded-xl">
                <tr>
                  <th className="py-3.5 px-4 rounded-l-xl">বাজারের নাম</th>
                  <th className="py-3.5 px-4">বিভাগ</th>
                  <th className="py-3.5 px-4 text-center">সর্বনিম্ন দাম</th>
                  <th className="py-3.5 px-4 text-center">সর্বোচ্চ দাম</th>
                  <th className="py-3.5 px-4 text-right rounded-r-xl">গড় দাম</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {markets.map((m, idx) => {
                  const marketAvg = Math.round((m.min + m.max) / 2);

                  return (
                    <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-4 px-4 font-semibold text-gray-900 flex items-center gap-2">
                        <Store className="w-4 h-4 text-gray-400" />
                        <span>{m.market}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          {m.division}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center font-medium text-emerald-600">
                        {toBnNumber(m.min)} টাকা
                      </td>
                      <td className="py-4 px-4 text-center font-medium text-rose-600">
                        {toBnNumber(m.max)} টাকা
                      </td>
                      <td className="py-4 px-4 text-right font-bold text-gray-900">
                        {toBnNumber(marketAvg)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-400 text-sm">
            বাজারের কোনো বিস্তারিত তথ্য এই মুহূর্তে পাওয়া যায়নি।
          </div>
        )}
      </div>
    </div>
  );
}
