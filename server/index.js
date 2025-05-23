require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

const taskRoutes = require('./routes/tasks');

app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))