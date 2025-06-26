import { isSameDay, isWithinInterval, startOfDay, endOfDay } from 'date-fns';

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

export const getEventsForWeek = (
  events,
  weekDays
) => {
  return events.filter((event) =>
    weekDays.some(
      (day) =>
        isSameDay(event.startDate, day) ||
        isWithinInterval(day, {
          start: startOfDay(event.startDate),
          end: endOfDay(event.endDate),
        })
    )
  );
};

export const generateEventId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const eventColors = [
  '#1a73e8', // Google Blue
  '#d93025', // Google Red
  '#f9ab00', // Google Yellow
  '#34a853', // Google Green
  '#9334e6', // Purple
  '#ea4335', // Red
  '#fbbc04', // Amber
  '#0f9d58', // Green
];

export const getRandomEventColor = () => {
  return eventColors[Math.floor(Math.random() * eventColors.length)];
}; 