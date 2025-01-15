import React, { useState, useEffect, useRef } from 'react';

const OrangeHelpSearch = ({ searchEndpoint, autocompleteEndpoint }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchSuggestions = async (input) => {
    console.log('Fetching suggestions for:', input);
    try {
      const response = await fetch(autocompleteEndpoint, {
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

      console.log('Autocomplete response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Suggestions received:', data);
      
      setSuggestions(data.suggestions || []);
      setShowSuggestions(true);
      setError(null);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setError('Erreur lors de la récupération des suggestions');
      setSuggestions([]);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    console.log('Performing search for:', query);
    setLoading(true);
    setSearchResults(null);
    setShowSuggestions(false);
    setError(null);

    try {
      const response = await fetch(searchEndpoint, {
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

      console.log('Search response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Search results:', data);
      setSearchResults(data);
      setError(null);
    } catch (error) {
      console.error('Error searching:', error);
      setError('Erreur lors de la recherche');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    console.log('Input changed:', value);
    setQuery(value);
    if (value.length >= 3) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    console.log('Suggestion clicked:', suggestion);
    setQuery(suggestion);
    setShowSuggestions(false);
    handleSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const SearchIcon = () => (
    <svg 
      className="w-5 h-5" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
      />
    </svg>
  );

  const CloseIcon = () => (
    <svg 
      className="w-5 h-5" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M6 18L18 6M6 6l12 12" 
      />
    </svg>
  );

  return (
    <div className="max-w-4xl mx-auto p-4" ref={searchRef}>
      <div className="relative">
        {/* Barre de recherche */}
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
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
              <CloseIcon />
            </button>
          )}
          <button
            onClick={handleSearch}
            className="absolute right-4 text-orange-500 hover:text-orange-600"
            disabled={loading}
          >
            <SearchIcon />
          </button>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div className="mt-2 text-red-500 text-sm">
            {error}
          </div>
        )}

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

      {/* État de chargement */}
      {loading && (
        <div className="mt-8 text-center text-gray-600">
          Recherche en cours...
        </div>
      )}

      {/* Résultats de recherche */}
      {searchResults && searchResults.results && searchResults.results.length > 0 ? (
        <div className="mt-8 space-y-6">
          {searchResults.results.map((result, index) => (
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
      ) : searchResults && !loading ? (
        <div className="mt-8 text-center text-gray-600">
          Aucun résultat trouvé pour votre recherche.
        </div>
      ) : null}
    </div>
  );
};

export default OrangeHelpSearch;
