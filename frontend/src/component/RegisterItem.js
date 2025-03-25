import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/RegisterItem.css"; 
import { Storehe } from "./Storehe";

export function RegisterItem() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    stock: "",
    price: "",
    remark: "",
    role: "bar",
  });
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;
    if (name === "stock") {
      newValue = value === "" ? "" : Math.max(0, parseFloat(value)); // Ensures only positive numbers
    }
    if (name === "price") {
      newValue = value === "" ? "" : Math.max(0, parseFloat(value).toFixed(2)); // Allows decimals
    }

    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || formData.stock === "" || formData.price === "") {
      setError("Please fill in all required fields.");
      return;
    }

    const itemName = formData.name.toLowerCase();
    const existingItem = items.find(
      (item) => item.name.toLowerCase() === itemName && item.role === formData.role
    );

    try {
      if (existingItem) {
        const updatedStock = existingItem.stock + parseInt(formData.stock);
        await axios.put(`http://localhost:5000/api/items/${existingItem._id}`, {
          stock: updatedStock,
          price: parseFloat(formData.price),
          remark: formData.remark,
        });
        alert("Stock updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/items", { 
          ...formData, 
          name: itemName, 
          stock: parseFloat(formData.stock), 
          price: parseFloat(formData.price)
        });
        alert("New item registered successfully!");
      }

      navigate("/Bar");
      fetchItems();
    } catch (error) {
      console.error("Error adding/updating item:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    
         
    <div className="register">
       <Storehe />
       <div className="register-container">
      <h2>Register Item</h2>
      {error && <p className="error-message">{error}</p>} 
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          onChange={handleChange}
          value={formData.name}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          onChange={handleChange}
          value={formData.stock}
          min="0"
          step="0.01"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          value={formData.price}
          min="0"
          step="0.01"
          required
        />
        <input
          type="text"
          name="remark"
          placeholder="Remark"
          onChange={handleChange}
          value={formData.remark}
        />
        <select name="role" onChange={handleChange} value={formData.role} required>
          <option value="bar">Bar</option>
          <option value="kitchen">Kitchen</option>
        </select>
        <button type="submit" className="submit-button">Add Item</button>
      </form>
    </div></div>
  );
}
