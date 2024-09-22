// frontend/src/components/TodoList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Task from './Task';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/tasks', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      setTasks(data);
    } else {
      navigate('/login');
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newTask }),
    });

    if (response.ok) {
      fetchTasks();
      setNewTask('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Ma ToDo List</h2>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Nouvelle tâche"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <Task key={task._id} task={task} fetchTasks={fetchTasks} />
        ))}
      </ul>
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
};

export default TodoList;
