import React, { useState } from 'react';
import { validProductFormSchema } from './helpers';
import { addNewProduct } from '../services/addNewProduct';

interface AddProductFormProps {
  setAddFormDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  setProductsChanges: React.Dispatch<React.SetStateAction<number>>;
}

export const AddProductForm = ({
  setProductsChanges,
  setAddFormDisplay,
}: AddProductFormProps) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);

  const postProduct = () => {
    const request = async () => {
      await addNewProduct(productName, productPrice, productQuantity);
      setProductsChanges((prev) => prev + 1);
      setAddFormDisplay(false);
    };

    request();
  };

  return (
    <div className='add-form'>
      <form
        action=''
        onSubmit={(event) => {
          event.preventDefault();
          if (
            validProductFormSchema.parse({
              productName,
              productPrice,
              productQuantity,
            })
          ) {
            postProduct();
          }
        }}
      >
        <div className='input-group'>
          <label htmlFor='product-name'>Product Name:</label>
          <input
            type='text'
            id='product-name'
            name='product-name'
            onChange={({ target }) => setProductName(target.value)}
            required
          />
        </div>
        <div className='input-group'>
          <label htmlFor='product-price'>Price:</label>
          <input
            type='number'
            id='product-price'
            name='product-price'
            onChange={({ target }) => setProductPrice(Number(target.value))}
            min='0'
            step='0.01'
            required
          />
        </div>
        <div className='input-group'>
          <label htmlFor='product-quantity'>Quantity:</label>
          <input
            type='number'
            id='product-quantity'
            name='product-quantity'
            onChange={({ target }) => setProductQuantity(Number(target.value))}
            min='0'
            required
          />
        </div>
        <div className='actions form-actions'>
          <button type='submit'>Add</button>
          <button type='button' onClick={() => setAddFormDisplay(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
