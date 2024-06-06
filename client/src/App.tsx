import React, { useState } from 'react';
import { mockProducts, mockCart } from './mockData/data';
import {
  CartHeader,
  ProductListings,
  AddProductForm,
} from './components/_ComponentList';

function App() {
  const [addFormDisplay, setAddFormDisplay] = useState(false);

  return (
    <div id='app'>
      <CartHeader cartItems={mockProducts.slice(0, 2)} />

      <main>
        <ProductListings products={mockProducts} />

        <p>
          <button
            className='add-product-button'
            onClick={() => setAddFormDisplay(true)}
          >
            Add A Product
          </button>
        </p>

        {addFormDisplay ? (
          <AddProductForm setAddFormDisplay={setAddFormDisplay} />
        ) : null}
      </main>
    </div>
  );
}

export default App;
