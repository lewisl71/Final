
import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import TaskForm from './TaskForm';
import TaskCalendar from './TaskCalendar';
import './App.css'

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
      const response = await fetch('https://task-backend-n7ds.onrender.com/api/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleLogin = (userData) => {
    console.log('handleLogin called with:', userData);
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
      await fetch(`https://task-backend-n7ds.onrender.com/api/tasks/${id}`, { method: 'DELETE' });
      setTasks((prev) => prev.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdateTask = (updated) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === updated._id ? updated : t))
    );
  };

  const handleDateClick = async (dateStr, title) => {
    const newTask = {
      title,
      dueDate: dateStr,
    };
  
    try {
      const response = await fetch('https://task-backend-n7ds.onrender.com/api/tasks', {
        method: 'POST',
        body: JSON.stringify(newTask),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setTasks((prev) => [...prev, data]);
    } catch (error) {
      console.error('Error creating task from calendar:', error);
    }
  };

  return (
    <div>
      {view === 'login' && <LoginPage onLogin={handleLogin} />}
      {view === 'tasks' && (
        <div className = "navbar">
          <button onClick={() => setView('calendar')} className ="calendar-button">Go to Calendar</button>
          <button onClick={handleLogout} className= "logout-button">Logout</button>
          <TaskForm tasks={tasks} onAdd={handleAddTask}  onDelete={handleDeleteTask} onUpdate={handleUpdateTask}/>
        </div>
      )}
      {view === 'calendar' && (
        <div className = "navbar">
          <button onClick={() => setView('tasks')} className = "calendar-button">Back to Tasks</button>
          <button onClick={handleLogout} className = "logout button">Logout</button>
          <TaskCalendar tasks={tasks} onDelete={handleDeleteTask} onDateClick={handleDateClick} />
        </div>
      )}
    </div>
  );
}

export default App;
