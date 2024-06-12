import axios from 'axios';

export const addProductToCart = async (productId: string) => {
  try {
    await axios.post('/api/add-to-cart', { productId });
  } catch (error) {
    console.error(error);
  }
};
