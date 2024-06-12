import axios from 'axios';

export const checkoutCart = async () => {
  try {
    await axios.post('/api/checkout');
  } catch (error) {
    console.error(error);
  }
};
