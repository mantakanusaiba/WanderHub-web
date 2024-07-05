import React, { useState, useEffect } from 'react';
import './Login.css';

const Login = ({ onLogin, setIsRegistering }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem(email));
    if (user && user.password === password) {
      onLogin(user);
    } else {
      alert('Invalid credentials');
    }
  };

  const handlePasswordReset = () => {
    const user = JSON.parse(localStorage.getItem(resetEmail));
    if (user) {
      setIsResettingPassword(true);
    } else {
      alert('No user found with that email');
    }
  };

  const handleNewPasswordSave = () => {
    const user = JSON.parse(localStorage.getItem(resetEmail));
    if (user) {
      user.password = newPassword;
      localStorage.setItem(resetEmail, JSON.stringify(user));
      alert('Password has been reset successfully');
      setIsResettingPassword(false);
      setShowForgotPassword(false);
    } else {
      alert('Error resetting password');
    }
  };

  return (
    <div className="login-container">
      {isResettingPassword ? (
        <div className="reset-password-form">
          <h2>Set New Password</h2>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleNewPasswordSave}>Save New Password</button>
          <p onClick={() => setIsResettingPassword(false)}>Back to Login</p>
        </div>
      ) : showForgotPassword ? (
        <div className="forgot-password-form">
          <h2>Reset Password</h2>
          <input
            type="email"
            placeholder="Email ID"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
          <button onClick={handlePasswordReset}>Reset Password</button>
          <p onClick={() => setShowForgotPassword(false)}>Back to Login</p>
        </div>
      ) : (
        <div className="login-form">
          <h2>Login</h2>
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
          <div className="login-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" onClick={() => setShowForgotPassword(true)}>Forgot Password?</a>
          </div>
          <button onClick={handleLogin}>Login</button>
          <p>
            Don't have an account? <span onClick={() => setIsRegistering(true)}>Register</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
