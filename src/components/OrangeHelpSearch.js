import React, { useState } from 'react';

const OrangeHelpSearch = ({ searchEndpoint, autocompleteEndpoint }) => {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(searchEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      
      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error('Search error:', error);
      setAnswer('Désolé, une erreur est survenue lors de la recherche.');
    }
    setLoading(false);
    setShowSuggestions(false);
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length >= 3) {
      try {
        const response = await fetch(autocompleteEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: value }),
        });
        
        const data = await response.json();
        setSuggestions(data.suggestions);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Autocomplete error:', error);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="brix---cta-section" style={{
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="brix---container-default-2 w-container">
        <div className="w-layout-grid brix---grid-cta-v4">
          <div className="brix---mg-bottom-24px">
            <div className="brix---color-neutral-100">
              <h2 className="brix---heading-h2-size-2">
                Vous avez besoin d'aide ?
              </h2>
            </div>
          </div>
          
          <div className="brix---mg-bottom-32px-2">
            <form onSubmit={handleSearch} className="brix---position-relative">
              <input
                type="text"
                className="brix---input-large-button-inside w-input"
                placeholder="Saisissez votre demande"
                value={query}
                onChange={handleInputChange}
                style={{
                  color: 'white',
                  caretColor: 'white'
                }}
              />
              <button 
                type="submit"
                className="brix---btn-primary-small-input w-button"
                disabled={loading}
              >
                {loading ? 'Recherche...' : 'Chercher'}
              </button>
              
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setQuery(suggestion);
                        setShowSuggestions(false);
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>
          
          {answer && (
            <div className="mt-6 p-4 bg-white rounded-lg shadow">
              <div className="prose max-w-none">
                {answer}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrangeHelpSearch;
