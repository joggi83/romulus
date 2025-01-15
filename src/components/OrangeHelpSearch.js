import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

const OrangeHelpSearch = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    // Gestionnaire de clic en dehors pour fermer les suggestions
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchSuggestions = async (input) => {
    try {
      const response = await fetch('https://europe-west1-romulus-441319.cloudfunctions.net/getAutocompleteSuggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: input,
          projectId: 'romulus-441319',
          location: 'europe-west1',
          indexId: 'orange-help-index'
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setSuggestions(data.suggestions || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setSearchResults(null);
    setShowSuggestions(false);

    try {
      const response = await fetch('https://europe-west1-romulus-441319.cloudfunctions.net/searchVertexAI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          projectId: 'romulus-441319',
          location: 'europe-west1',
          indexId: 'orange-help-index'
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length >= 3) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    // Déclencher la recherche avec la suggestion
    handleSearch();
  };

  return (
    <div className="max-w-4xl mx-auto p-4" ref={searchRef}>
      <div className="relative">
        {/* Barre de recherche */}
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Comment pouvons-nous vous aider ?"
            className="w-full p-4 pr-12 text-lg border rounded-lg focus:outline-none focus:border-orange-500"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSuggestions([]);
                setSearchResults(null);
              }}
              className="absolute right-14 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
          <button
            onClick={handleSearch}
            className="absolute right-4 text-orange-500 hover:text-orange-600"
            disabled={loading}
          >
            <Search size={20} />
          </button>
        </div>

        {/* Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-3 hover:bg-gray-100 cursor-pointer"
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Résultats de recherche */}
      {loading && (
        <div className="mt-8 text-center text-gray-600">
          Recherche en cours...
        </div>
      )}

      {searchResults && (
        <div className="mt-8 space-y-6">
          {searchResults.results?.map((result, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {result.title}
              </h3>
              <p className="text-gray-600 mb-4">{result.content}</p>
              {result.imageUrl && (
                <img 
                  src={result.imageUrl} 
                  alt={result.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
              {result.link && (
                <a 
                  href={result.link}
                  className="inline-block mt-4 text-orange-500 hover:text-orange-600"
                >
                  En savoir plus →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrangeHelpSearch;
