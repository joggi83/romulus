import React, { useState, useRef, useEffect } from 'react';

const OrangeHelpSearch = ({ searchEndpoint }) => {
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSearch = async () => {
    if (!query.trim() || loading) return;
    
    setError(null);
    setLoading(true);
    
    try {
      const response = await fetch(searchEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          history: chatHistory.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Erreur de communication avec le service');
      }

      const data = await response.json();
      
      setChatHistory(prev => [
        ...prev,
        { role: 'user', content: query },
        { role: 'assistant', content: data.results[0].content }
      ]);
      
      setQuery('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div>
      {/* Zone de recherche avec image de fond */}
      <div 
        className="p-12 bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: 'url("https://cdn.prod.website-files.com/67640e44deef7bb709db19df/67854c8fd33580f69ddc00a2_4133170.jpg")',
          minHeight: '300px'
        }}
      >
        <h2 className="text-4xl font-bold text-white mb-8">
          Vous avez besoin d'aide ?
        </h2>
        <div className="relative max-w-4xl mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Posez votre question..."
            className="w-full p-4 pr-12 rounded-lg bg-black bg-opacity-50 text-white placeholder-white border border-white focus:outline-none focus:border-orange-500"
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? "..." : "Chercher"}
          </button>
        </div>
      </div>

      {/* Zone de chat */}
      {chatHistory.length > 0 && (
        <div className="max-w-4xl mx-auto mt-6 p-6 bg-black bg-opacity-90">
          <div className="space-y-6">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3/4 p-4 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-orange-500 text-white'
                      : 'bg-opacity-10 bg-white text-white'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Zone de saisie */}
          <div className="mt-6">
            <div className="relative">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                className="w-full p-4 pr-12 rounded-lg bg-black bg-opacity-50 text-white placeholder-white border border-white focus:outline-none focus:border-orange-500 resize-none"
                rows="2"
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="absolute right-3 bottom-3 px-4 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
              >
                {loading ? "..." : "Envoyer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message d'erreur */}
      {error && (
        <div className="max-w-4xl mx-auto mt-4 p-4 bg-red-500 text-white rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default OrangeHelpSearch;
