import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./UserDetails.css";

const UserDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount, cart } = location.state || { totalAmount: 0, cart: [] };

  const [userDetails, setUserDetails] = useState({
    name: '',
    phone: '',
    location: '',
    paymentMethod: 'cash',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Navigate to Payment page if "Online Payment" is selected
    if (name === 'paymentMethod' && value === 'online') {
      navigate('/payment', { state: { totalAmount, cart, userDetails } });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Phone number validation
    if (!/^\d{10}$/.test(userDetails.phone)) {
      setErrorMessage("Phone number must be exactly 10 digits.");
      return;
    }

    const orderData = {
      name: userDetails.name,
      phone: userDetails.phone,
      location: userDetails.location,
      paymentMethod: userDetails.paymentMethod,
      totalAmount,
      cart: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.selectedQuantity || item.quantity, // Ensure correct quantity
      })),
    };

    try {
      const response = await fetch('http://localhost:3001/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Order placed successfully!");
        setErrorMessage('');
        navigate('/order-success', { state: { orderId: data.orderId } });
      } else {
        setErrorMessage(data.message || "Error placing order.");
      }
    } catch (err) {
      console.error("Error submitting order:", err);
      setErrorMessage("There was an error placing your order. Please try again.");
    }
  };

  return (
    <div className="user-details-container">
      <h2>User Details</h2>
      <p>Total Amount: ${totalAmount.toFixed(2)}</p>
      <h3>Your Cart Items:</h3>
      <ul>
        {cart.map(item => (
          <li key={item.id}>{item.name} - Quantity: {item.selectedQuantity || item.quantity}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={userDetails.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="tel" name="phone" value={userDetails.phone} onChange={handleChange} required maxLength="10" />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" name="location" value={userDetails.location} onChange={handleChange} required />
        </div>
        <div>
          <label>Payment Method:</label>
          <select name="paymentMethod" value={userDetails.paymentMethod} onChange={handleChange}>
            <option value="cash">Cash on Delivery</option>
            <option value="online">Online Payment</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default UserDetails;
