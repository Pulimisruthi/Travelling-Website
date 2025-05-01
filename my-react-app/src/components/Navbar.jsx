import React from 'react';
import HamburgerMenu from './HamburgerMenu';
import { FaHeart, FaUser } from 'react-icons/fa'; // Changed to FaHeart for filled heart
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left side */}
        <div className="navbar-left">
          <HamburgerMenu />
          <a href="/" className="navbar-logo">Incredible India</a>
        </div>

        {/* Right side */}
        <div className="navbar-links">
          <a href="/Wishlist" className='single-link'>Bucket list <FaHeart style={{ color: 'red' }} /></a> {/* ✅ Filled red heart */}
          <a href="/Signin">SignUp </a>
          <a href="/Login">LogIn</a>
          <a href="/Profile">Profile<FaUser style={{ color: 'orange',marginLeft:'10px'}}/></a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
