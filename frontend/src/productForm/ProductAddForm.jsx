import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useUploadFile from '../utils/useUploadFile';
import { useNavigate } from 'react-router-dom';

const ProductAddForm = ({ onAdd }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock,setCountInStock] = useState(0)

  const { uploadFile, uploadProgress, fileUrl } = useUploadFile();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fileUrl) {
      toast.error('Please wait until the image upload is complete.');
      return;
    }

    const productData = {
      name,
      description,
      price,
      countInStock,
      image: fileUrl,
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        throw new Error('Failed to create product');
      }

      toast.success('Product created successfully!');
      setName('');
      setDescription('');
      setPrice('');
      navigate('/');
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <form
      className="max-w-lg mx-auto p-4 bg-gray-100 shadow-md rounded-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-bold text-gray-800 mb-4">Add New Product</h2>

      {/* Name Field */}
      <div className="mb-4">
        <label className="block text-gray-600">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Product Name"
          required
        />
      </div>

      {/* Price Field */}
      <div className="mb-4">
        <label className="block text-gray-600">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Product Price"
          required
          min="0"
          step="0.01"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600">Count In Stock</label>
        <input
          type="number"
          value={countInStock}
          onChange={(e) => setCountInStock(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Product Price"
          required
          min="0"
          step="1"
        />
      </div>

      {/* Description Field */}
      <div className="mb-4">
        <label className="block text-gray-600">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Product Description"
          rows="4"
          maxLength="500"
          required
        ></textarea>
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block text-gray-600">Image</label>
        {uploadProgress > 0 && <p>Uploading Image: {uploadProgress}%</p>}
        <input
          type="file"
          onChange={(e) => uploadFile(e.target.files[0])}
          accept="image/*"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
        {uploadProgress > 0 && (
          <p className="mt-2 text-sm text-gray-500">
            Uploading Image: {uploadProgress}%
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full px-4 py-2 rounded text-white ${
          uploadProgress < 100
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
        disabled={uploadProgress < 100}
      >
        {uploadProgress < 100 ? 'Uploading...' : 'Add Product'}
      </button>
    </form>
  );
};

export default ProductAddForm;
