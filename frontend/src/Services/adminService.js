import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api';  // No trailing slash

const API_URL = 'http://localhost:5000/api';

export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/users`); // No /api
  return response.data;
};

export const deleteUser = async (userId) => {
  await axios.delete(`${API_URL}/users/${userId}`);
};

export const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const deleteProduct = async (productId) => {
  await axios.delete(`${API_URL}/products/${productId}`);
};

export const fetchOrders = async () => {
  const response = await axios.get(`${API_URL}/orders`);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
};

export const deleteCategory = async (categoryId) => {
  await axios.delete(`${API_URL}/categories/${categoryId}`);
};
