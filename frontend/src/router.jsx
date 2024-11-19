import { Routes, Route } from 'react-router-dom';
import Home from './customer/Home';
import ProductList from './customer/ProductList';
import ProductDetail from './customer/ProductDetail';
import Cart from './customer/Cart';
import Profile from './customer/Profile';
import Orders from './customer/Orders';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
};

export default Router;
