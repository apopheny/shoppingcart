import React, { useState } from 'react';
import { Product } from '../types/types';
import { EditProductForm } from './_ComponentList';

const ProductListing = ({
  title,
  price,
  quantity,
}: {
  title: string;
  price: number;
  quantity: number;
}) => {
  const [editFormDisplay, setEditFormDisplay] = useState(false);
  const displayEditForm = (event: React.SyntheticEvent): void => {};

  return (
    <div className='product-listing'>
      <h2>Products</h2>

      <ul className='product-list'>
        <li className='product' key={crypto.randomUUID()}>
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
    </div>
  );
};

interface ProductListingProps {
  products: Array<Product>;
}

export const ProductListings = ({ products }: ProductListingProps) => {
  console.log(products[0]);

  return products.map(({ title, price, quantity }) => (
    <ProductListing
      title={title}
      price={price}
      quantity={quantity}
      key={crypto.randomUUID()}
    />
  ));
};
