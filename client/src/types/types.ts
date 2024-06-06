export interface Product {
  title: string;
  quantity: number;
  price: number;
}

// export interface ProductWithoutID extends Omit<Product, '_id'> {}
