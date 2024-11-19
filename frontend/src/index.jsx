import React from 'react';
import ReactDOM from 'react-dom/client';
// import './styles/tailwind.css'; // Tailwind CSS
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './context/AuthContext'; // now it is AuthContext.jsx
import CartProvider from './context/CartContext';  // Adjust based on actual file location


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </Router>
);
