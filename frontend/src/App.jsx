import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterForm from './components/FilterForm';
import ProductCard from './components/ProductCard';
import Spinner from './components/Spinner';
import { Database, AlertCircle, Search } from 'lucide-react';

function App() {
  const [filters, setFilters] = useState({
    q: '',
    category: 'All',
    minPrice: '',
    maxPrice: ''
  });
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchResults = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.q) params.append('q', filters.q);
      if (filters.category && filters.category !== 'All') params.append('category', filters.category);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

      // Using the local backend port 5000, modify in production
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${API_URL}/search?${params.toString()}`);
      setResults(response.data);
    } catch (err) {
      console.error("Search error:", err);
      setError(err.response?.data?.message || 'Failed to fetch inventory.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial all items
  useEffect(() => {
    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-primary/20 rounded-full mb-4 ring-1 ring-primary/50">
          <Database className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Zeerostock <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Inventory</span>
        </h1>
        <p className="text-white/60 max-w-2xl mx-auto text-lg">
          Search surplus inventory across multiple suppliers with advanced filtering.
        </p>
      </header>

      <FilterForm 
        filters={filters} 
        setFilters={setFilters} 
        onSearch={fetchResults} 
      />

      <main>
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            Results <span className="text-sm font-medium bg-white/10 px-2 py-0.5 rounded-full">{results.length}</span>
          </h2>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl flex items-center gap-3 mb-6">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <Spinner />
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map(product => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="glass py-16 text-center border-dashed border-white/20 border-2">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-white/30" />
            </div>
            <h3 className="text-xl font-bold mb-2">No results found</h3>
            <p className="text-white/50 max-w-md mx-auto">
              Sorry, we couldn't find any products matching your criteria. Try adjusting your filters or search term.
            </p>
            <button 
              onClick={() => {
                setFilters({q: '', category: 'All', minPrice: '', maxPrice: ''});
                // Note: The click doesn't auto submit here immediately because state updates async,
                // but just clearing the form is good UX.
              }}
              className="mt-6 text-primary hover:text-white transition-colors underline underline-offset-4"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
