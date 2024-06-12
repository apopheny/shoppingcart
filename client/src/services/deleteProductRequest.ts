import axios from 'axios';

export const deleteProductRequest = async (_id: string) => {
  try {
    await axios.delete(`/api/products/${_id}`);
  } catch (error) {
    console.error(error);
  }
};
