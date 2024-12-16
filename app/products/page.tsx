import Image from 'next/image';
import FadeIn from '@/components/animations/FadeIn';
import StaggerChildren from '@/components/animations/StaggerChildren';
import { fetchProducts } from '@/config/database';
import ProductList from '@/components/card/ProductCard';

export default async function ProductsPage() {
  const productsResponse = await fetchProducts();
  const products = productsResponse.success ? productsResponse.data : [];

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop"
            alt="Eco-Friendly Products Banner"
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="container relative z-10 text-white mx-auto px-4">
          <FadeIn>
            <h1 className="text-5xl text-primary font-bold mb-6">Eco-Friendly Products</h1>
            <p className="text-xl text-primary md:text-2xl max-w-2xl">
              Make a positive impact on the environment with our carefully selected sustainable products.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ProductList />
        </div>
      </section>
    </main>
  );
}