import User from '../models/User.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Manage products (add/update/delete)
export const manageProducts = async (req, res) => {
  const { name, price, category, stock } = req.body;
  const product = new Product({ name, price, category, stock });

  try {
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to manage product' });
  }
};
