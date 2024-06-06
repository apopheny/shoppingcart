import { useState } from 'react';
import { mockProducts, mockCart } from './mockData/data';
import { CartHeader, ProductListing } from './components/Components.ts';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div id='app'>
      <CartHeader cartItems={mockProducts.slice(0, 2)} />

      <main>
        <ProductListing products={mockProducts} />

        <p>
          <button className='add-product-button'>Add A Product</button>
        </p>
      </main>
    </div>
  );
}

export default App;
