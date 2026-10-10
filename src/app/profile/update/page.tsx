'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function UpdateProfilePage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl border border-gray-100 p-8 space-y-4 shadow-sm">
          <p className="text-gray-600 text-sm">অনুগ্রহ করে প্রথমে সাইন ইন করুন।</p>
          <Link
            href="/signin"
            className="inline-block bg-[#0E8345] text-white px-6 py-2.5 rounded-xl font-semibold text-sm"
          >
            সাইন ইন
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await updateUser(name);
    setLoading(false);
    if (success) {
      router.push('/profile');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-12 space-y-6">
      {/* Back button */}
      <div>
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#0E8345] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>প্রোফাইলে ফিরে যান</span>
        </Link>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            তথ্য আপডেট করুন
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            আপনার অ্যাকাউন্টের নাম ও তথ্য পরিবর্তন করুন।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-gray-700">
              আপনার নাম
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="নাম লিখুন"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0E8345]/20 focus:border-[#0E8345] transition-all"
            />
          </div>

          <div className="space-y-1.5 text-left opacity-70">
            <label className="text-xs font-semibold text-gray-700">
              ইমেইল (পরিবর্তনযোগ্য নয়)
            </label>
            <input
              type="email"
              disabled
              value={user.email}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0E8345] hover:bg-[#0B6E39] disabled:bg-[#0E8345]/70 text-white font-semibold py-3 rounded-xl shadow-xs transition-colors cursor-pointer text-sm flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{loading ? 'সংরক্ষণ হচ্ছে...' : 'তথ্য আপডেট করুন'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
