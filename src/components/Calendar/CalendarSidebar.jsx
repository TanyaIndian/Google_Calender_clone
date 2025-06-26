// CalendarSidebar.jsx
// This component renders the left sidebar, including mini calendar, calendar lists, and create event button.

import React, { useState } from 'react';
import { Plus, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import Checkbox from '@/components/ui/checkbox';
import { useCalendar } from '../../context/CalendarContext';
import MiniCalendar from './MiniCalendar';

const CalendarSidebar = () => {
  const { dispatch } = useCalendar();
  // State for expanding/collapsing calendar lists
  const [myCalendarsExpanded, setMyCalendarsExpanded] = useState(true);
  const [otherCalendarsExpanded, setOtherCalendarsExpanded] = useState(true);

  // Sample calendar data (could be dynamic in a real app)
  const [myCalendars, setMyCalendars] = useState([
    { id: 'personal', name: 'Personal', color: '#1a73e8', checked: true },
    { id: 'work', name: 'Work', color: '#d93025', checked: true },
    { id: 'family', name: 'Family', color: '#f9ab00', checked: true },
  ]);

  const [otherCalendars, setOtherCalendars] = useState([
    {
      id: 'holidays',
      name: 'Holidays in United States',
      color: '#34a853',
      checked: true,
    },
    { id: 'birthdays', name: 'Birthdays', color: '#9334e6', checked: false },
  ]);

  // Open the event modal to create a new event
  const handleCreateEvent = () => {
    dispatch({ type: 'TOGGLE_EVENT_MODAL', payload: true });
  };

  // Toggle calendar visibility in the list
  const handleCalendarToggle = (calendarId, isMyCalendar) => {
    if (isMyCalendar) {
      setMyCalendars((prev) =>
        prev.map((cal) =>
          cal.id === calendarId ? { ...cal, checked: !cal.checked } : cal
        )
      );
    } else {
      setOtherCalendars((prev) =>
        prev.map((cal) =>
          cal.id === calendarId ? { ...cal, checked: !cal.checked } : cal
        )
      );
    }
  };

  return (
    <div className="w-80 h-full bg-white dark:bg-gray-900 border-r border-google-border dark:border-gray-700 flex flex-col font-google-sans">
      {/* Create Button */}
      <div className="p-4">
        <Button
          onClick={handleCreateEvent}
          className="w-full bg-google-blue hover:bg-blue-700 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all"
          size="lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create
        </Button>
      </div>

      {/* Search for people */}
      <div className="px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-google-text-secondary dark:text-gray-400" />
          <Input
            placeholder="Search for people"
            className="pl-10 bg-google-hover dark:bg-gray-800 border-0 rounded-full text-sm focus:ring-2 focus:ring-google-blue dark:text-white dark:placeholder-gray-400"
          />
        </div>
      </div>

      {/* Mini Calendar */}
      <div className="border-b border-google-border dark:border-gray-700">
        <MiniCalendar />
      </div>

      {/* Scrollable content area: calendar lists */}
      <div className="flex-1">
        {/* My Calendars section */}
        <div className="p-4">
          <button
            onClick={() => setMyCalendarsExpanded(!myCalendarsExpanded)}
            className="flex items-center w-full text-left text-sm font-medium text-google-text-primary dark:text-white hover:bg-google-hover dark:hover:bg-gray-800 rounded p-2 -m-2"
          >
            {myCalendarsExpanded ? (
              <ChevronDown className="h-4 w-4 mr-2" />
            ) : (
              <ChevronRight className="h-4 w-4 mr-2" />
            )}
            My calendars
          </button>

          {myCalendarsExpanded && (
            <div className="mt-2 space-y-1">
              {myCalendars.map((calendar) => (
                <div
                  key={calendar.id}
                  className="flex items-center hover:bg-google-hover dark:hover:bg-gray-800 rounded p-1"
                >
                  <Checkbox
                    id={calendar.id}
                    checked={calendar.checked}
                    onCheckedChange={() =>
                      handleCalendarToggle(calendar.id, true)
                    }
                    className="mr-3"
                  />
                  <div
                    className="w-3 h-3 rounded-sm mr-3"
                    style={{ backgroundColor: calendar.color }}
                  />
                  <label
                    htmlFor={calendar.id}
                    className="text-sm text-google-text-primary dark:text-white cursor-pointer flex-1"
                  >
                    {calendar.name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Other Calendars section */}
        <div className="p-4 border-t border-google-border dark:border-gray-700">
          <button
            onClick={() => setOtherCalendarsExpanded(!otherCalendarsExpanded)}
            className="flex items-center w-full text-left text-sm font-medium text-google-text-primary dark:text-white hover:bg-google-hover dark:hover:bg-gray-800 rounded p-2 -m-2"
          >
            {otherCalendarsExpanded ? (
              <ChevronDown className="h-4 w-4 mr-2" />
            ) : (
              <ChevronRight className="h-4 w-4 mr-2" />
            )}
            Other calendars
          </button>

          {otherCalendarsExpanded && (
            <div className="mt-2 space-y-1">
              {otherCalendars.map((calendar) => (
                <div
                  key={calendar.id}
                  className="flex items-center hover:bg-google-hover dark:hover:bg-gray-800 rounded p-1"
                >
                  <Checkbox
                    id={calendar.id}
                    checked={calendar.checked}
                    onCheckedChange={() =>
                      handleCalendarToggle(calendar.id, false)
                    }
                    className="mr-3"
                  />
                  <div
                    className="w-3 h-3 rounded-sm mr-3"
                    style={{ backgroundColor: calendar.color }}
                  />
                  <label
                    htmlFor={calendar.id}
                    className="text-sm text-google-text-primary dark:text-white cursor-pointer flex-1"
                  >
                    {calendar.name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarSidebar; 