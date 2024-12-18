'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { fetchProducts } from '@/utils/database';
import { updateProductStock } from '@/utils/updateStock';
import Toast from '@/components/ui/Toast';
import CheckoutForm from '../checkout/CheckoutForm';
import { createTransaction, getTransactionStatus, TransactionStatus } from '@/utils/midtrans';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, setPaymentStatus, orderId } = useCart();
  const [processingPayment, setProcessingPayment] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [stockLevels, setStockLevels] = useState<Record<string, number>>({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info');
  const [customerInfo, setCustomerInfo] = useState<{
    name: string;
    email: string;
    phone: string;
    address: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentToken, setPaymentToken] = useState<string | null>(null);

  const isPaymentInProgress = () => {
    return !!(paymentToken || orderId);
  };

  const updatePaymentState = (token: string | null, id: string | null) => {
    setPaymentToken(token);
    setPaymentStatus(token, id); // Update CartContext state
    // Store in localStorage for persistence
    if (token && id) {
      localStorage.setItem('pendingPayment', JSON.stringify({ token, orderId: id }));
    } else {
      localStorage.removeItem('pendingPayment');
    }
  };

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

  useEffect(() => {
    const pendingPayment = localStorage.getItem('pendingPayment');
    if (pendingPayment) {
      const { token, orderId } = JSON.parse(pendingPayment);
      updatePaymentState(token, orderId);
    }
  }, []);

  useEffect(() => {
    if (!items.length) return;

    let retryCount = 0;
    const MAX_RETRIES = 3;
    let checkInterval: NodeJS.Timeout;

    const checkStatus = async () => {
      try {
        if (!orderId) return;
        const response = await getTransactionStatus(orderId);
        
        if (!response.success) {
          // If it's a network error, increment retry count
          if (response.error.includes('Network')) {
            retryCount++;
            if (retryCount >= MAX_RETRIES) {
              clearInterval(checkInterval);
              setToastMessage('Unable to check payment status. Please refresh the page.');
              setToastType('error');
              setShowToast(true);
            }
            return;
          }
          
          // If transaction not found or other error, clear payment state
          updatePaymentState(null, null);
          setCustomerInfo(null);
          setToastMessage(response.error);
          setToastType('error');
          setShowToast(true);
          clearInterval(checkInterval);
          return;
        }

        // Reset retry count on successful API call
        retryCount = 0;
        
        const status = response.data;
        if (status.transaction_status === TransactionStatus.SUCCESS) {
          updatePaymentState(null, null);
          setCustomerInfo(null);
          setToastMessage('Payment successful! Stock updated.');
          setToastType('success');
          setShowToast(true);
          // Clear cart
          items.forEach(item => removeFromCart(item.id));
          clearInterval(checkInterval);
        } else if (
          status.transaction_status === TransactionStatus.FAILURE ||
          status.transaction_status === TransactionStatus.EXPIRED ||
          status.transaction_status === TransactionStatus.CANCEL
        ) {
          updatePaymentState(null, null);
          setCustomerInfo(null);
          setToastMessage('Payment was not completed. Please try again.');
          setToastType('error');
          setShowToast(true);
          clearInterval(checkInterval);
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        retryCount++;
        if (retryCount >= MAX_RETRIES) {
          clearInterval(checkInterval);
          setToastMessage('Unable to check payment status. Please refresh the page.');
          setToastType('error');
          setShowToast(true);
        }
      }
    };

    // Initial check
    checkStatus();
    
    // Set up interval for subsequent checks
    checkInterval = setInterval(checkStatus, 5000); // Check every 5 seconds
    
    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
    };
  }, [items, orderId]);

  const checkAndUpdatePaymentStatus = async () => {
    if (!orderId) return;
    
    try {
      const response = await fetch(`/api/payment/status?orderId=${orderId}`);
      if (!response.ok) {
        throw new Error('Failed to check payment status');
      }
      
      const data = await response.json();
      
      if (data.transaction_status === TransactionStatus.EXPIRED || 
          data.transaction_status === TransactionStatus.CANCEL ||
          data.transaction_status === TransactionStatus.FAILURE) {
        // Reset payment state
        updatePaymentState(null, null);
        setCustomerInfo(null);
        
        let message = 'Payment needs to be retried.';
        if (data.transaction_status === TransactionStatus.EXPIRED) {
          message = 'Payment has expired. Please try again.';
        } else if (data.transaction_status === TransactionStatus.CANCEL) {
          message = 'Payment was cancelled. Please try again.';
        } else if (data.transaction_status === TransactionStatus.FAILURE) {
          message = 'Payment failed. Please try again.';
        }
        
        setToastMessage(message);
        setToastType('info');
        setShowToast(true);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error checking payment status:', error);
      return true; // Continue with payment on error to avoid blocking user
    }
  };

  useEffect(() => {
    if (!orderId) return;

    const checkStatus = async () => {
      try {
        await checkAndUpdatePaymentStatus();
      } catch (error) {
        console.error('Error in status check interval:', error);
      }
    };

    const interval = setInterval(checkStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [orderId]);

  const handleQuantityUpdate = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    
    const availableStock = stockLevels[itemId];
    
    if (newQuantity > availableStock) {
      setToastMessage(`Sorry, only ${availableStock} items available in stock`);
      setToastType('error');
      setShowToast(true);
      return;
    }
    
    updateQuantity(itemId, newQuantity);
  };

  const handleCheckout = async (customerData: { 
    name: string; 
    email: string; 
    phone: string;
    address: string;
  }) => {
    try {
      setIsLoading(true);
      
      // Validate cart is not empty
      if (items.length === 0) {
        setToastMessage('Your cart is empty');
        setToastType('error');
        setShowToast(true);
        return;
      }

      // Calculate total amount
      const totalAmount = getTotalPrice();

      // Prepare payment request
      const paymentRequest = {
        amount: Math.round(totalAmount),
        customerName: customerData.name,
        customerEmail: customerData.email,
        customerPhone: customerData.phone,
        customerAddress: customerData.address,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: Math.round(item.price),
          quantity: item.quantity
        }))
      };

      console.log('Sending payment request:', paymentRequest);

      // Make payment request
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentRequest),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment');
      }

      if (!data.token) {
        throw new Error('Payment token not received from server');
      }

      // Store payment information before closing form
      updatePaymentState(data.token, data.orderId);
      setCustomerInfo(customerData);
      
      // Only close the form after we have the payment token
      setShowCheckoutForm(false);

      // Open Midtrans Snap payment page
      if ((window as any).snap) {
        (window as any).snap.pay(data.token, {
          onSuccess: function(result: any){
            console.log('Payment success:', result);
            setToastMessage('Payment successful!');
            setToastType('success');
            setShowToast(true);
            // Clear payment state
            updatePaymentState(null, null);
            setCustomerInfo(null);
            // Clear cart
            items.forEach(item => removeFromCart(item.id));
          },
          onPending: function(result: any){
            console.log('Payment pending:', result);
            setToastMessage('Payment is being processed...');
            setToastType('info');
            setShowToast(true);
          },
          onError: function(result: any){
            console.error('Payment error:', result);
            setToastMessage('Payment failed. Please try again.');
            setToastType('error');
            setShowToast(true);
            // Clear payment state on error
            updatePaymentState(null, null);
            setCustomerInfo(null);
            // Show form again on error
            setShowCheckoutForm(true);
          },
          onClose: function(){
            console.log('Customer closed the popup without finishing the payment');
            setToastMessage('Payment window closed. You can resume payment later.');
            setToastType('info');
            setShowToast(true);
          }
        });
      } else {
        throw new Error('Midtrans Snap not loaded');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      setToastMessage(error.message || 'Failed to process payment. Please try again.');
      setToastType('error');
      setShowToast(true);
      // Show form again on error
      setShowCheckoutForm(true);
    } finally {
      setIsLoading(false);
    }
  };

  const resumePayment = async () => {
    try {
      setIsLoading(true);
      
      // Check payment status before resuming
      const isValid = await checkAndUpdatePaymentStatus();
      
      // If payment state was reset by status check, return early
      if (!isValid || !paymentToken) {
        return;
      }

      // Open Midtrans Snap payment page with stored token
      if ((window as any).snap) {
        (window as any).snap.pay(paymentToken, {
          onSuccess: function(result: any){
            console.log('Payment success:', result);
            setToastMessage('Payment successful!');
            setToastType('success');
            setShowToast(true);
            // Clear payment state
            updatePaymentState(null, null);
            setCustomerInfo(null);
            // Clear cart
            items.forEach(item => removeFromCart(item.id));
          },
          onPending: function(result: any){
            console.log('Payment pending:', result);
            setToastMessage('Payment is being processed...');
            setToastType('info');
            setShowToast(true);
          },
          onError: function(result: any){
            console.error('Payment error:', result);
            setToastMessage('Payment failed. Please try again.');
            setToastType('error');
            setShowToast(true);
            // Clear payment state on error
            updatePaymentState(null, null);
            setCustomerInfo(null);
          },
          onClose: function(){
            console.log('Customer closed the popup without finishing the payment');
            // Check status immediately when popup is closed
            checkAndUpdatePaymentStatus();
            setToastMessage('Payment window closed. You can resume payment if it\'s still valid.');
            setToastType('info');
            setShowToast(true);
          }
        });
      } else {
        throw new Error('Midtrans Snap not loaded');
      }
    } catch (error: any) {
      console.error('Resume payment error:', error);
      setToastMessage(error.message || 'Failed to resume payment');
      setToastType('error');
      setShowToast(true);
      // Clear payment state on error
      updatePaymentState(null, null);
      setCustomerInfo(null);
    } finally {
      setIsLoading(false);
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
          const paymentInProgress = isPaymentInProgress();

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
                    <p className="text-primary text-lg mt-1">IDR.{item.price}</p>
                    {(isOutOfStock || exceedsStock) && (
                      <p className="text-red-500 text-sm mt-1">
                        {isOutOfStock ? 'Out of stock' : `Only ${availableStock} available`}
                      </p>
                    )}
                    {paymentInProgress && (
                      <p className="text-secondary text-sm mt-1 font-medium">
                        Payment in progress - Cannot modify cart
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex items-center gap-4">
                      <button
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handleQuantityUpdate(item.id, Math.max(0, item.quantity - 1))}
                        disabled={paymentInProgress || isOutOfStock}
                        title={paymentInProgress ? "Cannot modify during payment" : ""}
                      >
                        -
                      </button>
                      <span className="text-lg font-medium min-w-[2ch] text-center">
                        {item.quantity}
                      </span>
                      <button
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                        disabled={paymentInProgress || isOutOfStock || item.quantity >= availableStock}
                        title={paymentInProgress ? "Cannot modify during payment" : ""}
                      >
                        +
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      disabled={paymentInProgress}
                      className={`text-red-500 hover:text-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${paymentInProgress ? 'opacity-50 cursor-not-allowed' : ''}`}
                      title={paymentInProgress ? "Cannot remove during payment" : ""}
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
          <span className="text-2xl font-bold text-primary">IDR.{getTotalPrice()}</span>
        </div>
        <div className="mt-6 space-y-4">
          {paymentToken && (
            <div className="mb-4 p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
              <p className="text-secondary font-medium mb-2">You have a pending payment</p>
              <button
                onClick={resumePayment}
                disabled={isLoading}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                {isLoading ? 'Processing...' : 'Resume Payment'}
              </button>
            </div>
          )}
          {!paymentToken && (
            <button
              onClick={() => setShowCheckoutForm(true)}
              disabled={isLoading || items.some(item => item.quantity > (stockLevels[item.id] || 0))}
              className="w-full bg-primary text-white py-3 rounded-xl text-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          )}
        </div>

        {showCheckoutForm && (
          <CheckoutForm
            onSubmit={handleCheckout}
            onCancel={() => {
              setShowCheckoutForm(false);
              setCustomerInfo(null);
              updatePaymentState(null, null);
            }}
          />
        )}
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
