import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cartstyle.css";

const Cart = ({ cart, setCart, removeFromCart, updateQuantity }) => {
  const navigate = useNavigate();

  // Calculate total amount
  const totalAmount = cart.reduce(
    (sum, item) => sum + ((item.price || 0) * (item.selectedQuantity || 0)),
    0
  );

  // Navigate to UserDetails page with cart data
  const handleNext = () => {
    navigate("/user-details", {
      state: {
        totalAmount: totalAmount,
        cart: cart,
      },
    });
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Actual Quantity</th>
                <th>Selected Quantity</th>
                <th>Price</th>
                <th>Total Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <div className="quantity-controls">
                      <button
                        className="decrement-button"
                        onClick={() => updateQuantity(item, "decrease")}
                      >
                        -
                      </button>
                      <span>{item.selectedQuantity || 0}</span>
                      <button
                        className="increment-button"
                        onClick={() => updateQuantity(item, "increase")}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${(item.price || 0).toFixed(2)}</td>
                  <td>${((item.price || 0) * (item.selectedQuantity || 0)).toFixed(2)}</td>
                  <td>
                    <button className="remove-button" onClick={() => removeFromCart(item)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className="cart-total">Total Amount: ${totalAmount.toFixed(2)}</h3>
          <button className="next-button" onClick={handleNext}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
