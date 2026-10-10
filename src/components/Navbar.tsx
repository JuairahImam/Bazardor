'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingBag, ChevronDown, User as UserIcon, LogOut, Settings, Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getTodayDateBengali } from '@/lib/utils';
import { Category } from '@/types';

interface NavbarProps {
  categories?: Category[];
}

const defaultCategories: Category[] = [
  { id: 'chal', slug: 'chal', nameBn: 'চাল', icon: '🍚' },
  { id: 'dal', slug: 'dal', nameBn: 'ডাল', icon: '🫘' },
  { id: 'tel', slug: 'tel', nameBn: 'তেল', icon: '🛢️' },
  { id: 'sobji', slug: 'sobji', nameBn: 'সবজি', icon: '🥬' },
  { id: 'mach', slug: 'mach', nameBn: 'মাছ', icon: '🐟' },
  { id: 'mangsho', slug: 'mangsho', nameBn: 'মাংস', icon: '🍗' },
  { id: 'dim-dui', slug: 'dim-dui', nameBn: 'ডিম-দুধ', icon: '🥛' },
  { id: 'mosla', slug: 'mosla', nameBn: 'মসলা', icon: '🌶️' }
];

export default function Navbar({ categories = defaultCategories }: NavbarProps) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const todayBn = getTodayDateBengali();

  useEffect(() => {
    setImageError(false);
  }, [user?.avatar]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      {/* Top Main Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#0E8345] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none group-hover:text-[#0E8345] transition-colors">
              বাজার দর
            </h1>
            <p className="text-[11px] font-medium text-gray-500 mt-1">
              {todayBn}
            </p>
          </div>
        </Link>

        {/* Right Action / Profile */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-full sm:rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all cursor-pointer"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 bg-emerald-50 flex items-center justify-center text-sm font-semibold text-gray-700">
                  {user.avatar && !imageError ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                      unoptimized
                      referrerPolicy="no-referrer"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <span className="text-xs font-bold text-[#0E8345]">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline-block text-sm font-semibold text-gray-800">
                  {user.name}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500 transition-transform duration-200" />
              </button>

              {/* User Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-400 font-medium">লগইন করা হয়েছে</p>
                    <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <UserIcon className="w-4 h-4 text-gray-400" />
                    <span>প্রোফাইল</span>
                  </Link>

                  <Link
                    href="/profile/update"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-gray-400" />
                    <span>তথ্য আপডেট</span>
                  </Link>

                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        signOut();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>সাইন আউট</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="text-sm font-medium text-gray-700 hover:text-[#0E8345] px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium bg-[#0E8345] hover:bg-[#0B6E39] text-white px-4 py-2 rounded-lg transition-colors shadow-xs"
              >
                সাইন আপ
              </Link>
            </div>
          )}

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Category Navigation Strip */}
      <div className="border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-start md:justify-center gap-1 sm:gap-2 overflow-x-auto py-2.5 scrollbar-none no-scrollbar">
            {categories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}` || pathname === `/categories/${cat.slug}`;

              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-50 text-[#0E8345] font-semibold border border-emerald-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent'
                  }`}
                >
                  <span className="text-sm sm:text-base">{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
