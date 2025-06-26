import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  addDays,
  addWeeks,
  addMonths,
  isSameDay,
  isSameMonth,
  isToday,
  startOfDay,
  endOfDay,
  addHours,
  getHours,
  setHours,
  setMinutes,
  isWithinInterval,
} from 'date-fns';

export const getMonthDays = (date) => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
};

export const getWeekDays = (date) => {
  const weekStart = startOfWeek(date);
  const weekEnd = endOfWeek(date);

  return eachDayOfInterval({ start: weekStart, end: weekEnd });
};

export const getTimeSlots = () => {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
  }
  return slots;
};

export const formatDate = (date, formatStr) => {
  return format(date, formatStr);
};

export const navigateDate = (
  date,
  direction,
  view
) => {
  switch (view) {
    case 'month':
      return direction === 'prev' ? addMonths(date, -1) : addMonths(date, 1);
    case 'week':
      return direction === 'prev' ? addWeeks(date, -1) : addWeeks(date, 1);
    case 'day':
      return direction === 'prev' ? addDays(date, -1) : addDays(date, 1);
    default:
      return date;
  }
};

export const isCurrentDay = (date) => isToday(date);
export const isSameDayAs = (date1, date2) =>
  isSameDay(date1, date2);
export const isSameMonthAs = (date1, date2) =>
  isSameMonth(date1, date2);

export const createTimeSlot = (date, hour) => {
  return setMinutes(setHours(date, hour), 0);
};

export const getEventPosition = (event, date) => {
  if (!isSameDay(event.startDate, date)) return null;

  const startHour = getHours(event.startDate);
  const endHour = getHours(event.endDate);
  const duration = endHour - startHour || 1;

  return {
    top: `${startHour * 60}px`,
    height: `${duration * 60}px`,
  };
};

export const getEventsForDate = (
  events,
  date
) => {
  return events.filter(
    (event) =>
      isSameDay(event.startDate, date) ||
      isWithinInterval(date, {
        start: startOfDay(event.startDate),
        end: endOfDay(event.endDate),
      })
  );
}; 