// CalendarApp.jsx
// This file contains the main calendar application layout and logic, including sidebar, header, and view switching.

import React, { useState } from 'react';
import { CalendarProvider, useCalendar } from '../context/CalendarContext'; // Context for calendar state
import { ThemeProvider } from './hooks/useTheme'; // Provides theme (light/dark) context
import CalendarHeader from './Calendar/CalendarHeader'; // Header with navigation and controls
import CalendarSidebar from './Calendar/CalendarSidebar'; // Sidebar with mini calendar and event list
import MonthView from './Calendar/MonthView'; // Month view component
import WeekView from './Calendar/WeekView'; // Week view component
import DayView from './Calendar/DayView'; // Day view component
import EventModal from './Events/EventModal'; // Modal for creating/editing events

// CalendarContent handles the main layout and view switching
const CalendarContent = () => {
  const { state } = useCalendar(); // Access calendar state from context
  const { view } = state; // Current calendar view (month, week, day)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar open state for mobile

  // Renders the appropriate calendar view based on current state
  const renderView = () => {
    switch (view) {
      case 'month':
        return <MonthView />;
      case 'week':
        return <WeekView />;
      case 'day':
        return <DayView />;
      default:
        return <MonthView />;
    }
  };

  // Toggles the sidebar open/close state (for mobile)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-900 font-google-sans overflow-hidden">
      {/* Sidebar: always visible on desktop, fixed */}
      <div className="hidden lg:block fixed left-0 top-0 h-screen w-80 z-30 bg-white dark:bg-gray-900 border-r border-google-border dark:border-gray-700">
        <CalendarSidebar />
      </div>

      {/* Mobile Sidebar Overlay: appears when sidebar is open on small screens */}
      {isSidebarOpen && (
        <>
          {/* Overlay background to close sidebar when clicked */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={toggleSidebar}
          />
          {/* Sidebar drawer for mobile */}
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden w-80">
            <CalendarSidebar />
          </div>
        </>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-80">
        {/* Calendar header with navigation and controls */}
        <CalendarHeader
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        {/* Calendar view (month, week, day) */}
        <div className="flex-1 overflow-auto bg-white dark:bg-gray-900">
          {renderView()}
        </div>
      </div>

      {/* Modal for creating/editing events */}
      <EventModal />
    </div>
  );
};

// CalendarApp wraps the content in theme and calendar providers
const CalendarApp = () => {
  return (
    <ThemeProvider>
      <CalendarProvider>
        <CalendarContent />
      </CalendarProvider>
    </ThemeProvider>
  );
};

export default CalendarApp; 