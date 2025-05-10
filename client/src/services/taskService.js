import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5001/api/tasks' });

export const fetchTasks = () => API.get('/');
export const createTask = (t) => API.post('/', t);
export const updateTask = (id, t) => API.put(`/${id}`, t);
export const deleteTask = (id) => API.delete(`/${id}`);
