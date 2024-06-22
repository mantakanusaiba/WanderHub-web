import React from 'react';

const Header = () => {
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
          <li><a href="hotel.html">Hotel</a></li>
          <li><a href="cox.html">Holiday</a></li>
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
