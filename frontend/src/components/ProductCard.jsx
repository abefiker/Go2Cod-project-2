import React from 'react';

const ProductCard = ({ name, image, price, description }) => {
  return (
    <div className="relative max-w-lg mx-auto my-4 p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{name}</h2>
        <p className="text-gray-500 mt-2 line-clamp-1">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-green-600 font-semibold text-lg">${price}</span>
         
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
