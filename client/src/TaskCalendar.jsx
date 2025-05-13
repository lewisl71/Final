import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // ← import interaction plugin

export default function TaskCalendar({ tasks, onNewTask }) {
  const handleDateClick = async (arg) => {
    const title = prompt('Task title?');
    if (!title) return;

    const payload = { title, dueDate: arg.dateStr };
    try {
      await onNewTask(payload);
    } catch (err) {
      console.error('Calendar add failed:', err.response?.data || err.message);
      alert('Could not add task: ' + (err.response?.data?.error || err.message));
    }
  };

  const events = tasks
    .filter(t => t.dueDate)
    .map(t => ({
      id:    t._id,
      title: t.title,
      date:  t.dueDate.split('T')[0],
    }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]} // ← include interactionPlugin
      initialView="dayGridMonth"
      events={events}
      dateClick={handleDateClick}                // ← now recognized
      height="auto"
    />
  );
}