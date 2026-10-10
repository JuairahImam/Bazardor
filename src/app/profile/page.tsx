'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, User, Mail, Shield, Edit3, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const [imageError, setImageError] = React.useState(false);

  React.useEffect(() => {
    setImageError(false);
  }, [user?.avatar]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl border border-gray-100 p-8 space-y-4 shadow-sm">
          <p className="text-gray-600 text-sm">প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।</p>
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

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#0E8345] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-emerald-100 shadow-md bg-emerald-50">
            {user.avatar && !imageError ? (
              <Image
                src={user.avatar}
                alt={user.name}
                fill
                className="object-cover"
                unoptimized
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-emerald-100 text-[#0E8345] flex items-center justify-center text-3xl font-bold">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
            <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-emerald-50 text-[#0E8345] text-xs font-semibold mt-2">
              <Shield className="w-3 h-3" />
              {user.role || 'সদস্য'}
            </span>
          </div>
        </div>

        {/* Info Rows */}
        <div className="border-t border-gray-100 pt-6 space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F8FAF9]">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-400 font-medium">পুরো নাম</p>
                <p className="text-sm font-semibold text-gray-800">{user.name}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F8FAF9]">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-400 font-medium">ইমেইল ঠিকানা</p>
                <p className="text-sm font-semibold text-gray-800">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Link
            href="/profile/update"
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-[#0E8345] hover:bg-[#0B6E39] text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-xs transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            <span>তথ্য পরিবর্তন করুন</span>
          </Link>

          <button
            onClick={() => signOut()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold px-6 py-3 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>সাইন আউট</span>
          </button>
        </div>
      </div>
    </div>
  );
}
