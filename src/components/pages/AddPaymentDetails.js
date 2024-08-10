import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddPaymentDetails.css'; // Ensure this CSS file is styled for the updated component

function AddPaymentDetails() {
  const [paymentDetails, setPaymentDetails] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const username = localStorage.getItem('username');
        if (username) {
          const response = await axios.get(`http://localhost:3000/users?username=${username}`);
          const userData = response.data[0];
          setPaymentDetails(userData.paymentDetails || '');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setPaymentDetails(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const username = localStorage.getItem('username');
      const user = await axios.get(`http://localhost:3000/users?username=${username}`);
      const userId = user.data[0].id;

      await axios.patch(`http://localhost:3000/users/${userId}`, { paymentDetails });
      alert('Payment details updated successfully!');
    } catch (error) {
      console.error('Error updating payment details:', error);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="add-payment-details">
      <h2>Add or Update Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="paymentDetails">Payment Details</label>
          <input
            id="paymentDetails"
            type="text"
            value={paymentDetails}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save Payment Details</button>
      </form>
    </div>
  );
}

export default AddPaymentDetails;
