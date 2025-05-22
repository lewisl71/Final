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
    date: new Date(task.dueDate).toISOString().split('T')[0], // Ensure correct format
  }));

  // Handle user clicking on a date
  const handleDateClick = async (info) => {
    const title = prompt('Enter task title:');
    if (!title) return;

    const newTask = {
      title,
      dueDate: info.dateStr, // Already ISO string yyyy-mm-dd
    };

    try {
      const response = await fetch('https://task-backend-n7ds.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });

      const data = await response.json();

     
      onDateClick(data);
    } catch (err) {
      console.error('Error creating task from calendar:', err);
    }
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-header">📅 Task Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        timeZone="local"
        dateClick={(info) => {
          const title = prompt('Enter task title:');
          if (!title) return;
          onDateClick(info.dateStr, title); // Pass date and title to App
        }}
        
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
