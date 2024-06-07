import React, { useState, useEffect } from 'react';
import axios from 'axios';
import z from 'zod';
import { Product } from '../types/types';
import { EditProductForm } from './_ComponentList';

const ProductListing = ({
  _id,
  title,
  price,
  quantity,
  updateSetter,
}: {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  updateSetter: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [editFormDisplay, setEditFormDisplay] = useState(false);
  const deleteProduct = async () => {
    try {
      await axios.delete(`/api/products/${_id}`);
      updateSetter((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

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
                  updateSetter={updateSetter}
                />
              ) : null}
              <button className='delete-button' onClick={() => deleteProduct()}>
                <span>X</span>
              </button>
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

const productSchema = z.object({
  _id: z.string(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const getProductsSchema = z.array(productSchema);

export const ProductListings = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsChanges, setProductsChanges] = useState(0);
  useEffect(() => {
    fetchProducts();
  }, [productsChanges]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/products');
      setProducts(getProductsSchema.parse(data));
    } catch (error) {
      console.error(error);
    }
  };
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
          updateSetter={setProductsChanges}
        />
      ))}
    </div>
  );
};
