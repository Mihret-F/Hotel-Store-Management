import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaTwitter, FaInstagram, FaYoutube, FaTelegram, FaPinterest } from "react-icons/fa";
import "./Footer.css"; // Import external CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Help Section */}
        <div className="footer-section">
          <h1>Help</h1>
          <ul>
            <li><a href="/">Shipping</a></li>
            <li><a href="/">Refund</a></li>
            <li><a href="/">FAQ</a></li>
            <li><a href="/">Accessibility</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h1>Contact Us</h1>
          <ul>
            <li><FaPhone /> <span>+251 965449976</span></li>
            <li><FaEnvelope /> <span>Hotel@store.com</span></li>
            <li><FaMapMarkerAlt /> <span>Addis Ababa, Ethiopia</span></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="footer-section">
          <h1>Stay Connected</h1>
          <div className="social-links">
            <a href="/"><FaTwitter /></a>
            <a href="/"><FaInstagram /></a>
            <a href="/"><FaYoutube /></a>
            <a href="/"><FaTelegram /></a>
            <a href="/"><FaPinterest /></a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>©2024 Shema Ltd. | <a href="/">Terms & Conditions</a> | <a href="/">Privacy Policy</a></p>
      </div>
    </footer>
  );
};

export default Footer;
