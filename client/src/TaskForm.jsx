import { useState } from 'react';
import { createTask } from './services/taskService';

export default function TaskForm({ onNewTask }) {
  const [title, setTitle]     = useState('');
  const [dueDate, setDueDate] = useState(''); // yyyy-MM-dd

  const handleSubmit = async e => {
    e.preventDefault();
    if (!title) return;

    const payload = { title };
    if (dueDate) payload.dueDate = dueDate;

    const { data } = await createTask(payload);
    onNewTask(data);
    setTitle('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="New task…"
        className="flex-1 border px-3 py-2 rounded-l"
      />
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        className="border px-3 py-2"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 rounded-r"
      >
        Add
      </button>
    </form>
  );
}
