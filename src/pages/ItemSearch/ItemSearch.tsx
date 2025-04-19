import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter, Map, Grid, List, Search as SearchIcon, Sliders, X } from 'lucide-react';
import { mockItems } from '../../data/mockData';
import { Item } from '../../types';
import ItemCard from './ItemCard';
import ItemListView from './ItemListView';
import FilterSidebar from './FilterSidebar';
import MapView from './MapView';

const ItemSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useState(() => new URLSearchParams(location.search));
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [locationQuery, setLocationQuery] = useState(searchParams.get('location') || '');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    priceRange: [0, 5000],
    categories: [] as string[],
    condition: [] as string[],
    availability: null as Date | null
  });

  useEffect(() => {
    // Simulate API fetch
    setItems(mockItems);
    
    // Apply initial filters
    const filtered = mockItems.filter(item => {
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (locationQuery && !item.location.toLowerCase().includes(locationQuery.toLowerCase())) {
        return false;
      }
      return true;
    });
    
    setFilteredItems(filtered);
  }, [searchQuery, locationQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL with search params
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (locationQuery) params.set('location', locationQuery);
    
    navigate(`/search?${params.toString()}`);
    
    // Filter items
    const filtered = items.filter(item => {
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (locationQuery && !item.location.toLowerCase().includes(locationQuery.toLowerCase())) {
        return false;
      }
      return true;
    });
    
    setFilteredItems(filtered);
  };

  const applyFilters = (filters: typeof activeFilters) => {
    setActiveFilters(filters);
    
    const filtered = items.filter(item => {
      // Apply price filter
      if (item.price < filters.priceRange[0] || item.price > filters.priceRange[1]) {
        return false;
      }
      
      // Apply category filter
      if (filters.categories.length > 0 && !filters.categories.includes(item.category)) {
        return false;
      }
      
      // Apply condition filter
      if (filters.condition.length > 0 && !filters.condition.includes(item.condition)) {
        return false;
      }
      
      // Apply search query
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Apply location
      if (locationQuery && !item.location.toLowerCase().includes(locationQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    });
    
    setFilteredItems(filtered);
  };

  const clearFilters = () => {
    setActiveFilters({
      priceRange: [0, 5000],
      categories: [],
      condition: [],
      availability: null
    });
    
    const filtered = items.filter(item => {
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (locationQuery && !item.location.toLowerCase().includes(locationQuery.toLowerCase())) {
        return false;
      }
      return true;
    });
    
    setFilteredItems(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto animate-slide-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Find Items to Rent</h1>
        <p className="text-gray-600">Browse items available for rent in your area.</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="What do you want to borrow?"
              className="input pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon size={18} className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Location"
              className="input pl-10"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
            />
            <Map size={18} className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button type="submit" className="btn btn-primary sm:w-auto">
            Search
          </button>
        </form>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <FilterSidebar 
            filters={activeFilters} 
            applyFilters={applyFilters} 
            clearFilters={clearFilters} 
          />
        </div>
        
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center">
                <button 
                  onClick={() => setShowFilters(true)}
                  className="mr-3 flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 md:hidden"
                >
                  <Filter size={18} className="mr-1" />
                  <span>Filters</span>
                </button>
                <p className="text-gray-600 text-sm">
                  Showing <span className="font-medium">{filteredItems.length}</span> results
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="bg-gray-100 rounded-md p-1 flex">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                    aria-label="Grid view"
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                    aria-label="List view"
                  >
                    <List size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`p-1.5 rounded ${viewMode === 'map' ? 'bg-white shadow-sm' : ''}`}
                    aria-label="Map view"
                  >
                    <Map size={18} />
                  </button>
                </div>
                
                <select className="input py-1.5 text-sm" defaultValue="relevance">
                  <option value="relevance">Sort by: Relevance</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="distance">Distance</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
            
            {/* Active filters */}
            {(activeFilters.categories.length > 0 || activeFilters.condition.length > 0) && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {activeFilters.categories.map(category => (
                  <span key={category} className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-sm">
                    {category}
                    <button 
                      onClick={() => {
                        setActiveFilters({
                          ...activeFilters,
                          categories: activeFilters.categories.filter(c => c !== category)
                        });
                        applyFilters({
                          ...activeFilters,
                          categories: activeFilters.categories.filter(c => c !== category)
                        });
                      }}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
                {activeFilters.condition.map(condition => (
                  <span key={condition} className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-sm">
                    {condition}
                    <button 
                      onClick={() => {
                        setActiveFilters({
                          ...activeFilters,
                          condition: activeFilters.condition.filter(c => c !== condition)
                        });
                        applyFilters({
                          ...activeFilters,
                          condition: activeFilters.condition.filter(c => c !== condition)
                        });
                      }}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
                <button
                  onClick={clearFilters}
                  className="text-sm text-teal-600 hover:text-teal-700 hover:underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
          
          {viewMode === 'map' ? (
            <MapView items={filteredItems} />
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <ItemCard key={item.id} item={item} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <SearchIcon size={40} className="mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-700 mb-1">No items found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                  <button onClick={clearFilters} className="btn btn-outline">
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <ItemListView key={item.id} item={item} />
                ))
              ) : (
                <div className="text-center py-12">
                  <SearchIcon size={40} className="mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-700 mb-1">No items found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                  <button onClick={clearFilters} className="btn btn-outline">
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile filter sidebar */}
      {showFilters && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setShowFilters(false)}></div>
          <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-xl z-50 md:hidden overflow-y-auto animate-slide-in">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Filters</h2>
                <button onClick={() => setShowFilters(false)} className="text-gray-500">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <FilterSidebar 
                filters={activeFilters} 
                applyFilters={(filters) => {
                  applyFilters(filters);
                  setShowFilters(false);
                }}
                clearFilters={() => {
                  clearFilters();
                  setShowFilters(false);
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ItemSearch;