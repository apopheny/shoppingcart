import React, { useState } from 'react';
import { Product } from '../types/types';
import { EditProductForm } from './_ComponentList';

const ProductListing = ({
  _id,
  title,
  price,
  quantity,
}: {
  _id: string;
  title: string;
  price: number;
  quantity: number;
}) => {
  const [editFormDisplay, setEditFormDisplay] = useState(false);

  return (
    <>
      <ul className='product-list'>
        <li className='product' key={_id}>
          <div className='product-details'>
            <h3>{title}</h3>
            <p className='price'>${price}</p>
            <p className='quantity'>{quantity} left in stock</p>

            <div className='actions product-actions'>
              <button className='add-to-cart'>Add to Cart</button>
              <button className='edit' onClick={() => setEditFormDisplay(true)}>
                Edit
              </button>
              {editFormDisplay ? (
                <EditProductForm
                  _id={_id}
                  setEditFormDisplay={setEditFormDisplay}
                  title={title}
                  price={price}
                  quantity={quantity}
                />
              ) : null}
            </div>
          </div>
        </li>
      </ul>
    </>
  );
};

interface ProductListingProps {
  products: Array<Product>;
}

export const ProductListings = ({ products }: ProductListingProps) => {
  return (
    <div className='product-listing'>
      <h2>Products</h2>
      {products.map(({ _id, title, price, quantity }) => (
        <ProductListing
          _id={_id}
          title={title}
          price={price}
          quantity={quantity}
          key={_id}
        />
      ))}
    </div>
  );
};
