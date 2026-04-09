import React from 'react';
import { Search, Filter, DollarSign } from 'lucide-react';

const FilterForm = ({ filters, setFilters, onSearch }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="glass p-6 mb-8 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <label className="text-sm font-medium text-white/70 mb-1.5 block">Search Product</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              name="q"
              value={filters.q}
              onChange={handleChange}
              placeholder="e.g. Ergonomic Chair"
              className="input-field pl-10"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-white/70 mb-1.5 block">Category</label>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 z-10 pointer-events-none" />
            <select
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="input-field pl-10 appearance-none bg-background/50"
            >
              <option value="All">All Categories</option>
              <option value="Furniture">Furniture</option>
              <option value="Electronics">Electronics</option>
              <option value="Stationery">Stationery</option>
              <option value="Clothing">Clothing</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-white/70 mb-1.5 block">Min Price</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="input-field pl-10"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-white/70 mb-1.5 block">Max Price</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              placeholder="1000.00"
              min="0"
              step="0.01"
              className="input-field pl-10"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button type="submit" className="btn-primary flex items-center gap-2">
          <Search className="w-5 h-5" />
          Search Inventory
        </button>
      </div>
    </form>
  );
};

export default FilterForm;
