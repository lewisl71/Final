import axios from 'axios';

const api = axios.create({
  baseURL: 'https://task-backend-n7ds.onrender.com',  
});

export default api;
