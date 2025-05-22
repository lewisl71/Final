import React, { useState } from 'react';

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
    date.setUTCHours(12, 0, 0, 0); 
    const newTask = {
      title,
      dueDate: date.toISOString(),
    };

    try {
      console.log(' Submitting task from form:', newTask);
      const createdTask = await onAdd(newTask);
      console.log('Task added:', createdTask);
      setTitle('');
      setDueDate('');
    } catch (error) {
      console.error(' Error saving task from form:', error);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit}>
        <h3 style={styles.title}>Add a New Task</h3>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Add Task</button>
      </form>

      <div style={styles.taskList}>
        <h3 style={styles.title}>Tasks</h3>
        {tasks.length === 0 && <p>No tasks yet.</p>}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map((task) => (
            <li key={task._id} style={styles.taskItem}>
              <span>
                {task.title} -{' '}
                {new Date(task.dueDate).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
              <button onClick={() => onDelete(task._id)} style={styles.deleteButton}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f0f0f0',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '2rem auto',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
  },
  title: {
    fontSize: '1.5rem',
    color: '#37474f',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  input: {
    width: '95.5%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #b0bec5',
    borderRadius: '0.5rem',
    fontSize: '1rem',
  },
  button: {
    width: '99.8%',
    padding: '0.75rem',
    backgroundColor: '#607d8b',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  taskList: {
    marginTop: '2rem',
  },
  taskItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    padding: '0.75rem 1rem',
    marginBottom: '0.75rem',
    borderRadius: '0.5rem',
    color: '#37474f',
  },
  deleteButton: {
    background: '#ef5350',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
};

export default TaskForm;

