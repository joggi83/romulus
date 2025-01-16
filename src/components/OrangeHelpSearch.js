const React = window.React;
const { useState, useRef, useEffect } = React;

const OrangeHelpSearch = ({ searchEndpoint }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim() || loading) return;
    
    setLoading(true);
    setError(null);
    
    setMessages(prev => [...prev, { type: 'user', content: query }]);
    const userQuery = query;
    setQuery('');

    try {
      const response = await fetch(searchEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userQuery })
      });

      if (!response.ok) {
        throw new Error('Erreur réseau');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { type: 'assistant', content: data.results[0].content }]);
      
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
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
    padding: '48px 20px',
    marginBottom: messages.length ? '0' : '48px'
  };

  const searchBoxContainerStyle = {
    maxWidth: '800px',
    margin: '0 auto'
  };

  const inputContainerStyle = {
    position: 'relative',
    marginTop: '24px'
  };

  const inputStyle = {
    width: '100%',
    padding: '16px',
    paddingRight: '120px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    border: '1px solid white',
    borderRadius: '8px',
    color: 'white',
    fontSize: '16px'
  };

  const buttonStyle = {
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    padding: '8px 24px',
    backgroundColor: '#ff7900',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  };

  const chatContainerStyle = messages.length ? {
    maxWidth: '800px',
    margin: '24px auto',
    padding: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: '8px',
    color: 'white'
  } : {};

  return React.createElement('div', null,
    React.createElement('div', { style: containerStyle },
      React.createElement('div', { style: searchBoxContainerStyle },
        React.createElement('h2', {
          style: {
            fontSize: '2.5rem',
            color: 'white',
            textAlign: 'center',
            marginBottom: '24px',
            fontWeight: 'bold'
          }
        }, "Vous avez besoin d'aide ?"),
        React.createElement('div', { style: inputContainerStyle },
          React.createElement('input', {
            type: 'text',
            value: query,
            onChange: (e) => setQuery(e.target.value),
            onKeyPress: handleKeyPress,
            placeholder: 'Posez votre question...',
            style: inputStyle
          }),
          React.createElement('button', {
            onClick: handleSearch,
            disabled: loading,
            style: buttonStyle
          }, loading ? '...' : 'Chercher')
        )
      )
    ),
    messages.length > 0 && React.createElement('div', { style: chatContainerStyle },
      messages.map((msg, idx) =>
        React.createElement('div', {
          key: idx,
          style: {
            textAlign: msg.type === 'user' ? 'right' : 'left',
            marginBottom: '16px'
          }
        },
          React.createElement('div', {
            style: {
              display: 'inline-block',
              maxWidth: '75%',
              padding: '12px 16px',
              backgroundColor: msg.type === 'user' ? '#ff7900' : 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px'
            }
          }, msg.content)
        )
      )
    ),
    error && React.createElement('div', {
      style: {
        maxWidth: '800px',
        margin: '20px auto',
        padding: '12px',
        backgroundColor: '#ff0000',
        color: 'white',
        textAlign: 'center',
        borderRadius: '6px'
      }
    }, error)
  );
};

if (typeof window !== 'undefined') {
  window.OrangeHelpSearch = OrangeHelpSearch;
}

export default OrangeHelpSearch;
