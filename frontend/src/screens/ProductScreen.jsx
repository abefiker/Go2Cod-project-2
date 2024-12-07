import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetProductByIdQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(0);

  const { data: product, error, isLoading } = useGetProductByIdQuery(productId);
  console.log(product);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  return (
    <>
      <Link
        to="/"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mx-4"
      >
        Go Back
      </Link>
      {isLoading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : error ? (
        <Message variant="danger" className="my-4">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 px-4">
            <div className="md:col-span-1">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="md:col-span-1">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">{product.name}</h3>

                <p className="text-lg font-bold">${product.price}</p>
                <p>{product.description}</p>
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="p-4 bg-white rounded-lg shadow-md">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Price:</span>
                    <span className="text-xl font-semibold">
                      ${product.price}
                    </span>
                  </div>
                  {product.countInStock > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Qty:</span>
                      <select
                        className="border rounded p-2"
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Status:</span>
                    <span className="text-green-500 font-semibold">
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  <button
                    className="w-full bg-blue-500 text-white py-2 rounded-lg"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductScreen;
