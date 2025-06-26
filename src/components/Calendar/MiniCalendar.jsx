// MiniCalendar.jsx
// This component renders a small calendar for quick navigation in the sidebar.

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCalendar } from '../../context/CalendarContext';
import {
  getMonthDays,
  isCurrentDay,
  isSameMonthAs,
  formatDate,
} from '../../utils/dateUtils';
import { Button } from '@/components/ui/button';

const MiniCalendar = () => {
  const { state, dispatch } = useCalendar();
  const { currentDate } = state;
  const [selectedDate, setSelectedDate] = useState(null);

  const monthDays = getMonthDays(currentDate); // All days to display in the mini calendar
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Handle clicking a date in the mini calendar
  const handleDateClick = (date) => {
    dispatch({ type: 'SET_DATE', payload: date });
    setSelectedDate(date);
    console.log('Mini calendar date clicked, navigating to:', date);
  };

  // Navigate to previous month
  const handlePrevMonth = () => {
    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    dispatch({ type: 'SET_DATE', payload: prevMonth });
  };

  // Navigate to next month
  const handleNextMonth = () => {
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    dispatch({ type: 'SET_DATE', payload: nextMonth });
  };

  // Check if a date is selected in the mini calendar
  const isSelectedDate = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  // Check if a date is the current view date in the main calendar
  const isCurrentViewDate = (date) => {
    return date.toDateString() === currentDate.toDateString();
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-4">
      {/* Header: month and year, navigation buttons */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-google-text-primary dark:text-white">
          {formatDate(currentDate, 'MMMM yyyy')}
        </h3>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevMonth}
            className="h-6 w-6 p-0 hover:bg-google-hover dark:hover:bg-gray-800"
          >
            <ChevronLeft className="h-3 w-3 text-google-text-secondary dark:text-gray-400" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNextMonth}
            className="h-6 w-6 p-0 hover:bg-google-hover dark:hover:bg-gray-800"
          >
            <ChevronRight className="h-3 w-3 text-google-text-secondary dark:text-gray-400" />
          </Button>
        </div>
      </div>

      {/* Week headers: S, M, T, W, T, F, S */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="text-xs text-google-text-secondary dark:text-gray-400 text-center py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid: all days in the month (and overflow days) */}
      <div className="grid grid-cols-7 gap-1">
        {monthDays.map((date, index) => {
          const isToday = isCurrentDay(date);
          const isCurrentMonth = isSameMonthAs(date, currentDate);
          const isSelected = isSelectedDate(date);
          const isViewDate = isCurrentViewDate(date);

          return (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              className={`
                h-6 w-6 text-xs rounded hover:bg-google-hover dark:hover:bg-gray-800 transition-colors relative
                ${!isCurrentMonth ? 'text-google-text-secondary dark:text-gray-500 opacity-50' : 'text-google-text-primary dark:text-white'}
                ${isToday ? 'bg-google-blue text-white hover:bg-blue-700' : ''}
                ${isSelected && !isToday ? 'bg-blue-100 dark:bg-blue-900 text-google-blue dark:text-blue-300' : ''}
                ${isViewDate && !isToday && !isSelected ? 'ring-2 ring-google-blue ring-inset' : ''}
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MiniCalendar; 