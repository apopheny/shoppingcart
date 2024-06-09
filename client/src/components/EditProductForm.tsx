import React, { useState, useEffect } from "react";
import axios from "axios";
import { validProductFormSchema } from "./helpers";

export const EditProductForm = ({
  _id,
  setEditFormDisplay,
  title,
  price,
  quantity,
  setProductsChanges,
}: {
  setEditFormDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  _id: string;
  title: string;
  price: number;
  quantity: number;
  setProductsChanges: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [productName, setProductName] = useState(title);
  const [productPrice, setProductPrice] = useState(price);
  const [productQuantity, setProductQuantity] = useState(quantity);

  useEffect(() => {
    setProductName(productName);
    setProductPrice(productPrice);
    setProductQuantity(productQuantity);
  }, [title, price, quantity]);

  const putProduct = async () => {
    try {
      await axios.put(`/api/products/${_id}`, {
        title: productName,
        price: productPrice,
        quantity: productQuantity,
      });
      setProductsChanges((prev) => prev + 1);
      setEditFormDisplay(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (
            validProductFormSchema.parse({
              productName,
              productPrice,
              productQuantity,
            })
          ) {
            putProduct();
          }
        }}
      >
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            defaultValue={title}
            aria-label="Product Name"
            required
            onChange={({ target }) => {
              setProductName(target.value);
            }}
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input
            type="number"
            id="product-price"
            defaultValue={price}
            aria-label="Product Price"
            required
            onChange={({ target }) => {
              setProductPrice(Number(target.value));
            }}
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input
            type="number"
            id="product-quantity"
            defaultValue={quantity}
            aria-label="Product Quantity"
            required
            onChange={({ target }) => {
              setProductQuantity(Number(target.value));
            }}
          />
        </div>

        <div className="actions form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={() => setEditFormDisplay(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
