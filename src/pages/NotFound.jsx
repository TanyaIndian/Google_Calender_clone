// NotFound.jsx
// This component is rendered for any route that does not exist (404 page).

import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// NotFound component displays a 404 error message and logs the invalid route
const NotFound = () => {
  const location = useLocation(); // Get the current location object

  useEffect(() => {
    // Log the invalid route to the console for debugging
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound; 