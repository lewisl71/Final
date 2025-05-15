import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function TaskCalendar({ tasks, onDateClick, onDelete }) {
  const events = tasks.map((task) => ({
    id: task._id,
    title: task.title,
    date: task.dueDate,
  }));

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        timeZone="Etc/UTC"
        dateClick={onDateClick} // Fix for adding tasks on calendar
        eventClick={(info) => {
          const confirmDelete = window.confirm(`Delete task: ${info.event.title}?`);
          if (confirmDelete) {
            onDelete(info.event.id);
          }
        }}
      />
    </div>
  );
}

