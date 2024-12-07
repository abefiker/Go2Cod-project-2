const mongoose = require('mongoose');
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true, // Removes extra whitespace
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    image: {
      type: String,
      required: [true, 'Product image URL is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      default: '0.00',
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
      integer: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
