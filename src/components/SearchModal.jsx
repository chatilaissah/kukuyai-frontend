import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { useApp } from '../context/useApp';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const { state } = useApp();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle URL search params
  React.useEffect(() => { 
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    const category = params.get('category');
    
    if (search) {
      setSearchTerm(search);
    }
    if (category) {
      setSelectedCategory(category);
    }
  }, [location.search]);

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'eggs', label: 'Eggs' },
    { value: 'live-chickens', label: 'Live Chickens' },
    { value: 'meat', label: 'Chicken Meat' }
  ];

  const filteredProducts = state.products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h1>
          {searchTerm && (
            <p className="text-gray-600 mb-2">
              Search results for: <span className="font-semibold">"{searchTerm}"</span>
            </p>
          )}
          <p className="text-gray-600">
            Fresh, high-quality products directly from our farm
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-lg font-semibold">Filter by Category</h2>
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden flex items-center space-x-2 text-emerald-600"
            >
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>
          </div>

          <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.value
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-emerald-50 border'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm 
                ? `No products found for "${searchTerm}"` 
                : 'No products found in this category.'
              }
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;