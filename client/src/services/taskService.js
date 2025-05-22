
import api from './api';

export const getTasks = async () => {
    const response = await api.get('/api/tasks');
    return response.data;
  };
  
  export const createTask = async (taskData) => {
    const response = await api.post('/api/tasks', taskData);
    return response.data;
  };
  
  export const deleteTask = async (id) => {
    await api.delete(`/api/tasks/${id}`);
  };
  
  export const updateTask = async (id, taskData) => {
    const response = await api.put(`/api/tasks/${id}`, taskData);
    return response.data;
  };