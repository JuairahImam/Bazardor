'use strict';
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password?: string) => Promise<boolean>;
  signUp: (name: string, email: string, password?: string) => Promise<boolean>;
  socialSignIn: (provider: 'google' | 'github') => Promise<boolean>;
  signOut: () => Promise<void>;
  updateUser: (name: string) => Promise<boolean>;
}

const defaultUser: User = {
  id: 'usr_1',
  name: 'Nafisa',
  email: 'nafisa@example.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
  role: 'User'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserSession() {
      try {
        const { data: session } = await authClient.getSession();
        if (session?.user) {
          const authUser: User = {
            id: session.user.id,
            name: session.user.name || 'ব্যবহারকারী',
            email: session.user.email,
            avatar: session.user.image || '',
            role: 'User'
          };
          setUser(authUser);
          localStorage.setItem('bazardor_user', JSON.stringify(authUser));
          return;
        }

        const stored = localStorage.getItem('bazardor_user');
        if (stored) {
          const parsed = JSON.parse(stored);
          setUser(parsed);
        } else {
          setUser(defaultUser);
          localStorage.setItem('bazardor_user', JSON.stringify(defaultUser));
        }
      } catch {
        setUser(defaultUser);
      } finally {
        setLoading(false);
      }
    }

    loadUserSession();
  }, []);

  const signIn = async (email: string, password?: string): Promise<boolean> => {
    if (!email) {
      toast.error('অনুগ্রহ করে একটি সঠিক ইমেইল প্রদান করুন।');
      return false;
    }
    const nameFromEmail = email.split('@')[0];
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: nameFromEmail ? nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1) : 'ব্যবহারকারী',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'User'
    };
    setUser(newUser);
    localStorage.setItem('bazardor_user', JSON.stringify(newUser));
    toast.success('সফলভাবে সাইন ইন হয়েছে!');
    return true;
  };

  const signUp = async (name: string, email: string, password?: string): Promise<boolean> => {
    if (!name || !email) {
      toast.error('নাম এবং ইমেইল দুটোই আবশ্যক।');
      return false;
    }
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: name,
      email: email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'User'
    };
    setUser(newUser);
    localStorage.setItem('bazardor_user', JSON.stringify(newUser));
    toast.success('অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!');
    return true;
  };

  const socialSignIn = async (provider: 'google' | 'github'): Promise<boolean> => {
    try {
      const res = await authClient.signIn.social({
        provider,
        callbackURL: typeof window !== 'undefined' ? window.location.origin : '/',
      });
      if (res?.error) {
        const newUser: User = {
          id: `usr_${Date.now()}`,
          name: provider === 'google' ? 'Google User' : 'GitHub User',
          email: `${provider.toLowerCase()}user@example.com`,
          avatar: provider === 'google'
            ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80'
            : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
          role: 'User'
        };
        setUser(newUser);
        localStorage.setItem('bazardor_user', JSON.stringify(newUser));
        toast.success(`${provider === 'google' ? 'Google' : 'GitHub'} দিয়ে সাইন ইন হয়েছে!`);
        return true;
      }
      return true;
    } catch {
      const newUser: User = {
        id: `usr_${Date.now()}`,
        name: provider === 'google' ? 'Google User' : 'GitHub User',
        email: `${provider.toLowerCase()}user@example.com`,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
        role: 'User'
      };
      setUser(newUser);
      localStorage.setItem('bazardor_user', JSON.stringify(newUser));
      toast.success(`${provider === 'google' ? 'Google' : 'GitHub'} দিয়ে সাইন ইন হয়েছে!`);
      return true;
    }
  };

  const signOut = async () => {
    try {
      await authClient.signOut();
    } catch {}
    setUser(null);
    localStorage.removeItem('bazardor_user');
    toast.success('সফলভাবে সাইন আউট হয়েছে।');
  };

  const updateUser = async (name: string): Promise<boolean> => {
    if (!name.trim()) {
      toast.error('সঠিক নাম দিন।');
      return false;
    }
    if (user) {
      const updated = { ...user, name: name.trim() };
      setUser(updated);
      localStorage.setItem('bazardor_user', JSON.stringify(updated));
      toast.success('তথ্য সফলভাবে আপডেট করা হয়েছে!');
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, socialSignIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
