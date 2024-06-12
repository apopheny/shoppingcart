import axios from 'axios';

export const fetchCartItems = async () => {
  try {
    const { data } = await axios.get('/api/cart');
    return data;
  } catch (error) {
    console.error(error);
  }
};
