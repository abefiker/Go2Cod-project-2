import React from 'react';
import ProductCard from '../components/ProductCard';
import { Link, useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import PaginationComponent from '../components/PaginationComponent';

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

 

  return (
    <>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div>
          {data.products && data.products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {data.products.map((product, index) => (
                <Link to={`/productScreen/${product._id}`} key={index}>
                  <ProductCard
                    name={product.name}
                    image={product.image}
                    price={product.price}
                    description={product.description}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <p>No products available</p> // This message will show if the products array is empty
          )}

          {data.pages > 1 && (
            <PaginationComponent
              pages={data.pages}
              page={data.page}
              keyword={keyword || ''}
            />
          )}
        </div>
      )}
    </>
  );
};

export default HomeScreen;
