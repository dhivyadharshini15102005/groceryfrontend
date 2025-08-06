import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GroceryList = ({ addToCart, searchTerm, category }) => {
  const [addedMessages, setAddedMessages] = useState({});
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined" || token === "") {
      navigate("/login");
    }
  }, [navigate]);

  const items = [
    { id: 1, name: "Apples", price: 2, quantity: "1 kg", category: "Fruits", image: "https://images.pexels.com/photos/206959/pexels-photo-206959.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 2, name: "Bananas", price: 1, quantity: "1 dozen", category: "Fruits", image: "https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 3, name: "Carrots", price: 3, quantity: "1 kg", category: "Vegetables", image: "https://cdn.pixabay.com/photo/2016/07/11/00/18/carrots-1508847_1280.jpg" },
    { id: 4, name: "Tomatoes", price: 4, quantity: "1 kg", category: "Vegetables", image: "https://tse1.mm.bing.net/th?id=OIP.QurEUPfQ6KKKIyDOTtkbLgHaFj&pid=Api" },
    { id: 5, name: "Milk", price: 5, quantity: "1 liter", category: "Dairy", image: "https://i0.wp.com/reclaimingyesterday.com/wp-content/uploads/2014/12/milk.jpg" },
    { id: 6, name: "Cheese", price: 6, quantity: "200 g", category: "Dairy", image: "https://tse4.mm.bing.net/th?id=OIP.spkkynUp9z2_zVDIcNzIfQHaHa&pid=Api&P=0&h=180" },
    { id: 7, name: "Coca-Cola", price: 3, quantity: "1 liter", category: "Beverages", image: "https://c0.wallpaperflare.com/preview/879/772/974/coca-cola-the-coca-cola-company-bottle-drink.jpg" },
    { id: 8, name: "Watermelon", price: 7, quantity: "1 piece", category: "Fruits", image: "https://foodprint.org/wp-content/uploads/2018/10/AdobeStock_168245990-e1539129146982.jpeg" },
    { id: 9, name: "Potatoes", price: 2, quantity: "2 kg", category: "Vegetables", image: "https://tse1.mm.bing.net/th?id=OIP.NpF4-3oEpS3dG828WiWERQHaE8&pid=Api&P=0&h=180" },
    { id: 10, name: "7Up", price: 2, quantity: "1 liter", category: "Beverages", image: "https://tse1.mm.bing.net/th?id=OIP.d19PyNMyHfBpxMZlNQlk8gHaEo&pid=Api&P=0&h=180" },
  ];

  const filteredItems = items.filter((item) => {
    const isSearchMatch = item.name.toLowerCase().includes(searchTerm);
    const isCategoryMatch = category === "All" || item.category === category;
    return isSearchMatch && isCategoryMatch;
  });

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedMessages((prev) => ({
      ...prev,
      [item.id]: `${item.name} added to cart!`,
    }));

    setTimeout(() => {
      setAddedMessages((prev) => ({
        ...prev,
        [item.id]: "",
      }));
    }, 2000);
  };

  return (
    <div className="grocery-list">
      {filteredItems.map((item) => (
        <div key={item.id} className="grocery-item">
          <img src={item.image} alt={item.name} className="grocery-image" />
          <p className="item-quantity">Quantity: {item.quantity}</p>
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          <button className="add-button" onClick={() => handleAddToCart(item)}>
            Add to Cart
          </button>
          {addedMessages[item.id] && (
            <div className="cart-message">{addedMessages[item.id]}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GroceryList;
