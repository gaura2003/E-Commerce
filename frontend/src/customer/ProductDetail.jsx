import React, { useEffect, useState } from 'react';
import { fetchProductById } from '../Services/productService'; // Correct path to productService.js

const ProductDetail = ({ id }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productData = await fetchProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error('Error loading product:', error);
      }
    };

    getProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const imageUrl = product.images?.[0] || 'https://via.placeholder.com/300'; // Fallback image URL

  return (
    <div>
      <img src={imageUrl} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
      {/* Add other product details here */}
    </div>
  );
};

export default ProductDetail;
