import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  Search,
  Settings,
  MoreHorizontal,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ThemeToggle } from '@/components/ui/theme-toggle.jsx';
import { useCalendar } from '../../context/CalendarContext';
import { formatDate, getWeekDays } from '../../utils/dateUtils';

const CalendarHeader = ({
  onToggleSidebar,
  isSidebarOpen,
}) => {
  const { state, dispatch } = useCalendar();
  const { currentDate, view } = state;

  const handlePrevious = () => {
    dispatch({ type: 'NAVIGATE', payload: 'prev' });
  };

  const handleNext = () => {
    dispatch({ type: 'NAVIGATE', payload: 'next' });
  };

  const handleToday = () => {
    dispatch({ type: 'NAVIGATE', payload: 'today' });
  };

  const handleViewChange = (newView) => {
    dispatch({ type: 'SET_VIEW', payload: newView });
  };

  const getDisplayText = () => {
    switch (view) {
      case 'month':
        return formatDate(currentDate, 'MMMM yyyy');
      case 'week':
        const weekDays = getWeekDays(currentDate);
        const startDate = weekDays[0];
        const endDate = weekDays[6];

        // If the week spans across different months, show both months
        if (startDate.getMonth() !== endDate.getMonth()) {
          return `${formatDate(startDate, 'MMM d')} - ${formatDate(endDate, 'MMM d, yyyy')}`;
        }
        // If the week spans across different years, show both years
        else if (startDate.getFullYear() !== endDate.getFullYear()) {
          return `${formatDate(startDate, 'MMM d, yyyy')} - ${formatDate(endDate, 'MMM d, yyyy')}`;
        }
        // Same month and year
        else {
          return `${formatDate(startDate, 'MMM d')} - ${formatDate(endDate, 'd, yyyy')}`;
        }
      case 'day':
        return formatDate(currentDate, 'MMMM d, yyyy');
      default:
        return formatDate(currentDate, 'MMMM yyyy');
    }
  };

  const getViewDisplayName = (viewType) => {
    switch (viewType) {
      case 'month':
        return 'Month';
      case 'week':
        return 'Week';
      case 'day':
        return 'Day';
      default:
        return 'Month';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-google-border dark:border-gray-700 font-google-sans">
      {/* Main Header */}
      <header className="px-4 py-3 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden h-10 w-10 p-0 hover:bg-google-hover dark:hover:bg-gray-800"
          >
            <Menu className="h-5 w-5 text-google-text-secondary dark:text-gray-400" />
          </Button>

          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-google-blue rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <h1 className="text-xl font-normal text-google-text-primary dark:text-white hidden sm:block">
              Calendar
            </h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-google-hover dark:hover:bg-gray-800"
          >
            <Search className="h-4 w-4 text-google-text-secondary dark:text-gray-400" />
          </Button>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-google-hover dark:hover:bg-gray-800"
          >
            <Settings className="h-4 w-4 text-google-text-secondary dark:text-gray-400" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-google-hover dark:hover:bg-gray-800 hidden sm:block"
          >
            <MoreHorizontal className="h-4 w-4 text-google-text-secondary dark:text-gray-400" />
          </Button>
        </div>
      </header>

      {/* Sub Header with Navigation and View Toggle */}
      <div className="px-4 py-2 flex items-center justify-between border-t border-google-border dark:border-gray-700">
        {/* Navigation */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToday}
            className="text-google-text-primary dark:text-white hover:bg-google-hover dark:hover:bg-gray-800 px-3 sm:px-4 py-2 text-sm font-medium flex-shrink-0"
          >
            Today
          </Button>

          <div className="flex items-center flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrevious}
              className="h-8 w-8 p-0 hover:bg-google-hover dark:hover:bg-gray-800"
            >
              <ChevronLeft className="h-4 w-4 text-google-text-secondary dark:text-gray-400" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNext}
              className="h-8 w-8 p-0 hover:bg-google-hover dark:hover:bg-gray-800"
            >
              <ChevronRight className="h-4 w-4 text-google-text-secondary dark:text-gray-400" />
            </Button>
          </div>

          {/* Date/Week Display */}
          {view === 'day' ? (
            <div className="flex flex-col items-center justify-center ml-2 flex-1">
              <span className="text-xs text-google-text-secondary dark:text-gray-400 font-medium uppercase tracking-wide">
                {formatDate(currentDate, 'EEEE')}
              </span>
              <span className="text-4xl font-light text-google-blue leading-none">
                {currentDate.getDate()}
              </span>
              <span className="text-sm text-google-text-secondary dark:text-gray-400">
                {formatDate(currentDate, 'MMMM yyyy')}
              </span>
            </div>
          ) : view === 'week' ? (
            <div className="flex flex-col items-center justify-center ml-2 flex-1">
              <span className="text-lg font-medium text-google-text-primary dark:text-white">
                {getDisplayText()}
              </span>
            </div>
          ) : (
            <h2 className="text-sm sm:text-lg md:text-xl font-normal text-google-text-primary dark:text-white ml-2 truncate flex-1 min-w-0">
              {getDisplayText()}
            </h2>
          )}
        </div>

        {/* View Toggle - Tabs for Desktop, Dropdown for Mobile */}
        <div className="flex-shrink-0 ml-2">
          {/* Desktop View Toggle */}
          <div className="hidden sm:block">
            <Tabs
              value={view}
              onValueChange={handleViewChange}
              className="w-auto"
            >
              <TabsList className="grid w-full grid-cols-3 h-10 p-1 bg-gray-100 dark:bg-gray-800">
                <TabsTrigger
                  value="month"
                  className="text-sm font-medium data-[state=active]:bg-google-blue data-[state=active]:text-white px-3"
                >
                  Month
                </TabsTrigger>
                <TabsTrigger
                  value="week"
                  className="text-sm font-medium data-[state=active]:bg-google-blue data-[state=active]:text-white px-3"
                >
                  Week
                </TabsTrigger>
                <TabsTrigger
                  value="day"
                  className="text-sm font-medium data-[state=active]:bg-google-blue data-[state=active]:text-white px-3"
                >
                  Day
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Mobile View Toggle - Dropdown */}
          <div className="block sm:hidden">
            <Select value={view} onValueChange={handleViewChange}>
              <SelectTrigger className="w-20 h-8 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                <SelectValue>{getViewDisplayName(view)}</SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-lg z-50">
                <SelectItem
                  value="month"
                  className="text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Month
                </SelectItem>
                <SelectItem
                  value="week"
                  className="text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Week
                </SelectItem>
                <SelectItem
                  value="day"
                  className="text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Day
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader; 