import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext for authentication

const Navbar = () => {
  const { user, logout } = useAuth(); // Get user and logout function from context

  const handleLogout = () => {
    logout(); // Handle logout
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link to="/">E-Commerce</Link>
        </div>
        <div className="flex space-x-4">
          {/* Public Links */}
          <Link to="/" className="text-white">Home</Link>
          <Link to="/products" className="text-white">Products</Link>
          <Link to="/cart" className="text-white">Cart</Link>
          <Link to="/profile" className="text-white">Profile</Link>
          <Link to="/orders" className="text-white">Orders</Link>

          {/* Admin Links - Conditionally render based on role */}
          {user && user.role === 'admin' && (
            <>
              <Link to="/admin-dashboard" className="text-white">Dashboard</Link>
              <Link to="/admin/manage-users" className="text-white">Manage Users</Link>
              <Link to="/admin/manage-products" className="text-white">Manage Products</Link>
              <Link to="/admin/manage-orders" className="text-white">Manage Orders</Link>
              <Link to="/admin/manage-categories" className="text-white">Manage Categories</Link>
              <Link to="/site-settings" className="text-white">Site Settings</Link>
            </>
          )}

          {/* Authentication Links */}
          {!user ? (
            <>
              <Link to="/login" className="text-white">Login</Link>
              <Link to="/register" className="text-white">Register</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="text-white">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
