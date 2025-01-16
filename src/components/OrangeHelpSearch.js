import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Loader } from 'lucide-react';

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
        { role: 'assistant', content: data.response }
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
    <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      {/* Barre de recherche initiale */}
      {chatHistory.length === 0 && (
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Comment pouvons-nous vous aider ?
          </h2>
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Posez votre question..."
              className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-500 hover:text-orange-600 disabled:opacity-50"
            >
              {loading ? <Loader className="animate-spin" /> : <Search />}
            </button>
          </div>
        </div>
      )}

      {/* Zone de chat */}
      {chatHistory.length > 0 && (
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-3/4 p-4 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Zone de saisie */}
          <div className="border-t p-4">
            <div className="relative">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                className="w-full p-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500 resize-none"
                rows="2"
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="absolute right-3 bottom-3 p-2 text-orange-500 hover:text-orange-600 disabled:opacity-50"
              >
                {loading ? <Loader className="animate-spin" /> : <Send />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message d'erreur */}
      {error && (
        <div className="p-4 mb-4 text-red-500 bg-red-50 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default OrangeHelpSearch;
