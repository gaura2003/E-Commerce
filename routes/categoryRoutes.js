import express from 'express';
import { getCategories, addCategory } from '../controllers/categoryController.js';

const router = express.Router();

// Route to get all categories
router.get('/', getCategories);

// Route to add a new category
router.post('/', addCategory);

export default router;
