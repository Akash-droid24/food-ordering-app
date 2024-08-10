import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SettingsPage.css'; // Ensure this CSS file is styled for the updated component

function SettingsPage() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    paymentDetails: ''
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const username = localStorage.getItem('username');
        if (username) {
          const response = await axios.get(`http://localhost:3000/users?username=${username}`);
          const userData = response.data[0];
          setUser(userData);
          setFormData({
            address: userData.address || '',
            paymentDetails: userData.paymentDetails || ''
          });
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const username = localStorage.getItem('username');
      await axios.post(`http://localhost:3000/users/${user.id}`, formData);
      alert('Profile updated successfully!');
      setUser({ ...user, ...formData });
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <div className="profile-section">
        <div className="profile-header">
          <h2>User Profile</h2>
          <button className={`edit-button ${editMode ? 'green' : 'grey'}`} onClick={handleEditToggle}>
            {editMode ? 'Save' : 'Edit'}
          </button>
        </div>
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-group">
            <label htmlFor="address">Address</label>
            {editMode ? (
              <input
                id="address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            ) : (
              <p>{user?.address || 'No address provided'}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="paymentDetails">Payment Details</label>
            {editMode ? (
              <input
                id="paymentDetails"
                type="text"
                name="paymentDetails"
                value={formData.paymentDetails}
                onChange={handleChange}
                required
              />
            ) : (
              <p>{user?.paymentDetails || 'No payment details provided'}</p>
            )}
          </div>

          {editMode && <button type="submit">Save Changes</button>}
        </form>
        <div className="additional-links">
          <Link to="/settings/add-address">Add/Update Address</Link>
          <Link to="/settings/add-payment">Add/Update Payment Details</Link>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
