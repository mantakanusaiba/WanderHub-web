import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [selectedContent, setSelectedContent] = useState('');

  const displayContent = (content) => {
    setSelectedContent(content);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 WanderHub. All rights reserved.</p>
        <ul className="footer-links">
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); displayContent('Privacy Policy'); }}>
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); displayContent('Terms of Service'); }}>
              Terms of Service
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); displayContent('Contact Us'); }}>
              Contact Us
            </a>
          </li>
        </ul>
      </div>

      {/* Display selected content below the footer links */}
      <div className="footer-info">
        <h2>{selectedContent}</h2>
        <p>{getFooterText(selectedContent)}</p>
      </div>
    </footer>
  );
};

// Helper function to return content based on the selected link
const getFooterText = (content) => {
  switch (content) {
    case 'Privacy Policy':
      return 'Your privacy is important to us. We collect minimal personal information and ensure that it is securely stored and handled. Read our full privacy policy for more details.';
    case 'Terms of Service':
      return 'By using WanderHub, you agree to comply with our terms of service, including our rules for bookings, cancellations, and general platform use. Violations may result in account suspension.';
    case 'Contact Us':
      return 'For inquiries or support, please reach out to us at support@wanderhubgmail.com or call us at 017345628176. We’re here to help 24/7!';
    default:
      return '';
  }
};

export default Footer;
