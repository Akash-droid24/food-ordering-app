import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { fetchFoodItems, placeOrder } from '../../services/api';
import './HomePage.css';

function HomePage() {
  const [foodItems, setFoodItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});
  const [orderError, setOrderError] = useState('');

  useEffect(() => {
    fetchFoodItems()
      .then(response => {
        setFoodItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching food items:', error);
      });
  }, []);

  const handleShow = (food) => {
    setSelectedFood(food);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedFood(null);
  };

  const handleOrder = async () => {
    const userId = 1; // Replace with actual user ID from authentication context
    const orderDetails = {
      userId,
      foodId: selectedFood.id,
      orderedDateTime: new Date().toISOString()
    };

    try {
      await placeOrder(orderDetails);
      alert('Order placed successfully!');
      handleClose();
    } catch (error) {
      console.error('Error placing order:', error);
      setOrderError('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="home-page">
      <div className="search-section">
        <input type="text" placeholder="Search for food..." className="search-bar" />
      </div>
      <div className="food-listings">
        {foodItems.map(item => (
          <div key={item.id} className="food-card">
            <h3>{item.name}</h3>
            <p>${item.price}</p>
            <Button variant="primary" onClick={() => handleShow(item)}>Order</Button>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedFood?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Price: ${selectedFood?.price}</p>
          <p>Description: {selectedFood?.description}</p>
          {orderError && <p className="error">{orderError}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleOrder}>Place Order</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HomePage;
