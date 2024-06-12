import axios from 'axios';

export const editProduct = async (
  _id: string,
  title: string,
  price: number,
  quantity: number
) => {
  try {
    await axios.put(`/api/products/${_id}`, {
      title,
      price,
      quantity,
    });
  } catch (error) {
    console.error(error);
  }
};
