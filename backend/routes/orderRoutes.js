import express from 'express';
import { createOrder, getUserOrders, updateOrderStatus } from '../controllers/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Get user's orders
router.get('/user', authMiddleware, getUserOrders);

// Create order
router.post('/', authMiddleware, createOrder);

// Admin - Update order status
router.put('/:id', authMiddleware, updateOrderStatus);

export default router;
