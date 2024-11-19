// Base URL of your backend API
const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your actual API URL

// Fetching all products
export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products`); // Backend API endpoint
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Fetching a single product by ID
export const fetchProductById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`); // Backend API endpoint
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
};


// Fetching categories
export const fetchCategories = async () => {
  try {
      const response = await fetch(`${API_BASE_URL}/categories`); // Backend API endpoint for categories
      if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
  }
};
