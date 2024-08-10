import React, { useEffect,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Ensure this CSS file handles both mobile and desktop styles

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
//   const isLoggedIn = !!localStorage.getItem('authToken'); // Assuming 'authToken' is stored upon login
const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  // Check if the auth token is present in local storage
  const token = localStorage.getItem('authToken');
  console.log('Auth Token:', token); // Log the token value to debug
  if (token) {
    setIsLoggedIn(true);
  }
}, []);

  const handleLogout = () => {
    // Clear local storage and session data
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to login page
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Zorn</h1>
      <ul className={isMobile ? "nav-links-mobile" : "nav-links"} onClick={() => setIsMobile(false)}>
        <Link to="/home" className="home">
          <li>Home</li>
        </Link>
        <Link to="/settings" className="settings">
          <li>Settings</li>
        </Link>
        <Link to="/confirmorder" className="confirm-order">
          <li>Confirm Order</li>
        </Link>
        <Link to="/order-tracking" className="order-tracking">
          <li>Order Tracking</li>
        </Link>
        <li>
        {isLoggedIn && (
          <li><button onClick={handleLogout}>Logout</button></li>
        )}
        </li>
      </ul>
      <button className="mobile-menu-icon" onClick={() => setIsMobile(!isMobile)}>
        {isMobile ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
      </button>
    </nav>
  );
}

export default Navbar;
