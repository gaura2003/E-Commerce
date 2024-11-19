import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// Fetch cart items for a user
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart.items);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Add or update an item in the cart
export const updateCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity = quantity;
    } else {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart.items);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Remove an item from the cart
export const removeItemFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();

    res.json(cart.items);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
