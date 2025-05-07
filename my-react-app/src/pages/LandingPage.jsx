import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Styling goes here

const LandingPage = () => {
  return (
    <div className="landing-container">
      <nav className="landing-navbar">
        <div className="landing-logo">Incredible India</div>
        <div className="landing-nav-links">
          <Link to="/login">Login</Link>
          <Link to="/signin">Signup</Link>
        </div>
      </nav>

      <div className="landing-hero-content">
        <h1>Incredible India</h1>
        <p>Discover the beauty, culture, and history of India like never before. Plan your trip, explore destinations, and experience India with our travel companion platform.</p>
        <Link to="/login" className="landing-login-btn">Login</Link>
      </div>
    </div>
  );
};

export default LandingPage;
