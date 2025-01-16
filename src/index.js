import React from 'react';
import OrangeHelpSearch from './components/OrangeHelpSearch';

// Pour s'assurer que le composant est correctement exporté pour l'utilisation CDN
const Component = OrangeHelpSearch;
export default Component;

// Export explicite pour l'utilisation via CDN
if (typeof window !== 'undefined') {
  window.OrangeHelpSearch = Component;
}
