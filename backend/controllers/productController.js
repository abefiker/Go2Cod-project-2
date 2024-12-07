const Product = require('../models/productModel');
const asyncHandler = require('../middleware/asyncHandler');
exports.getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {};

  const count = await Product.countDocuments({ ...keyword });

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
  if (!products) {
    res.status(404);
    throw new Error('Resource not found');
  }
});
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});
exports.createProduct = asyncHandler(async (req, res) => {
  const { name, image, price, description, countInStock } = req.body;
  const product = new Product({
    name,
    price,
    image,
    description,
    countInStock,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});
