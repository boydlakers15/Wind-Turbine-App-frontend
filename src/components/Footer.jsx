import React from 'react';
import '../styles/Footer.css';
import logo from '../img/company logo.jpg';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-bottom">
      {/* <div className="footer-content">
        <div className="footer-section">
          <img src={logo} alt="Logo" className="footer-logo" />
        </div>
      </div> */}
        <div className="footer-section">
          {/* <h3>Follow Us</h3> */}
          <div className="social-icons">
            <a href="https://www.facebook.com/"><FaFacebook /></a>
            <a href="https://www.instagram.com/"><FaTwitter /></a>
            <a href="https://twitter.com"><FaInstagram /></a>
          </div>
        </div>
        <p>&copy; 2023 PJ TurbinePro GmbH. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
