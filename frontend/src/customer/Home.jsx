import React from 'react';
import ProductList from './ProductList';
import Slider from '../components/Slider';

const Home = () => {
  return (
    <div>
      <Slider />
      <h1 className="text-2xl font-bold mb-4 text-center">Welcome to the E-Commerce Website</h1>
      <p className='text-center'>Explore our products and enjoy shopping!</p>
      <ProductList/>
    </div>
  );
};

export default Home;
