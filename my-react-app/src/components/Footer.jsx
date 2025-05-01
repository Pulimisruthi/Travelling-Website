import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Explore</h3>
          <ul>
            <li>Destinations</li>
            <li>Experiences</li>
            <li>Travel Guides</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li>Help Center</li>
            <li>Safety Information</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Legal</h3>
          <ul>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Incredible India Tourism
      </div>
    </footer>
  );
};

export default Footer;