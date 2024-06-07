import React, { useEffect, useState } from 'react';
import { Product } from './types/types';
import axios from 'axios';
import z from 'zod';
import {
  CartHeader,
  ProductListings,
  AddProductForm,
} from './components/_ComponentList';

const productSchema = z.object({
  _id: z.string(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const getProductsSchema = z.array(productSchema);
const getCartSchema = z.array(productSchema);

function App() {
  const [productsChanges, setProductsChanges] = useState(0);
  const [cartChanges, setcartChanges] = useState(0);
  const [addFormDisplay, setAddFormDisplay] = useState(false);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/products');
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCartProducts = async () => {
    try {
      const { data } = await axios.get('/api/cart');
      setCartProducts(getCartSchema.parse(data));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [productsChanges]);

  useEffect(() => {
    fetchCartProducts();
  }, [cartChanges]);

  return (
    <div id='app'>
      <CartHeader cartItems={cartProducts} />

      <main>
        <ProductListings />
        <p>
          <button
            className='add-product-button'
            onClick={() => setAddFormDisplay(true)}
          >
            Add A Product
          </button>
        </p>
        {addFormDisplay ? (
          <AddProductForm
            formDisplaySetter={setAddFormDisplay}
            productsUpdatedSetter={setProductsChanges}
          />
        ) : null}
      </main>
    </div>
  );
}

export default App;
