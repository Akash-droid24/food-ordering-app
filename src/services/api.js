import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Fetch food items
export const fetchFoodItems = () => axios.get(`${API_URL}/foodList`);

// Place an order
export const placeOrder = (orderDetails) => axios.post(`${API_URL}/Orders`, orderDetails);

// Register user
export const registerUser = (userDetails) => axios.post(`${API_URL}/users`, userDetails);

// Fetch user details
export const fetchUser = (username) => axios.get(`${API_URL}/users?username=${username}`);

// Update user password
export const updateUserPassword = (userId, newPassword) => axios.patch(`${API_URL}/users/${userId}`, { password: newPassword });
