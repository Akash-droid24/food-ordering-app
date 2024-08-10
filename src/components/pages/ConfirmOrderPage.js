import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ConfirmOrderPage.css';

function ConfirmOrderPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart items from localStorage or backend API
    const cartData = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(cartData);

    // Calculate total price
    const total = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const username = localStorage.getItem('username');
      const userResponse = await axios.get(`http://localhost:3000/users?username=${username}`);
      const userId = userResponse.data[0].id;
      const orderDetails = {
        userId,
        items: cartItems,
        totalPrice,
        orderedDateTime: new Date().toISOString(),
      };

      // POST request to place order
      await axios.post('http://localhost:3000/orders', orderDetails);

      // Redirect to place order page
      navigate('/placeorder', { state: { orderDetails } });
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="confirm-order-page">
      <h1>Confirm Order</h1>
      <div className="order-summary">
        <h2>Order Summary</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price} x {item.quantity}
            </li>
          ))}
        </ul>
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <button onClick={handlePlaceOrder} className="place-order-button">
          Place Order
        </button>
      </div>
    </div>
  );
}

export default ConfirmOrderPage;
