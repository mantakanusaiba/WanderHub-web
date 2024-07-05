import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/Homepage';
import './styles.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleRegister = (user) => {
    setUser(user);
    setIsRegistering(false);
  };

  return (
    <div>
      {user ? (
        <HomePage />
      ) : isRegistering ? (
        <Register onRegister={handleRegister} setIsRegistering={setIsRegistering} />
      ) : (
        <Login onLogin={handleLogin} setIsRegistering={setIsRegistering} />
      )}
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
