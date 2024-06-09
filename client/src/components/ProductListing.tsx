import React, { useState } from "react";
import axios from "axios";
import { EditProductForm } from "./_ComponentList";

interface ProductListingProps {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  setProductsChanges: React.Dispatch<React.SetStateAction<number>>;
  setCartChanges: React.Dispatch<React.SetStateAction<number>>;
}

export const ProductListing = ({
  _id,
  title,
  price,
  quantity,
  setProductsChanges,
  setCartChanges,
}: ProductListingProps) => {
  const [editFormDisplay, setEditFormDisplay] = useState(false);

  const deleteProduct = async () => {
    try {
      await axios.delete(`/api/products/${_id}`);
      setProductsChanges((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const addProductToCart = async (productId: string) => {
    try {
      await axios.post("/api/add-to-cart", { productId });
      setProductsChanges((prev) => prev + 1);
      setCartChanges((prev) => prev + 1);
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
              <button
                className="add-to-cart"
                disabled={quantity > 0 ? false : true}
                onClick={() => addProductToCart(_id)}
              >
                Add to Cart
              </button>
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
