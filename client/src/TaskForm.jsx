import React, { useState } from 'react';
import './TaskForm.css';

function TaskForm({ tasks, onAdd, onDelete }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !dueDate) {
      alert('Both title and due date are required.');
      return;
    }


    const date = new Date(dueDate);
    date.setUTCHours(12, 0, 0, 0); // prevent date shifting due to timezone

    const newTask = {
      title,
      dueDate: date.toISOString(),
    };

    try {
      console.log('📤Submitting task from form:', newTask);
      const createdTask = await onAdd(newTask); // capture return if needed
      console.log(' Task added:', createdTask);
      setTitle('');
      setDueDate('');
    } catch (error) {
      console.error(' Error saving task from form:', error);
    }
  };

  return (
    <div className="task-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <div className="task-list">
        <h3>Tasks</h3>
        {tasks.length === 0 && <p>No tasks yet.</p>}
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <span>
                {task.title} -{' '}
                {new Date(task.dueDate).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
              <button onClick={() => onDelete(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskForm;
