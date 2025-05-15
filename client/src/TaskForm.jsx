import React, { useState } from 'react';
import { createTask, deleteTask } from './services/taskService';

export default function TaskForm({ tasks, onAdd, onDelete }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(''); // Store the selected date

  // Handle task submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !dueDate) return; // Ensure title and dueDate are provided

    const dueDateObj = new Date(dueDate);
    dueDateObj.setDate(dueDateObj.getDate()); // Add 1 day to the selected date

    // Convert to ISO format for consistency
    const formattedDate = dueDateObj.toISOString();

    // Create the task payload
    const payload = { title, dueDate: formattedDate };

    try {
      const { data } = await createTask(payload);
      onAdd(data); // Update the tasks in App.js
      setTitle('');
      setDueDate('');
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  // Handle task deletion
  const handleDelete = async (id) => {
    try {
      await deleteTask(id); // Delete the task from the backend
      onDelete(id); // Update the task list in App.js after deletion
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate() + 1}/${date.getFullYear()}`;
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task…"
          className="flex-1 border px-3 py-2 rounded-l"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border px-3 py-2"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 rounded-r"
        >
          Add
        </button>
      </form>

      {}
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="flex justify-between items-center">
            <span>{task.title} - {formatDate(task.dueDate)}</span>
            <button
              onClick={() => handleDelete(task._id)} 
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
