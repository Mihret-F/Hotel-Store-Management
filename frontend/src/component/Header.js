import React from "react";
import { Link } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Assert/Logo.jpg"; 
import "../styles/Header.css"; // External CSS file

const Header = () => {
  return (
    <header className="header bg-black text-white py-3 shadow-sm">
      {/* <div className=" justify-content-between align-items-center"> */}
        
        {/* Logo & Title */}
        <div className="d-flex align-items-center">
          <img src={logo} alt="Hotel Logo" className="logo" />
          <h1 className="h4 mb-0 ms-2">Hotel Store Management</h1>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="nav">
            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to="/admin" className="nav-link">admin</Link></li>
            <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
            <li className="nav-item"><Link to="/contact" className="nav-link">Contact</Link></li>
          </ul>
        </nav>

      {/* </div> */}
    </header>
  );
};

export default Header;
