// EventModal.jsx
// This component renders a modal dialog for creating or editing calendar events.

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import Textarea from '@/components/ui/textarea';
import { useCalendar } from '../../context/CalendarContext';
import { formatDate } from '../../utils/dateUtils';

const EventModal = () => {
  const { state, dispatch } = useCalendar();
  const { isEventModalOpen, selectedEvent, currentDate } = state;

  // Local form state for event fields
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    description: '',
  });

  // Populate form when editing an event, or reset for new event
  useEffect(() => {
    if (selectedEvent) {
      setFormData({
        title: selectedEvent.title,
        startDate: formatDate(selectedEvent.startDate, 'yyyy-MM-dd'),
        startTime: formatDate(selectedEvent.startDate, 'HH:mm'),
        endDate: formatDate(selectedEvent.endDate, 'yyyy-MM-dd'),
        endTime: formatDate(selectedEvent.endDate, 'HH:mm'),
        description: selectedEvent.description || '',
      });
    } else {
      const today = formatDate(currentDate, 'yyyy-MM-dd');
      setFormData({
        title: '',
        startDate: today,
        startTime: '09:00',
        endDate: today,
        endTime: '10:00',
        description: '',
      });
    }
  }, [selectedEvent, currentDate, isEventModalOpen]);

  // Handle form submission for creating or updating an event
  const handleSubmit = (e) => {
    e.preventDefault();

    const startDateTime = new Date(
      `${formData.startDate}T${formData.startTime}`
    );
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);

    const eventData = {
      title: formData.title,
      startDate: startDateTime,
      endDate: endDateTime,
      description: formData.description,
    };

    if (selectedEvent) {
      // Update existing event
      dispatch({
        type: 'UPDATE_EVENT',
        payload: { ...selectedEvent, ...eventData },
      });
    } else {
      // Add new event
      dispatch({
        type: 'ADD_EVENT',
        payload: eventData,
      });
    }
  };

  // Handle deleting the selected event
  const handleDelete = () => {
    if (selectedEvent) {
      dispatch({ type: 'DELETE_EVENT', payload: selectedEvent.id });
    }
  };

  // Close the modal
  const handleClose = () => {
    dispatch({ type: 'TOGGLE_EVENT_MODAL', payload: false });
  };

  // Don't render the modal if it's not open
  if (!isEventModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-google-sans">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        {/* Header: title and close button */}
        <div className="flex items-center justify-between p-6 border-b border-google-border">
          <h2 className="text-lg font-medium text-google-text-primary">
            {selectedEvent ? 'Edit Event' : 'New Event'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="h-8 w-8 p-0 hover:bg-google-hover"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Form for event details */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Input
              placeholder="Add title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="text-lg font-medium border-0 border-b border-google-border rounded-none px-0 focus:ring-0 focus:border-google-blue"
              required
            />
          </div>

          {/* Start date and time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-google-text-secondary mb-1">
                Start Date
              </label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="border-google-border focus:border-google-blue focus:ring-google-blue"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-google-text-secondary mb-1">
                Start Time
              </label>
              <Input
                type="time"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                className="border-google-border focus:border-google-blue focus:ring-google-blue"
                required
              />
            </div>
          </div>

          {/* End date and time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-google-text-secondary mb-1">
                End Date
              </label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className="border-google-border focus:border-google-blue focus:ring-google-blue"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-google-text-secondary mb-1">
                End Time
              </label>
              <Input
                type="time"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
                className="border-google-border focus:border-google-blue focus:ring-google-blue"
                required
              />
            </div>
          </div>

          {/* Description field */}
          <div>
            <label className="block text-sm text-google-text-secondary mb-1">
              Description
            </label>
            <Textarea
              placeholder="Add description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="border-google-border focus:border-google-blue focus:ring-google-blue resize-none"
              rows={3}
            />
          </div>

          {/* Actions: delete, cancel, save */}
          <div className="flex justify-between pt-4">
            <div>
              {selectedEvent && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="border-google-border text-google-text-primary hover:bg-google-hover"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-google-blue hover:bg-blue-700 text-white"
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal; 