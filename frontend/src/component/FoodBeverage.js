import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "../Assert/fb.jpg";
import "../styles/FoodBeverage.css";

export  default function FoodBeverage() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userRole");
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container" style={{ backgroundImage: `url(${bgImage})` }}>
       <button className="logout-btn" onClick={handleLogout}>Logout</button>
      <div className="overlay">
       
        <h2>Bar Inventory</h2>
        <p>Find the items for your bar. You can search for specific items below:</p>
  
        <input
          type="text"
          placeholder="Search item..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input"
        />
  
        <div className="table-container"> {/* ✅ Scrollable div */}
          {filteredItems.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th className="th">Item Name</th>
                  <th className="th">Amount</th>
                  <th className="th">Price</th>
                  <th className="th">Role</th>
                  <th className="th">Remark</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item._id}>
                    <td className="td">{item.name}</td>
                    <td className="td">{item.stock}</td>
                    <td className="td">${item.price}</td>
                    <td className="td">{item.role}</td>
                    <td className="td">{item.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No items available. Please add items or request from the storekeeper.</p>
          )}
        </div>
      </div>
  
    
    </div>
  );
  
}
