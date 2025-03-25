import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Storehe.css"; // Import CSS for styling

export function Storehe() {
  const navigate = useNavigate();

  return (
    <div className="header-container">
      
      <div className="nav-buttons">
        <button onClick={() => navigate("/storekeeper")} className="button">Store</button>
        <button onClick={() => navigate("/bar")} className="button">Bar</button>
        <button onClick={() => navigate("/dashboard")} className="button">Dashboard</button>
        <button onClick={() => navigate("/storeissue")} className="button">Store Issue</button>
      </div>
    </div>
  );
}
