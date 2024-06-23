import React from 'react';
import logo from './img/logo.png'; 

const Header = ({ onNavClick }) => {
  return (
    <header>
      <div className="top-bar">
        <div className="logo-container">
          <img src={logo} alt="WanderHub Logo" className="logo" />
        </div>
        <h1>WanderHub</h1>
        <div className="profile">
          <button id="loginButton">Login</button>
        </div>
      </div>
      <nav className="nav-bar">
        <ul className="nav-left">
        <li><button onClick={() => onNavClick('home')}>Home</button></li>
          <li><button onClick={() => onNavClick('holiday')}>Holiday</button></li>
          <li><button onClick={() => onNavClick('hotel')}>Hotel</button></li>
          <li className="dropdown">
            <a href="#">Others</a>
            <div className="dropdown-content">
              <a href="#">Why WanderHub?</a>
              <a href="#">FAQ</a>
              <a href="#">About</a>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;