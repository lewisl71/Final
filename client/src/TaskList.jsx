// src/TaskList.jsx
import React from 'react';

const TaskList = ({ tasks }) => (
  <ul>
    {tasks.map((task) => (
      <li key={task._id}>{task.title} (Due: {new Date(task.dueDate).toLocaleDateString()})</li>
    ))}
  </ul>
);

export default TaskList;
