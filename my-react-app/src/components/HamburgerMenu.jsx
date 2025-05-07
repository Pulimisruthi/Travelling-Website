import React, { useState } from 'react';
import './HamburgerMenu.css';
import { FaComments, FaCloudSun, FaMapMarkedAlt, FaRegHeart, FaBars } from 'react-icons/fa';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="menu-container">
      <div className="menu-header" onClick={toggleMenu}>
         <div className={`hamburger ${isOpen ? 'open' : ''}`}>
              <span />
              <span />
              <span />
         </div>
         
      </div>


      {isOpen && (
        <div className="menu-options">
          <a href="/Chat"><FaComments />  <table>Guide</table></a>
          <a href="/Weather"><FaCloudSun /> Weather</a>
          <a href="/Wishlist"><FaRegHeart /> WishList</a>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
