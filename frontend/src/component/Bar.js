import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Storehe } from "./Storehe";

export function Bar() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await axios.get("http://localhost:5000/api/items");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }
    fetchItems();
  }, []);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ background: "black", color: "white", padding: "20px", minHeight: "100vh" }}>
      <Storehe/>
      <h2>Bar Inventory</h2>
      <p>Find the items for your bar. You can search for specific items below:</p>
      <input
        type="text"
        placeholder="Search item..."
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "8px", marginBottom: "20px" }}
      />

      {filteredItems.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid white", padding: "10px" }}>Item Name</th>
              <th style={{ border: "1px solid white", padding: "10px" }}>Amount</th>
              <th style={{ border: "1px solid white", padding: "10px" }}>Price</th>
              <th style={{ border: "1px solid white", padding: "10px" }}>Role</th>
              <th style={{ border: "1px solid white", padding: "10px" }}>Remark</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item._id}>
                <td style={{ border: "1px solid white", padding: "8px" }}>{item.name}</td>
                <td style={{ border: "1px solid white", padding: "8px" }}>{item.stock}</td>
                <td style={{ border: "1px solid white", padding: "8px" }}>${item.price}</td>
                <td style={{ border: "1px solid white", padding: "8px" }}>{item.role}</td>
                <td style={{ border: "1px solid white", padding: "8px" }}>{item.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <p>Item not found!</p>
          <button onClick={() => navigate("/Storekeeper")} className="btn btn-danger">
            Request from Storekeeper
          </button>
        </div>
      )}
    </div>
  );
}
