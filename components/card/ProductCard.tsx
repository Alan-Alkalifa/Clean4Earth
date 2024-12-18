'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import FadeIn from '@/components/animations/FadeIn';
import StaggerChildren from '@/components/animations/StaggerChildren';
import Toast from '@/components/ui/Toast';
import { Product, fetchProducts, getUniqueCategories } from '../../utils/database';
import { useCart } from '@/context/CartContext';

export default function ProductList() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const cats = await getUniqueCategories();
        setCategories(['all', ...cats.filter(cat => cat !== 'all')]);
        const prods = await fetchProducts();
        setProducts(prods.data || []);
      } catch (error) {
        console.error('Error loading products:', error);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setShowToast(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <FadeIn direction="up" delay={0.2} className="flex justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              selectedCategory === category
                ? "bg-primary text-white"
                : "bg-secondary text-white hover:bg-secondary/90"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </FadeIn>

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-64 w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                unoptimized={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-secondary">
                  {product.name}
                </h3>
                <span className="text-primary font-bold">
                  IDR.{product.price}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-gray-500 text-sm">
                Stock: {product.quantity} 
              </p>
              <button 
                className={`w-full py-2 rounded-lg transition-colors duration-300 ${
                  product.quantity > 0 
                    ? 'bg-primary text-white hover:bg-primary-dark' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={() => product.quantity > 0 && handleAddToCart(product)}
                disabled={product.quantity === 0}
              >
                {product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        ))}
      </StaggerChildren>
      {showToast && (
        <Toast
          message="Added to cart successfully!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}
