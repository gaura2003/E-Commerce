// src/Services/orderService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

// Ensure this function is exported
export const fetchOrders = async (userId) => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
};

export const placeOrder = async (orderData) => {
  const response = await axios.post(API_URL, orderData);
  return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await axios.put(`${API_URL}/${orderId}`, { status });
  return response.data;
};
