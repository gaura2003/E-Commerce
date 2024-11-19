// formatPrice utility function to format the price in a currency format
export const formatPrice = (price) => {
    if (typeof price !== 'number') {
      throw new Error('Price should be a number');
    }
  
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  