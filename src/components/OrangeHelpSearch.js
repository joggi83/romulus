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

  const containerStyle = {
    backgroundImage: 'url("https://cdn.prod.website-files.com/67640e44deef7bb709db19df/67854c8fd33580f69ddc00a2_4133170.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '300px',
    width: '100%',
    margin: 0,
    padding: '48px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const searchContainerStyle = {
    maxWidth: '800px',
    width: '100%',
    margin: '0 auto'
  };

  const chatContainerStyle = {
    maxWidth: '800px',
    width: '100%',
    margin: '20px auto',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: '8px',
    padding: '20px'
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={containerStyle}>
        <div style={searchContainerStyle}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            Vous avez besoin d'aide ?
          </h2>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Posez votre question..."
              style={{
                width: '100%',
                padding: '16px',
                paddingRight: '120px',
                borderRadius: '8px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid white',
                color: 'white',
                fontSize: '16px'
              }}
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                padding: '8px 16px',
                backgroundColor: '#ff7900',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              {loading ? "..." : "Chercher"}
            </button>
          </div>
        </div>
      </div>

      {chatHistory.length > 0 && (
        <div style={chatContainerStyle}>
          <div style={{ marginBottom: '20px' }}>
            {chatHistory.map((message, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '16px',
                  textAlign: message.role === 'user' ? 'right' : 'left'
                }}
              >
                <div
                  style={{
                    display: 'inline-block',
                    maxWidth: '75%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    backgroundColor: message.role === 'user' ? '#ff7900' : 'rgba(255, 255, 255, 0.1)',
                    color: 'white'
                  }}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div style={{ position: 'relative', marginTop: '20px' }}>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tapez votre message..."
              style={{
                width: '100%',
                padding: '12px',
                paddingRight: '100px',
                borderRadius: '8px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid white',
                color: 'white',
                resize: 'none',
                minHeight: '60px'
              }}
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              style={{
                position: 'absolute',
                right: '8px',
                bottom: '8px',
                padding: '8px 16px',
                backgroundColor: '#ff7900',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              {loading ? "..." : "Envoyer"}
            </button>
          </div>
        </div>
      )}

      {error && (
        <div style={{
          maxWidth: '800px',
          margin: '20px auto',
          padding: '12px',
          backgroundColor: '#ff0000',
          color: 'white',
          borderRadius: '6px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default OrangeHelpSearch;
