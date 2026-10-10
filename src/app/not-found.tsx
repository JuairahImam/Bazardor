import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="w-full max-w-md bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 shadow-sm space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-[#0E8345] flex items-center justify-center mx-auto text-4xl shadow-inner font-extrabold font-mono">
          ৪০৪
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            পাতাটি খুঁজে পাওয়া যায়নি
          </h2>
          <p className="text-sm text-gray-500">
            আপনি যে ঠিকানাটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা লিংকটি সঠিক নয়।
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
