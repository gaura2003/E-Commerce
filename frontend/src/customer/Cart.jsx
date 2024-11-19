import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Assuming CartContext is used for global state
import { getCart, updateCart, removeItemFromCart } from '../Services/cartService'; // Import services for API calls
import { formatPrice } from '../utils/formatPrice'; // Utility to format price

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useCart(); // Get user data from context
  const navigate = useNavigate();

  // Fetch the cart data when the component mounts
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Fetch cart from backend
    const fetchCart = async () => {
      try {
        const cartData = await getCart(user.id); // Make API call to get cart items
        setCartItems(cartData);
      } catch (err) {
        console.error('Error fetching cart:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user, navigate]);

  // Update quantity of a product in the cart
  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      const updatedCart = await updateCart(user.id, productId, quantity);
      setCartItems(updatedCart);
    } catch (err) {
      console.error('Error updating cart:', err);
    }
  };

  // Remove an item from the cart
  const handleRemoveItem = async (productId) => {
    try {
      const updatedCart = await removeItemFromCart(user.id, productId);
      setCartItems(updatedCart);
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  // Calculate total price of the cart
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.productId} className="flex justify-between items-center border-b py-4">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                <div className="ml-4">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p>{formatPrice(item.price)}</p>
                  
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleUpdateQuantity(item.productId, e.target.value)}
                  className="border p-2 w-16"
                />
                <button
                  onClick={() => handleRemoveItem(item.productId)}
                  className="bg-red-500 text-white py-2 px-4 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6">
            <h2 className="font-bold text-xl">Total: {formatPrice(getTotalPrice())}</h2>
            <button className="bg-blue-500 text-white py-2 px-4 rounded">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
