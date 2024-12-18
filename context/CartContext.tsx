'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotalPrice: () => number;
  orderId: string | null;
  paymentToken: string | null;
  setPaymentStatus: (token: string | null, id: string | null) => void;
  clearCart: () => void;
  getCartItemQuantity: (id: string) => number;
  isPaymentInProgress: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentToken, setPaymentToken] = useState<string | null>(null);

  // Load cart from localStorage on initial mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }

    const savedPayment = localStorage.getItem('pendingPayment');
    if (savedPayment) {
      const { token, orderId } = JSON.parse(savedPayment);
      setPaymentToken(token);
      setOrderId(orderId);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === newItem.id);
      if (existingItem) {
        return currentItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { ...newItem, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemQuantity = (id: string): number => {
    const item = items.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  const isPaymentInProgress = !!(paymentToken || orderId);

  const setPaymentStatus = (token: string | null, id: string | null) => {
    setPaymentToken(token);
    setOrderId(id);
    // Store in localStorage
    if (token && id) {
      localStorage.setItem('pendingPayment', JSON.stringify({ token, orderId: id }));
    } else {
      localStorage.removeItem('pendingPayment');
    }
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getCartItemQuantity,
      orderId,
      paymentToken,
      setPaymentStatus,
      isPaymentInProgress,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
