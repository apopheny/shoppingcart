import React from 'react';

export const EditProductForm = ({
  setEditFormDisplay,
  title,
  price,
  quantity,
}: {
  setEditFormDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  price: number;
  quantity: number;
}) => {
  return (
    <div className='edit-form'>
      <h3>Edit Product</h3>
      <form>
        <div className='input-group'>
          <label htmlFor='product-name'>Product Name</label>
          <input
            type='text'
            id='product-name'
            value={title}
            aria-label='Product Name'
          />
        </div>

        <div className='input-group'>
          <label htmlFor='product-price'>Price</label>
          <input
            type='number'
            id='product-price'
            value={price}
            aria-label='Product Price'
          />
        </div>

        <div className='input-group'>
          <label htmlFor='product-quantity'>Quantity</label>
          <input
            type='number'
            id='product-quantity'
            value={quantity}
            aria-label='Product Quantity'
          />
        </div>

        <div className='actions form-actions'>
          <button type='submit'>Update</button>
          <button type='button' onClick={() => setEditFormDisplay(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
