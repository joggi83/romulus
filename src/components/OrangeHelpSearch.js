import React, { useState, useRef, useEffect } from 'react';

const OrangeHelpSearch = ({ searchEndpoint }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const [currentResponse, setCurrentResponse] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentResponse]);

  const handleSearch = async () => {
    if (!query.trim() || loading) return;
    
    setLoading(true);
    setError(null);
    
    // Ajouter le message de l'utilisateur
    const userMessage = { type: 'user', content: query };
    setMessages(prev => [...prev, userMessage]);
    
    // Mettre à jour l'historique du chat
    const updatedHistory = [...chatHistory, { role: 'user', content: query }];
    setChatHistory(updatedHistory);
    
    setQuery('');

    try {
      const response = await fetch(searchEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query,
          history: updatedHistory
        })
      });

      if (!response.ok) {
        throw new Error('Erreur réseau');
      }

      const data = await response.json();
      
      // Gestion de la réponse de l'agent
      const answer = data.results[0].content;
      let displayedResponse = '';
      setCurrentResponse('');
      
      // Animation de la réponse
      for (let i = 0; i < answer.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 20));
        displayedResponse += answer[i];
        setCurrentResponse(displayedResponse);
      }
      
      // Ajouter la réponse aux messages
      const assistantMessage = { type: 'assistant', content: answer };
      setMessages(prev => [...prev, assistantMessage]);
      setChatHistory(prev => [...prev, { role: 'assistant', content: answer }]);
      setCurrentResponse('');
      
    } catch (error) {
      console.error('Error:', error);
      setError('Une erreur est survenue lors de la communication avec l\'assistant');
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
    <div className="max-w-4xl mx-auto p-4">
      {/* Zone des messages */}
      <div className="mb-4 min-h-[200px] max-h-[500px] overflow-y-auto bg-black bg-opacity-50 rounded-lg p-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
              message.type === 'user' 
                ? 'bg-orange-500 text-white' 
                : 'bg-white bg-opacity-10 text-white'
            }`}>
              {message.content}
            </div>
          </div>
        ))}
        {currentResponse && (
          <div className="text-left">
            <div className="inline-block p-3 rounded-lg max-w-[80%] bg-white bg-opacity-10 text-white">
              {currentResponse}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Zone de saisie */}
      <div className="relative flex items-center">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Comment pouvons-nous vous aider ?"
          className="w-full p-4 pr-12 text-lg border rounded-lg bg-black bg-opacity-50 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:border-orange-500 resize-none"
          rows="1"
          style={{ minHeight: '60px' }}
        />
        <button
          onClick={handleSearch}
          className="absolute right-4 text-white hover:text-orange-500 transition-colors"
          disabled={loading}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          ) : (
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          )}
        </button>
      </div>

      {error && (
        <div className="mt-2 text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default OrangeHelpSearch;
