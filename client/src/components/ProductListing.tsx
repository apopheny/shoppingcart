import React from 'react';
import { Product } from '../types/types';

interface ProductListingProps {
  products: Array<Product>;
}

export const ProductListing = ({ products }: ProductListingProps) => {
  return (
    <div className='product-listing'>
      <h2>Products</h2>
      <ul className='product-list'>
        {products.map(({ title, price, quantity }) => {
          return (
            <li className='product' key={crypto.randomUUID()}>
              <div className='product-details'>
                <h3>{title}</h3>
                <p className='price'>${price}</p>
                <p className='quantity'>{quantity} left in stock</p>
                <div className='actions product-actions'>
                  <button className='add-to-cart'>Add to Cart</button>
                  <button className='edit'>Edit</button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
