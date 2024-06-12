import React from 'react';
import { Product } from '../types/types';
import { checkoutCart } from '../services/checkoutCart';

interface CartProps {
  cartProducts: Array<Product>;
  setCartChanges: React.Dispatch<React.SetStateAction<number>>;
}

export const Cart = ({ cartProducts, setCartChanges }: CartProps) => {
  const checkout = () => {
    const request = async () => {
      await checkoutCart();
      setCartChanges((prev) => prev + 1);
    };

    request();
  };

  const total = cartProducts.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

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
            {cartProducts.map(({ _id, title, quantity, price }) => {
              return (
                <tr key={_id}>
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
          <button className='checkout' onClick={checkout}>
            Checkout
          </button>
        </div>
      </div>
    </header>
  );
};
