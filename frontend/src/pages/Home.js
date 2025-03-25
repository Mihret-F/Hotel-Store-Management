import React from "react";
import { Link } from "react-router-dom";
import image from "../Assert/home.jpg"; // Importing the image
import "../styles/Home.css"; // Importing the external CSS file

export default function Home() {
  return (
    <div className="container" style={{ backgroundImage: `url(${image})` }}>
      <div className="overlay">
        {/* Headings */}
        <div className="text-container">
          <h3>Welcome to the Hotel Store Management System</h3>
          <h4>
            The Hotel Store Management System is designed to streamline and enhance 
            the management of hotel resources, ensuring efficiency and accuracy in 
            handling inventory, food & beverage supplies, financial records, and store operations.
          </h4>
        </div>

        {/* Links (Moved to Bottom) */}
        <div className="link-container">
          <ul className="link-list">
            {/* Add links here if needed */}
          </ul>
        </div>
      </div>
    </div>
  );
}
