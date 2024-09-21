import React, { useState } from 'react';
import logo from './img/log2.png';

const Header = ({ onNavClick, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    const confirmed = window.confirm("Do you want to log out now?");
    if (confirmed && typeof onLogout === 'function') {
      onLogout();
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header style={{ backgroundColor: '#fff' }}>
      <div className="top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#005f73' }}>
        <div className="logo-container">
          <img src={logo} alt="WanderHub Logo" className="logo" style={{ width: '80px', height: 'auto' }} />
        </div>

        <h1 style={{ fontSize: '30px', color: '#fff' }}>WanderHub</h1>
        <div className="profile" style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => onNavClick('profile')} style={buttonStyle}>My Profile</button>
          <button onClick={handleLogout} style={buttonStyle}>Logout</button>

    
        </div>
      </div>
      <nav className="nav-bar" style={{ backgroundColor: '#1496a5', padding: '5px' }}>
        <ul className="nav-left" style={{ display: 'flex', listStyleType: 'none', margin: 0, padding: 0, overflow: 'hidden' }}>
          <li style={navItemStyle}><button onClick={() => onNavClick('home')} style={navButtonStyle}>Home</button></li>
          <li style={navItemStyle}><button onClick={() => onNavClick('holiday')} style={navButtonStyle}>Holiday</button></li>
          <li style={navItemStyle}><button onClick={() => onNavClick('hotel')} style={navButtonStyle}>Hotel</button></li>
          <li className="dropdown" style={navItemStyle}>
            <button onClick={toggleDropdown} style={navButtonStyle}>Others</button>
            {dropdownOpen && (
              <div className="dropdown-content" style={dropdownStyle}>
                <div onClick={() => onNavClick('why')} style={dropdownItemStyle}>Why WanderHub?</div>
                <div onClick={() => onNavClick('faq')} style={dropdownItemStyle}>FAQ</div>
                <div onClick={() => onNavClick('about')} style={dropdownItemStyle}>About</div>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

const buttonStyle = {
  backgroundColor: '#1496a5',
  color: '#fff',
  border: 'none',
  padding: '10px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px'
};

const navItemStyle = {
  margin: '0 10px',
};

const navButtonStyle = {
  display: 'block',
  color: 'white',
  textAlign: 'center',
  padding: '8px 16px',
  textDecoration: 'none',
  fontSize: '16px',
  background: 'none',
  border: 'none',
  cursor: 'pointer'
};

const dropdownStyle = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  backgroundColor: 'white',
  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
  padding: '10px',
  borderRadius: '4px',
  zIndex: '1'
};

const dropdownItemStyle = {
  padding: '8px 16px',
  cursor: 'pointer',
  color: 'black',
  textAlign: 'left',
  fontSize: '14px'
};

export default Header;

