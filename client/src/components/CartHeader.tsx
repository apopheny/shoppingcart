import React from 'react';
import { Product } from '../types/types.ts';

interface CartHeaderProps {
  cartItems: Array<Product>;
}

export const CartHeader = ({ cartItems }: CartHeaderProps) => {
  let total = cartItems.reduce((acc, product) => acc + product.price, 0);

  return (
    <header>
      <h1>The Shop!</h1>
      <div className='cart'>
        <h2>Your Cart</h2>
        <table className='cart-items'>
          <thead>
            <tr>
              <th scope='col'>Item</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(({ title, quantity, price }) => {
              return (
                <tr key={crypto.randomUUID()}>
                  <td>{title}</td>
                  <td>{quantity}</td>
                  <td>${price}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className='total'>
                Total: ${total}
              </td>
            </tr>
          </tfoot>
        </table>
        <div className='checkout-button'>
          <button className='checkout'>Checkout</button>
        </div>
      </div>
    </header>
  );
};
