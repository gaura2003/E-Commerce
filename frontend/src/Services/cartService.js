import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cart'; // Backend API URL

// Get cart data
export const getCart = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

// Update cart item
export const updateCart = async (userId, productId, quantity) => {
  const response = await axios.post(`${API_URL}/update`, { userId, productId, quantity });
  return response.data;
};

// Remove item from cart
export const removeItemFromCart = async (userId, productId) => {
  const response = await axios.post(`${API_URL}/remove`, { userId, productId });
  return response.data;
};
