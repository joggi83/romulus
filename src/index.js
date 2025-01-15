// src/index.js
import OrangeHelpSearch from './components/OrangeHelpSearch';

// Export pour webpack/bundler
export default OrangeHelpSearch;

// Export pour utilisation directe via CDN
if (typeof window !== 'undefined') {
  window.OrangeHelpSearch = OrangeHelpSearch;
}
