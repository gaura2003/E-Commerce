import React, { useEffect, useState } from 'react';
import { fetchProducts, fetchCategories } from '../Services/productService'; // Assuming fetchCategories is defined

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    // Fetch products and categories in parallel
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);
        setCategories(categoriesData); // Set categories fetched from the service
        setFilteredProducts(productsData); // Initially display all products
      });
  }, []);

  // Filter products based on search term, category, and price range
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((product) => product.category === categoryFilter);
    }

    filtered = filtered.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    setFilteredProducts(filtered);
  }, [searchTerm, categoryFilter, minPrice, maxPrice, products]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Product List</h1>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        {/* Search Filter */}
        <div className="flex flex-col w-full sm:w-1/3">
          <label className="text-sm font-medium mb-2">Search by Name</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md"
            placeholder="Search..."
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-col w-full sm:w-1/3">
          <label className="text-sm font-medium mb-2">Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">All</option>
            {Array.isArray(categories) &&
              categories.map((category) => (
                <option key={category._id || category} value={category.name || category}>
                  {category.name || category}
                </option>
              ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="flex flex-col w-full sm:w-1/3">
          <label className="text-sm font-medium mb-2">Price Range</label>
          <div className="flex items-center">
            <input
              type="range"
              min="0"
              max="1000"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-1/2"
            />
            <span className="ml-2">{`$${minPrice} - $${maxPrice}`}</span>
            <input
              type="range"
              min="0"
              max="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-1/2 ml-4"
            />
          </div>
        </div>
      </div>

        {/* Category Buttons Section */}
        <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="flex gap-4 flex-wrap">
          {Array.isArray(categories) &&
            categories.map((category) => (
              <button
                key={category._id || category}
                onClick={() => setCategoryFilter(category.name || category)}
                className={`px-4 py-2 border rounded-md text-sm font-medium ${
                  categoryFilter === category ? 'bg-blue-500 text-white' : 'bg-gray-200'
                } hover:bg-blue-500 hover:text-white transition-colors`}
              >
                {category.name || category}
              </button>
            ))}
        </div>
      </div>

      {/* Product Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 px-4">
        {filteredProducts.map((product) => (
          <div key={product._id} className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white transition-transform duration-300 hover:scale-105">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-56 object-cover" 
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 truncate">{product.name}</h2>
              <p className="text-gray-600 text-sm mt-2">{product.description}</p>
              <p className="font-bold text-lg text-gray-900 mt-3">${product.price}</p>
            </div>
            <div className="p-4 bg-gray-100">
              <button className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

// import React, { useState, useEffect } from 'react';
// import { fetchProducts, fetchCategories } from '../Services/productService'; // Assuming fetchCategories is defined
// import FilterSidebar from '../components/FilterSidebar';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const [sortOrder, setSortOrder] = useState('priceLowHigh');

//   useEffect(() => {
//     // Fetch products in parallel
//     Promise.all([fetchProducts(), fetchCategories()])
//       .then(([productsData, categoriesData]) => {
//         setProducts(productsData);
//         setFilteredProducts(productsData); // Initially display all products
//       });
//   }, []);

//   // Apply filters to products
//   useEffect(() => {
//     let filtered = products;

//     if (categoryFilter) {
//       filtered = filtered.filter((product) => product.category === categoryFilter);
//     }

//     filtered = filtered.filter(
//       (product) => product.price >= minPrice && product.price <= maxPrice
//     );

//     if (sortOrder === 'priceLowHigh') {
//       filtered = filtered.sort((a, b) => a.price - b.price);
//     } else if (sortOrder === 'priceHighLow') {
//       filtered = filtered.sort((a, b) => b.price - a.price);
//     } else if (sortOrder === 'rating') {
//       filtered = filtered.sort((a, b) => b.rating - a.rating);
//     }

//     setFilteredProducts(filtered);
//   }, [categoryFilter, minPrice, maxPrice, sortOrder, products]);

//   return (
//     <div className="flex">
//       {/* Filter Sidebar */}
//       <div className="w-1/4">
//         <FilterSidebar
//           setCategoryFilter={setCategoryFilter}
//           setMinPrice={setMinPrice}
//           setMaxPrice={setMaxPrice}
//           setSortOrder={setSortOrder}
//         />
//       </div>

//       {/* Product List */}
//       <div className="w-3/4 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {filteredProducts.map((product) => (
//           <div key={product._id} className="bg-white border rounded-lg shadow-lg p-4">
//             <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover rounded" />
//             <h2 className="text-lg font-semibold text-gray-700 mt-2">{product.name}</h2>
//             <p className="text-sm text-gray-500 mt-1">{product.description}</p>
//             <p className="text-xl font-bold text-gray-900 mt-2">${product.price}</p>
//             <button className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md">Add to Cart</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;
