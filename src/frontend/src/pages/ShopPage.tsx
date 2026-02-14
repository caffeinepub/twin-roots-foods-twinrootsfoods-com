import { useState } from 'react';
import { useSearch } from '@tanstack/react-router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from '../components/ProductCard';
import { useProducts, useProductCategories } from '../hooks/useQueries';

export default function ShopPage() {
  const search = useSearch({ strict: false }) as { category?: string };
  const { data: products = [], isLoading } = useProducts();
  const { data: categories = [] } = useProductCategories();
  const [selectedCategory, setSelectedCategory] = useState(search.category || 'all');

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="container-custom py-12">
      <div className="mb-8">
        <h1 className="mb-2 font-display text-4xl font-bold">Shop Our Products</h1>
        <p className="text-lg text-muted-foreground">
          Browse our selection of premium spices, powders, and dry fruits
        </p>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
        <TabsList className="flex-wrap">
          <TabsTrigger value="all">All Products</TabsTrigger>
          {categories.map(category => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="py-12 text-center text-muted-foreground">Loading products...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">No products found</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} productId={index + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
