import React, { useEffect, useState } from 'react';
import { Product, productSchema } from '../types/types';
import axios from 'axios';
import z from 'zod';
import {
  Cart,
  ProductListing,
  AddProductForm,
} from '../components/_ComponentList';

const getProductsSchema = z.array(productSchema);

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsChanges, setProductsChanges] = useState(0);

  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [cartChanges, setCartChanges] = useState(0);

  const [addFormDisplay, setAddFormDisplay] = useState(false);

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
  }, [productsChanges]);

  const fetchCartItems = async () => {
    try {
      const { data } = await axios.get('/api/cart');
      setCartProducts(getProductsSchema.parse(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [cartChanges]);

  return (
    <div id='app'>
      <Cart cartProducts={cartProducts} setCartChanges={setCartChanges} />

      <main>
        <div className='product-listing'>
          <h2>Products</h2>
          {products.map(({ _id, title, price, quantity }) => (
            <ProductListing
              _id={_id}
              title={title}
              price={price}
              quantity={quantity}
              key={_id}
              setProductsChanges={setProductsChanges}
              setCartChanges={setCartChanges}
            />
          ))}
        </div>
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
            setProductsChanges={setProductsChanges}
          />
        ) : null}
      </main>
    </div>
  );
};

export default App;
