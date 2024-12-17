'use client';

import { CartProvider } from '@/context/CartContext';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Analytics } from '@vercel/analytics/react';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Navigation />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <Analytics />
    </CartProvider>
  );
}
