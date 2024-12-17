'use client';

import Cart from '@/components/cart/Cart';

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      <h1 className="text-3xl font-bold text-secondary mb-8">Shopping Cart</h1>
      <Cart />
    </div>
  );
}
