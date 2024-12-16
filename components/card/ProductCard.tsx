'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import FadeIn from '@/components/animations/FadeIn';
import StaggerChildren from '@/components/animations/StaggerChildren';
import { Product, fetchProducts } from '../../config/database';

const categories = ["all", "Lifestyle", "Kitchen", "Bags"] as const;

export default function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const result = await fetchProducts();
        if (result.success) {
          setProducts(result.data);
        } else {
          setError('Failed to load products');
        }
      } catch (err) {
        setError('Error loading products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase());

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-red-500">{error}</p>
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
                  ${product.price}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-sm text-gray-500 mb-4">
                Stock: {product.quantity} units
              </p>
              <button 
                className={`w-full py-2 rounded-lg transition-colors duration-300 ${
                  product.quantity > 0 
                    ? "bg-primary text-white hover:bg-primary/90" 
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={product.quantity === 0}
              >
                {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        ))}
      </StaggerChildren>
    </>
  );
}
