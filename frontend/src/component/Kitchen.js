import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bgImage from "../Assert/kichin.jpg";
import "../styles/Kitchen.css";

export default function Kitchen() {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [owner, setOwner] = useState("");
  const [remark, setRemark] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    alert("You have been logged out.");
    navigate("/login");
  };

  const handleSubmitRequest = async (event) => {
    event.preventDefault();
  
    const requestData = {
      itemName: item,
      quantity: amount,
      requestedBy: JSON.parse(localStorage.getItem("user"))?.username || "Kitchen",
      price,
      owner,
      remark,
      role: "Kitchen",
      status: "Pending",
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/store-requests/store-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
  
      const text = await response.text(); // ✅ Log response as text
      console.log("Raw response:", text); 
  
      if (!response.ok) {
        throw new Error(`Server Error: ${text}`);
      }
  
      alert("Request submitted successfully!");
      setItem(""); setAmount(""); setPrice(""); setOwner(""); setRemark("");
    } catch (error) {
      console.error("Error submitting the request:", error);
      alert(`Error: ${error.message}`);
    }
  };
  

  return (
    <div className="kitchen-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <div className="kitchen-overlay">
       
        <h2>Kitchen Item Request</h2>
        <form onSubmit={handleSubmitRequest} className="request-form">
          <input type="text" placeholder="Item Name" value={item} onChange={(e) => setItem(e.target.value)} required />
          <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
          <input type="text" placeholder="Owner Name" value={owner} onChange={(e) => setOwner(e.target.value)} required />
          <input type="text" placeholder="Remark" value={remark} onChange={(e) => setRemark(e.target.value)} />
          <button type="submit">Submit Request</button>
        </form>
      </div>
    </div>
  );
}
