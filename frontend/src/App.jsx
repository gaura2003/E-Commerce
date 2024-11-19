import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './customer/Home';
import ProductList from './customer/ProductList';
import ProductDetail from './customer/ProductDetail';
import Cart from './customer/Cart';
import Profile from './customer/Profile';
import Orders from './customer/Orders';
import Dashboard from './admin/Dashboard';
import ManageUsers from './admin/ManageUsers';
import ManageProducts from './admin/ManageProducts';
import ManageOrders from './admin/ManageOrders';
import ManageCategories from './admin/ManageCategories';
import AdminRoute from './AdminRoute'; // Assuming AdminRoute is in the same directory
import { CartProvider } from './context/CartContext'; // Correct CartProvider import
import AuthProvider from './context/AuthContext'; // Correct default import for AuthProvider
import Register from './customer/Register';
import Login from './customer/Login';
import SiteSettings from './components/SiteSettings';
import SiteManagementPanel from './components/SiteManagementPanel';

const App = () => {
  // Assuming `settings` is part of your app state or configuration
  const settings = { theme: 'light' }; // Example configuration

  useEffect(() => {
    document.body.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);

  return (
    <AuthProvider> {/* Wrap your app with AuthProvider first */}
      <CartProvider> {/* Wrap CartProvider inside AuthProvider */}
        <Navbar />
        <div className="container mx-auto py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Admin routes */}
            <Route
              path="/admin-dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/manage-users"
              element={
                <AdminRoute>
                  <ManageUsers />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/manage-products"
              element={
                <AdminRoute>
                  <ManageProducts />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/manage-orders"
              element={
                <AdminRoute>
                  <ManageOrders />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/manage-categories"
              element={
                <AdminRoute>
                  <ManageCategories />
                </AdminRoute>
              }
            />

            {/* Site Management Routes */}
            <Route
              path="/site-settings"
              element={
                <AdminRoute>
                  <SiteSettings />
                </AdminRoute>
              }
            />
            <Route
              path="/site-management"
              element={
                <AdminRoute>
                  <SiteManagementPanel />
                </AdminRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
