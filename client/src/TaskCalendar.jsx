import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './TaskCalendar.css';

export default function TaskCalendar({ tasks, onDateClick, onDelete }) {
  // Convert tasks to calendar events
  const events = tasks.map((task) => ({
    id: task._id,
    title: task.title,
    date: new Date(task.dueDate).toISOString().split('T')[0],
  }));


  const handleDateClick = (info) => {
    const title = prompt('Enter task title:');
    if (!title) return;
    onDateClick(info.dateStr, title); // Call the prop with date and title
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-header">📅 Task Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        timeZone="local"
        dateClick={handleDateClick} 
        eventClick={(info) => {
          const confirmDelete = window.confirm(`Delete task: "${info.event.title}"?`);
          if (confirmDelete) {
            onDelete(info.event.id);
          }
        }}
        height="auto"
        eventDisplay="block"
        dayMaxEvents={true}
        headerToolbar={{
          left: 'prev,next today',
          center: '',
          right: 'title',
        }}
      />
    </div>
  );
}
