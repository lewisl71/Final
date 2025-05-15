
import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import TaskForm from './TaskForm';
import TaskCalendar from './TaskCalendar';

function App() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login'); // 'login', 'tasks', 'calendar'

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setView('tasks');
  };

  const handleLogout = () => {
    setUser(null);
    setTasks([]);
    setView('login');
  };

  const handleAddTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleDeleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5001/api/tasks/${id}`, { method: 'DELETE' });
      setTasks((prev) => prev.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleDateClick = async (info) => {
    const title = prompt('Enter task title:');
    if (!title) return;

    const newTask = {
      title,
      dueDate: info.dateStr,
    };

    try {
      const response = await fetch('http://localhost:5001/api/tasks', {
        method: 'POST',
        body: JSON.stringify(newTask),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setTasks((prev) => [...prev, data]); // Add task to state in real-time
    } catch (error) {
      console.error('Error creating task from calendar:', error);
    }
  };

  return (
    <div>
      {view === 'login' && <LoginPage onLogin={handleLogin} />}
      {view === 'tasks' && (
        <div>
          <button onClick={() => setView('calendar')}>Go to Calendar</button>
          <button onClick={handleLogout}>Logout</button>
          <TaskForm tasks={tasks} onAdd={handleAddTask}  onDelete={handleDeleteTask}/>
        </div>
      )}
      {view === 'calendar' && (
        <div>
          <button onClick={() => setView('tasks')}>Back to Tasks</button>
          <button onClick={handleLogout}>Logout</button>
          <TaskCalendar tasks={tasks} onDelete={handleDeleteTask} onDateClick={handleDateClick} />
        </div>
      )}
    </div>
  );
}

export default App;
