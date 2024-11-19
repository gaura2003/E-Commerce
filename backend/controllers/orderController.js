import Order from '../models/Order.js';
import Product from '../models/Product.js';

// Create order
export const createOrder = async (req, res) => {
  const { products, totalAmount } = req.body;
  const user = req.user;

  const orderProducts = [];
  for (let productItem of products) {
    const product = await Product.findById(productItem.product);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    orderProducts.push({
      product: product._id,
      quantity: productItem.quantity,
    });
  }

  const order = new Order({
    user: user._id,
    products: orderProducts,
    totalAmount,
  });

  try {
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order' });
  }
};

// Get user's orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('products.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get orders' });
  }
};

// Admin - Update order status
export const updateOrderStatus = async (req, res) => {
  const { orderStatus } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status' });
  }
};
