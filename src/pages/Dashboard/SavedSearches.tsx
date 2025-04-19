import { Link } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';

interface SavedSearch {
  id: string;
  query: string;
  location: string;
  category: string;
}

const SavedSearches = () => {
  // Mock saved searches
  const savedSearches: SavedSearch[] = [
    {
      id: '1',
      query: 'Power tools',
      location: 'Bangalore',
      category: 'Tools'
    },
    {
      id: '2',
      query: 'DSLR camera',
      location: 'Mumbai',
      category: 'Electronics'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Saved Searches</h2>
      </div>
      
      {savedSearches.length > 0 ? (
        <div className="space-y-3">
          {savedSearches.map(search => (
            <Link 
              to={`/search?q=${encodeURIComponent(search.query)}&location=${encodeURIComponent(search.location)}`}
              key={search.id}
              className="block p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
            >
              <div className="flex items-center mb-1">
                <Search size={16} className="text-purple-600 mr-2" />
                <span className="font-medium">{search.query}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin size={14} className="mr-1" />
                <span>{search.location}</span>
                <span className="mx-2">•</span>
                <span>{search.category}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-4">
          <Search size={24} className="mx-auto mb-2 text-gray-400" />
          <p className="text-gray-500">No saved searches</p>
        </div>
      )}
    </div>
  );
};

export default SavedSearches;