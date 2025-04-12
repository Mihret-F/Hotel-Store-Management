import React from "react";
import { Routes, Route } from "react-router-dom"; // ❌ No extra <Router> here!
import Header from "./component/Header";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import Storekeeper from "./component/Storekeeper";
import FoodBeverage from "./component/FoodBeverage";
import Manager from "./component/Manager";
import Admin from "./component/Admin";
import StoreIssue from "./component/StoreIssue";
import Bars from "./component/Bars"; 
import { Bar } from "./component/Bar"; 
import { RegisterItem } from "./component/RegisterItem"; 
import Kitchen from "./component/Kitchen";
import Dashboard from "./component/Dashboard"; 
import { ItemProvider } from "./context/ItemContext"; 
import Contact from "./component/Contact";
import "./App.css";
import Login from "./component/Login";
import AdminDashboard from "./component/AdminDashboard"; // Import the AdminDashboard component
import AddUser from "./component/AddUser";
import UpdateUser from "./component/UpdateUser"; // Import the UpdateUser component
function App() {
  return (
    <ItemProvider> {/* ✅ Wraps the entire app with state management */}
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/storekeeper" element={<Storekeeper />} />
          <Route path="/food-beverage" element={<FoodBeverage />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard/>} />
          <Route path="/UpdateUser/:userId" element={<UpdateUser />} /> 
          <Route path="/add-user" element={<AddUser/>}/>
          <Route path="/bars" element={<Bars />} />
          <Route path="/bar" element={<Bar />} />
          <Route path="/storeissue" element={<StoreIssue />} />
          <Route path="/registeritem" element={<RegisterItem />} />
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </ItemProvider>
  );
}

export default App;
