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
  const [addFormDisplay, setAddFormDisplay] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/products');
      setProducts(getProductsSchema.parse(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const { data } = await axios.get('/api/cart');
        setCartProducts(getCartSchema.parse(data));
      } catch (error) {
        console.error(error);
      }

      fetchCartProducts();
    };
  }, [cartProducts]);

  return (
    <div id='app'>
      <CartHeader cartItems={cartProducts} />

      <main>
        <ProductListings products={products} />
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
            setAddFormDisplay={setAddFormDisplay}
            onProductAdded={fetchProducts}
          />
        ) : null}
      </main>
    </div>
  );
}

export default App;
