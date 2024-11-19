import React, { useState } from 'react';
import { fetchCategories } from '../Services/productService'; // Assuming fetchCategories is defined

const FilterSidebar = ({ setCategoryFilter, setMinPrice, setMaxPrice, setSortOrder }) => {
  const [categories, setCategories] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Fetch categories from the service or static data
  useEffect(() => {
    fetchCategories()
      .then((categoriesData) => setCategories(categoriesData));
  }, []);

  // Handle rating filter
  const handleRatingChange = (rating) => {
    setRatingFilter(rating);
  };

  // Handle price range filter
  const handlePriceChange = (e) => {
    setPriceRange([e.target.value[0], e.target.value[1]]);
    setMinPrice(e.target.value[0]);
    setMaxPrice(e.target.value[1]);
  };

  return (
    <div className="w-80 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Filters</h2>
      
      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Category</h3>
        <select
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full px-4 py-2 border rounded-md bg-gray-50 text-sm"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Price Range</h3>
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange}
          onChange={handlePriceChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Rating</h3>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={`px-2 py-1 text-sm rounded-md border ${
                rating <= ratingFilter
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {rating}★
            </button>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Sort By</h3>
        <select
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full px-4 py-2 border rounded-md bg-gray-50 text-sm"
        >
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;
