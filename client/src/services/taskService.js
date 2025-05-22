

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
  const response = await api.delete(`/api/tasks/${id}`);
  return response.data;
};

export const updateTask = async (id, updatedData) => {
  const response = await api.put(`/api/tasks/${id}`, updatedData);
  return response.data;
};
