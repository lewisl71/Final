import axios from 'axios';

export const getTasks = async () => {
    const response = await axios.get('/api/tasks');
    return response.data;
  };
  
  export const createTask = async (taskData) => {
    const response = await axios.post('/api/tasks', taskData);
    return response.data;
  };
  
  export const deleteTask = async (id) => {
    await axios.delete(`/api/tasks/${id}`);
  };
  
  export const updateTask = async (id, taskData) => {
    const response = await axios.put(`/api/tasks/${id}`, taskData);
    return response.data;
  };