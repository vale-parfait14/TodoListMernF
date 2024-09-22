// frontend/src/components/Login.js
/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      navigate('/tasks');
    } else {
      setError(data.message);
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
        
      </form>
        <p>tu n'as pas de compte ? <a href='C:\Users\ozova\Desktop\TodoListMernApp\frontend\src\components\Register.js'>Inscris toi alors !</a></p>

          
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    
 

  );
};

export default Login;*/

// frontend/src/components/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./login.css"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/tasks');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <div className='p1'>
      <h2 className='h1'>Connexion</h2>
      <form className='fort' onSubmit={handleSubmit}>
        <div className='p2'>
          <input
            className='ipt'
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        
          <input
          className='ipt'
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
           <button className='btn' type="submit">Se connecter</button>
        </div>
      </form>
      <p className='.para{
'>
        Tu n'as pas de compte ? <Link  className="lien"to="/register">Inscris-toi alors !</Link>
      </p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;

