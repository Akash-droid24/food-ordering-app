import React from 'react';
import './Footer.css'; // Create this CSS file for styling

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2024 Zorn. All rights reserved.</p>
      <ul className="footer-links">
        <li><a href="/privacy">Privacy Policy</a></li>
        <li><a href="/terms">Terms of Service</a></li>
      </ul>
    </footer>
  );
}

export default Footer;
