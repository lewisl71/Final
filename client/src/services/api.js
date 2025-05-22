import axios from 'axios';


 const baseURL ='https://task-backend-n7ds.onrender.com'|| 'http://localhost:5001';


const api = axios.create({
  baseURL, 
});

export default api;
