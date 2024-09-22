// frontend/src/components/Task.js
import React, { useState } from 'react';
import "./task.css";

const Task = ({ task, fetchTasks }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [body, setBody] = useState(task.body);
/*
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };*/

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (response.ok) {
      fetchTasks();
    } else {
      console.error('Failed to delete task');
    }
  };
  

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, body, completed: task.completed }),
    });
    setEditing(false);
    fetchTasks();
  };

  return (
    <li>
      {editing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br/>
        <textarea
        Type="text"
         row="30" col="5"
         value={body}
         onChange={(e) =>setBody(e.target.value)}
         >

        </textarea>
      ) : (
        <span className="span1">{task.title}</span>
        <span className="span2">{task.body}</span>
      )}
      <button className="btn1" onClick={handleDelete}>Supprimer</button>
      {editing ? (
        <button className="btn2" onClick={handleUpdate}>Sauvegarder</button>
      ) : (
        <button className="btn3" onClick={() => setEditing(true)}>Modifier</button>
      )}
    </li>
  );
};

export default Task;
