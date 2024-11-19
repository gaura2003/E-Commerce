import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    discount: '',
    rating: '',
    image: null,
  });

  const [categories, setCategories] = useState([]); // State to store categories
  const [categoryName, setCategoryName] = useState(''); // State to store the new category name
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(''); // State to store error message for failed category fetch

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories'); // Replace with your API endpoint
        setCategories(response.data); // Assume response.data is an array of categories
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to fetch categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle input change for product data
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    setProductData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  // Handle input change for category name
  const handleCategoryChange = (e) => {
    setCategoryName(e.target.value);
  };

  // Handle adding a new category
const handleAddCategory = async (e) => {
  e.preventDefault();

  if (categoryName.trim() === '') {
    alert('Category name cannot be empty');
    return;
  }

  try {
    const response = await axios.post('http://localhost:5000/api/categories', {
      name: categoryName,
    });

    // Add the new category to the list of categories
    setCategories([...categories, response.data]);

    // Reset the category input field
    setCategoryName('');
    alert('Category added successfully');
  } catch (error) {
    console.error('Error adding category:', error);
    if (error.response) {
      // Log the error response from the API
      console.error('API Error:', error.response.data);
      alert(`Error adding category: ${error.response.data.message || 'Unknown error'}`);
    } else {
      // Handle network or other errors
      alert('Error adding category: Network or server issue');
    }
  }
};


  // Handle submitting product data
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let key in productData) {
      formData.append(key, productData[key]);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Product added successfully');
      console.log(response.data);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  return (
    <div className="space-y-8">
      {/* Create Category Section */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Create New Category</h1>
        <form onSubmit={handleAddCategory} className="space-y-4">
          <input
            type="text"
            value={categoryName}
            onChange={handleCategoryChange}
            placeholder="Category Name"
            required
            className="border p-2 w-full"
          />
          <button type="submit" className="bg-green-500 text-white p-2 rounded">
            Create Category
          </button>
        </form>
      </div>

      {/* Display Error Message */}
      {error && <div className="text-red-500">{error}</div>}

      {/* Add Product Section */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
        {loading ? (
          <div>Loading categories...</div> // Loading message
        ) : (
          <form onSubmit={handleProductSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={productData.name}
              onChange={handleProductChange}
              required
              className="border p-2 w-full"
            />
            <input
              type="text"
              name="description"
              placeholder="Product Description"
              value={productData.description}
              onChange={handleProductChange}
              required
              className="border p-2 w-full"
            />
            <input
              type="number"
              name="price"
              placeholder="Product Price"
              value={productData.price}
              onChange={handleProductChange}
              required
              className="border p-2 w-full"
            />
            <select
              name="category"
              value={productData.category}
              onChange={handleProductChange}
              required
              className="border p-2 w-full"
            >
              <option value="" disabled>Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="stock"
              placeholder="Stock Quantity"
              value={productData.stock}
              onChange={handleProductChange}
              required
              className="border p-2 w-full"
            />
            <input
              type="number"
              name="discount"
              placeholder="Discount Percentage"
              value={productData.discount}
              onChange={handleProductChange}
              className="border p-2 w-full"
            />
            <input
              type="number"
              name="rating"
              placeholder="Product Rating"
              value={productData.rating}
              onChange={handleProductChange}
              className="border p-2 w-full"
            />
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              required
              className="border p-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Add Product
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
