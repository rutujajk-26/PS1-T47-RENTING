import React, { useState, useEffect } from 'react';
import { Calendar, X } from 'lucide-react';

interface FilterSidebarProps {
  filters: {
    priceRange: [number, number];
    categories: string[];
    condition: string[];
    availability: Date | null;
  };
  applyFilters: (filters: FilterSidebarProps['filters']) => void;
  clearFilters: () => void;
}

const FilterSidebar = ({ filters, applyFilters, clearFilters }: FilterSidebarProps) => {
  const [localFilters, setLocalFilters] = useState(filters);
  
  // Categories available for filtering
  const categories = [
    'Tools', 'Electronics', 'Kitchen', 'Outdoor', 'Party', 'Sports', 'Travel', 'Books'
  ];
  
  // Condition options
  const conditions = ['Like New', 'Good', 'Fair'];
  
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = parseInt(e.target.value);
    const newRange = [...localFilters.priceRange] as [number, number];
    newRange[index] = newValue;
    setLocalFilters({ ...localFilters, priceRange: newRange });
  };
  
  const handleCategoryChange = (category: string) => {
    const updatedCategories = localFilters.categories.includes(category)
      ? localFilters.categories.filter(c => c !== category)
      : [...localFilters.categories, category];
    
    setLocalFilters({ ...localFilters, categories: updatedCategories });
  };
  
  const handleConditionChange = (condition: string) => {
    const updatedConditions = localFilters.condition.includes(condition)
      ? localFilters.condition.filter(c => c !== condition)
      : [...localFilters.condition, condition];
    
    setLocalFilters({ ...localFilters, condition: updatedConditions });
  };
  
  const handleApplyFilters = () => {
    applyFilters(localFilters);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Price Range (₹/day)</h3>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <input
              type="number"
              min="0"
              max={localFilters.priceRange[1]}
              value={localFilters.priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              className="w-24 input py-1 text-sm"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              min={localFilters.priceRange[0]}
              value={localFilters.priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
              className="w-24 input py-1 text-sm"
            />
          </div>
          
          <div className="px-1">
            <input
              type="range"
              min="0"
              max="5000"
              value={localFilters.priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              className="w-full"
            />
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={localFilters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500"
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-3">Condition</h3>
        <div className="space-y-2">
          {conditions.map(condition => (
            <label key={condition} className="flex items-center">
              <input
                type="checkbox"
                checked={localFilters.condition.includes(condition)}
                onChange={() => handleConditionChange(condition)}
                className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500"
              />
              <span>{condition}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-3">Availability</h3>
        <button className="btn btn-outline w-full flex items-center justify-center">
          <Calendar size={18} className="mr-2" />
          <span>Select Dates</span>
        </button>
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={handleApplyFilters}
          className="btn btn-primary flex-1"
        >
          Apply Filters
        </button>
        <button
          onClick={clearFilters}
          className="btn btn-outline"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;