import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
const API_URL = 'https://wander-hub-webback.vercel.app/api/users';

// Set Axios default withCredentials to true
axios.defaults.withCredentials = true;

const Login = ({ navigateTo }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Attempting to log in user:', { email, password });
      const response = await axios.post(`${API_URL}/login`, { email, password });

      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.accessToken);
       localStorage.setItem('refreshToken', response.data.refreshToken);
      console.log('Access Token:', response.data.accessToken);
      console.log('Refresh Token:', response.data.refreshToken); 
      navigateTo('home');
    } catch (err) {
      console.error('Login error:', err.response ? err.response.data : err.message);
      setError('Invalid credentials');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email ID</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
        {error && <p className="error">{error}</p>}
      </form>
      <p>
        Don't have an account?{' '}
        <span onClick={() => navigateTo('register')}>Register</span>
      </p>
    </div>
  );
};

export default Login;
