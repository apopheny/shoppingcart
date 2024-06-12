import axios from 'axios';

export const addNewProduct = async (
  title: string,
  price: number,
  quantity: number
) => {
  try {
    await axios.post('/api/products', {
      title,
      price,
      quantity,
    });
  } catch (error) {
    console.error(error);
  }
};
