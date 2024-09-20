import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://wander-hub-webapi.vercel.app/api/users';

// Set Axios default withCredentials to true
axios.defaults.withCredentials = true;

const Register = ({ navigateTo }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log('Attempting to register user:', { name, email, password });
      const response = await axios.post(`${API_URL}/register`, { name, email, password });
      console.log('Registration response:', response.data);

      if (response.data.message === 'User registered successfully') {
        console.log('Access Token:', response.data.accessToken);
        console.log('Refresh Token:', response.data.refreshToken); // Display refresh token
        navigateTo('login');
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err.response);
      setError('Registration failed. Check server logs for details.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
          <button type="submit">Register</button>
        </div>
        {error && <p className="error">{error}</p>}
      </form>
      <p>
        Already have an account?{' '}
        <span onClick={() => navigateTo('login')}>Login</span>
      </p>
    </div>
  );
};

export default Register;
