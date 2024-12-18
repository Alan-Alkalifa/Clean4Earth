'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { fetchProducts } from '@/utils/database';
import { updateProductStock } from '@/utils/updateStock';
import Toast from '@/components/ui/Toast';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const [processingPayment, setProcessingPayment] = useState(false);
  const [stockLevels, setStockLevels] = useState<Record<string, number>>({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info');

  useEffect(() => {
    const loadStockLevels = async () => {
      const response = await fetchProducts();
      if (response.success) {
        const levels = response.data.reduce((acc, product) => {
          acc[product.id] = product.quantity;
          return acc;
        }, {} as Record<string, number>);
        setStockLevels(levels);
      }
    };
    loadStockLevels();
  }, []);

  const handleQuantityUpdate = (itemId: string, newQuantity: number) => {
    const availableStock = stockLevels[itemId];
    
    if (newQuantity > availableStock) {
      setToastMessage(`Sorry, only ${availableStock} items available in stock`);
      setToastType('error');
      setShowToast(true);
      return;
    }
    
    updateQuantity(itemId, newQuantity);
  };

  const handleCheckout = async () => {
    try {
      // Check stock levels before proceeding
      const stockCheckPassed = items.every(item => {
        const availableStock = stockLevels[item.id];
        return item.quantity <= availableStock;
      });

      if (!stockCheckPassed) {
        setToastMessage('Some items in your cart exceed available stock');
        setToastType('error');
        setShowToast(true);
        return;
      }

      setProcessingPayment(true);

      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: getTotalPrice(),
          customerName: 'Test Customer',
          customerEmail: 'test@example.com',
          items: items.map(item => ({
            id: item.id,
            price: item.price,
            quantity: item.quantity,
            name: item.name
          }))
        }),
      });

      const data = await response.json();

      if (!data.token) {
        throw new Error('Failed to get payment token');
      }

      const snap = (window as any).snap;
      
      snap.pay(data.token, {
        onSuccess: async function(result: any) {
          console.log('Payment success:', result);
          
          // Update stock levels in database
          const updateResult = await updateProductStock(
            items.map(item => ({
              id: item.id,
              quantity: item.quantity
            }))
          );

          if (updateResult.success) {
            // Refresh stock levels
            const response = await fetchProducts();
            if (response.success) {
              const levels = response.data.reduce((acc, product) => {
                acc[product.id] = product.quantity;
                return acc;
              }, {} as Record<string, number>);
              setStockLevels(levels);
            }

            setToastMessage('Payment successful! Stock updated.');
            setToastType('success');
            // Clear the cart after successful payment and stock update
            items.forEach(item => removeFromCart(item.id));
          } else {
            setToastMessage('Payment successful but failed to update stock. Please contact support.');
            setToastType('error');
          }
          setShowToast(true);
        },
        onPending: function(result: any) {
          console.log('Payment pending:', result);
          setToastMessage('Payment pending. Please complete your payment.');
          setToastType('info');
          setShowToast(true);
        },
        onError: function(result: any) {
          console.error('Payment error:', result);
          setToastMessage('Payment failed. Please try again.');
          setToastType('error');
          setShowToast(true);
        },
        onClose: function() {
          setProcessingPayment(false);
        }
      });
    } catch (error) {
      console.error('Payment error:', error);
      setToastMessage('Failed to process payment. Please try again.');
      setToastType('error');
      setShowToast(true);
      setProcessingPayment(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-8 space-y-4">
        <h2 className="text-xl font-semibold text-gray-600">Your cart is empty</h2>
        <Link 
          href="/products" 
          className="inline-block px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors text-lg font-medium"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-secondary p-6 border-b">Shopping Cart</h2>
      <div className="p-4 sm:p-6 space-y-4">
        {items.map((item) => {
          const availableStock = stockLevels[item.id] || 0;
          const isOutOfStock = availableStock === 0;
          const exceedsStock = item.quantity > availableStock;

          return (
            <div key={item.id} className="bg-gray-50 rounded-xl p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative h-32 w-32 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-xl"
                    unoptimized={true}
                  />
                </div>
                
                <div className="flex-grow flex flex-col sm:flex-row items-center sm:items-start sm:justify-between w-full gap-4">
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-semibold text-secondary">{item.name}</h3>
                    <p className="text-primary text-lg mt-1">Rp.{item.price}</p>
                    {(isOutOfStock || exceedsStock) && (
                      <p className="text-red-500 text-sm mt-1">
                        {isOutOfStock ? 'Out of stock' : `Only ${availableStock} available`}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex items-center gap-4">
                      <button
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handleQuantityUpdate(item.id, Math.max(0, item.quantity - 1))}
                        disabled={isOutOfStock}
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-lg font-medium">{item.quantity}</span>
                      <button
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                        disabled={isOutOfStock || item.quantity >= availableStock}
                      >
                        +
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="border-t p-6 space-y-4 bg-gray-50">
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold text-secondary">Total:</span>
          <span className="text-2xl font-bold text-primary">Rp.{getTotalPrice()}</span>
        </div>
        <button
          className="w-full py-4 bg-primary text-white rounded-xl hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-lg font-medium"
          onClick={handleCheckout}
          disabled={processingPayment || items.some(item => item.quantity > (stockLevels[item.id] || 0))}
        >
          {processingPayment ? 'Processing...' : 'Checkout'}
        </button>
      </div>

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
