import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'; // Ensure connectDB doesn't conflict with the internal connectDB function
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import cartRoutes from './routes/cartRoutes.js';
import sliderRoutes from './routes/sliderRoutes.js'; // Import slider routes
import settingsRoutes from './routes/settingRoutes.js'; // Import settings

dotenv.config(); // Load environment variables

// Ensure `connectDB` is only defined once
connectDB();

const app = express();


// Middlewares
app.use(cors());
app.use(express.json()); // To parse incoming JSON requests
app.use(express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes); 
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/cart', cartRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/slider', sliderRoutes);
app.use('api/settings', settingsRoutes);
// Add slider route for handling slider related API requests
// app.use(sliderRoutes); // Mount slider routes

// Fetch all products (Example)
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Fetch a single product by ID (Example)
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Fetch product by ID
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Error Handling Middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
