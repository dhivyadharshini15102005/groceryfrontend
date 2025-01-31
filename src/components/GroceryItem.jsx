import React, { useState } from 'react';
import PropTypes from 'prop-types';  // For prop validation

const GroceryItem = ({ item, addToCart }) => {
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addToCart(item);  // Calls the parent function to add to cart
    setAddedToCart(true);  // Show the "Added to Cart" message

    // Hide the message after 2 seconds, ensuring it's reset if clicked again
    setTimeout(() => setAddedToCart(false), 2000);  
  };

  return (
    <div className="grocery-item">
      <h3>{item.name}</h3>
      <p><strong>Category:</strong> {item.category}</p>
      <p><strong>Quantity:</strong> {item.quantity}</p>

      <div className="grocery-item-actions">
        <button onClick={handleAddToCart}>
          {addedToCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>

      {addedToCart && (
        <div className="added-to-cart-msg">
          {item.name} added to cart!
        </div>
      )}
    </div>
  );
};

// Prop validation to ensure item and addToCart are passed correctly
GroceryItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default GroceryItem;
