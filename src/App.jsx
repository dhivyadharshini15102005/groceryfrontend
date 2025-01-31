import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import GroceryList from "./components/GroceryList";
import Cart from "./components/Cart";
import UserDetails from "./components/UserDetails";
import Payment from "./components/Payment";
import Login from "./components/login";
import Signup from "./components/Signup";
import AboutUs from "./components/AboutUs";
import "./App.css";

const App = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Fruits", "Vegetables", "Dairy", "Beverages"];

  // Add item to cart or increase quantity if it exists
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, selectedQuantity: (cartItem.selectedQuantity || 0) + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, selectedQuantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (itemToRemove) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemToRemove.id));
  };

  // Update item quantity in cart (Ensures item is not removed when quantity reaches 1)
  const updateQuantity = (item, action) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              selectedQuantity:
                action === "increase"
                  ? (cartItem.selectedQuantity || 0) + 1
                  : Math.max((cartItem.selectedQuantity || 0) - 1, 1), // Prevents removing item
            }
          : cartItem
      )
    );
  };

  // Calculate total amount
  const totalAmount = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.selectedQuantity || 0),
    0
  );

  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Online Grocery Shopping</h1>
        </header>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
          <Link to="/about">About Us</Link>
        </nav>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search for items..."
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            className="search-bar"
          />
          <select onChange={(e) => setCategory(e.target.value)} className="category-select">
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <Routes>
          <Route
            path="/"
            element={<GroceryList addToCart={addToCart} searchTerm={searchTerm} category={category} />}
          />
          <Route
            path="/cart"
            element={
              <Cart cart={cart} setCart={setCart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
            }
          />
          <Route path="/user-details" element={<UserDetails totalAmount={totalAmount} cart={cart} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>

      <footer>
        <p>&copy; 2025 Your Grocery Shop. All rights reserved.</p>
      </footer>
    </Router>
  );
};

export default App;
