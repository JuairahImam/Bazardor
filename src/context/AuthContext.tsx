'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { User } from '@/types';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password?: string) => Promise<boolean>;
  signUp: (
    name: string,
    email: string,
    password?: string
  ) => Promise<boolean>;
  socialSignIn: (
    provider: 'google' | 'github'
  ) => Promise<boolean>;
  signOut: () => Promise<void>;
  updateUser: (name: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load the actual authenticated session.
  useEffect(() => {
    let active = true;

    async function loadUserSession() {
      try {
        const { data: session, error } =
          await authClient.getSession();

        if (error) {
          throw error;
        }

        if (!active) return;

        if (session?.user) {
          setUser({
            id: session.user.id,
            name: session.user.name || 'ব্যবহারকারী',
            email: session.user.email,
            avatar: session.user.image || '',
            role: 'User',
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Session loading failed:', error);

        if (active) {
          setUser(null);
        }
      } finally {
        if (active) {
  
          localStorage.removeItem('bazardor_user');
          setLoading(false);
        }
      }
    }

    void loadUserSession();

    return () => {
      active = false;
    };
  }, []);

  // Email/password login.
  const signIn = async (
    email: string,
    password?: string
  ): Promise<boolean> => {
    if (!email.trim() || !password) {
      toast.error('ইমেইল এবং পাসওয়ার্ড দিন।');
      return false;
    }

    try {
      const { data, error } = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (error || !data?.user) {
        toast.error(
          error?.message || 'লগইন ব্যর্থ হয়েছে।'
        );
        return false;
      }

      setUser({
        id: data.user.id,
        name: data.user.name || 'ব্যবহারকারী',
        email: data.user.email,
        avatar: data.user.image || '',
        role: 'User',
      });

      localStorage.removeItem('bazardor_user');
      toast.success('সফলভাবে সাইন ইন হয়েছে!');

      return true;
    } catch (error) {
      console.error('Email sign-in failed:', error);
      toast.error('লগইন করা যায়নি। আবার চেষ্টা করুন।');
      return false;
    }
  };

  // Register a real user through Better Auth.
  const signUp = async (
    name: string,
    email: string,
    password?: string
  ): Promise<boolean> => {
    if (!name.trim() || !email.trim() || !password) {
      toast.error('নাম, ইমেইল এবং পাসওয়ার্ড দিন।');
      return false;
    }

    try {
      const { data, error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (error || !data?.user) {
        toast.error(
          error?.message || 'অ্যাকাউন্ট তৈরি করা যায়নি।'
        );
        return false;
      }

      setUser({
        id: data.user.id,
        name: data.user.name || name.trim(),
        email: data.user.email,
        avatar: data.user.image || '',
        role: 'User',
      });

      localStorage.removeItem('bazardor_user');
      toast.success('অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!');

      return true;
    } catch (error) {
      console.error('Sign-up failed:', error);
      toast.error('অ্যাকাউন্ট তৈরি করা যায়নি।');
      return false;
    }
  };

  // GitHub / Google OAuth.
  const socialSignIn = async (
    provider: 'google' | 'github'
  ): Promise<boolean> => {
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: `${window.location.origin}/`,
      });

      if (error) {
        console.error('Social sign-in failed:', error);
        toast.error(
          error.message || 'সোশ্যাল লগইন ব্যর্থ হয়েছে।'
        );
        return false;
      }

      // Better Auth handles the provider redirect.
      // Never create a fake user when OAuth fails.
      return true;
    } catch (error) {
      console.error('Social sign-in error:', error);
      toast.error('লগইন করা যায়নি। আবার চেষ্টা করুন।');
      return false;
    }
  };

  // Sign out of the real Better Auth session.
  const signOut = async (): Promise<void> => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error('সাইন আউট করা যায়নি।');
        return;
      }

      setUser(null);
      localStorage.removeItem('bazardor_user');
      toast.success('সফলভাবে সাইন আউট হয়েছে।');
    } catch (error) {
      console.error('Sign-out failed:', error);
      toast.error('সাইন আউট করা যায়নি।');
    }
  };

  // Update the profile through Better Auth.
  const updateUser = async (
    name: string
  ): Promise<boolean> => {
    if (!name.trim()) {
      toast.error('সঠিক নাম দিন।');
      return false;
    }

    if (!user) {
      toast.error('আগে লগইন করুন।');
      return false;
    }

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error(
          error.message || 'তথ্য আপডেট করা যায়নি।'
        );
        return false;
      }

      const { data: session } = await authClient.getSession();

      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.name || name.trim(),
          email: session.user.email,
          avatar: session.user.image || '',
          role: 'User',
        });
      }

      toast.success('তথ্য সফলভাবে আপডেট হয়েছে!');
      return true;
    } catch (error) {
      console.error('Profile update failed:', error);
      toast.error('তথ্য আপডেট করা যায়নি।');
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        socialSignIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within an AuthProvider'
    );
  }

  return context;
}
