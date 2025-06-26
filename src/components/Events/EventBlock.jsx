// EventBlock.jsx
// This component renders a single event block in the calendar views (month, week, day).

import React from 'react';
import { useCalendar } from '../../context/CalendarContext';
import { formatDate } from '../../utils/dateUtils';

const EventBlock = ({
  event,
  isCompact = false,
  style,
  hourHeight = 48,
}) => {
  const { dispatch } = useCalendar();

  // Handle clicking the event to open the modal for editing/viewing
  const handleEventClick = (e) => {
    e.stopPropagation();
    dispatch({ type: 'SELECT_EVENT', payload: event });
    dispatch({ type: 'TOGGLE_EVENT_MODAL', payload: true });
  };

  // Get the event's time range as a string
  const getEventTime = () => {
    return `${formatDate(event.startDate, 'HH:mm')} - ${formatDate(event.endDate, 'HH:mm')}`;
  };

  // Calculate the event's duration in hours
  const getDurationInHours = () => {
    const start = event.startDate.getTime();
    const end = event.endDate.getTime();
    return (end - start) / (1000 * 60 * 60); // Convert milliseconds to hours
  };

  // Calculate the height of the event block (for week/day views)
  const getEventHeight = () => {
    if (isCompact) return 'auto';
    const duration = getDurationInHours();
    return `${Math.max(duration * hourHeight, hourHeight * 0.5)}px`; // Minimum 30 minutes height
  };

  // Calculate the top position of the event block (for week/day views)
  const getTopPosition = () => {
    if (isCompact) return 0;
    const startHour = event.startDate.getHours();
    const startMinutes = event.startDate.getMinutes();
    return `${(startHour + startMinutes / 60) * hourHeight}px`;
  };

  return (
    <div
      onClick={handleEventClick}
      style={{
        backgroundColor: event.color,
        height: getEventHeight(),
        top: isCompact ? undefined : getTopPosition(),
        ...style,
      }}
      className={`
        text-white text-xs font-medium rounded-sm cursor-pointer
        hover:shadow-md transition-all duration-150
        border-l-4 border-l-white/20
        ${
          isCompact
            ? 'px-2 py-1 mb-1'
            : 'absolute left-1 right-1 z-10 px-2 py-1'
        }
      `}
    >
      {/* Event title */}
      <div className="font-medium truncate">{event.title}</div>
      {/* Event time (only in non-compact mode) */}
      {!isCompact && (
        <div className="text-xs opacity-90 mt-1">{getEventTime()}</div>
      )}
    </div>
  );
};

export default EventBlock; 