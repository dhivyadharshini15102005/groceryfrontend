// components/Cart.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, removeFromCart, updateQuantity, totalAmount, userDetails }) => {
  const navigate = useNavigate();

  const handleNext = () => {
    // Navigate to the Payment page, passing totalAmount and userDetails
    navigate('/payment', { state: { totalAmount, userDetails } });
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price} x {item.quantity}
                <button onClick={() => removeFromCart(item)}>Remove</button>
                <button onClick={() => updateQuantity(item, 'increase')}>+</button>
                <button onClick={() => updateQuantity(item, 'decrease')}>-</button>
              </li>
            ))}
          </ul>
          <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
