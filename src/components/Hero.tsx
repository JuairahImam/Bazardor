'use client';

import React from 'react';
import { getTodayDateBengali } from '@/lib/utils';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const todayBn = getTodayDateBengali();

  const handleScrollToProducts = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('all-products') || document.getElementById('সব-পণ্য');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 sm:p-10 lg:p-12 flex flex-col-reverse md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        {/* Left Content */}
        <div className="flex-1 max-w-xl text-center md:text-left">
          {/* Eyebrow Date Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF7EE] text-[#0E8345] text-xs sm:text-sm font-medium border border-[#D5EEDB] mb-4">
            <span>{todayBn}</span>
          </div>

          {/* Main Heading with Highlight */}
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-gray-900 tracking-tight leading-[1.25] mb-4">
            আজকের{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-gray-900">বাজারের দাম এক নজরে</span>
              <span className="absolute left-0 bottom-1.5 sm:bottom-2 w-full h-2.5 sm:h-3.5 bg-[#0088FF]/30 -z-0 rounded-sm"></span>
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 sm:mb-8 font-normal">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Primary CTA */}
          <div>
            <a
              href="#সব-পণ্য"
              onClick={handleScrollToProducts}
              className="inline-flex items-center justify-center gap-2 bg-[#0E8345] hover:bg-[#0B6E39] text-white text-sm sm:text-base font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all transform active:scale-98 cursor-pointer"
            >
              <span>সব পণ্য দেখুন</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="w-full max-w-[280px] sm:max-w-[340px] flex items-center justify-center">
          <div className="relative w-full aspect-[4/3] flex items-center justify-center">
            {/* Clean SVG Illustration matching Figma basket */}
            <svg
              viewBox="0 0 320 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto drop-shadow-sm"
            >
              {/* Basket Shadow */}
              <ellipse cx="160" cy="240" rx="110" ry="12" fill="#E2E8F0" opacity="0.7" />

              {/* Fruits and Vegetables */}
              {/* Green Apple / Veggie Left */}
              <circle cx="105" cy="120" r="32" fill="#E11D48" />
              <path d="M105 88 C105 80 115 78 118 70" stroke="#047857" strokeWidth="4" strokeLinecap="round" />
              <ellipse cx="118" cy="74" rx="7" ry="4" fill="#10B981" transform="rotate(-20 118 74)" />

              {/* Purple Eggplant */}
              <path
                d="M135 90 C135 70 160 65 170 85 C180 105 160 150 140 145 C120 140 135 110 135 90 Z"
                fill="#9333EA"
              />
              <path d="M165 72 C168 62 175 60 178 52" stroke="#047857" strokeWidth="3" strokeLinecap="round" />

              {/* Big Center Green Melon / Cabbage */}
              <circle cx="165" cy="115" r="38" fill="#10B981" />
              <path d="M165 77 C165 65 175 62 178 52" stroke="#047857" strokeWidth="4" strokeLinecap="round" />
              <ellipse cx="180" cy="58" rx="10" ry="5" fill="#34D399" transform="rotate(30 180 58)" />

              {/* Orange Citrus */}
              <circle cx="215" cy="130" r="26" fill="#F97316" />
              <circle cx="215" cy="130" r="22" fill="#FB923C" />
              <path d="M215 104 C215 96 222 94 225 86" stroke="#047857" strokeWidth="3" strokeLinecap="round" />

              {/* Red Tomato / Pepper */}
              <circle cx="140" cy="140" r="24" fill="#EF4444" />
              <circle cx="185" cy="145" r="22" fill="#EAB308" />

              {/* Basket Body */}
              <path
                d="M70 145 L90 225 C92 233 100 238 108 238 L212 238 C220 238 228 233 230 225 L250 145 Z"
                fill="#B45309"
              />
              <path
                d="M65 145 C65 141 68 138 72 138 L248 138 C252 138 255 141 255 145 L248 152 L72 152 Z"
                fill="#D97706"
              />
              {/* Basket Weave Lines */}
              <path d="M95 152 L110 238" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
              <path d="M130 152 L140 238" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
              <path d="M165 152 L165 238" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
              <path d="M200 152 L190 238" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
              <path d="M225 152 L210 238" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
              <path d="M78 180 Q160 190 242 180" stroke="#92400E" strokeWidth="3" fill="none" />
              <path d="M84 210 Q160 218 236 210" stroke="#92400E" strokeWidth="3" fill="none" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
