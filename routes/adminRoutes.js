import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import { getAllUsers, getAllOrders, manageProducts } from '../controllers/adminController.js';

const router = express.Router();

// Admin routes - protected by both auth and admin middlewares
router.use(authMiddleware, adminMiddleware);

router.get('/users', getAllUsers);
router.get('/orders', getAllOrders);
router.post('/products', manageProducts); // Add or manage products

export default router;
