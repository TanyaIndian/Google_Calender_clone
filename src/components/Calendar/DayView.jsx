// DayView.jsx
// This component renders the day view of the calendar, showing 24 hours and events for the selected day.

import React, { useEffect, useRef } from 'react';
import { useCalendar } from '../../context/CalendarContext';
import { formatDate, getEventsForDate } from '../../utils/dateUtils';
import EventBlock from '../Events/EventBlock';

const DayView = () => {
  const { state, dispatch } = useCalendar();
  const { currentDate, events } = state;
  const scrollContainerRef = useRef(null);

  const hours = Array.from({ length: 24 }, (_, i) => i); // 0-23 hours
  const hourHeight = 64; // 64px per hour for day view

  // Scroll to 8 AM on mount and when date changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollTo = 8 * hourHeight; // 8 AM
      scrollContainerRef.current.scrollTo({
        top: scrollTo,
        behavior: 'smooth',
      });
    }
  }, [currentDate]);

  // Handle clicking a time slot to create a new event
  const handleTimeSlotClick = (hour) => {
    const clickDate = new Date(currentDate);
    clickDate.setHours(hour, 0, 0, 0);

    dispatch({ type: 'SET_DATE', payload: clickDate });
    dispatch({ type: 'SELECT_EVENT', payload: null });
    dispatch({ type: 'TOGGLE_EVENT_MODAL', payload: true });
  };

  // Get all events for the current day
  const getDayEvents = () => {
    return getEventsForDate(events, currentDate);
  };

  return (
    <div className="flex-1 bg-white dark:bg-gray-900 overflow-hidden font-google-sans flex flex-col h-full">
      {/* Scrollable Time slots */}
      <div
        className="flex-1 overflow-y-auto scroll-smooth"
        ref={scrollContainerRef}
        style={{ height: 'calc(100vh - 112px)' }}
      >
        <div className="flex">
          {/* Time column: shows hour labels */}
          <div className="w-20 flex-shrink-0">
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-16 border-b border-google-border dark:border-gray-700 flex items-start justify-end pr-4 pt-2"
              >
                <span className="text-sm text-google-text-secondary dark:text-gray-400">
                  {hour === 0
                    ? '12 AM'
                    : hour === 12
                      ? '12 PM'
                      : hour < 12
                        ? `${hour} AM`
                        : `${hour - 12} PM`}
                </span>
              </div>
            ))}
          </div>

          {/* Events column: clickable time slots and event blocks */}
          <div className="flex-1 border-l border-google-border dark:border-gray-700 relative">
            {/* Time slots for clicking to create events */}
            {hours.map((hour) => (
              <div
                key={hour}
                onClick={() => handleTimeSlotClick(hour)}
                className="h-16 border-b border-google-border dark:border-gray-700 hover:bg-google-hover dark:hover:bg-gray-800 cursor-pointer"
              />
            ))}

            {/* Events positioned absolutely over the time slots */}
            <div className="absolute inset-0 pointer-events-none">
              {getDayEvents().map((event) => (
                <div key={event.id} className="pointer-events-auto">
                  <EventBlock
                    event={event}
                    isCompact={false}
                    hourHeight={hourHeight}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayView; 