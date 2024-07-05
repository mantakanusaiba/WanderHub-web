import React, { useState, useEffect } from 'react';
import './Register.css';

const Register = ({ onRegister, setIsRegistering }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.body.classList.add('register-page');
    return () => {
      document.body.classList.remove('register-page');
    };
  }, []);

  const handleRegister = () => {
    const newUser = { email, password };
    localStorage.setItem(email, JSON.stringify(newUser));
    onRegister(newUser);
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        <input
          type="email"
          placeholder="Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        <p>
          Already have an account? <span onClick={() => setIsRegistering(false)}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
