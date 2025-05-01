import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './components/Footer';

const Layout = ({ children }) => {
  const location = useLocation();

  // Only show footer on the home page
  const showFooter = location.pathname === '/';

  return (
    <>
      {/* Your navbar/header here */}
      {children}
      {showFooter && <Footer />}
    </>
  );
};

export default Layout;
