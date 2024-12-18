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
      <FadeIn direction="up" delay={0.2} className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2.5 rounded-full transition-all duration-300 text-sm font-medium ${
              selectedCategory === category
                ? "bg-primary text-white shadow-lg transform scale-105"
                : "bg-secondary/90 text-white hover:bg-secondary hover:shadow-md hover:scale-102"
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
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
          >
            <div className="relative h-64 w-full overflow-hidden rounded-t-xl">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                unoptimized={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-secondary line-clamp-2">
                  {product.name}
                </h3>
                <span className="text-primary font-bold whitespace-nowrap ml-4">
                  IDR {product.price.toLocaleString()}
                </span>
              </div>
              <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                {product.description}
              </p>
              <div className="mt-auto">
                <p className="text-gray-500 text-sm mb-3 flex items-center">
                  <span className={`w-2 h-2 rounded-full mr-2 ${
                    product.quantity > 0 ? 'bg-green-500' : 'bg-red-500'
                  }`}></span>
                  Stock: {product.quantity} items
                </p>
                <button 
                  className={`w-full py-3 rounded-lg transition-all duration-300 font-medium ${
                    product.quantity > 0 
                      ? 'bg-primary text-white hover:bg-primary-dark hover:shadow-md transform hover:scale-[1.02]' 
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={() => product.quantity > 0 && handleAddToCart(product)}
                  disabled={product.quantity === 0}
                >
                  {product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
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
