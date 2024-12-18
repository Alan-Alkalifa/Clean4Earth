'use client';

import Cart from '@/components/cart/Cart';
import Image from 'next/image';

export default function CartPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1605600659908-0ef719419d41?q=80&w=2000"
            alt="Shopping Cart"
            fill
            className="object-cover brightness-[0.35]"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-left">
          <h1 className="text-5xl font-bold text-primary mb-4">Your Shopping Cart</h1>
          <p className="text-xl text-gray-200">Review and manage your eco-friendly selections</p>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-8">
        <Cart />
      </div>
    </div>
  );
}
