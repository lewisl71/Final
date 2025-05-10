import logo from './logo.svg';


import { useState, useEffect } from 'react';
import {
  fetchTasks, createTask,
  updateTask, deleteTask
} from './services/taskService';

import './App.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => { load(); }, []);
  const load = async () => {
    const res = await fetchTasks();
    setTasks(res.data);
  };

  const add = async e => {
    e.preventDefault();
    if (!title) return;
    await createTask({ title });
    setTitle('');
    load();
  };

  const toggle = async t => {
    await updateTask(t._id, { completed: !t.completed });
    load();
  };

  const remove = async id => {
    await deleteTask(id);
    load();
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl mb-4">My Tasks</h1>
      <form onSubmit={add} className="flex mb-6">
        <input
          value={title}
          onChange={e=>setTitle(e.target.value)}
          placeholder="New task…" className="flex-1 border px-3 py-2 rounded-l"
        />
        <button className="bg-blue-600 text-white px-4 rounded-r">
          Add
        </button>
      </form>
      <ul>
        {tasks.map(t => (
          <li key={t._id} className="flex justify-between py-2 border-b">
            <span
              onClick={()=>toggle(t)}
              className={t.completed ? 'line-through text-gray-500' : ''}
            >
              {t.title}
            </span>
            <button onClick={()=>remove(t._id)} className="text-red-600">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}


