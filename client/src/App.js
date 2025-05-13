import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskCalendar from './TaskCalendar';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask
} from './services/taskService';

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const { data } = await fetchTasks();
      setTasks(data);
    } catch (err) {
      console.error('Failed to load tasks:', err);
    }
  };

  const addTask = async (payload) => {
    
      const { data } = await createTask(payload);
      setTasks(ts => [data, ...ts]);
      return data;
    
  };

  const toggleTask = async (task) => {
    try {
      await updateTask(task._id, { completed: !task.completed });
      loadTasks();
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const deleteTaskById = async (id) => {
    try {
      await deleteTask(id);
      setTasks(ts => ts.filter(t => t._id !== id));
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Tasks</h1>

      <TaskForm onNewTask={addTask} />

      <ul className="mb-8">
        {tasks.map(t => (
          <li key={t._id} className="flex justify-between items-center py-2 border-b">
            <div
              onClick={() => toggleTask(t)}
              className="cursor-pointer flex items-center space-x-2"
            >
              <span className={t.completed ? 'line-through text-gray-500' : ''}>
                {t.title}
              </span>
              {t.dueDate && (
                <small className="text-sm text-gray-600">
                  (due {new Date(t.dueDate).toLocaleDateString()})
                </small>
              )}
            </div>
            <button
              onClick={() => deleteTaskById(t._id)}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <TaskCalendar tasks={tasks} onNewTask={addTask} />
    </div>
  );
}
