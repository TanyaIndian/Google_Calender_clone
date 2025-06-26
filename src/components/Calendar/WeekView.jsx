// WeekView.jsx
// This component renders the week view of the calendar, showing all days in the week and their events by hour.

import React, { useEffect, useRef } from 'react';
import { useCalendar } from '../../context/CalendarContext';
import {
  formatDate,
  getWeekDays,
  getEventsForDate,
} from '../../utils/dateUtils';
import EventBlock from '../Events/EventBlock';

const WeekView = () => {
  const { state, dispatch } = useCalendar();
  const { currentDate, events } = state;
  const scrollContainerRef = useRef(null);

  const weekDays = getWeekDays(currentDate); // All days in the current week
  const hours = Array.from({ length: 24 }, (_, i) => i); // 0-23 hours
  const hourHeight = 48; // 48px per hour

  // Scroll to 8 AM on mount and when view changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollTo = 8 * hourHeight; // 8 AM
      scrollContainerRef.current.scrollTo({
        top: scrollTo,
        behavior: 'smooth',
      });
    }
  }, [currentDate]);

  // Get all events for a specific day
  const getEventsForDay = (date) => {
    return events.filter(
      (event) => event.startDate.toDateString() === date.toDateString()
    );
  };

  // Handle clicking a time slot to create a new event
  const handleTimeSlotClick = (date, hour) => {
    const clickDate = new Date(date);
    clickDate.setHours(hour, 0, 0, 0);

    dispatch({ type: 'SET_DATE', payload: clickDate });
    dispatch({ type: 'SELECT_EVENT', payload: null });
    dispatch({ type: 'TOGGLE_EVENT_MODAL', payload: true });
  };

  // Check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="flex-1 bg-white dark:bg-gray-900 overflow-hidden font-google-sans flex flex-col h-full">
      {/* Fixed Header with days - Horizontally scrollable on mobile */}
      <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-google-border dark:border-gray-700 z-20 overflow-x-auto">
        <div className="flex min-w-[600px] sm:min-w-[800px]">
          <div className="w-16 sm:w-20 p-2 sm:p-4 flex-shrink-0"></div>
          {weekDays.map((date) => (
            <div
              key={date.toISOString()}
              className="flex-1 min-w-[80px] sm:min-w-[100px] p-2 sm:p-4 text-center border-l border-google-border dark:border-gray-700"
            >
              <div className="text-xs text-google-text-secondary dark:text-gray-400 font-medium mb-1">
                {formatDate(date, 'EEE').toUpperCase()}
              </div>
              <div
                className={`text-lg sm:text-2xl font-normal ${
                  isToday(date)
                    ? 'bg-google-blue text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mx-auto'
                    : 'text-google-text-primary dark:text-white'
                }`}
              >
                {date.getDate()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable Time slots - Horizontally scrollable on mobile */}
      <div
        className="flex-1 overflow-y-auto overflow-x-auto scroll-smooth"
        ref={scrollContainerRef}
        style={{ height: 'calc(100vh - 112px)' }}
      >
        <div className="flex min-w-[600px] sm:min-w-[800px]">
          {/* Time column: shows hour labels */}
          <div className="w-16 sm:w-20 flex-shrink-0">
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-12 border-b border-google-border dark:border-gray-700 flex items-start justify-end pr-1 sm:pr-2 pt-1"
              >
                <span className="text-xs text-google-text-secondary dark:text-gray-400">
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

          {/* Days columns: clickable time slots and event blocks */}
          {weekDays.map((date) => {
            const dayEvents = getEventsForDay(date);

            return (
              <div
                key={date.toISOString()}
                className="flex-1 min-w-[80px] sm:min-w-[100px] border-l border-google-border dark:border-gray-700 relative"
              >
                {/* Time slots for clicking to create events */}
                {hours.map((hour) => (
                  <div
                    key={hour}
                    onClick={() => handleTimeSlotClick(date, hour)}
                    className="h-12 border-b border-google-border dark:border-gray-700 hover:bg-google-hover dark:hover:bg-gray-800 cursor-pointer"
                  />
                ))}

                {/* Events positioned absolutely over the time slots */}
                <div className="absolute inset-0 pointer-events-none px-1">
                  {dayEvents.map((event) => (
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeekView; 