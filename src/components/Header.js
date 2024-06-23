import React from 'react';

const Header = ({ onNavClick }) => {
  return (
    <header>
      <div className="top-bar">
        <h1>WanderHub</h1>
        <div className="profile">
          <button id="loginButton">Login</button>
        </div>
      </div>
      <nav>
        <ul>
          <li><button onClick={() => onNavClick('home')}>Home</button></li>
          <li><button onClick={() => onNavClick('holiday')}>Holiday</button></li>
          <li><button onClick={() => onNavClick('hotel')}>Hotel</button></li>

          <li className="dropdown">
            <button>Others</button>
            <div className="dropdown-content">
              <button onClick={() => onNavClick('why')}>Why WanderHub?</button>
              <button onClick={() => onNavClick('faq')}>FAQ</button>
              <button onClick={() => onNavClick('about')}>About</button>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
