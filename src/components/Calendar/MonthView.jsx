// MonthView.jsx
// This component renders the month view of the calendar, showing all days in the month and their events.

import React from 'react';
import { useCalendar } from '../../context/CalendarContext';
import {
  getMonthDays,
  isCurrentDay,
  isSameMonthAs,
  getEventsForDate,
  formatDate,
} from '../../utils/dateUtils';
import EventBlock from '../Events/EventBlock';

const MonthView = () => {
  const { state, dispatch } = useCalendar();
  const { currentDate, events } = state;

  const monthDays = getMonthDays(currentDate); // All days to display in the grid
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Handle clicking a date to create a new event
  const handleDateClick = (date) => {
    dispatch({ type: 'SET_DATE', payload: date });
    dispatch({ type: 'SELECT_EVENT', payload: null });
    dispatch({ type: 'TOGGLE_EVENT_MODAL', payload: true });
  };

  // Get all events for a specific date
  const getDateEvents = (date) => {
    return getEventsForDate(events, date);
  };

  return (
    <div className="flex-1 bg-white dark:bg-gray-900 font-google-sans">
      {/* Week Header: day names */}
      <div className="grid grid-cols-7 border-b border-google-border dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-10">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-4 text-xs font-medium text-google-text-secondary dark:text-gray-400 text-center border-r border-google-border dark:border-gray-700 last:border-r-0"
          >
            {day} 
          </div>
        ))}
      </div>

      {/* Calendar Grid: all days in the month (and overflow days) */}
      <div className="grid grid-cols-7 flex-1">
        {monthDays.map((date, index) => {
          const isToday = isCurrentDay(date);
          const isCurrentMonth = isSameMonthAs(date, currentDate);
          const dayEvents = getDateEvents(date);
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;

          return (
            <div
              key={index}
              onClick={() => handleDateClick(date)}
              className={`
                min-h-[120px] p-2 border-r border-b border-google-border dark:border-gray-700 last:border-r-0
                cursor-pointer hover:bg-google-hover dark:hover:bg-gray-800 transition-colors relative
                ${isWeekend ? 'bg-google-weekend dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}
                ${!isCurrentMonth ? 'bg-gray-50 dark:bg-gray-800 opacity-50' : ''}
              `}
            >
              {/* Date Number */}
              <div className="flex justify-start mb-1">
                <span
                  className={`
                    text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full
                    ${
                      isToday
                        ? 'bg-google-blue text-white'
                        : isCurrentMonth
                          ? 'text-google-text-primary dark:text-white'
                          : 'text-google-text-secondary dark:text-gray-400'
                    }
                  `}
                >
                  {date.getDate()}
                </span>
              </div>

              {/* Events for this day */}
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <EventBlock key={event.id} event={event} isCompact={true} />
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-google-text-secondary dark:text-gray-400 px-2">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView; 