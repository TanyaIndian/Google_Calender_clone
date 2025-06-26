// App.jsx
// This is the main application component that sets up global providers and routing for the app.

import { Toaster } from '@/components/ui/toaster.jsx'; // Custom toast notification provider
import { Toaster as Sonner } from '@/components/ui/sonner.jsx'; // Another toast notification provider (Sonner)
import { TooltipProvider } from '@/components/ui/tooltip'; // Provides tooltip context to the app
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // React Query for data fetching and caching
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // React Router for client-side routing
import Index from './pages/Index'; // Home page
import NotFound from './pages/NotFound'; // 404 page

// Create a QueryClient instance for React Query
const queryClient = new QueryClient();

// The main App component wraps the app in all necessary providers
const App = () => (
  // Provides React Query context to the app
  <QueryClientProvider client={queryClient}>
    {/* Provides tooltip context to all children */}
    <TooltipProvider>
      {/* Custom toast notification system */}
      <Toaster />
      {/* Sonner toast notification system */}
      <Sonner />
      {/* Sets up client-side routing */}
      <BrowserRouter>
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Index />} />
          {/* Catch-all route for 404 Not Found */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App; 