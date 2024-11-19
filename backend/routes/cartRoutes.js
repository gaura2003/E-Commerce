import express from 'express';
import { getCart, updateCart, removeItemFromCart } from '../controllers/cartController.js';

const router = express.Router();

// Route to get cart items
router.get('/:userId', getCart);

// Route to update or add an item to the cart
router.post('/update', updateCart);

// Route to remove an item from the cart
router.post('/remove', removeItemFromCart);

export default router;
