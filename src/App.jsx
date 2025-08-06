import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import GroceryList from "./components/GroceryList"; 
import Cart from "./components/Cart";
import UserDetails from "./components/UserDetails";
import Payment from "./components/Payment";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AboutUs from "./components/AboutUs";
import "./App.css";

const App = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state

  const categories = ["All", "Fruits", "Vegetables", "Dairy", "Beverages"];

  const addToCart = (item) => {
    if (!isLoggedIn) {
      alert("Please login to add items to the cart.");
      return;
    }

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

  const removeFromCart = (itemToRemove) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemToRemove.id));
  };

  const updateQuantity = (item, action) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              selectedQuantity:
                action === "increase"
                  ? (cartItem.selectedQuantity || 0) + 1
                  : Math.max((cartItem.selectedQuantity || 0) - 1, 1),
            }
          : cartItem
      )
    );
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.selectedQuantity || 0),
    0
  );

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert("You have been logged out.");
  };

  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Online Grocery Shopping</h1>
        </header>

        <nav>
          <Link to="/">Home</Link>
          {/* Cart link redirects to login if not logged in */}
          <Link to={isLoggedIn ? "/cart" : "/login"}>Cart</Link>

          {!isLoggedIn ? (
            <Link to="/login">Login</Link>
          ) : (
            <a
              href="#logout"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
              className="logout-link"
            >
              Logout
            </a>
          )}
          <Link to="/about">About Us</Link>
        </nav>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search for items..."
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            className="search-bar"
          />
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
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
            element={
              <GroceryList
                addToCart={addToCart}
                searchTerm={searchTerm}
                category={category}
              />
            }
          />
          <Route
            path="/cart"
            element={
              isLoggedIn ? (
                <Cart
                  cart={cart}
                  setCart={setCart}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/user-details"
            element={<UserDetails totalAmount={totalAmount} cart={cart} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />}
          />
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
