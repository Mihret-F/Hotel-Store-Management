import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bgImage from "../Assert/bar.jpg";
import "../styles/Bars.css"; // External CSS file

export default function Bars() {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [owner, setOwner] = useState("");
  const [remark, setRemark] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    alert("You have been logged out."); // Logout alert
    navigate("/login");
  };

  const handleSubmitRequest = async (event) => {
    event.preventDefault();

    const requestData = {
      itemName: item,
      quantity: amount,
      requestedBy: JSON.parse(localStorage.getItem("user"))?.username || "Unknown",
      status: "Pending",
      price,
      owner,
      remark,
      role: "Bar",
    };

    try {
      const response = await axios.post("http://localhost:5000/api/store-requests/store-request", requestData);
      alert("Request submitted successfully!"); // Success alert

      setItem("");
      setAmount("");
      setPrice("");
      setOwner("");
      setRemark("");
    } catch (error) {
      console.error("Error submitting the request:", error);
      alert("Error submitting the request. Please try again."); // Error alert
    }
  };

  return (
    <div className="bars-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <div className="bars-overlay">
        
        <h2>Bar Item Request</h2>
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
