const mongoose = require('mongoose');
const { mockProducts, mockCart } = require('./data');
require('dotenv').config({ path: '../../.env' });

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  _id: String,
  title: String,
  quantity: Number,
  price: Number,
});

const CartSchema = new Schema({
  _id: String,
  title: String,
  quantity: Number,
  price: Number,
});

const Product = mongoose.model('Product', ProductSchema);
const Cart = mongoose.model('Cart', CartSchema);

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log('Database connected successfully');

    return Promise.all([
      Product.insertMany(mockProducts),
      Cart.insertMany(mockCart),
    ]);
  })
  .then(() => {
    console.log('Documents inserted successfully');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error inserting documents:', err);
    mongoose.connection.close();
  });
