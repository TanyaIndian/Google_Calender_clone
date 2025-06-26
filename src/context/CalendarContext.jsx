// CalendarContext.jsx
// This file provides global state management for the calendar app using React Context and useReducer.

import React, { createContext, useContext, useReducer } from 'react';
import { getRandomEventColor, generateEventId } from '../utils/eventUtils'; // Utility functions for events

// Initial state for the calendar context
const initialState = {
  currentDate: new Date(), // The currently selected date
  view: 'month', // Current calendar view (month, week, day)
  events: [
    // Example events for demonstration
    {
      id: '1',
      title: 'Team Meeting',
      startDate: new Date(2025, 5, 25, 10, 0),
      endDate: new Date(2025, 5, 25, 11, 0),
      description: 'Weekly team sync',
      color: '#1a73e8',
    },
    {
      id: '2',
      title: 'Project Review',
      startDate: new Date(2025, 5, 27, 14, 0),
      endDate: new Date(2025, 5, 27, 15, 30),
      description: 'Quarterly project review meeting',
      color: '#d93025',
    },
  ],
  selectedEvent: null, // Currently selected event (for editing/viewing)
  isEventModalOpen: false, // Controls visibility of the event modal
};

// Reducer function to handle state transitions based on dispatched actions
const calendarReducer = (state, action) => {
  switch (action.type) {
    case 'SET_VIEW':
      // Change the current calendar view (month/week/day)
      return { ...state, view: action.payload };

    case 'SET_DATE':
      // Set the current date
      return { ...state, currentDate: action.payload };

    case 'ADD_EVENT':
      // Add a new event to the calendar
      const newEvent = {
        ...action.payload,
        id: generateEventId(), // Generate a unique ID
        color: getRandomEventColor(), // Assign a random color
      };
      return {
        ...state,
        events: [...state.events, newEvent],
        isEventModalOpen: false, // Close modal after adding
      };

    case 'UPDATE_EVENT':
      // Update an existing event
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ),
        selectedEvent: null,
        isEventModalOpen: false,
      };

    case 'DELETE_EVENT':
      // Remove an event by ID
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload),
        selectedEvent: null,
        isEventModalOpen: false,
      };

    case 'SELECT_EVENT':
      // Select an event for viewing/editing
      return { ...state, selectedEvent: action.payload };

    case 'TOGGLE_EVENT_MODAL':
      // Open or close the event modal
      return {
        ...state,
        isEventModalOpen: action.payload,
        selectedEvent: action.payload ? state.selectedEvent : null,
      };

    case 'NAVIGATE':
      // Navigate to next/previous period or today
      if (action.payload === 'today') {
        return { ...state, currentDate: new Date() };
      }

      let newDate = new Date(state.currentDate);
      switch (state.view) {
        case 'month':
          newDate.setMonth(
            newDate.getMonth() + (action.payload === 'next' ? 1 : -1)
          );
          break;
        case 'week':
          newDate.setDate(
            newDate.getDate() + (action.payload === 'next' ? 7 : -7)
          );
          break;
        case 'day':
          newDate.setDate(
            newDate.getDate() + (action.payload === 'next' ? 1 : -1)
          );
          break;
      }
      return { ...state, currentDate: newDate };

    default:
      // Return current state for unknown actions
      return state;
  }
};

// Create the context object
const CalendarContext = createContext(null);

// Provider component to wrap the app and provide calendar state
export const CalendarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(calendarReducer, initialState);

  return (
    <CalendarContext.Provider value={{ state, dispatch }}>
      {children}
    </CalendarContext.Provider>
  );
};

// Custom hook to use the calendar context
export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within CalendarProvider');
  }
  return context;
}; 