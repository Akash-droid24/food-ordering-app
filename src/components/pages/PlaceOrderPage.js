import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PlaceOrderPage.css';

function PlaceOrderPage() {
  const { state } = useLocation();
  const { orderDetails } = state;
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Inside the handleCompleteOrder function:

const handleCompleteOrder = async () => {
    try {
      const username = localStorage.getItem('username');
      const userResponse = await axios.get(`http://localhost:3000/users?username=${username}`);
      const userId = userResponse.data[0].id;
  
      const updatedOrderDetails = {
        ...orderDetails,
        userId,
        paymentMethod,
        address: userResponse.data[0].address, // Assuming address is stored in user data
        orderedDateTime: new Date().toISOString(),
      };
  
      await axios.post('http://localhost:3000/orders', updatedOrderDetails);
  
      alert('Order placed successfully!');
  
      navigate('/order-tracking', { state: { orderId: updatedOrderDetails.orderId } });
    } catch (error) {
      console.error('Error completing order:', error);
    }
  };
  

  return (
    <div className="place-order-page">
      <h1>Place Order</h1>
      <div className="payment-section">
        <h2>Select Payment Method</h2>
        <div className="payment-methods">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="Credit Card"
              onChange={handlePaymentChange}
              required
            />
            Credit Card
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="PayPal"
              onChange={handlePaymentChange}
              required
            />
            PayPal
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="Cash on Delivery"
              onChange={handlePaymentChange}
              required
            />
            Cash on Delivery
          </label>
        </div>
        <button
          onClick={handleCompleteOrder}
          className="complete-order-button"
          disabled={!paymentMethod}
        >
          Complete Order
        </button>
      </div>
    </div>
  );
}

export default PlaceOrderPage;
