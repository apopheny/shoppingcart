import React, { useEffect, useState } from "react";
import { Product } from "./types/types";
import axios from "axios";
import z from "zod";
import {
  CartHeader,
  ProductListing,
  AddProductForm,
} from "./components/_ComponentList";

const productSchema = z.object({
  _id: z.string(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const getProductsSchema = z.array(productSchema);
const getCartSchema = z.array(productSchema);

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const [productsChanges, setProductsChanges] = useState(0);
  const [cartChanges, setcartChanges] = useState(0);
  const [addFormDisplay, setAddFormDisplay] = useState(false);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/products");
      setProducts(getProductsSchema.parse(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [productsChanges]);

  const fetchCartProducts = async () => {
    try {
      const { data } = await axios.get("/api/cart");
      setCartProducts(getCartSchema.parse(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, [cartChanges]);

  return (
    <div id="app">
      <CartHeader cartItems={cartProducts} />

      <main>
        <div className="product-listing">
          <h2>Products</h2>
          {products.map(({ _id, title, price, quantity }) => (
            <ProductListing
              _id={_id}
              title={title}
              price={price}
              quantity={quantity}
              key={_id}
              setProductsChanges={setProductsChanges}
            />
          ))}
        </div>
        <p>
          <button
            className="add-product-button"
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
}

export default App;
