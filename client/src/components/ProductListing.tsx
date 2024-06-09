import React, { useState, useEffect } from "react";
import axios from "axios";
import z from "zod";
import { Product } from "../types/types";
import { EditProductForm } from "./_ComponentList";

const productSchema = z.object({
  _id: z.string(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const getProductsSchema = z.array(productSchema);

export const ProductListing = ({
  _id,
  title,
  price,
  quantity,
  setProductsChanges,
}: {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  setProductsChanges: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [editFormDisplay, setEditFormDisplay] = useState(false);
  const deleteProduct = async () => {
    try {
      await axios.delete(`/api/products/${_id}`);
      setProductsChanges((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ul className="product-list">
        <li className="product" key={_id}>
          <div className="product-details">
            <h3>{title}</h3>
            <p className="price">${price}</p>
            <p className="quantity">{quantity} left in stock</p>

            <div className="actions product-actions">
              <button className="add-to-cart">Add to Cart</button>
              <button className="edit" onClick={() => setEditFormDisplay(true)}>
                Edit
              </button>
              {editFormDisplay ? (
                <EditProductForm
                  _id={_id}
                  setEditFormDisplay={setEditFormDisplay}
                  title={title}
                  price={price}
                  quantity={quantity}
                  setProductsChanges={setProductsChanges}
                />
              ) : null}
              <button className="delete-button" onClick={deleteProduct}>
                <span>X</span>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
};
