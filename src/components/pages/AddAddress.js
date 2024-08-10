import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddAddress.css'; // Ensure this CSS file is styled for the updated component

function AddAddress() {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const username = localStorage.getItem('username');
        if (username) {
          const response = await axios.get(`http://localhost:3000/users?username=${username}`);
          const userData = response.data[0];
          setAddress(userData.address || '');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const username = localStorage.getItem('username');
      const user = await axios.get(`http://localhost:3000/users?username=${username}`);
      const userId = user.data[0].id;

      await axios.patch(`http://localhost:3000/users/${userId}`, { address });
      alert('Address updated successfully!');
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="add-address">
      <h2>Add or Update Address</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save Address</button>
      </form>
    </div>
  );
}

export default AddAddress;
