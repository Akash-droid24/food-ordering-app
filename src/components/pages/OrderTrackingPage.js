import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderTrackingPage.css';

function OrderTrackingPage() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const username = localStorage.getItem('username');
        const response = await axios.get(`http://localhost:3000/orders?username=${username}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredOrders = orders.filter((order) =>
    order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="order-tracking-page">
      <h1>Order Tracking</h1>
      <input
        type="text"
        placeholder="Search your orders..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="orders-list">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => (
            <div key={index} className="order-item">
              <h2>Order ID: {order.id}</h2>
              <p>Ordered Date: {new Date(order.orderedDateTime).toLocaleString()}</p>
              <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
              <h3>Items:</h3>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - {item.quantity} x ${item.price}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
}

export default OrderTrackingPage;
