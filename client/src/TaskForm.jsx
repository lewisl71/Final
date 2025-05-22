import React, { useState, useEffect } from 'react';
import { createTask, updateTask, deleteTask } from './services/taskService';
import './TaskForm.css';

export default function TaskForm({ tasks, onAdd, onUpdate, onDelete }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editingId, setEditingId] = useState(null);

  // useEffect(() => {
  //   fetchAll();
  // }, []);

  // const fetchAll = async () => {
  //   const data = await getTasks();
  //   setTasks(data);
  // };

  const resetForm = () => {
    setTitle('');
    setDueDate('');
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !dueDate) return;

    const due = new Date(dueDate);
    due.setDate(due.getDate());

    const payload = { 
      title, 
      dueDate: due.toISOString() 
    };

    try {
      if (editingId) {
        const updated = await updateTask(editingId, payload);
        onUpdate(updated);
      } else {
        const created = await createTask(payload);
        onAdd(created);
      }
      resetForm();
      fetchAll();
    } catch (err) {
      console.error('Error saving task:', err);
    }
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setTitle(task.title);
    setDueDate(task.dueDate.slice(0, 10)); // yyyy-mm-dd
  };

  const handleDeleteLocal = async (id) => {
    await deleteTask(id);
    onDelete(id);
    fetchAll();
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return `${d.getMonth() + 1}/${d.getDate() + 1}/${d.getFullYear()}`;
  };

  return (
    <div className="task-form-container">
      <h2 className="task-form-title">
        {editingId ? 'Edit Task' : 'Add New Task'}
      </h2>

      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="task-form-input"
        />
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          className="task-form-input"
        />
        <button type="submit" className="task-form-button">
          {editingId ? 'Update Task' : 'Add Task'}
        </button>
      </form>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task._id} className="task-item">
            <span>
              {task.title} — {formatDate(task.dueDate)}
            </span>
            <div>
              <button
                onClick={() => handleEdit(task)}
                className="task-edit-button"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteLocal(task._id)}
                className="task-delete-button"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
);
}
