import Product from '../models/Product.js'; // Assuming Product is your Mongoose model

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from DB
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Server Error');
  }
};

// Get a single product by id
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id); // Find product by ID
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).send('Server Error');
  }
};

// Admin - Create a new product
export const createProduct = async (req, res) => {
  const { name, description, price, category, stock, discount, rating, imageUrl } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      discount,
      rating,
      imageUrl, // Image URL or path to the image
    });

    await newProduct.save(); // Save the product to the database
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).send('Server Error');
  }
};

// Admin - Update a product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, stock, discount, rating, imageUrl } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, category, stock, discount, rating, imageUrl },
      { new: true }
    ); // Update and return the new product

    if (!updatedProduct) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send('Server Error');
  }
};

// Admin - Delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    res.status(200).json({ msg: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send('Server Error');
  }
};
