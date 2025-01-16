const OrangeHelpSearch = ({ searchEndpoint }) => {
  const [query, setQuery] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    alert('Recherche de : ' + query); // Pour tester que ça marche
    setLoading(false);
  };

  return React.createElement('div', { className: 'relative' },
    React.createElement('input', {
      type: 'text',
      value: query,
      onChange: (e) => setQuery(e.target.value),
      placeholder: 'Posez votre question...',
      className: 'chat-input'
    }),
    React.createElement('button', {
      onClick: handleSearch,
      disabled: loading,
      className: 'chat-button'
    }, loading ? '...' : 'Chercher')
  );
};

if (typeof window !== 'undefined') {
  window.OrangeHelpSearch = OrangeHelpSearch;
}

export default OrangeHelpSearch;
