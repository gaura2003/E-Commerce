import express from 'express';
import { getAllProducts, createProduct, updateProduct, deleteProduct, getProductById } from '../controllers/productController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all products
router.get('/', getAllProducts);

// Get single product by id
router.get('/:id', getProductById);

// Admin - Create a product
router.post('/', authMiddleware, createProduct);

// Admin - Update a product
router.put('/:id', authMiddleware, updateProduct);

// Admin - Delete a product
router.delete('/:id', authMiddleware, deleteProduct);

router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

export default router;