import React, { useState } from 'react';

function TaskForm({ tasks, onAdd, onDelete, onUpdate }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !dueDate) {
      alert('Both title and due date are required.');
      return;
    }

    const date = new Date(dueDate);
    date.setUTCHours(12, 0, 0, 0); // fix for date shifting

    const newTask = {
      title,
      dueDate: date.toISOString(),
    };

    try {
      if (editingTaskId) {
        await onUpdate({ ...newTask, _id: editingTaskId });
        setEditingTaskId(null);
      } else {
        await onAdd(newTask);
      }
      setTitle('');
      setDueDate('');
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDueDate(new Date(task.dueDate).toISOString().split('T')[0]);
    setEditingTaskId(task._id);
  };

  return (
    <div style={{
      backgroundColor: '#f0f0f0',
      padding: '2rem',
      borderRadius: '1rem',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      maxWidth: '600px',
      margin: '2rem auto',
      fontFamily: 'Helvetica Neue, Arial, sans-serif'
    }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: '95.5%',
            padding: '0.75rem',
            marginBottom: '1rem',
            border: '1px solid #b0bec5',
            borderRadius: '0.5rem',
            fontSize: '1rem'
          }}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{
            width: '95.5%',
            padding: '0.75rem',
            marginBottom: '1rem',
            border: '1px solid #b0bec5',
            borderRadius: '0.5rem',
            fontSize: '1rem'
          }}
        />
        <button
          type="submit"
          style={{
            width: '99.8%',
            padding: '0.75rem',
            backgroundColor: '#607d8b',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          {editingTaskId ? 'Update Task' : 'Add Task'}
        </button>
      </form>

      <div style={{ marginTop: '2rem' }}>
        <h3>Tasks</h3>
        {tasks.length === 0 && <p>No tasks yet.</p>}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task._id}
              style={{
                backgroundColor: '#e8f5e9', // greenish
                color: '#2e7d32',
                padding: '0.75rem 1rem',
                marginBottom: '0.75rem',
                borderRadius: '0.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>
                {task.title} —{' '}
                {new Date(task.dueDate).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
              <div>
                <button
                  onClick={() => handleEdit(task)}
                  style={{
                    backgroundColor: '#4caf50',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    marginRight: '0.5rem',
                    cursor: 'pointer'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(task._id)}
                  style={{
                    backgroundColor: '#ef5350',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskForm;

