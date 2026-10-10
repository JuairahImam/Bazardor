import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import PriceTicker from '@/components/PriceTicker';
import Footer from '@/components/Footer';
import { getCategories, getProducts } from '@/lib/api';

export const metadata: Metadata = {
  title: 'বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের বাজারদর',
  description: 'দৈনিক চাল, ডাল, তেল, সবজি, মাছ, মাংস ও মসলার বাজার দর এক নজরে।',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts()
  ]);

  return (
    <html lang="bn" className="h-full antialiased scroll-smooth" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col bg-[#F8FAF9] text-gray-900 font-sans">
        <AuthProvider>
          <Toaster 
            position="top-center" 
            toastOptions={{
              duration: 3500,
              style: {
                background: '#1F2937',
                color: '#fff',
                fontSize: '14px',
                borderRadius: '12px',
                padding: '12px 16px',
              },
            }} 
          />
          <Navbar categories={categories} />
          <PriceTicker products={products} />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
