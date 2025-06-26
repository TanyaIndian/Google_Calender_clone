// main.jsx
// This is the entry point for the React application. It renders the App component into the root DOM node.

import { createRoot } from 'react-dom/client'; // React 18+ root API
import App from './App.jsx'; // Main App component
import './index.css'; // Global styles

// Find the root DOM node and render the App component into it
createRoot(document.getElementById('root')).render(<App />); 