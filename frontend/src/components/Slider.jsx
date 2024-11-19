// frontend/components/Slider.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Slider = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

   const slider =  [
    {
      caption: "Summer Sale - 50% Off",
      link: "https://www.example.com/summer-sale",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6jRJIxQXsxVq-NibhTJLcWKlACm0Ie0OGMw&s" // Replace with an actual image filename
    },
    {
      caption: "New Arrivals for Winter",
      link: "https://www.example.com/new-arrivals",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShzxDbzLLHNvi5ZnII2U5UjRyrcGiWhm7kfQ&s" // Replace with an actual image filename
    },
    {
      caption: "Exclusive Offers Just for You!",
      link: "https://www.example.com/exclusive-offers",
      imageUrl: "https://img.freepik.com/free-vector/electronics-store-facebook-cover-template_23-2151168350.jpg" // Replace with an actual image filename
    },
    {
      caption: "Shop Now, Pay Later with Installments",
      link: "https://www.example.com/shop-now-pay-later",
      imageUrl: "https://img.freepik.com/free-vector/electronics-store-template-design_23-2151143835.jpg" // Replace with an actual image filename
    }
  ]
  

  // Fetch slider data from the backend (MongoDB through Express API)
  const fetchSliderData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/slider');
      setSlides(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching slider data:', error);
      setLoading(false);
      setSlides(slider);
    }
  };

  useEffect(() => {
    fetchSliderData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!slides.length) {
    return <div>No slides available</div>;
  }

  // Function to navigate to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slider.length);
  };

  // Function to navigate to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slider.length) % slider.length);
  };

  return (
    <div className="relative">
      {slides.length > 0 && (
        <div className="w-full h-96 bg-gray-200">
          <img
            src={slides[currentIndex].imageUrl}
            alt={slides[currentIndex].caption}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <h2 className="text-white text-xl font-semibold">{slides[currentIndex].caption}</h2>
          </div>
  
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-700 transition"
          >
            &lt;
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-700 transition"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
  
};

export default Slider;
